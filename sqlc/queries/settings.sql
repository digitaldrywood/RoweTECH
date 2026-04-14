-- name: GetSetting :one
SELECT value FROM site_settings WHERE key = ? LIMIT 1;

-- name: UpsertSetting :exec
INSERT INTO site_settings (key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)
ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP;

-- name: ListSettings :many
SELECT * FROM site_settings ORDER BY key;

-- name: DeleteSetting :exec
DELETE FROM site_settings WHERE key = ?;
