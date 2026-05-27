package handler

import (
	"crypto/rand"
	"database/sql"
	"encoding/hex"
	"fmt"
	"io"
	"log/slog"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"strings"

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

// APIUpdateImageURL updates a page image URL
func (h *Handler) APIUpdateImageURL(c echo.Context) error {
	ctx := c.Request().Context()

	idStr := c.Param("id")
	imageID, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		return c.String(http.StatusBadRequest, "Invalid ID")
	}

	var body struct {
		URL string `json:"url"`
	}
	if err := c.Bind(&body); err != nil {
		return c.String(http.StatusBadRequest, "Invalid request body")
	}

	err = h.db.Queries.UpdatePageImageURL(ctx, sqlc.UpdatePageImageURLParams{
		ImageUrl: body.URL,
		ID:       imageID,
	})
	if err != nil {
		slog.Error("failed to update image URL", "error", err)
		return c.String(http.StatusInternalServerError, "Failed to update image")
	}

	return c.JSON(http.StatusOK, map[string]string{"status": "ok"})
}

// APIUpdateImageAlt updates a page image alt text
func (h *Handler) APIUpdateImageAlt(c echo.Context) error {
	ctx := c.Request().Context()

	idStr := c.Param("id")
	imageID, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		return c.String(http.StatusBadRequest, "Invalid ID")
	}

	var body struct {
		AltText string `json:"alt_text"`
	}
	if err := c.Bind(&body); err != nil {
		return c.String(http.StatusBadRequest, "Invalid request body")
	}

	err = h.db.Queries.UpdatePageImageAlt(ctx, sqlc.UpdatePageImageAltParams{
		AltText: body.AltText,
		ID:      imageID,
	})
	if err != nil {
		slog.Error("failed to update image alt text", "error", err)
		return c.String(http.StatusInternalServerError, "Failed to update image")
	}

	return c.JSON(http.StatusOK, map[string]string{"status": "ok"})
}

// APIUpdateImageSortOrder updates a page image sort order
func (h *Handler) APIUpdateImageSortOrder(c echo.Context) error {
	ctx := c.Request().Context()

	idStr := c.Param("id")
	imageID, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		return c.String(http.StatusBadRequest, "Invalid ID")
	}

	var body struct {
		SortOrder int `json:"sort_order"`
	}
	if err := c.Bind(&body); err != nil {
		return c.String(http.StatusBadRequest, "Invalid request body")
	}

	err = h.db.Queries.UpdatePageImageSortOrder(ctx, sqlc.UpdatePageImageSortOrderParams{
		SortOrder: sql.NullInt64{Int64: int64(body.SortOrder), Valid: true},
		ID:        imageID,
	})
	if err != nil {
		slog.Error("failed to update image sort order", "error", err)
		return c.String(http.StatusInternalServerError, "Failed to update image")
	}

	return c.JSON(http.StatusOK, map[string]string{"status": "ok"})
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

// APIUploadPageImage handles image upload for page images
func (h *Handler) APIUploadPageImage(c echo.Context) error {
	ctx := c.Request().Context()

	idStr := c.Param("id")
	imageID, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid ID"})
	}

	file, err := c.FormFile("image")
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "No image file provided"})
	}

	// Validate file type
	ext := strings.ToLower(filepath.Ext(file.Filename))
	allowedExts := map[string]bool{".jpg": true, ".jpeg": true, ".png": true, ".gif": true, ".webp": true}
	if !allowedExts[ext] {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid file type"})
	}

	if file.Size > 10*1024*1024 {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "File too large (max 10MB)"})
	}

	// Generate unique filename
	randomBytes := make([]byte, 16)
	if _, err := rand.Read(randomBytes); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to process upload"})
	}
	filename := hex.EncodeToString(randomBytes) + ext

	uploadDir := "static/uploads/pages"
	if err := os.MkdirAll(uploadDir, 0755); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to process upload"})
	}

	src, err := file.Open()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to process upload"})
	}
	defer func() { _ = src.Close() }()

	dstPath := filepath.Join(uploadDir, filename)
	dst, err := os.Create(dstPath)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to save file"})
	}
	defer func() { _ = dst.Close() }()

	if _, err := io.Copy(dst, src); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to save file"})
	}

	imageURL := fmt.Sprintf("/static/uploads/pages/%s", filename)

	// Update the page image record
	err = h.db.Queries.UpdatePageImageUpload(ctx, sqlc.UpdatePageImageUploadParams{
		ImageUrl: imageURL,
		ID:       imageID,
	})
	if err != nil {
		slog.Error("failed to update page image", "error", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to update image record"})
	}

	return c.JSON(http.StatusOK, map[string]string{"url": imageURL})
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
