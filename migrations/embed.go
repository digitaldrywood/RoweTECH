// Package migrations holds the goose SQL migrations and exposes them as an
// embedded filesystem so they can be applied automatically on server startup
// (see internal/database.New) as well as via the goose CLI (`make migrate`).
package migrations

import "embed"

//go:embed *.sql
var FS embed.FS
