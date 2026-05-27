package handler

import (
	"database/sql"
	"log/slog"

	"rowetech/internal/database/sqlc"
	"rowetech/internal/notify"
	"rowetech/templates/pages"

	"github.com/labstack/echo/v4"
)

// APIContactSubmit handles public contact form submissions. The form posts here
// (everything goes through /api routes) and we re-render the contact page with a
// success or error message.
func (h *Handler) APIContactSubmit(c echo.Context) error {
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
		return pages.Contact(h.getPageContent(ctx), false, "Please complete the required fields.").Render(ctx, c.Response().Writer)
	}

	// Validate terms acceptance
	if !agreeToTerms {
		return pages.Contact(h.getPageContent(ctx), false, "You must agree to the Terms of Service to submit this form.").Render(ctx, c.Response().Writer)
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
		return pages.Contact(h.getPageContent(ctx), false, "There was an error submitting your message. Please try again.").Render(ctx, c.Response().Writer)
	}

	if h.mailer != nil && h.mailer.Enabled() {
		if err := h.mailer.SendContactNotification(ctx, notify.ContactNotification{
			Name:          name,
			Company:       company,
			Email:         email,
			Phone:         phone,
			ProjectType:   projectType,
			Message:       message,
			NewsletterOpt: newsletter,
			SiteURL:       h.cfg.Site.URL,
		}); err != nil {
			slog.Error("failed to send contact notification email", "error", err, "email", email)
		}
	}

	return pages.Contact(h.getPageContent(ctx), true, "").Render(ctx, c.Response().Writer)
}
