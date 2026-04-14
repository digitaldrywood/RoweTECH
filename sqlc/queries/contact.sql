-- name: CreateContactSubmission :one
INSERT INTO contact_submissions (name, company, email, phone, project_type, message, newsletter_opt_in, agreed_to_terms)
VALUES (?, ?, ?, ?, ?, ?, ?, ?)
RETURNING *;

-- name: ListContactSubmissions :many
SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT ? OFFSET ?;

-- name: GetContactSubmission :one
SELECT * FROM contact_submissions WHERE id = ? LIMIT 1;

-- name: MarkContactAsRead :exec
UPDATE contact_submissions SET is_read = 1 WHERE id = ?;

-- name: DeleteContactSubmission :exec
DELETE FROM contact_submissions WHERE id = ?;

-- name: MarkContactAsUnread :exec
UPDATE contact_submissions SET is_read = 0 WHERE id = ?;

-- name: CountUnreadContacts :one
SELECT COUNT(*) FROM contact_submissions WHERE is_read = 0;
