package handler

import (
	"net/http"

	"rowetech/internal/database/models"
	"rowetech/templates/pages"

	"github.com/labstack/echo/v4"
)

func (h *Handler) Health(c echo.Context) error {
	return c.JSON(http.StatusOK, map[string]string{"status": "ok"})
}

func (h *Handler) Home(c echo.Context) error {
	return pages.Home().Render(c.Request().Context(), c.Response().Writer)
}

func (h *Handler) About(c echo.Context) error {
	return pages.About().Render(c.Request().Context(), c.Response().Writer)
}

func (h *Handler) Services(c echo.Context) error {
	return pages.Services().Render(c.Request().Context(), c.Response().Writer)
}

func (h *Handler) Capabilities(c echo.Context) error {
	return pages.Capabilities().Render(c.Request().Context(), c.Response().Writer)
}

func (h *Handler) Gallery(c echo.Context) error {
	ctx := c.Request().Context()

	// Get gallery items from database
	sqlcItems, err := h.db.Queries.ListGalleryItems(ctx)
	if err != nil {
		return c.String(http.StatusInternalServerError, "Failed to load gallery")
	}

	// Convert to models
	items := models.FromSqlcGalleryItems(sqlcItems)

	// Get categories
	categories, err := h.db.Queries.GetGalleryCategories(ctx)
	if err != nil {
		categories = []string{}
	}

	return pages.Gallery(items, categories).Render(ctx, c.Response().Writer)
}

func (h *Handler) Contact(c echo.Context) error {
	return pages.Contact(false, "").Render(c.Request().Context(), c.Response().Writer)
}

func (h *Handler) ContactSubmit(c echo.Context) error {
	ctx := c.Request().Context()

	name := c.FormValue("name")
	company := c.FormValue("company")
	email := c.FormValue("email")
	phone := c.FormValue("phone")
	projectType := c.FormValue("projectType")
	message := c.FormValue("message")

	// Validate required fields
	if name == "" || email == "" || message == "" {
		return pages.Contact(false, "Please complete the required fields.").Render(ctx, c.Response().Writer)
	}

	// For now, just log the submission (sqlc will be generated on first build)
	// TODO: Save to database once sqlc is generated
	_ = name
	_ = company
	_ = email
	_ = phone
	_ = projectType
	_ = message

	return pages.Contact(true, "").Render(ctx, c.Response().Writer)
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
