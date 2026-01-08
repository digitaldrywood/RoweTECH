// Package models provides data types for templates
// These are simplified versions of sqlc types for static rendering
package models

import "rowetech/internal/database/sqlc"

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

// FromSqlcGalleryItems converts sqlc GalleryItems to models GalleryItems
func FromSqlcGalleryItems(items []sqlc.GalleryItem) []GalleryItem {
	result := make([]GalleryItem, len(items))
	for i, item := range items {
		result[i] = GalleryItem{
			ID:          item.ID,
			Title:       item.Title,
			Category:    item.Category,
			Description: item.Description.String,
			ImageUrl:    item.ImageUrl,
			SortOrder:   item.SortOrder.Int64,
			IsFeatured:  item.IsFeatured.Int64 == 1,
		}
	}
	return result
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
