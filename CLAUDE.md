# RoweTech Machine & Engineering

A Go web application for RoweTech Machine & Engineering, built with Go + Echo + Templ + HTMX + Tailwind CSS + SQLite.

## Critical Build Error

**ALWAYS** check `./tmp/air-combined.log` after making code changes. This log contains:
- Compilation errors
- Template generation errors
- SQL generation errors

Never assume code changes succeeded without checking this log.

## Development Workflow

`make dev` is always running during development. It automatically:
1. Kills existing process on port
2. Regenerates Templ templates (`go tool templ generate`)
3. Regenerates sqlc queries (`go tool sqlc generate`)
4. Runs go mod tidy
5. Rebuilds (with `-tags dev`) and restarts server

**You do NOT need to manually run:** `templ generate`, `sqlc generate`, `go build`, or `air`.

### Tooling is pinned via `go tool`

`templ`, `sqlc`, and `goose` are pinned in `go.mod` via the `tool` directive and
invoked everywhere as `go tool templ` / `go tool sqlc` / `go tool goose`. This
guarantees the generator version always matches the runtime version — do **not**
rely on globally-installed `templ`/`sqlc`/`goose` binaries (version drift there
caused real build failures, e.g. `undefined: templ.ResolveAttributeValue`). To
bump templ safely, run `make templ-update` (bumps runtime + tool pin together).

### Migrations run automatically on startup

`internal/database.New` applies all pending goose migrations from the embedded
`migrations` package (`migrations/embed.go`) on every boot. A fresh or
out-of-date DB is brought to schema automatically — you do **not** need to run
`make migrate` by hand for the dev server. `make migrate` still exists for
manual/CLI use.

### Port fallback

If the configured `PORT` is in use, the server binds the next free port (see
`internal/portutil`) and logs `configured port in use, using next free port`.
It also logs clickable `access URL` lines at startup (localhost + the Tailscale
host from `TAILSCALE_HOSTNAME`, if set).

## Dev-Only Auth Bypass (for testing admin/dashboard pages)

Admin pages (`/admin/*`) are normally gated by Clerk. To test them locally
without Clerk, `make dev` builds with `-tags dev` (see `.air.toml`), which
compiles in two **loopback-only** routes:

- `GET /auth/dev/login[?email=<addr>][&return_to=/path]` — sets the `dev_admin`
  session cookie (impersonating `email`, defaulting to the first
  `ADMIN_EMAILS`/`ADMIN_EMAIL` entry) and redirects to `return_to` (default
  `/admin`). `RequireAdminAccess` honors this cookie and skips Clerk.
- `POST /auth/dev/logout` — clears the cookie.

**How to use it (curl):**

```bash
# Is the dev tag live? 302 = yes, 404 = air built without -tags dev (restart make dev)
curl -s -o /dev/null -w "%{http_code}\n" "http://localhost:3000/auth/dev/login"

# Log in as admin, then hit an admin page with the saved cookie:
JAR=/tmp/rowetech.jar
curl -sc $JAR -o /dev/null "http://localhost:3000/auth/dev/login?return_to=/admin"
curl -s -b $JAR -o /dev/null -w "%{http_code}\n" "http://localhost:3000/admin"   # 200
```

In a browser, just visit `http://localhost:3000/auth/dev/login` — it sets the
cookie and redirects you into `/admin`.

**Safety (why this can never run in production):**
- `//go:build dev` — `internal/middleware/auth_dev.go` is compiled out of
  production binaries entirely; `auth_dev_stub.go` (`//go:build !dev`) provides
  no-op `RegisterDevAuthRoutes` / `DevAuthEnabled()=false` / `devAdminBypass`.
- `make build` and `make build-static` (production) **omit** `-tags dev`.
- Loopback-only: both the raw TCP peer (`RemoteAddr`, not `RealIP`) and the
  `Host` header must be loopback, or the request gets 403. Defeats
  `X-Forwarded-For` spoofing and reverse-proxy bypass.
- `init()` in `auth_dev.go` fatals if `ENV`/`ENVIRONMENT=production`.
- `internal/middleware/auth_dev_prod_test.go` (`//go:build !dev`) asserts no
  `/auth/dev/*` routes exist in a production build. Run dev-tagged tests with
  `make test-dev`.

**Gotcha:** Air does not reload `.air.toml` on its own. If the dev login route
returns 404, the running `air` was built without `-tags dev` — restart `make dev`.

