# Vercel Production Deployment — aredirlabs.com

Checklist for deploying the Aredir Labs site and workspace to Vercel with Neon production database.

## Prerequisites

- GitHub repository access
- Vercel account with project permissions
- Neon `aredirlabs-prod` database created
- Domain `aredirlabs.com` available for DNS configuration

---

## 1. Vercel project setup

1. Import the GitHub repository in [Vercel](https://vercel.com/new)
2. Framework preset: **Next.js**
3. Root directory: repository root
4. Build command: `npm run build` (default)
5. Output directory: default (Next.js)
6. Install command: `npm install` (default)
7. Node.js version: LTS (match local development)

Connect the `main` branch for production deployments.

---

## 2. GitHub repo connection

- Enable automatic deployments on push to `main`
- Require pull request previews for feature branches (recommended)
- Ensure CI checks (`lint`, `build`) pass before merge

---

## 3. Environment variables (Production)

Set in Vercel → Project → Settings → Environment Variables → **Production**:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | Neon `aredirlabs-prod` connection string |
| `BETTER_AUTH_SECRET` | Random string ≥32 characters (unique to production) |
| `BETTER_AUTH_URL` | `https://aredirlabs.com` |
| `NEXT_PUBLIC_SITE_URL` | `https://aredirlabs.com` |
| `WORKSPACE_ALLOWED_EMAILS` | Comma-separated approved workspace emails |

Do **not** use development secrets or the `aredirlabs-dev` database URL in Production.
Do **not** expose `WORKSPACE_ALLOWED_EMAILS` with a `NEXT_PUBLIC_` prefix.

Optional: configure Preview environment with a separate database or dev instance if preview workspace testing is required.

---

## 4. Production database setup (one-time)

Apply schema and seed data to `aredirlabs-prod` before or immediately after first production deploy.

### Local `.env.production.local` (gitignored)

1. Copy `.env.example` to `.env.production.local`
2. Set `DATABASE_URL` to the **aredirlabs-prod** Neon connection string
3. Set `BETTER_AUTH_URL` and `NEXT_PUBLIC_SITE_URL` to `https://aredirlabs.com`
4. Set a production `BETTER_AUTH_SECRET` (can match Vercel Production value)
5. Set `WORKSPACE_ALLOWED_EMAILS` to the approved internal account emails

### Safe prod commands

Production scripts load **only** `.env.production.local` and require explicit confirmation:

```bash
CONFIRM_PROD_DB=true npm run db:push:prod
CONFIRM_PROD_DB=true npm run db:seed:prod
```

If `CONFIRM_PROD_DB=true` is missing, commands fail with a warning and exit without touching the database.

### Custom domain and auth

The Next.js app deploys to Vercel (e.g. `aredirlabs-com.vercel.app`). Auth API calls must reach that deployment — **not** a placeholder host on the apex domain.

If `aredirlabs.com` DNS still points to GoDaddy (or another non-Vercel host), browser auth requests to `https://aredirlabs.com/api/auth/*` return HTML 404 pages and signup/sign-in appear to hang or fail silently.

**Fix:** Point `aredirlabs.com` (and `www` if used) DNS to Vercel before relying on the custom domain for auth.

The auth client uses **same-origin** requests (`window.location.origin`), so auth works on the Vercel URL even before custom DNS is cut over. Server-side Better Auth uses dynamic `baseURL` allowed hosts (`*.vercel.app`, `aredirlabs.com`) with `BETTER_AUTH_URL` as fallback.

Workspace route protection checks both production and development session cookie names (`__Secure-better-auth.session_token` and `better-auth.session_token`).

Workspace registration is invite-only. `/sign-up` shows an invite-only notice, and direct Better Auth email signup requests are rejected unless the submitted email is present in `WORKSPACE_ALLOWED_EMAILS`.

To add an approved workspace user:

1. Add their email address to `WORKSPACE_ALLOWED_EMAILS` in Vercel Production.
2. Redeploy or restart the runtime so the env var is loaded.
3. Have the user complete account creation through an approved registration path.

### Expected prod tables

After push/seed, verify these tables exist:

- Better Auth: `user`, `session`, `account`, `verification`
- Workspace: `workspace_projects`, `workspace_settings`, `workspace_project_notes`, `workspace_project_milestones`

`workspace_projects` includes 006 columns: `status`, `stage`, `current_focus`, `next_step`, `target_date`.

Seed baseline:

- 1 workspace settings record (`Aredir Labs`)
- 4 workspace projects (status/stage/focus upserted on re-seed)
- 4 sample project notes
- 9 project milestones (idempotent on fixed `id`; second seed run inserts 0)

### 006 production migration

`db:push:prod` runs `scripts/migrate-workspace-006.mjs` before Drizzle push to map legacy `project_status` values on existing databases. On first prod apply (2026-06), migration converted the old enum (`Active Build`, `In Development`, `Concept`) to text, updated row values, dropped the old type, then Drizzle applied the new schema.

Verify locally without exposing secrets:

```bash
node --env-file=.env.production.local scripts/verify-prod-env.mjs
CONFIRM_PROD_DB=true npm run db:push:prod
CONFIRM_PROD_DB=true npm run db:seed:prod
node --env-file=.env.production.local scripts/verify-prod-006.mjs
```

Run `db:seed:prod` twice — second run should report 0 milestones inserted, 9 skipped.

---

## 5. Deploy

1. Merge to `main` (or trigger production redeploy)
2. Confirm Vercel build succeeds
3. Configure custom domain `aredirlabs.com` in Vercel if not already connected
4. Confirm DNS resolves to Vercel

---

## 6. Post-deploy QA checklist

### Public site

- [ ] `https://aredirlabs.com/` loads
- [ ] `/about`, `/projects`, `/contact` load
- [ ] Project detail pages load (`/projects/alignfit`, etc.)

### Workspace auth

- [ ] `/sign-up` shows invite-only registration notice
- [ ] Unapproved email cannot sign up
- [ ] Approved email can sign up
- [ ] `/sign-in` signs in successfully
- [ ] `/workspace` redirects to sign-in when logged out
- [ ] Sign out works

### Workspace data

- [ ] Dashboard shows operating snapshot and 4 seeded projects
- [ ] `/workspace/projects` registry loads with status/stage columns
- [ ] Each project detail page loads with milestones and seeded note
- [ ] Creating a new milestone persists after refresh
- [ ] Creating a new note persists after refresh

### Errors

- [ ] Invalid project slug shows not-found state
- [ ] No secret values exposed in client bundle or HTML

---

## 7. Rollback

- Use Vercel instant rollback to prior deployment if critical issues ship
- Database changes are not auto-rolled back — document any manual schema changes

---

## Related

- [Environment strategy](../../docs/engineering/environment-strategy.md)
- [Deployment workflow](../../docs/engineering/deployment-workflow.md)
- [Neon environment verification](./NEON-ENVIRONMENT-VERIFICATION.md)
- [Release checklist](../../docs/qa/release-checklist.md)
