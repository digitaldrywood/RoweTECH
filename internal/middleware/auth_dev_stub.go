//go:build !dev

package middleware

import (
	"rowetech/internal/config"

	"github.com/labstack/echo/v4"
)

// DevAuthEnabled is always false in production builds.
func DevAuthEnabled() bool { return false }

// RegisterDevAuthRoutes is a no-op in production builds, so callers can invoke
// it unconditionally without the dev login/logout routes ever existing.
func RegisterDevAuthRoutes(_ *echo.Echo, _ *config.Config) {}

// devAdminBypass never grants access in production builds.
func devAdminBypass(_ echo.Context, _ *config.Config) (string, bool) { return "", false }
