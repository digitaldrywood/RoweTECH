// Package models provides data types for templates
// These are simplified versions of sqlc types for static rendering
package models

import "rowetech/internal/database/sqlc"

// ContactSubmission represents a contact form submission
type ContactSubmission struct {
	ID            int64  `json:"id"`
	Name          string `json:"name"`
	Company       string `json:"company"`
	Email         string `json:"email"`
	Phone         string `json:"phone"`
	ProjectType   string `json:"project_type"`
	Message       string `json:"message"`
	IsRead        bool   `json:"is_read"`
	NewsletterOpt bool   `json:"newsletter_opt_in"`
	AgreedToTerms bool   `json:"agreed_to_terms"`
	CreatedAt     string `json:"created_at"`
}

// FromSqlcContactSubmissions converts sqlc ContactSubmissions to models ContactSubmissions
func FromSqlcContactSubmissions(items []sqlc.ContactSubmission) []ContactSubmission {
	result := make([]ContactSubmission, len(items))
	for i, item := range items {
		createdAt := ""
		if item.CreatedAt.Valid {
			createdAt = item.CreatedAt.Time.Format("Jan 2, 2006 3:04 PM")
		}
		result[i] = ContactSubmission{
			ID:            item.ID,
			Name:          item.Name,
			Company:       item.Company.String,
			Email:         item.Email,
			Phone:         item.Phone.String,
			ProjectType:   item.ProjectType.String,
			Message:       item.Message,
			IsRead:        item.IsRead.Int64 == 1,
			NewsletterOpt: item.NewsletterOptIn.Int64 == 1,
			AgreedToTerms: item.AgreedToTerms.Int64 == 1,
			CreatedAt:     createdAt,
		}
	}
	return result
}

// FromSqlcContactSubmission converts a single sqlc ContactSubmission to models ContactSubmission
func FromSqlcContactSubmission(item sqlc.ContactSubmission) ContactSubmission {
	createdAt := ""
	if item.CreatedAt.Valid {
		createdAt = item.CreatedAt.Time.Format("Jan 2, 2006 3:04 PM")
	}
	return ContactSubmission{
		ID:            item.ID,
		Name:          item.Name,
		Company:       item.Company.String,
		Email:         item.Email,
		Phone:         item.Phone.String,
		ProjectType:   item.ProjectType.String,
		Message:       item.Message,
		IsRead:        item.IsRead.Int64 == 1,
		NewsletterOpt: item.NewsletterOptIn.Int64 == 1,
		AgreedToTerms: item.AgreedToTerms.Int64 == 1,
		CreatedAt:     createdAt,
	}
}
