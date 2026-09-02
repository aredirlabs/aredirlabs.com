# AREDIR-DB-002 - Tracked Migration Path Remediation

## Completion classification

**Ready for validation**

## Decisions

| Decision | Result |
| --- | --- |
| Canonical migration directory | `drizzle/` |
| Migration sequence | `0000_workspace_foundation_baseline` → `0000_engineering_work_002` … `0007_operational_focus` → `0008_workspace_project_prompt_reconciliation` |
| Migration source | Manually authored, reviewed SQL in Drizzle's native journal format |
| Canonical command | `npm run db:migrate` |
| Legacy adoption command | `npm run db:adopt:legacy` |
| Driver compatibility | `drizzle-kit migrate` supports PostgreSQL with the installed `@neondatabase/serverless` / `drizzle-orm` Neon HTTP stack |
| Repeat behavior | Drizzle records the migration hash and timestamp in `drizzle.__drizzle_migrations`; a repeat applies no recorded migration again |

## Historical baseline and forward reconciliation

To place the pre-authority workspace foundation and the forward prompts gap on the same tracked authority:

- `drizzle/0000_workspace_foundation_baseline.sql` is a historical, pre-0000 baseline (journal `when` before the original
  0000) covering the **common materialized** pre-tracked workspace foundation: Better Auth, workspace settings/projects
  (without `focus_version`), and notes/milestones/documents. Notes, milestones, and documents are in the baseline because
  they are both pre-authority and materially present in Production. `workspace_project_prompts` and its enums are not in
  the baseline.
- `drizzle/0008_workspace_project_prompt_reconciliation.sql` is the first forward reconciliation migration that
  re-projects `workspace_project_prompts` and its two enums onto the tracked authority, restoring the Prompt Library and
  closing BUG-001's recurrence risk.

**Prompts placement decision.** The original authorization requested prompts in the historical baseline. The implementation
deliberately departed because Production does not materially contain prompts, which prevents the baseline from being
truthfully adopted as a single materialized migration boundary on legacy Production. Prompts, although declared before
tracked-migration authority began, was never materialized in Production, so it is intentionally re-projected through
`0008`. Prompts is the exceptional sibling — pre-authority but Production-absent — contrasted with notes/milestones/
documents, which are pre-authority and materially present. `0008` is a reconciliation placement (not a claim that prompts
was historically designed after `0007`) chosen to establish one convergent migration history for fresh and adopted legacy
environments; fresh and legacy paths converge on the same canonical history and final schema.

- `scripts/reconcile-legacy-migration-journal.mjs` (wired as `db:adopt:legacy`) adopts a live, pre-authority database by
  verifying its materialized identity and writing the missing journal rows without re-running any DDL.
- `scripts/verify-adoption-disposable.mjs` verifies the fresh, legacy, equivalence, and negative-guard paths on
  disposable targets.

The original 0000–0007 SQL files are byte-for-byte unchanged; only their journal index order and the two added tags/`when`
values changed, all within `drizzle/meta/_journal.json`.

## Verification

- Static verification (migration metadata, journal parse, `node --check`, tests, lint, typecheck): recorded in the
  deliverable report.
- End-to-end verification was executed on disposable Neon targets only: fresh reconstruction, production-shaped legacy
  adoption, fresh-vs-legacy final-schema equivalence, and negative guards. All passed. No non-disposable (Dev/Production)
  database was contacted, migrated, or pushed.

## Tracked artifacts

- `drizzle/0000_workspace_foundation_baseline.sql`
- `drizzle/0008_workspace_project_prompt_reconciliation.sql`
- `drizzle/meta/_journal.json` (10 entries, idx 0–9)
- `scripts/reconcile-legacy-migration-journal.mjs`
- `scripts/verify-adoption-disposable.mjs`
- `package.json` (`db:adopt:legacy`)

## Command boundary

`db:migrate` is the approved governed migration path. It loads the ignored local environment file and executes only
journaled migration files; it does not infer or push live schema state. `db:adopt:legacy` is the governed path for
adopting a pre-authority live database and is guarded by flags plus a Production identifier blocklist. `db:push` remains
available only for local schema prototyping and legacy development work. It is not approved for governed migration
execution, Dev validation, or Production. No `db:push:prod` was run.

## Readiness

The tracked migration authority now covers the full workspace foundation, Engineering Work, focus, and the Prompt
Library, reproducible via `db:migrate` from a fresh target and via `db:adopt:legacy` on a pre-authority target. Nothing
has been staged or committed; the deliverable is pending human review.
