package handler

import (
	"database/sql"
	"log/slog"
	"net/http"

	"rowetech/internal/database/models"
	"rowetech/internal/database/sqlc"
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
	newsletter := c.FormValue("newsletter") == "1"
	agreeToTerms := c.FormValue("agreeToTerms") == "1"

	// Validate required fields
	if name == "" || email == "" || message == "" {
		return pages.Contact(false, "Please complete the required fields.").Render(ctx, c.Response().Writer)
	}

	// Validate terms acceptance
	if !agreeToTerms {
		return pages.Contact(false, "You must agree to the Terms of Service to submit this form.").Render(ctx, c.Response().Writer)
	}

	// Convert booleans to int64 for SQLite
	newsletterInt := int64(0)
	if newsletter {
		newsletterInt = 1
	}
	termsInt := int64(1) // Always 1 since we validated above

	// Save to database
	_, err := h.db.Queries.CreateContactSubmission(ctx, sqlc.CreateContactSubmissionParams{
		Name:            name,
		Company:         sql.NullString{String: company, Valid: company != ""},
		Email:           email,
		Phone:           sql.NullString{String: phone, Valid: phone != ""},
		ProjectType:     sql.NullString{String: projectType, Valid: projectType != ""},
		Message:         message,
		NewsletterOptIn: sql.NullInt64{Int64: newsletterInt, Valid: true},
		AgreedToTerms:   sql.NullInt64{Int64: termsInt, Valid: true},
	})
	if err != nil {
		slog.Error("failed to save contact submission", "error", err)
		return pages.Contact(false, "There was an error submitting your message. Please try again.").Render(ctx, c.Response().Writer)
	}

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

func (h *Handler) Terms(c echo.Context) error {
	return pages.Terms().Render(c.Request().Context(), c.Response().Writer)
}

func (h *Handler) Privacy(c echo.Context) error {
	return pages.Privacy().Render(c.Request().Context(), c.Response().Writer)
}
