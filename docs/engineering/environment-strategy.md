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
- Never commit `.env`, `.env.local`, or secrets. Only `.env.example` (placeholders) is committed.

### Naming

- `NEXT_PUBLIC_*` — exposed to the browser; non-sensitive only.
- Server-only variables — no `NEXT_PUBLIC_` prefix; API keys, tokens, webhooks.

### Vercel

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
| `aredirlabs-prod` | Vercel Production | Live site database |

Schema is defined in `src/lib/db/schema.ts` and applied with `npm run db:push`. Local CLI commands load `.env.local` automatically.

### Seeded tables

| Table | Idempotency key | Initial record |
|-------|-----------------|----------------|
| `workspace_settings` | `company_slug` | `Aredir Labs` / `aredir-labs` |
| `workspace_projects` | `slug` | AlignFit, ClassForge, LeagueOS, AredirLabs.com |

Run `npm run db:seed` after pushing schema. Safe to run multiple times.

Verification checklist: [plan/docs/NEON-ENVIRONMENT-VERIFICATION.md](../../plan/docs/NEON-ENVIRONMENT-VERIFICATION.md)

- Separate datasets or tokens per environment if required by project policy.
- Preview may use draft content; production uses published content only.

## Secrets handling

- Store secrets in Vercel project settings or approved secret manager.
- Rotate on exposure; never log secret values.

## Related

- [Technical overview](./technical-overview.md)
- [Deployment workflow](./deployment-workflow.md)
