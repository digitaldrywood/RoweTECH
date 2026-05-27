# Agent Guide — RoweTech Machine & Engineering

This file is for AI coding agents (Claude Code, Codex, etc.). The full project
guide is **[CLAUDE.md](./CLAUDE.md)** — read it. This file highlights the rules
that most often trip agents up.

## Build / dev loop

- `make dev` is usually already running (hot reload via Air). It builds with
  `-tags dev`, regenerates templ + sqlc, runs `go mod tidy`, and restarts.
- **After any change, check `./tmp/air-combined.log`** for compile / templ / sqlc
  errors. Never assume a change built.
- Do **not** manually run `templ generate`, `sqlc generate`, `go build`, or `air`.

## Tooling is pinned via `go tool` (do not reintroduce global installs)

`templ`, `sqlc`, and `goose` are pinned in `go.mod` via the `tool` directive and
invoked as `go tool templ` / `go tool sqlc` / `go tool goose`. This keeps the
generator version in lockstep with the runtime — relying on globally-installed
binaries caused build failures like `undefined: templ.ResolveAttributeValue`.
Bump templ with `make templ-update`.

## Database migrations run on startup

`internal/database.New` applies all pending goose migrations from the embedded
`migrations` package on boot. A fresh DB is migrated automatically; you don't
need `make migrate`. After adding a migration, just restart `make dev`.

## Testing admin / dashboard pages — Dev Auth Bypass

Admin pages (`/admin/*`) are Clerk-gated, but the `-tags dev` build (used by
`make dev`) compiles in a **loopback-only** bypass so you can test them:

```bash
# 302 = dev tag live; 404 = restart `make dev` (air didn't rebuild with -tags dev)
curl -s -o /dev/null -w "%{http_code}\n" "http://localhost:3000/auth/dev/login"

# Log in as admin and exercise an admin page:
JAR=/tmp/rowetech.jar
curl -sc "$JAR" -o /dev/null "http://localhost:3000/auth/dev/login?return_to=/admin"
curl -s -b "$JAR" -o /dev/null -w "%{http_code}\n" "http://localhost:3000/admin"   # 200
```

In a browser (or Chrome DevTools MCP), navigate to
`http://localhost:3000/auth/dev/login?return_to=/admin` to land authenticated in
the admin panel. Optional `?email=<addr>` impersonates a specific admin.

**Never weaken these safety properties** when editing the bypass:
- It lives behind `//go:build dev` (`internal/middleware/auth_dev.go`); the
  `//go:build !dev` stub keeps it out of production binaries.
- Production builds (`make build`, `make build-static`) omit `-tags dev`.
- It is loopback-only (checks both `RemoteAddr` and `Host`) and `init()` fatals
  under `ENV=production`.
- `make test-dev` runs the `-tags dev` tests; `auth_dev_prod_test.go` asserts the
  routes are absent from production builds. Keep both green.

## Conventions

- Logging: `slog` only (never `fmt.Printf` / `log.Printf`).
- Errors: wrap with context — `fmt.Errorf("...: %w", err)`.
- DB access: sqlc-generated queries (`h.db.Queries.*`).
- Templates own their meta tags via `meta.New(...)`.
