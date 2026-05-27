//go:build !dev

package middleware

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/labstack/echo/v4"
)

// TestProductionBuildHasNoDevAuthRoutes asserts the dev login/logout routes are
// never registered in a production build (no -tags dev).
func TestProductionBuildHasNoDevAuthRoutes(t *testing.T) {
	e := echo.New()
	RegisterDevAuthRoutes(e, nil)
	for _, r := range e.Routes() {
		if strings.HasPrefix(r.Path, "/auth/dev") {
			t.Fatalf("production build registered dev-only route %s %s", r.Method, r.Path)
		}
	}
}

// TestDevAuthDisabledInProduction asserts the bypass is inert in production
// even when a dev session cookie is present.
func TestDevAuthDisabledInProduction(t *testing.T) {
	if DevAuthEnabled() {
		t.Fatal("DevAuthEnabled() must be false in a non-dev build")
	}

	e := echo.New()
	req := httptest.NewRequest(http.MethodGet, "/admin", nil)
	req.RemoteAddr = "127.0.0.1:12345"
	req.AddCookie(&http.Cookie{Name: "dev_admin", Value: "attacker@example.com"})
	c := e.NewContext(req, httptest.NewRecorder())

	if email, ok := devAdminBypass(c, nil); ok {
		t.Fatalf("devAdminBypass granted access in production build (email=%q)", email)
	}
}
