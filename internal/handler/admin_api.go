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

// APICreateGalleryItem creates a new gallery item
func (h *Handler) APICreateGalleryItem(c echo.Context) error {
	ctx := c.Request().Context()

	title := c.FormValue("title")
	category := c.FormValue("category")
	imageURL := c.FormValue("image_url")
	description := c.FormValue("description")
	isFeatured := c.FormValue("is_featured") == "1"

	if title == "" || category == "" || imageURL == "" {
		return c.String(http.StatusBadRequest, "Title, category, and image URL are required")
	}

	// Get max sort order
	items, _ := h.db.Queries.ListGalleryItems(ctx)
	maxSortOrder := int64(len(items))

	featuredInt := int64(0)
	if isFeatured {
		featuredInt = 1
	}

	sqlcItem, err := h.db.Queries.CreateGalleryItem(ctx, sqlc.CreateGalleryItemParams{
		Title:       title,
		Category:    category,
		Description: sql.NullString{String: description, Valid: description != ""},
		ImageUrl:    imageURL,
		SortOrder:   sql.NullInt64{Int64: maxSortOrder, Valid: true},
		IsFeatured:  sql.NullInt64{Int64: featuredInt, Valid: true},
	})
	if err != nil {
		slog.Error("failed to create gallery item", "error", err)
		return c.String(http.StatusInternalServerError, "Failed to create item")
	}

	item := models.FromSqlcGalleryItem(sqlcItem)
	return pages.GalleryItemCardPartial(item).Render(ctx, c.Response().Writer)
}

// APIUpdateGalleryItem updates a gallery item
func (h *Handler) APIUpdateGalleryItem(c echo.Context) error {
	ctx := c.Request().Context()

	idStr := c.Param("id")
	itemID, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		return c.String(http.StatusBadRequest, "Invalid ID")
	}

	title := c.FormValue("title")
	category := c.FormValue("category")
	imageURL := c.FormValue("image_url")
	description := c.FormValue("description")
	isFeatured := c.FormValue("is_featured") == "1"

	if title == "" || category == "" || imageURL == "" {
		return c.String(http.StatusBadRequest, "Title, category, and image URL are required")
	}

	// Get existing item for sort order
	existingItem, err := h.db.Queries.GetGalleryItem(ctx, itemID)
	if err != nil {
		return c.String(http.StatusNotFound, "Item not found")
	}

	featuredInt := int64(0)
	if isFeatured {
		featuredInt = 1
	}

	err = h.db.Queries.UpdateGalleryItem(ctx, sqlc.UpdateGalleryItemParams{
		Title:       title,
		Category:    category,
		Description: sql.NullString{String: description, Valid: description != ""},
		ImageUrl:    imageURL,
		SortOrder:   existingItem.SortOrder,
		IsFeatured:  sql.NullInt64{Int64: featuredInt, Valid: true},
		ID:          itemID,
	})
	if err != nil {
		slog.Error("failed to update gallery item", "error", err)
		return c.String(http.StatusInternalServerError, "Failed to update item")
	}

	// Fetch updated item
	sqlcItem, _ := h.db.Queries.GetGalleryItem(ctx, itemID)
	item := models.FromSqlcGalleryItem(sqlcItem)

	return pages.GalleryItemCardPartial(item).Render(ctx, c.Response().Writer)
}

// APIDeleteGalleryItem deletes a gallery item
func (h *Handler) APIDeleteGalleryItem(c echo.Context) error {
	ctx := c.Request().Context()

	idStr := c.Param("id")
	itemID, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		return c.String(http.StatusBadRequest, "Invalid ID")
	}

	err = h.db.Queries.DeleteGalleryItem(ctx, itemID)
	if err != nil {
		slog.Error("failed to delete gallery item", "error", err)
		return c.String(http.StatusInternalServerError, "Failed to delete item")
	}

	return c.String(http.StatusOK, "")
}

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

// APIUpdateGallerySortOrder updates a gallery item sort order
func (h *Handler) APIUpdateGallerySortOrder(c echo.Context) error {
	ctx := c.Request().Context()

	idStr := c.Param("id")
	itemID, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		return c.String(http.StatusBadRequest, "Invalid ID")
	}

	var body struct {
		SortOrder int `json:"sort_order"`
	}
	if err := c.Bind(&body); err != nil {
		return c.String(http.StatusBadRequest, "Invalid request body")
	}

	err = h.db.Queries.UpdateGallerySortOrder(ctx, sqlc.UpdateGallerySortOrderParams{
		SortOrder: sql.NullInt64{Int64: int64(body.SortOrder), Valid: true},
		ID:        itemID,
	})
	if err != nil {
		slog.Error("failed to update gallery sort order", "error", err)
		return c.String(http.StatusInternalServerError, "Failed to update sort order")
	}

	return c.JSON(http.StatusOK, map[string]string{"status": "ok"})
}

// APIUploadImage handles image file uploads for gallery items
func (h *Handler) APIUploadImage(c echo.Context) error {
	// Get the uploaded file
	file, err := c.FormFile("image")
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "No image file provided"})
	}

	// Validate file type
	ext := strings.ToLower(filepath.Ext(file.Filename))
	allowedExts := map[string]bool{".jpg": true, ".jpeg": true, ".png": true, ".gif": true, ".webp": true}
	if !allowedExts[ext] {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid file type. Allowed: jpg, jpeg, png, gif, webp"})
	}

	// Validate file size (max 10MB)
	if file.Size > 10*1024*1024 {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "File too large. Maximum size is 10MB"})
	}

	// Generate unique filename
	randomBytes := make([]byte, 16)
	if _, err := rand.Read(randomBytes); err != nil {
		slog.Error("failed to generate random filename", "error", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to process upload"})
	}
	filename := hex.EncodeToString(randomBytes) + ext

	// Ensure upload directory exists
	uploadDir := "static/uploads/gallery"
	if err := os.MkdirAll(uploadDir, 0755); err != nil {
		slog.Error("failed to create upload directory", "error", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to process upload"})
	}

	// Open the uploaded file
	src, err := file.Open()
	if err != nil {
		slog.Error("failed to open uploaded file", "error", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to process upload"})
	}
	defer func() {
		if closeErr := src.Close(); closeErr != nil {
			slog.Error("failed to close upload source", "error", closeErr)
		}
	}()

	// Create destination file
	dstPath := filepath.Join(uploadDir, filename)
	dst, err := os.Create(dstPath)
	if err != nil {
		slog.Error("failed to create destination file", "error", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to save file"})
	}
	defer func() {
		if closeErr := dst.Close(); closeErr != nil {
			slog.Error("failed to close upload destination", "error", closeErr)
		}
	}()

	// Copy the file
	if _, err := io.Copy(dst, src); err != nil {
		slog.Error("failed to copy file", "error", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to save file"})
	}

	// Return the URL path to the uploaded file
	imageURL := fmt.Sprintf("/static/uploads/gallery/%s", filename)
	return c.JSON(http.StatusOK, map[string]string{"url": imageURL})
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
	defer src.Close()

	dstPath := filepath.Join(uploadDir, filename)
	dst, err := os.Create(dstPath)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to save file"})
	}
	defer dst.Close()

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
