package handler

import (
	"log/slog"
	"net/http"
	"strconv"

	"rowetech/internal/database/models"
	"rowetech/internal/database/sqlc"
	"rowetech/internal/middleware"
	"rowetech/internal/sitecontent"
	"rowetech/templates/pages"

	"github.com/labstack/echo/v4"
)

// APIMarkContactRead marks a contact as read
func (h *Handler) APIMarkContactRead(c echo.Context) error {
	ctx := c.Request().Context()

	idStr := c.Param("id")
	contactID, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		return c.String(http.StatusBadRequest, "Invalid ID")
	}

	err = h.db.Queries.MarkContactAsRead(ctx, contactID)
	if err != nil {
		slog.Error("failed to mark contact as read", "error", err)
		return c.String(http.StatusInternalServerError, "Failed to update contact")
	}

	// Fetch updated contact
	sqlcContact, err := h.db.Queries.GetContactSubmission(ctx, contactID)
	if err != nil {
		return c.String(http.StatusNotFound, "Contact not found")
	}
	contact := models.FromSqlcContactSubmission(sqlcContact)

	return pages.ContactCardPartial(contact).Render(ctx, c.Response().Writer)
}

// APIMarkContactUnread marks a contact as unread
func (h *Handler) APIMarkContactUnread(c echo.Context) error {
	ctx := c.Request().Context()

	idStr := c.Param("id")
	contactID, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		return c.String(http.StatusBadRequest, "Invalid ID")
	}

	err = h.db.Queries.MarkContactAsUnread(ctx, contactID)
	if err != nil {
		slog.Error("failed to mark contact as unread", "error", err)
		return c.String(http.StatusInternalServerError, "Failed to update contact")
	}

	// Fetch updated contact
	sqlcContact, err := h.db.Queries.GetContactSubmission(ctx, contactID)
	if err != nil {
		return c.String(http.StatusNotFound, "Contact not found")
	}
	contact := models.FromSqlcContactSubmission(sqlcContact)

	return pages.ContactCardPartial(contact).Render(ctx, c.Response().Writer)
}

// APIDeleteContact deletes a contact submission
func (h *Handler) APIDeleteContact(c echo.Context) error {
	ctx := c.Request().Context()

	idStr := c.Param("id")
	contactID, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		return c.String(http.StatusBadRequest, "Invalid ID")
	}

	err = h.db.Queries.DeleteContactSubmission(ctx, contactID)
	if err != nil {
		slog.Error("failed to delete contact", "error", err)
		return c.String(http.StatusInternalServerError, "Failed to delete contact")
	}

	return c.String(http.StatusOK, "")
}

// APIUpdateSetting updates a site setting
func (h *Handler) APIUpdateSetting(c echo.Context) error {
	ctx := c.Request().Context()

	key := c.FormValue("key")
	value := c.FormValue("value")

	if key == "" {
		return c.String(http.StatusBadRequest, "Key is required")
	}

	err := h.db.Queries.UpsertSetting(ctx, sqlc.UpsertSettingParams{
		Key:   key,
		Value: value,
	})
	if err != nil {
		slog.Error("failed to update setting", "error", err, "key", key)
		return c.String(http.StatusInternalServerError, "Failed to update setting")
	}

	// Return the updated row partial
	if page, field, ok := sitecontent.FindField(key); ok {
		return pages.ContentFieldRowPartial(page.Slug, field, value).Render(ctx, c.Response().Writer)
	}

	return pages.SettingRowPartial(key, value).Render(ctx, c.Response().Writer)
}

// APIIsAdmin checks if the current user is an admin
func (h *Handler) APIIsAdmin(c echo.Context) error {
	ctx := c.Request().Context()

	// If Clerk is not configured, no one is admin
	if !h.cfg.HasClerk() {
		return c.JSON(http.StatusOK, map[string]bool{"isAdmin": false})
	}

	// Get session token
	token, ok := middleware.SessionToken(c)
	if !ok {
		return c.JSON(http.StatusOK, map[string]bool{"isAdmin": false})
	}

	// Verify token
	claims, err := middleware.VerifyClerkSessionToken(ctx, h.cfg, token)
	if err != nil {
		return c.JSON(http.StatusOK, map[string]bool{"isAdmin": false})
	}

	// Fetch user email
	userEmail, err := middleware.FetchClerkUserEmail(ctx, h.cfg.ClerkSecretKey, claims.Subject)
	if err != nil {
		slog.Error("failed to fetch clerk user email", "error", err)
		return c.JSON(http.StatusOK, map[string]bool{"isAdmin": false})
	}

	// Check if user is admin
	isAdmin := h.cfg.IsAdminEmail(userEmail)
	return c.JSON(http.StatusOK, map[string]bool{"isAdmin": isAdmin})
}
