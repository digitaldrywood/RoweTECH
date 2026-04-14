-- name: ListGalleryItems :many
SELECT * FROM gallery_items ORDER BY sort_order ASC;

-- name: ListGalleryItemsByCategory :many
SELECT * FROM gallery_items WHERE category = ? ORDER BY sort_order ASC;

-- name: GetFeaturedGalleryItems :many
SELECT * FROM gallery_items WHERE is_featured = 1 ORDER BY sort_order ASC LIMIT ?;

-- name: GetGalleryItem :one
SELECT * FROM gallery_items WHERE id = ? LIMIT 1;

-- name: CreateGalleryItem :one
INSERT INTO gallery_items (title, category, description, image_url, sort_order, is_featured)
VALUES (?, ?, ?, ?, ?, ?)
RETURNING *;

-- name: UpdateGalleryItem :exec
UPDATE gallery_items
SET title = ?, category = ?, description = ?, image_url = ?, sort_order = ?, is_featured = ?, updated_at = CURRENT_TIMESTAMP
WHERE id = ?;

-- name: DeleteGalleryItem :exec
DELETE FROM gallery_items WHERE id = ?;

-- name: UpdateGallerySortOrder :exec
UPDATE gallery_items SET sort_order = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?;

-- name: GetGalleryCategories :many
SELECT DISTINCT category FROM gallery_items ORDER BY category;
