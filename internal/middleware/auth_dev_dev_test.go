//go:build dev

package middleware

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"rowetech/internal/config"

	"github.com/labstack/echo/v4"
)

func newCtx(t *testing.T, remoteAddr, host, cookieVal string) echo.Context {
	t.Helper()
	e := echo.New()
	req := httptest.NewRequest(http.MethodGet, "/admin", nil)
	req.RemoteAddr = remoteAddr
	if host != "" {
		req.Host = host
	}
	if cookieVal != "" {
		req.AddCookie(&http.Cookie{Name: devSessionCookie, Value: cookieVal})
	}
	return e.NewContext(req, httptest.NewRecorder())
}

func TestDevAuthRoutesRegistered(t *testing.T) {
	e := echo.New()
	RegisterDevAuthRoutes(e, &config.Config{})
	var gotLogin, gotLogout bool
	for _, r := range e.Routes() {
		switch {
		case r.Method == http.MethodGet && r.Path == "/auth/dev/login":
			gotLogin = true
		case r.Method == http.MethodPost && r.Path == "/auth/dev/logout":
			gotLogout = true
		}
	}
	if !gotLogin || !gotLogout {
		t.Fatalf("dev auth routes missing: login=%v logout=%v", gotLogin, gotLogout)
	}
}

func TestDevAdminBypassLoopbackGating(t *testing.T) {
	cfg := &config.Config{}
	tests := []struct {
		name       string
		remoteAddr string
		host       string
		cookie     string
		wantOK     bool
	}{
		{"loopback with cookie", "127.0.0.1:5000", "localhost:3000", "admin@x.com", true},
		{"ipv6 loopback with cookie", "[::1]:5000", "[::1]:3000", "admin@x.com", true},
		{"loopback no cookie", "127.0.0.1:5000", "localhost:3000", "", false},
		{"remote peer with cookie", "10.0.0.5:5000", "localhost:3000", "admin@x.com", false},
		{"public host header with cookie", "127.0.0.1:5000", "rowetech.com", "admin@x.com", false},
	}
	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			c := newCtx(t, tc.remoteAddr, tc.host, tc.cookie)
			email, ok := devAdminBypass(c, cfg)
			if ok != tc.wantOK {
				t.Fatalf("devAdminBypass ok = %v, want %v (email=%q)", ok, tc.wantOK, email)
			}
			if ok && email != tc.cookie {
				t.Fatalf("devAdminBypass email = %q, want %q", email, tc.cookie)
			}
		})
	}
}

func TestSanitizeReturnTo(t *testing.T) {
	cases := map[string]string{
		"":                  "/admin",
		"/admin/contacts":   "/admin/contacts",
		"//evil.com":        "/admin",
		"https://evil.com":  "/admin",
		"/content?tab=home": "/content?tab=home",
	}
	for in, want := range cases {
		if got := sanitizeReturnTo(in); got != want {
			t.Errorf("sanitizeReturnTo(%q) = %q, want %q", in, got, want)
		}
	}
}

func TestDefaultDevAdminEmail(t *testing.T) {
	if got := defaultDevAdminEmail(&config.Config{}); got != "dev-admin@lanou.com" {
		t.Errorf("default with no admins = %q", got)
	}
	cfg := &config.Config{AdminEmails: []string{"boss@rowetech.com"}}
	if got := defaultDevAdminEmail(cfg); got != "boss@rowetech.com" {
		t.Errorf("default with admins = %q, want boss@rowetech.com", got)
	}
}
