package handler

import (
	"context"
	"log/slog"
	"net/http"

	"rowetech/internal/sitecontent"
	"rowetech/templates/pages"

	"github.com/labstack/echo/v4"
)

func (h *Handler) Health(c echo.Context) error {
	return c.JSON(http.StatusOK, map[string]string{"status": "ok"})
}

func (h *Handler) Home(c echo.Context) error {
	ctx := c.Request().Context()
	return pages.Home(h.getPageContent(ctx)).Render(ctx, c.Response().Writer)
}

func (h *Handler) About(c echo.Context) error {
	ctx := c.Request().Context()
	return pages.About(h.getPageContent(ctx)).Render(ctx, c.Response().Writer)
}

func (h *Handler) Services(c echo.Context) error {
	ctx := c.Request().Context()
	return pages.Services(h.getPageContent(ctx)).Render(ctx, c.Response().Writer)
}

func (h *Handler) Capabilities(c echo.Context) error {
	ctx := c.Request().Context()
	return pages.Capabilities(h.getPageContent(ctx)).Render(ctx, c.Response().Writer)
}

func (h *Handler) Contact(c echo.Context) error {
	ctx := c.Request().Context()
	return pages.Contact(h.getPageContent(ctx), false, "").Render(ctx, c.Response().Writer)
}

func (h *Handler) getPageContent(ctx context.Context) map[string]string {
	values := sitecontent.Defaults()

	settings, err := h.db.Queries.ListSettings(ctx)
	if err != nil {
		slog.Error("failed to load page content settings", "error", err)
		return values
	}

	for _, setting := range settings {
		if sitecontent.IsContentKey(setting.Key) {
			values[setting.Key] = setting.Value
		}
	}

	return values
}

func (h *Handler) SignIn(c echo.Context) error {
	return pages.SignIn().Render(c.Request().Context(), c.Response().Writer)
}

func (h *Handler) SignUp(c echo.Context) error {
	return pages.SignUp().Render(c.Request().Context(), c.Response().Writer)
}

func (h *Handler) Unauthorized(c echo.Context) error {
	return pages.Unauthorized().Render(c.Request().Context(), c.Response().Writer)
}

func (h *Handler) Terms(c echo.Context) error {
	return pages.Terms().Render(c.Request().Context(), c.Response().Writer)
}

func (h *Handler) Privacy(c echo.Context) error {
	return pages.Privacy().Render(c.Request().Context(), c.Response().Writer)
}
