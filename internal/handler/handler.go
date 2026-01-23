package handler

import (
	"rowetech/internal/config"
	"rowetech/internal/database"
	"rowetech/internal/middleware"

	"github.com/labstack/echo/v4"
)

type Handler struct {
	cfg *config.Config
	db  *database.DB
}

func New(cfg *config.Config, db *database.DB) *Handler {
	return &Handler{
		cfg: cfg,
		db:  db,
	}
}

func (h *Handler) RegisterRoutes(e *echo.Echo) {
	// Static files
	e.Static("/static", "static")

	// Health check
	e.GET("/health", h.Health)

	// Public pages
	e.GET("/", h.Home)
	e.GET("/about", h.About)
	e.GET("/services", h.Services)
	e.GET("/capabilities", h.Capabilities)
	e.GET("/gallery", h.Gallery)
	e.GET("/contact", h.Contact)
	e.POST("/contact", h.ContactSubmit)
	e.GET("/terms", h.Terms)
	e.GET("/privacy", h.Privacy)

	// Auth pages (if Clerk is configured)
	e.GET("/sign-in", h.SignIn)
	e.GET("/sign-up", h.SignUp)
	e.GET("/unauthorized", h.Unauthorized)

	// Admin routes
	admin := e.Group("/admin")
	if h.cfg.HasClerk() {
		admin.Use(middleware.RequireAdminAccess(h.cfg))
	}
	admin.GET("", h.AdminDashboard)
	admin.GET("/gallery", h.AdminGallery)
	admin.GET("/contacts", h.AdminContacts)
	admin.GET("/users", h.AdminUsers)
	admin.GET("/images", h.AdminImages)
	admin.GET("/settings", h.AdminSettings)

	// Admin API routes
	admin.GET("/api/gallery/:id/edit", h.APIGetGalleryEditForm)
	admin.POST("/api/gallery", h.APICreateGalleryItem)
	admin.PUT("/api/gallery/:id", h.APIUpdateGalleryItem)
	admin.DELETE("/api/gallery/:id", h.APIDeleteGalleryItem)
	admin.PUT("/api/gallery/:id/sort", h.APIUpdateGallerySortOrder)
	admin.POST("/api/contacts/:id/read", h.APIMarkContactRead)
	admin.POST("/api/contacts/:id/unread", h.APIMarkContactUnread)
	admin.DELETE("/api/contacts/:id", h.APIDeleteContact)
	admin.PUT("/api/images/:id/url", h.APIUpdateImageURL)
	admin.PUT("/api/images/:id/alt", h.APIUpdateImageAlt)
	admin.PUT("/api/images/:id/sort", h.APIUpdateImageSortOrder)
	admin.POST("/api/upload/image", h.APIUploadImage)

	// Public API routes
	api := e.Group("/api")
	api.POST("/contact", h.APIContactSubmit)
	api.GET("/gallery", h.APIListGallery)
	api.GET("/is-admin", h.APIIsAdmin)
}
