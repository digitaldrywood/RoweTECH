package middleware

import (
	"context"
	"log/slog"
	"time"

	"rowetech/internal/clerk"
	"rowetech/internal/config"
	"rowetech/internal/ctxkeys"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func Setup(e *echo.Echo, cfg *config.Config) {
	e.Use(middleware.RequestID())
	e.Use(middleware.Recover())
	e.Use(SiteConfigMiddleware(cfg.Site))
	e.Use(ClerkConfigMiddleware(clerk.FromConfig(cfg)))
	e.Use(RequestLogger(cfg.IsDevelopment()))
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
	}))
	e.Use(middleware.GzipWithConfig(middleware.GzipConfig{
		Level: 5,
	}))
	e.Use(middleware.SecureWithConfig(middleware.SecureConfig{
		XSSProtection:      "1; mode=block",
		ContentTypeNosniff: "nosniff",
		XFrameOptions:      "SAMEORIGIN",
		HSTSMaxAge:         31536000,
	}))
}

func SiteConfigMiddleware(site config.SiteConfig) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			ctx := context.WithValue(c.Request().Context(), ctxkeys.SiteConfig, site)
			c.SetRequest(c.Request().WithContext(ctx))
			return next(c)
		}
	}
}

func ClerkConfigMiddleware(cfg clerk.Config) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			ctx := context.WithValue(c.Request().Context(), ctxkeys.ClerkConfig, cfg)
			c.SetRequest(c.Request().WithContext(ctx))
			return next(c)
		}
	}
}

func RequestLogger(isDev bool) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			start := time.Now()
			err := next(c)
			latency := time.Since(start)

			req := c.Request()
			res := c.Response()

			attrs := []any{
				"request_id", res.Header().Get(echo.HeaderXRequestID),
				"method", req.Method,
				"uri", req.RequestURI,
				"status", res.Status,
				"latency", latency.String(),
			}

			if isDev {
				slog.Debug("request", attrs...)
			} else if res.Status >= 500 {
				slog.Error("request", attrs...)
			} else if res.Status >= 400 {
				slog.Warn("request", attrs...)
			} else {
				slog.Info("request", attrs...)
			}

			return err
		}
	}
}
