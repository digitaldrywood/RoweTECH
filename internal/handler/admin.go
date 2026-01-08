package handler

import (
	"rowetech/internal/database/models"
	"rowetech/templates/pages"

	"github.com/labstack/echo/v4"
)

func (h *Handler) AdminDashboard(c echo.Context) error {
	return pages.AdminDashboard().Render(c.Request().Context(), c.Response().Writer)
}

func (h *Handler) AdminGallery(c echo.Context) error {
	ctx := c.Request().Context()

	sqlcItems, err := h.db.Queries.ListGalleryItems(ctx)
	if err != nil {
		sqlcItems = nil
	}

	items := models.FromSqlcGalleryItems(sqlcItems)
	return pages.AdminGallery(items).Render(ctx, c.Response().Writer)
}

func (h *Handler) AdminContent(c echo.Context) error {
	return pages.AdminContent().Render(c.Request().Context(), c.Response().Writer)
}

func (h *Handler) AdminSettings(c echo.Context) error {
	return pages.AdminSettings().Render(c.Request().Context(), c.Response().Writer)
}
