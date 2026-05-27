//go:build dev

package middleware

import (
	"log/slog"
	"net"
	"net/http"
	"os"
	"strings"

	"rowetech/internal/config"

	"github.com/labstack/echo/v4"
)

// devSessionCookie marks an impersonated admin in dev builds. Its value is the
// admin email being impersonated. It is only ever honored on loopback requests
// (see devAdminBypass) and only exists in binaries built with `-tags dev`.
const devSessionCookie = "dev_admin"

// init is a last-resort runtime guard. The `-tags dev` code should never run in
// production, but if a dev-tagged binary is ever started with ENV=production we
// refuse to boot rather than silently exposing the auth bypass.
func init() {
	if os.Getenv("ENV") == "production" || os.Getenv("ENVIRONMENT") == "production" {
		slog.Error("FATAL: binary built with -tags dev is running with ENV=production; refusing to start")
		os.Exit(1)
	}
}

// DevAuthEnabled reports whether the dev auth bypass is compiled in. True only
// under `-tags dev`. Used by route registration to decide whether to attach the
// admin gate even when Clerk is not configured.
func DevAuthEnabled() bool { return true }

// RegisterDevAuthRoutes wires the loopback-only dev login/logout endpoints.
// It is a no-op in production builds (see auth_dev_stub.go).
func RegisterDevAuthRoutes(e *echo.Echo, cfg *config.Config) {
	e.GET("/auth/dev/login", handleDevLogin(cfg))
	e.POST("/auth/dev/logout", handleDevLogout())
	slog.Warn("DEV AUTH BYPASS routes registered: GET /auth/dev/login, POST /auth/dev/logout — never deploy this binary to production")
}

// handleDevLogin impersonates an admin by setting the dev session cookie, then
// redirects to return_to (default /admin). Loopback-only.
//
//	GET /auth/dev/login[?email=<addr>][&return_to=/path]
//
// With no email, the first configured admin email is used.
func handleDevLogin(cfg *config.Config) echo.HandlerFunc {
	return func(c echo.Context) error {
		if !isLoopbackRequest(c) {
			slog.Warn("DEV AUTH BYPASS: rejecting non-loopback caller",
				"remote_addr", c.Request().RemoteAddr, "host", c.Request().Host)
			return c.JSON(http.StatusForbidden, map[string]string{"error": "/auth/dev/login is restricted to loopback callers"})
		}

		email := strings.TrimSpace(c.QueryParam("email"))
		if email == "" {
			email = defaultDevAdminEmail(cfg)
		}

		c.SetCookie(&http.Cookie{
			Name:     devSessionCookie,
			Value:    email,
			Path:     "/",
			HttpOnly: true,
			Secure:   false,
			SameSite: http.SameSiteLaxMode,
			MaxAge:   7 * 24 * 60 * 60,
		})

		slog.Warn("DEV AUTH BYPASS", "email", email, "remote_addr", c.Request().RemoteAddr)
		return c.Redirect(http.StatusFound, sanitizeReturnTo(c.QueryParam("return_to")))
	}
}

// handleDevLogout clears the dev session cookie. Loopback-only.
func handleDevLogout() echo.HandlerFunc {
	return func(c echo.Context) error {
		if !isLoopbackRequest(c) {
			return c.JSON(http.StatusForbidden, map[string]string{"error": "/auth/dev/logout is restricted to loopback callers"})
		}
		c.SetCookie(&http.Cookie{
			Name:     devSessionCookie,
			Value:    "",
			Path:     "/",
			HttpOnly: true,
			MaxAge:   -1,
		})
		return c.JSON(http.StatusOK, map[string]string{"status": "logged out"})
	}
}

// devAdminBypass reports the impersonated admin email when a valid dev session
// is present on a loopback request. RequireAdminAccess calls this before any
// Clerk verification so dev builds can reach admin pages without Clerk.
func devAdminBypass(c echo.Context, _ *config.Config) (string, bool) {
	if !isLoopbackRequest(c) {
		return "", false
	}
	cookie, err := c.Cookie(devSessionCookie)
	if err != nil || cookie.Value == "" {
		return "", false
	}
	return cookie.Value, true
}

func defaultDevAdminEmail(cfg *config.Config) string {
	if cfg != nil && len(cfg.AdminEmails) > 0 {
		return cfg.AdminEmails[0]
	}
	return "dev-admin@lanou.com"
}

// sanitizeReturnTo only allows same-origin absolute paths, defaulting to /admin.
func sanitizeReturnTo(raw string) string {
	if strings.HasPrefix(raw, "/") && !strings.HasPrefix(raw, "//") {
		return raw
	}
	return "/admin"
}

// isLoopbackRequest requires BOTH the raw TCP peer and the Host header to be
// loopback. RemoteAddr (not RealIP) defeats X-Forwarded-For spoofing; the Host
// check defeats a reverse-proxy that forwards a public hostname to localhost.
func isLoopbackRequest(c echo.Context) bool {
	return isRemoteLoopback(c.Request().RemoteAddr) && isHostLoopback(c.Request().Host)
}

func isRemoteLoopback(remoteAddr string) bool {
	host, _, err := net.SplitHostPort(remoteAddr)
	if err != nil {
		host = remoteAddr
	}
	ip := net.ParseIP(host)
	return ip != nil && ip.IsLoopback()
}

func isHostLoopback(hostHeader string) bool {
	host := hostHeader
	if h, _, err := net.SplitHostPort(host); err == nil {
		host = h
	}
	if host == "localhost" {
		return true
	}
	ip := net.ParseIP(host)
	return ip != nil && ip.IsLoopback()
}
