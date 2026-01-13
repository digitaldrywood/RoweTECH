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

	// Auth pages (if Clerk is configured)
	e.GET("/sign-in", h.SignIn)
	e.GET("/sign-up", h.SignUp)
	e.GET("/unauthorized", h.Unauthorized)

	// Admin routes
	admin := e.Group("/admin")
	if h.cfg.HasClerk() {
		admin.Use(middleware.RequireClerkSession())
	}
	admin.GET("", h.AdminDashboard)
	admin.GET("/gallery", h.AdminGallery)
	admin.GET("/content", h.AdminContent)
	admin.GET("/settings", h.AdminSettings)

	// API routes
	api := e.Group("/api")
	api.POST("/contact", h.APIContactSubmit)
	api.GET("/gallery", h.APIListGallery)
}
