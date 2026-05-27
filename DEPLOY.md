# Deployment

This project has two deploy targets:

| Target | What it runs | Status |
|--------|--------------|--------|
| **Vercel** (`vercel.json` + `make build-static`) | A **static snapshot** exported by `cmd/build` (no server, no DB, no live admin/contact) | Current — leave in place until cutover |
| **Dokploy** (`Dockerfile`) | The **real dynamic app** (`cmd/server`) — live admin, contact form persistence, SQLite | Go-live target |

The two are independent: the `Dockerfile`/`.dockerignore` don't touch the Vercel
path, and `make build-static` / `vercel.json` are untouched.

## Dokploy setup

The app is a single static binary (Go + embedded goose migrations) serving on
`PORT` (default `3000`), with SQLite stored under `/app/data`.

1. **Create an Application** in Dokploy pointing at this Git repo, branch `main`.
2. **Build Type: Dockerfile** — Dokploy will use the repo's `Dockerfile`
   (multi-stage; `CGO_ENABLED=0`, ~28 MB final image).
3. **Add a persistent Volume** so the database survives redeploys:
   | Setting | Value |
   |---------|-------|
   | Mount Type | Volume Mount |
   | Volume Name | `rowetech-data` |
   | Mount Path | `/app/data` |
4. **Environment variables:**

   | Variable | Required | Notes |
   |----------|----------|-------|
   | `ENV` | — | Defaults to `production` (set in the Dockerfile). JSON logs. |
   | `PORT` | — | Defaults to `3000`. The app binds whatever `PORT` is set. |
   | `DATABASE_URL` | — | Defaults to `/app/data/rowetech.db` (inside the volume). |
   | `SITE_NAME` | recommended | e.g. `RoweTech Machine & Engineering` |
   | `SITE_URL` | recommended | Public URL, e.g. `https://rowetech.example.com` (used in meta tags). |
   | `CLERK_SECRET_KEY` | **yes (see warning)** | Enables admin auth. |
   | `CLERK_PUBLISHABLE_KEY` | **yes (see warning)** | Enables admin auth. |
   | `ADMIN_EMAILS` | recommended | Comma-separated admin emails allowed into `/admin`. |
   | `SMTP_HOST` / `SMTP_PORT` / `SMTP_USERNAME` / `SMTP_PASSWORD` / `SMTP_FROM` | optional | Enables contact-form notification emails. |
   | `CONTACT_NOTIFICATION_EMAILS` | optional | Where contact submissions are emailed (defaults to admin emails). |

5. **Health check path:** `/health` (returns `200 {"status":"ok"}`).
6. **Domain:** point your domain at the app; container listens on `PORT`.
7. **Deploy.** Migrations run automatically on boot (goose, embedded), so the
   volume is brought to schema on first start and after any migration changes.

> ### ⚠️ Security: configure Clerk before exposing publicly
> Admin pages (`/admin/*`) are gated by Clerk. **If `CLERK_SECRET_KEY` /
> `CLERK_PUBLISHABLE_KEY` are not set, `/admin` is unauthenticated and open to
> anyone.** Always set the Clerk keys (and `ADMIN_EMAILS`) on the Dokploy app
> before pointing a public domain at it.
>
> Note: the dev-only auth bypass (`/auth/dev/login`) is compiled **out** of the
> production image (it requires `-tags dev`), so it cannot be reached on Dokploy.

## Local container test

```bash
docker build -t rowetech:local .
docker run --rm -p 3010:3000 -v rowetech-data:/app/data rowetech:local
# then: curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3010/health
```

## Vercel (current, until cutover)

No change. Vercel runs `make build-static` (`installCommand`/`buildCommand` in
`vercel.json`), which exports the static site to `dist/`. Leave it as-is until
the Dokploy deployment is verified live, then cut the domain over.
