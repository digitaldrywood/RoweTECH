// Package models provides data types for templates
// These are simplified versions of sqlc types for static rendering
package models

// GalleryItem represents a gallery item for templates
type GalleryItem struct {
	ID          int64  `json:"id"`
	Title       string `json:"title"`
	Category    string `json:"category"`
	Description string `json:"description"`
	ImageUrl    string `json:"image_url"`
	SortOrder   int64  `json:"sort_order"`
	IsFeatured  bool   `json:"is_featured"`
}

// ContactSubmission represents a contact form submission
type ContactSubmission struct {
	ID          int64  `json:"id"`
	Name        string `json:"name"`
	Company     string `json:"company"`
	Email       string `json:"email"`
	Phone       string `json:"phone"`
	ProjectType string `json:"project_type"`
	Message     string `json:"message"`
}
