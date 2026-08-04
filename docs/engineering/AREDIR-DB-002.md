# AREDIR-DB-002 - Tracked Migration Path Remediation

## Completion classification

**Ready for validation**

## Decisions

| Decision | Result |
| --- | --- |
| Canonical migration directory | `drizzle/` |
| Migration sequence | `0000_engineering_work_002` |
| Migration source | Manually authored, reviewed SQL in Drizzle's native journal format |
| Canonical command | `npm run db:migrate` |
| Driver compatibility | `drizzle-kit migrate` supports PostgreSQL with the installed `@neondatabase/serverless` / `drizzle-orm` Neon HTTP stack |
| Repeat behavior | Drizzle records the migration hash and timestamp in `drizzle.__drizzle_migrations`; a repeat applies no recorded migration again |

No database connection, migration execution, seed, or `db:push` command was run.

## Static verification

- Drizzle migration metadata check: passed.
- Drizzle journal parser: passed with one migration and seven SQL statement groups.
- Custom migration-script syntax checks: passed.
- TypeScript: passed.
- Lint: passed.
- Staged `git diff --check`: passed.

## Tracked artifacts

- `drizzle/0000_engineering_work_002.sql`
- `drizzle/meta/_journal.json`

The existing untracked `scripts/migrate-engineering-work-002.mjs` is a helper script, not the canonical governed migration path. `scripts/migrations/AREDIR-ENGINEERING-WORK-002.sql` is a duplicate manual record and is not part of the canonical Drizzle migration set. Neither was added to this migration commit.

## Command boundary

`db:migrate` is the approved governed migration path. It loads the ignored local environment file and executes only journaled migration files; it does not infer or push live schema state. `db:push` remains available only for local schema prototyping and legacy development work. It is not approved for governed migration execution, Dev validation, or Production.

## Readiness

The migration matches the current Drizzle schema and Engineering Work baseline. AREDIR-DB-001 can now be rerun unchanged against the confirmed Neon Dev target.
