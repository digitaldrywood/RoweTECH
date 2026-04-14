package handler

import (
	"log/slog"
	"net/http"
	"strconv"

	"rowetech/internal/clerk"
	"rowetech/internal/database/models"
	"rowetech/internal/database/sqlc"
	"rowetech/templates/layouts"
	"rowetech/templates/pages"

	"github.com/labstack/echo/v4"
)

// getAdminStats fetches statistics for the admin dashboard
func (h *Handler) getAdminStats(ctx echo.Context) layouts.AdminStats {
	stats := layouts.AdminStats{}
	c := ctx.Request().Context()

	// Count gallery items
	items, err := h.db.Queries.ListGalleryItems(c)
	if err == nil {
		stats.GalleryCount = int64(len(items))
	}

	// Count unread contacts
	unread, err := h.db.Queries.CountUnreadContacts(c)
	if err == nil {
		stats.UnreadContacts = unread
	}

	// Count page images
	images, err := h.db.Queries.ListAllPageImages(c)
	if err == nil {
		stats.PageImages = int64(len(images))
	}

	return stats
}

// AdminDashboard renders the admin dashboard
func (h *Handler) AdminDashboard(c echo.Context) error {
	stats := h.getAdminStats(c)
	return pages.AdminDashboard(stats).Render(c.Request().Context(), c.Response().Writer)
}

// AdminSettings renders the admin settings page
func (h *Handler) AdminSettings(c echo.Context) error {
	ctx := c.Request().Context()
	stats := h.getAdminStats(c)

	settings, err := h.db.Queries.ListSettings(ctx)
	if err != nil {
		slog.Error("failed to list settings", "error", err)
	}

	// Build settings map with defaults
	settingsMap := map[string]string{
		"company_name":    "RoweTech Machine & Engineering",
		"company_phone":   "",
		"company_email":   "",
		"company_address": "",
		"tagline":         "",
		"business_hours":  "",
	}
	for _, s := range settings {
		settingsMap[s.Key] = s.Value
	}

	return pages.AdminSettings(settingsMap, stats).Render(ctx, c.Response().Writer)
}

// AdminGallery renders the gallery management page
func (h *Handler) AdminGallery(c echo.Context) error {
	ctx := c.Request().Context()
	stats := h.getAdminStats(c)

	// Get gallery items
	sqlcItems, err := h.db.Queries.ListGalleryItems(ctx)
	if err != nil {
		slog.Error("failed to list gallery items", "error", err)
		sqlcItems = nil
	}
	items := models.FromSqlcGalleryItems(sqlcItems)

	// Get categories
	sqlcCategories, err := h.db.Queries.GetGalleryCategories(ctx)
	if err != nil {
		slog.Error("failed to get gallery categories", "error", err)
		sqlcCategories = nil
	}

	// Filter by category if specified
	category := c.QueryParam("category")
	if category != "" {
		sqlcItems, _ = h.db.Queries.ListGalleryItemsByCategory(ctx, category)
		items = models.FromSqlcGalleryItems(sqlcItems)
	}

	return pages.AdminGallery(items, sqlcCategories, stats).Render(ctx, c.Response().Writer)
}

// AdminContacts renders the contacts management page
func (h *Handler) AdminContacts(c echo.Context) error {
	ctx := c.Request().Context()
	stats := h.getAdminStats(c)

	filter := c.QueryParam("filter")

	// Get contacts (limit 100)
	sqlcContacts, err := h.db.Queries.ListContactSubmissions(ctx, sqlc.ListContactSubmissionsParams{
		Limit:  100,
		Offset: 0,
	})
	if err != nil {
		slog.Error("failed to list contacts", "error", err)
		sqlcContacts = nil
	}
	contacts := models.FromSqlcContactSubmissions(sqlcContacts)

	// Apply filter
	switch filter {
	case "unread":
		filtered := make([]models.ContactSubmission, 0)
		for _, contact := range contacts {
			if !contact.IsRead {
				filtered = append(filtered, contact)
			}
		}
		contacts = filtered
	case "read":
		filtered := make([]models.ContactSubmission, 0)
		for _, contact := range contacts {
			if contact.IsRead {
				filtered = append(filtered, contact)
			}
		}
		contacts = filtered
	}

	return pages.AdminContacts(contacts, stats, filter).Render(ctx, c.Response().Writer)
}

// AdminUsers renders the users management page
func (h *Handler) AdminUsers(c echo.Context) error {
	ctx := c.Request().Context()
	stats := h.getAdminStats(c)

	clerkEnabled := h.cfg.HasClerk()
	var users []clerk.User
	var totalCount int

	if clerkEnabled {
		client := clerk.NewClient(h.cfg.ClerkSecretKey)
		var err error
		users, totalCount, err = client.ListUsers(50, 0)
		if err != nil {
			slog.Error("failed to list users from Clerk", "error", err)
			users = nil
			totalCount = 0
		}
	}

	return pages.AdminUsers(users, totalCount, stats, clerkEnabled).Render(ctx, c.Response().Writer)
}

// AdminImages renders the page images management page
func (h *Handler) AdminImages(c echo.Context) error {
	ctx := c.Request().Context()
	stats := h.getAdminStats(c)

	// Get all page images grouped by page
	sqlcImages, err := h.db.Queries.ListAllPageImages(ctx)
	if err != nil {
		slog.Error("failed to list page images", "error", err)
		sqlcImages = nil
	}

	// Group images by page name
	imagesByPage := make(map[string][]models.PageImage)
	pageOrder := []string{} // Track order of pages

	for _, img := range sqlcImages {
		pageImg := models.PageImage{
			ID:        img.ID,
			PageName:  img.PageName,
			ImageKey:  img.ImageKey,
			ImageUrl:  img.ImageUrl,
			Label:     img.Label,
			AltText:   img.AltText,
			SortOrder: img.SortOrder.Int64,
		}

		if _, exists := imagesByPage[img.PageName]; !exists {
			pageOrder = append(pageOrder, img.PageName)
		}
		imagesByPage[img.PageName] = append(imagesByPage[img.PageName], pageImg)
	}

	return pages.AdminImages(imagesByPage, pageOrder, stats).Render(ctx, c.Response().Writer)
}

// APIGetGalleryEditForm returns the edit form for a gallery item
func (h *Handler) APIGetGalleryEditForm(c echo.Context) error {
	ctx := c.Request().Context()
	idStr := c.Param("id")

	itemID, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		return c.String(http.StatusBadRequest, "Invalid ID")
	}

	sqlcItem, err := h.db.Queries.GetGalleryItem(ctx, itemID)
	if err != nil {
		return c.String(http.StatusNotFound, "Item not found")
	}
	item := models.FromSqlcGalleryItem(sqlcItem)

	// Get categories for the dropdown
	categories, _ := h.db.Queries.GetGalleryCategories(ctx)

	slog.Debug("loading edit form", "id", idStr, "item", item.Title)

	return pages.GalleryEditForm(item, categories).Render(ctx, c.Response().Writer)
}
