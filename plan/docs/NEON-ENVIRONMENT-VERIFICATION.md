# AREDIR-WORKSPACE-002A — Neon Environment Verification

Checklist to confirm Neon + Drizzle setup is complete before workspace feature work.

## Prerequisites

- `.env.local` configured with `aredirlabs-dev` `DATABASE_URL`
- `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL` set in `.env.local`
- `.env.example` committed with placeholders only (no real secrets)

---

## 1. Environment files

| Check | Expected |
|-------|----------|
| `.env.example` exists | Documents `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `NEXT_PUBLIC_SITE_URL` |
| Local dev uses `.env.local` | Next.js and `npm run db:*` scripts load `.env.local` |
| Secrets not committed | `.env` and `.env.local` are gitignored; only `.env.example` is tracked |
| Production uses prod Neon | Vercel Production `DATABASE_URL` points to `aredirlabs-prod` |

---

## 2. Schema

Confirm tables exist in `src/lib/db/schema.ts`:

| Table | Purpose |
|-------|---------|
| `user`, `session`, `account`, `verification` | Better Auth |
| `workspace_settings` | Company-level workspace config |
| `workspace_projects` | Workspace project registry |

Apply schema to dev:

```bash
npm run db:push
```

Expected: `[✓] Changes applied` (or no pending changes on re-run).

---

## 3. Seed idempotency

Run twice:

```bash
npm run db:seed
npm run db:seed
```

Expected on second run:

- `workspace_settings`: `− Aredir Labs (already exists)`
- All four projects: `(already exists)`
- No duplicate rows in the database

Seeded `workspace_settings` record:

| Field | Value |
|-------|-------|
| `company_name` | Aredir Labs |
| `company_slug` | `aredir-labs` |

---

## 4. Build verification

```bash
npm run lint
npm run build
```

Both must exit successfully.

---

## 5. Done criteria

- [ ] `workspace_settings` in schema and dev Neon database
- [ ] Seed is idempotent for settings and projects
- [ ] `npm run lint` passes
- [ ] `npm run build` passes
- [ ] README and environment-strategy docs reflect the setup

When all checks pass, proceed to **AREDIR-WORKSPACE-003 — Project Detail Pages**.
