# AREDIR-ENV-001 — Local Development Environment Reconstruction

## Classification

**Blocked.**

The repository contract and Git safety are verified, but the intended Neon Dev target cannot be positively identified from this session. No Neon or Vercel console connector is available, and no local development connection value is present. Per the safety boundary, `.env.local` was not created and no database or application command was run.

## Verified local contract

The canonical local environment file is ignored `.env.local`. Repository documentation describes it as using the `aredirlabs-dev` Neon database; production uses `aredirlabs-prod` through Vercel Production or ignored `.env.production.local` with an explicit production confirmation guard.

| Variable | Classification | Verified use |
| --- | --- | --- |
| `DATABASE_URL` | Required for database-backed application reads, migration, and seed | Drizzle config/client, seed, and migration scripts |
| `BETTER_AUTH_SECRET` | Required for authentication | Better Auth configuration |
| `BETTER_AUTH_URL` | Required local auth configuration; source has a local fallback | Auth base URL/trusted origins |
| `NEXT_PUBLIC_SITE_URL` | Optional local URL fallback | Auth base URL fallback; client does not hardcode it |
| `WORKSPACE_ALLOWED_EMAILS` | Required to permit local invite-only signup; not required for server startup | Workspace signup allow-list |

The application has no automatic migration or seed command in its `dev` script; `npm run dev` only invokes `next dev`.

## Git safety

- `.env.local` is ignored by `.gitignore` through `.env*`.
- `git check-ignore -v .env.local` confirms the ignore rule.
- `.env.example` is the only tracked environment file.
- No secret-bearing environment file is staged or tracked.
- No local environment file was created by this package.

## Neon classification

Target classification: **Unable to determine**.

The requested Neon project is `plain-band-91202732`, but its branch inventory, branch names/identifiers, roles, target connection forms, table inventory, and Production/Dev separation could not be inspected without an authorized Neon console connection. Documentation names `aredirlabs-dev`, but documentation alone is not positive target verification.

## Readiness decision

Local development is **Blocked**. The missing evidence is access to an approved source for the Neon Dev branch and its development-only connection value, plus confirmation of the approved local test-account allow-list. No unsafe operation occurred.

## Recommendation

**Complete additional environment reconstruction.** Obtain read-only Neon and Vercel environment-mapping access (or supply an approved non-production environment injection) before creating `.env.local`.

See [Local development environment reconstruction](./LOCAL-DEVELOPMENT-ENVIRONMENT-RECONSTRUCTION.md) and [Environment mapping](./ENVIRONMENT-MAPPING.md).
