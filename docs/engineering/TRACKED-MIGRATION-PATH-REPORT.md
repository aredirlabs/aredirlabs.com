# Tracked Migration Path Report

## Canonical path

Run `npm run db:migrate` only after a separately authorized database-validation package confirms the target. The command is already defined as:

```json
"db:migrate": "node --env-file=.env.local node_modules/drizzle-kit/bin.cjs migrate"
```

It is compatible with this repository's PostgreSQL Drizzle configuration and Neon serverless dependency. Drizzle reads `drizzle/meta/_journal.json`, executes journaled SQL files in order, and records successful application in its migration metadata table. It does not run `db:push` or infer live schema changes.

## Existing command classification

| Command | Classification | Boundary |
| --- | --- | --- |
| `db:migrate` | Canonical | Governed tracked migration execution |
| `db:generate` | Development-only | Produces candidate migrations; review before tracking |
| `db:push` | Unsafe for governed migrations | Schema prototyping / legacy development only |
| `db:seed` | Development-only | Separate seed authorization required |
| `db:push:prod` / `db:seed:prod` | Production-gated | Outside this package; explicit production confirmation required |

## Verification result

The migration file and journal have no secrets or connection data, use the canonical configured directory, and are referenced by the canonical command. Static verification is recorded in AREDIR-DB-002. No database operation occurred.
