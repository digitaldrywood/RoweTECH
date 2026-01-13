package middleware

import (
	"net/http"
	"strings"

	"github.com/labstack/echo/v4"
)

func RequireClerkSession() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			if hasClerkSession(c) {
				return next(c)
			}
			return c.Redirect(http.StatusFound, "/sign-in")
		}
	}
}

func hasClerkSession(c echo.Context) bool {
	if cookie, err := c.Cookie("__session"); err == nil && cookie.Value != "" {
		return true
	}
	if cookie, err := c.Cookie("__clerk_db_jwt"); err == nil && cookie.Value != "" {
		return true
	}
	authHeader := c.Request().Header.Get("Authorization")
	return strings.HasPrefix(authHeader, "Bearer ")
}
