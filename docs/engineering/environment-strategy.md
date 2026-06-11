# Environment Strategy

## Environments

| Environment | Purpose | URL pattern |
|-------------|---------|-------------|
| Local | Development | `http://localhost:3000` |
| Preview | PR review / QA | `*.vercel.app` (per deployment) |
| Production | Live site | `aredirlabs.com` (when configured) |

## Environment variables

### Local

- Copy `.env.example` to `.env.local` and fill in values.
- Use the **`aredirlabs-dev`** Neon database (`DATABASE_URL` in `.env.local`).
- Never commit `.env`, `.env.local`, `.env.production.local`, or secrets. Only `.env.example` (placeholders) is committed.

### Naming

- `NEXT_PUBLIC_*` — exposed to the browser; non-sensitive only.
- Server-only variables — no `NEXT_PUBLIC_` prefix; API keys, tokens, webhooks.

### Production database CLI (local one-time setup)

- Copy `.env.example` to **`.env.production.local`** with the `aredirlabs-prod` `DATABASE_URL`.
- Run production DB commands only with explicit confirmation:

```bash
CONFIRM_PROD_DB=true npm run db:push:prod
CONFIRM_PROD_DB=true npm run db:seed:prod
```

These scripts load `.env.production.local` only. Without `CONFIRM_PROD_DB=true`, they fail immediately.

See [Vercel production deployment](../../plan/docs/VERCEL-PRODUCTION-DEPLOYMENT.md).

### Vercel Production runtime

Set in Vercel → Project → Settings → Environment Variables → **Production**:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | Neon `aredirlabs-prod` connection string |
| `BETTER_AUTH_SECRET` | Random string ≥32 characters (production-only) |
| `BETTER_AUTH_URL` | `https://aredirlabs.com` |
| `NEXT_PUBLIC_SITE_URL` | `https://aredirlabs.com` |

### Vercel (general)

- Set variables per environment: Production, Preview, Development.
- Document required variables in this file as they are introduced.

| Variable | Environments | Description |
|----------|--------------|-------------|
| `DATABASE_URL` | Local, Production | Neon PostgreSQL connection string. Local: `aredirlabs-dev`. Production (Vercel): `aredirlabs-prod`. |
| `BETTER_AUTH_SECRET` | Local, Production | Random string ≥32 characters for Better Auth session tokens. Use distinct values per environment. |
| `BETTER_AUTH_URL` | Local, Production | Auth callback base URL. Local: `http://localhost:3000`. Production: `https://aredirlabs.com` (or configured domain). |
| `NEXT_PUBLIC_SITE_URL` | Local, Production | Public site URL exposed to the browser. Local: `http://localhost:3000`. Production: live site URL. |

## Database (Neon + Drizzle)

| Instance | Environment | Purpose |
|----------|-------------|---------|
| `aredirlabs-dev` | Local (`.env.local`) | Development database |
| `aredirlabs-prod` | Vercel Production / `.env.production.local` | Live site database |

Schema is defined in `src/lib/db/schema.ts`.

| Command | Environment file | Confirmation |
|---------|------------------|--------------|
| `npm run db:push` / `db:seed` | `.env.local` (dev) | None |
| `npm run db:push:prod` / `db:seed:prod` | `.env.production.local` (prod) | `CONFIRM_PROD_DB=true` required |

### Seeded tables

| Table | Idempotency key | Initial record |
|-------|-----------------|----------------|
| `workspace_settings` | `company_slug` | `Aredir Labs` / `aredir-labs` |
| `workspace_projects` | `slug` | AlignFit, ClassForge, LeagueOS, AredirLabs.com |
| `workspace_project_notes` | `id` | Sample notes per project (004) |

Run `npm run db:seed` (dev) or `CONFIRM_PROD_DB=true npm run db:seed:prod` (prod) after pushing schema. Safe to run multiple times.

Verification checklists:

- [NEON-ENVIRONMENT-VERIFICATION.md](../../plan/docs/NEON-ENVIRONMENT-VERIFICATION.md)
- [VERCEL-PRODUCTION-DEPLOYMENT.md](../../plan/docs/VERCEL-PRODUCTION-DEPLOYMENT.md)

## Sanity (when integrated)

- Separate datasets or tokens per environment if required by project policy.
- Preview may use draft content; production uses published content only.

## Secrets handling

- Store secrets in Vercel project settings or approved secret manager.
- Rotate on exposure; never log secret values.

## Related

- [Technical overview](./technical-overview.md)
- [Deployment workflow](./deployment-workflow.md)
- [Vercel production deployment](../../plan/docs/VERCEL-PRODUCTION-DEPLOYMENT.md)
