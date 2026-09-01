# Environment Strategy

## Environment model

Aredir currently operates with two environments. Production is the only persistent operational environment containing authoritative company and project work state. Local/Development is used for engineering verification, integration rehearsal, and testing — it is not a parallel operational environment and is not expected to mirror Production operational data.

| Environment | Role | Authority | Persistence |
|-------------|------|-----------|-------------|
| **Production** | Live site and workspace | Authoritative — sole operational environment | Persistent |
| **Local** | Engineering verification | Non-authoritative — verification, testing, fixtures, seeded data | Persistent or disposable; persistence does not imply operational authority |
| **Preview** | Not currently part of the supported Aredir operating model | None | See below |

### Production Operational Environment

- Persistent; authoritative; contains real operational Aredir state.
- Deployed verified application code only.
- Tracked migrations are the sole Production schema authority.
- Authenticated runtime acceptance occurs here.
- Never operate unverified local code directly against the Production database.

### Local / Verification Environment

- Non-authoritative; used for engineering verification, integration migration rehearsal, testing, fixtures, and seeded data.
- May be persistent for convenience or disposable when useful.
- Has no requirement to mirror Production operational data.
- Must never be treated as a second operational Aredir instance.

### Preview

- Not currently part of the supported Aredir operating model.
- No active Preview deployments exist.
- No guaranteed Preview database mapping exists.
- Do not imply that Preview is available for authenticated workspace testing.
- If Preview is introduced later, authenticated workspace functionality must not be enabled until Preview has an explicitly non-Production database target and appropriate environment/auth configuration.

## Environment variables

### Local

- Copy `.env.example` to `.env.local` and fill in values.
- Use the **`aredirlabs-dev`** Neon database (`DATABASE_URL` in `.env.local`).
- Never commit `.env`, `.env.local`, `.env.production.local`, or secrets. Only `.env.example` (placeholders) is committed.

### Naming

- `NEXT_PUBLIC_*` — exposed to the browser; non-sensitive only.
- Server-only variables — no `NEXT_PUBLIC_` prefix; API keys, tokens, webhooks.

### Vercel Production runtime

Set in Vercel → Project → Settings → Environment Variables → **Production**:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | Neon `aredirlabs-prod` connection string |
| `BETTER_AUTH_SECRET` | Random string ≥32 characters (production-only) |
| `BETTER_AUTH_URL` | `https://aredirlabs.com` |
| `NEXT_PUBLIC_SITE_URL` | `https://aredirlabs.com` |

### Vercel (general)

- Set variables per environment scope: Production.
- Preview is not configured for workspace use. Do not set workspace variables for Preview scope.
- Document required variables in this file as they are introduced.

| Variable | Environments | Description |
|----------|--------------|-------------|
| `DATABASE_URL` | Local, Production | Neon PostgreSQL connection string. Local: `aredirlabs-dev`. Production (Vercel): `aredirlabs-prod`. |
| `BETTER_AUTH_SECRET` | Local, Production | Random string ≥32 characters for Better Auth session tokens. Use distinct values per environment. |
| `BETTER_AUTH_URL` | Local, Production | Auth callback base URL. Local: `http://localhost:3000`. Production: `https://aredirlabs.com`. |
| `NEXT_PUBLIC_SITE_URL` | Local, Production | Public site URL exposed to the browser. Local: `http://localhost:3000`. Production: live site URL. |

## Database (Neon + Drizzle)

| Instance | Environment | Purpose |
|----------|-------------|---------|
| `aredirlabs-dev` | Local (`.env.local`) | Verification database — engineering testing, fixtures, seeded data |
| `aredirlabs-prod` | Vercel Production | Live site database — sole operational authority |

Schema is defined in `src/lib/db/schema.ts`.

### Schema authority

**Tracked migrations are the sole schema authority for Production.**

| Command | Environment | Purpose | Production use |
|---------|-------------|---------|----------------|
| `npm run db:migrate` | Local (`.env.local`) | Execute tracked journaled migrations against local dev database | Via `db:migrate:prod` with confirmation |
| `npm run db:push` | Local (`.env.local`) | Local schema prototyping and legacy development only | **Prohibited** |
| `npm run db:seed` | Local (`.env.local`) | Seed local verification data | Via `db:seed:prod` with confirmation |
| `npm run db:push:prod` | `.env.production.local` | Exists in package.json but **should not be used** — Production schema authority is tracked migrations only | **Prohibited** |
| `npm run db:seed:prod` | `.env.production.local` | Seed Production after tracked migration apply | Confirmed use only |

`db:push` infers live schema state and is unsafe for governed migrations. It remains available only for local disposable prototyping. It is not approved for Production schema changes, Dev validation of production-intent migrations, or any governed migration path.

### Migration rehearsal

For migration rehearsal, the preferred evidence path is:

1. Empty/disposable verification database
2. Tracked migrations (`npm run db:migrate`)
3. Seed/fixtures as required (`npm run db:seed`)
4. Application/integration verification

This proves the tracked migration path that Production will execute. Do not rely on `db:push` as evidence for Production schema readiness.

### Production schema changes

Production schema changes follow the governed migration path:

1. Rehearse against a verification database using tracked migrations.
2. Validate tracked migration authority (journal, SQL files, hash records).
3. Apply through the governed Production migration path (`db:migrate:prod` with `CONFIRM_PROD_DB=true`).
4. Verify Production read-only after apply.

See [Vercel production deployment](../../plan/docs/VERCEL-PRODUCTION-DEPLOYMENT.md) and [Tracked Migration Path Report](./TRACKED-MIGRATION-PATH-REPORT.md).

### Seeded tables

| Table | Idempotency key | Initial record |
|-------|-----------------|----------------|
| `workspace_settings` | `company_slug` | `Aredir Labs` / `aredir-labs` |
| `workspace_projects` | `slug` | AlignFit, ClassForge, LeagueOS, AredirLabs.com |
| `workspace_project_notes` | `id` | Sample notes per project (004) |

Run `npm run db:seed` (dev) or `CONFIRM_PROD_DB=true npm run db:seed:prod` (prod) after tracked migration apply. Safe to run multiple times.

Verification checklists:

- [NEON-ENVIRONMENT-VERIFICATION.md](../../plan/docs/NEON-ENVIRONMENT-VERIFICATION.md)
- [VERCEL-PRODUCTION-DEPLOYMENT.md](../../plan/docs/VERCEL-PRODUCTION-DEPLOYMENT.md)

## Data synchronization

Production data must not be synchronized into Development merely for ordinary UI or workflow development. Development data is not expected to mirror Production operational data. No production-to-development synchronization capability exists or is currently required.

## Secrets handling

- Store secrets in Vercel project settings or approved secret manager.
- Rotate on exposure; never log secret values.

## Related

- [Technical overview](./technical-overview.md)
- [Deployment workflow](./deployment-workflow.md)
- [Tracked Migration Path Report](./TRACKED-MIGRATION-PATH-REPORT.md)
- [Vercel production deployment](../../plan/docs/VERCEL-PRODUCTION-DEPLOYMENT.md)