## Environment Setup

All configuration via `.envrc` (copy from `.envrc.example`):

```bash
export DATABASE_URL="./data/rowetech.db"
export PORT="3000"
export ENV="development"
export LOG_LEVEL="DEBUG"
export SITE_NAME="RoweTech Machine & Engineering"
export SITE_URL="http://localhost:3000"
export TAILSCALE_HOSTNAME="your-machine.tailnet.ts.net"  # optional; logged as a clickable startup URL
export CLERK_SECRET_KEY="sk_test_..."
export CLERK_PUBLISHABLE_KEY="pk_test_..."
```

## Key Commands

| Command | Description |
|---------|-------------|
| `make dev` | Start with hot reload, built with `-tags dev` (main workflow) |
| `make build` | Build production binary (no dev tag) |
| `make test` | Run tests with race detection |
| `make test-dev` | Run tests including `-tags dev` (auth bypass) |
| `make lint` | Run linters |
| `make generate` | Generate templ and sqlc code (via `go tool`) |
| `make css` | Build Tailwind CSS |
| `make css-watch` | Watch Tailwind (separate terminal) |
| `make migrate` | Run database migrations manually (also auto-run on startup) |
| `make templ-update` | Bump templ runtime + tool pin together |
| `make setup` | Install dev tools (air, golangci-lint; templ/sqlc/goose come via `go tool`) |

## Project Structure

```
rowetech/
├── cmd/server/         # Entry point (main.go, slog.go)
├── internal/
│   ├── config/         # Environment configuration
│   ├── ctxkeys/        # Context key types
│   ├── database/       # SQLite + sqlc generated code
│   ├── handler/        # Echo HTTP handlers
│   ├── meta/           # SEO/meta tag helpers
│   └── middleware/     # Echo middleware
├── templates/
│   ├── layouts/        # Base layout, header, footer
│   └── pages/          # Page templates
├── static/
│   ├── css/            # Tailwind input/output
│   ├── js/             # Client-side JavaScript
│   └── images/         # Static images
├── migrations/         # goose SQL migrations
├── sqlc/               # sqlc configuration and queries
├── data/               # SQLite database file
├── Makefile            # Build commands
├── .air.toml           # Hot reload config
└── go.mod              # Go dependencies
```

## Code Patterns

### Logging
Always use `slog`:
```go
slog.Info("message", "key", value)
slog.Error("failed to...", "error", err)
```

Never use `fmt.Printf` or `log.Printf`.

### Error Handling
Wrap errors with context:
```go
if err != nil {
    return fmt.Errorf("failed to load gallery: %w", err)
}
```

### Database Queries
Use sqlc-generated queries:
```go
items, err := h.db.Queries.ListGalleryItems(ctx)
```

### Templates (Templ)
Templates own their meta tags:
```templ
templ Home() {
    @layouts.Base(meta.New("Home", "Description")) {
        // page content
    }
}
```

### HTMX Patterns
Use `hx-*` attributes for dynamic updates:
```html
<div hx-get="/api/gallery" hx-trigger="load" hx-swap="innerHTML">
    Loading...
</div>
```

## Tech Stack

- **Backend**: Go 1.22+ with Echo v4
- **Templates**: Templ (type-safe, compiled)
- **Interactivity**: HTMX 2.0
- **Styling**: Tailwind CSS v4
- **Database**: SQLite with goose migrations + sqlc
- **Auth**: Clerk (optional)
- **Hot Reload**: Air

## First Time Setup

1. Install Go 1.22+
2. Install Node.js (for Tailwind)
3. Run `make setup` to install tools
4. Copy `.envrc.example` to `.envrc` and configure
5. Run `direnv allow` (or source .envrc)
6. Run `make dev` — the database is migrated automatically on startup

## Adding a New Page

1. Create handler in `internal/handler/`
2. Register route in `internal/handler/handler.go`
3. Create template in `templates/pages/`
4. Air will auto-rebuild

## Adding a Database Table

1. Create migration: `make migrate-create NAME=create_tablename`
2. Edit migration file in `migrations/`
3. Add queries in `sqlc/queries/`
4. Restart `make dev` — pending migrations apply automatically on startup
   (embedded via `migrations/embed.go`). `make migrate` is only for manual/CLI use.
5. sqlc will regenerate on next build
