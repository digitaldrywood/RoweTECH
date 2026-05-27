package handler

import (
	"net/http"

	"rowetech/internal/config"
	"rowetech/internal/database"
	"rowetech/internal/middleware"
	"rowetech/internal/notify"

	"github.com/labstack/echo/v4"
)

type Handler struct {
	cfg    *config.Config
	db     *database.DB
	mailer *notify.Mailer
}

func New(cfg *config.Config, db *database.DB) *Handler {
	return &Handler{
		cfg:    cfg,
		db:     db,
		mailer: notify.NewMailer(cfg),
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
	e.GET("/contact", h.Contact)
	e.GET("/terms", h.Terms)
	e.GET("/privacy", h.Privacy)

	// Auth pages (if Clerk is configured)
	e.GET("/sign-in", h.SignIn)
	e.GET("/sign-up", h.SignUp)
	e.GET("/unauthorized", h.Unauthorized)
	e.GET("/admin/images", func(c echo.Context) error {
		return c.Redirect(http.StatusFound, "/admin")
	})

	// Dev-only auth bypass (loopback-only; compiled out of production builds).
	middleware.RegisterDevAuthRoutes(e, h.cfg)

	// Admin routes
	admin := e.Group("/admin")
	if h.cfg.HasClerk() || middleware.DevAuthEnabled() {
		admin.Use(middleware.RequireAdminAccess(h.cfg))
	}
	admin.GET("", h.AdminDashboard)
	admin.GET("/content", h.AdminContent)
	admin.GET("/contacts", h.AdminContacts)
	admin.GET("/users", h.AdminUsers)
	admin.GET("/settings", h.AdminSettings)

	// Admin API routes
	admin.POST("/api/contacts/:id/read", h.APIMarkContactRead)
	admin.POST("/api/contacts/:id/unread", h.APIMarkContactUnread)
	admin.DELETE("/api/contacts/:id", h.APIDeleteContact)
	admin.PUT("/api/images/:id/url", h.APIUpdateImageURL)
	admin.PUT("/api/images/:id/alt", h.APIUpdateImageAlt)
	admin.PUT("/api/images/:id/sort", h.APIUpdateImageSortOrder)
	admin.POST("/api/upload/page-image/:id", h.APIUploadPageImage)
	admin.POST("/api/settings", h.APIUpdateSetting)

	// Public API routes
	api := e.Group("/api")
	api.POST("/contact", h.APIContactSubmit)
	api.GET("/is-admin", h.APIIsAdmin)
}
