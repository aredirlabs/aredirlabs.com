# Local Development Environment Reconstruction

## Purpose

This record establishes what was verified for AREDIR-ENV-001 without exposing credentials or making a database connection.

## Source evidence

- `.env.example` instructs developers to create `.env.local` for local use and identifies `aredirlabs-dev` as the intended Neon development database.
- `docs/engineering/environment-strategy.md` distinguishes local `aredirlabs-dev` from production `aredirlabs-prod`.
- `src/lib/db/index.ts`, Drizzle configuration, migration scripts, and seed script require `DATABASE_URL` only when their database paths execute.
- `src/lib/auth.ts` uses `BETTER_AUTH_SECRET`; `src/lib/auth-config.ts` uses `BETTER_AUTH_URL`, then `NEXT_PUBLIC_SITE_URL`, then a localhost fallback.
- `src/lib/workspace-access.ts` reads `WORKSPACE_ALLOWED_EMAILS` to enforce invite-only signup.
- `package.json` maps `dev` only to `next dev`; migration and seed are separate explicit commands.

## Configuration status

| Requirement | Status |
| --- | --- |
| `.env.local` created | No |
| `.env.local` ignored | Yes |
| Development-only Better Auth secret available | No |
| Approved local test allow-list available | No |
| Verified Neon Dev URL available | No |
| Production secret reused | No |
| Local URLs configured | No |
| Dev database used | No |

## Required safe inputs before creation

An approved operator must provide or inject, without committing values:

1. A connection value explicitly confirmed to target the Neon Dev branch/database, not Production.
2. A development-only Better Auth secret of sufficient strength.
3. Local `BETTER_AUTH_URL` and `NEXT_PUBLIC_SITE_URL` values for `http://localhost:3000`.
4. The minimum approved local test-account allow-list.
5. Confirmation that the database may be read, migrated, and seeded later, together with its shared/disposable-data posture.

After those facts are available, create ignored `.env.local`, confirm only the required variable names are present, run a read-only database identity/table-inventory check, and only then start the application. Migration and seed remain outside this package.

## Connection and startup result

No connection or startup test was run. A write-free connection check cannot be directed to an unclassified target, and application startup could trigger database-backed reads against it.

## Risks

- The Neon Dev branch/database identity is unverified.
- Vercel Preview database mapping is unverified and could conceivably point at Production.
- The Development database may be shared rather than disposable; its data posture is unknown.
- Local invite-only authentication cannot be exercised until a minimal approved test allow-list is supplied.
- Environment documentation names the intended instances but does not substitute for console-level branch evidence.
