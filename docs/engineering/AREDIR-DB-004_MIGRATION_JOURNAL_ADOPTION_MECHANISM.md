# AREDIR-DB-004 — Migration-Journal Adoption Mechanism (Architecture B)

## Classification

**Implemented and verified.**

Repository-only implementation of the governed migration-journal adoption
mechanism: a single shared reconciliation engine with two entry points —
`db:adopt:legacy` (Development / disposable targets) and `db:adopt:prod`
(Production positive-identity). All verification ran against disposable targets
and an in-process synthetic client; **no Production contact occurred and no
Production mutation was authorized or performed.**

## Authority model

| Entry point | Target | Enables | Requires | Purpose |
| --- | --- | --- | --- | --- |
| `db:adopt:legacy` | Disposable / Development | Journal reconciliation of an already-materialized database | `ADOPT_LEGACY=1\|true\|yes` + `ADOPT_DATABASE_URL` (or `LEGACY_DATABASE_URL`); refuses known Production identifiers | Record adopted schema state as journal rows |
| `db:adopt:prod` | Production | Journal reconciliation of the Production database | `ADOPT_PROD=1\|true\|yes` + explicit `PROD_ADOPT_DATABASE_URL` (no fallback); **positive** identity, not a blocklist | Record only baseline + 0000..0007 as satisfied |
| `db:migrate:prod` | Production | Forward migration execution | `CONFIRM_PROD_DB=true` + `.env.production.local`; live identity must exactly match the frozen Production contract | Execute the forward reconciliation migration |
| `db:migrate` | Development | Migrate via `.env.local` | nothing added by this mechanism | Unchanged Development pathway |

## Truthfulness invariant (shared engine)

Journal adoption RECORDS authoritative schema state that has been independently
proven materially present. It does NOT execute historical migration DDL and never
implies Drizzle ran that DDL. Each journal row written is the real SHA-256 of the
committed migration file and the canonical `when` from
`drizzle/meta/_journal.json`.

Adopted tags: `0000_workspace_foundation_baseline` + `0000_engineering_work_002`
through `0007_operational_focus`. The forward reconciliation migration
`0008_workspace_project_prompt_reconciliation` is never an adopted tag and is
never invoked by adoption; it remains a separate, explicitly authorized
Production operation.

## Production positive-identity contract

`scripts/lib/migration-reconcile-engine.mjs` carries the FROZEN Production
identity (repository-owned configuration, no credentials):

`projectId=plain-band-91202732  branchId=br-crimson-shape-a6q4y35g
 endpointId=ep-nameless-dawn-a61gilim  database=neondb`

`db:adopt:prod` and the `migrate` gate in `db-prod.mjs` require
an exact match on ALL four live values (read via `current_setting('neon.project_id')`,
`neon.branch_id`, `neon.endpoint_id`, `current_database()`). A target that merely
"is not Development" or "is not blocklisted" is never sufficient — Production must
positively match. Any missing/unavailable identity value fails closed.

## Adoption sequence (`db:adopt:prod`)

1. Positive `ADOPT_PROD` and explicit `PROD_ADOPT_DATABASE_URL` (exit 2 otherwise).
2. Live identity read and exact-match assertion (exit 3 on mismatch, 2 if
   unavailable). No write occurs before this completes.
3. Journal-table state check.
4. Materialization proof for every adopted migration against the shared manifest
   (types, tables, column UDTs, indexes, constraints) — exit 4 on any failure.
5. Prompts-absence proof: `workspace_project_prompts`, `workspace_project_prompt_type`,
   `workspace_project_prompt_status` must all be absent (pre-0008 state) — exit 4.
6. Journal-plan conflict detection: 0008 already journaled, unknown/unexpected
   rows, adopted rows with divergent canonical `when`, duplicate canonical `when`
   under a different hash — exit 4 on any conflict. Idempotent: a complete 9-row
   journal yields no-op with exit 0.
7. **Atomic** write: journal schema/table preparation + row inserts in ONE
   transaction (`db.transaction([...])`, `@neondatabase/serverless` HTTP model).
   On failure nothing is written.
8. Read-only post-write verification.

Exit codes (production): `0` adopted/no-op; `2` authorization or identity
unavailable; `3` identity mismatch; `4` materialization/prompts/journal conflict;
`1` runtime failure. Legacy exit codes preserved: `0` success, `2` guards,
`3` materialization, `4` conflict, `1` runtime.

## Migration-plan safety: hold, don't touch

At the mechanism's boundary the explicitly actionable Production operation is
unsigned. Adoption never records 0008 as a predicate already satisfied, never
executes migration DDL, and leaves the Production follow-on (recovery anchor +
forward migration + phase validation) as separate human-in-the-loop Operations
actions. **The adoption mechanism itself does not authorize Production
execution.**

## Verification evidence

| Check | Result |
| --- | --- |
| `scripts/verify-adoption-production.mjs` (in-process, synthetic db, zero network) | 20/20 PASS |
| `scripts/verify-adoption-disposable.mjs` on disposable Neon targets | 21/21 PASS |
| `npm test` | 175/175 PASS |
| `eslint` on new/modified scripts | Clean |
| `eslint` repository-wide | Pre-existing errors in `src/lib/workspace/queries-sql-structure.test.ts` only (3 errors, 1 warning; file not modified by this work) |
| `node --check` on all new/modified scripts | Pass |
| `git diff --check` | Clean |

Production-harness coverage: CLI guards (missing `ADOPT_PROD`, missing
`PROD_ADOPT_DATABASE_URL`, legacy-only flag refused); identity exact match,
project/branch/endpoint/database mismatch, development-target rejection, identity
unavailable; missing historical object; conflicting column UDT; unknown journaled
hash; known hash with wrong `when`; journaled 0008; valid partial adoption;
invalid partial adoption; repeat no-op; prompts fully/partially present;
transaction failure without partial write.

Disposable-harness coverage (real Neon, disposable branches): fresh canonical
migrate with truthful 10-row journal; legacy path — adoption exit 0, 9 truthful
journal rows, no DDL replayed (prompts still absent after adoption), forward
migrate applies only 0008, repeat migrate no-op, fresh/legacy final-schema
equivalence; negative guards — adoption without flag refused, missing objects
refused, column conflict refused, repeat adoption yields no duplicates, migrate
without adoption guarded.

## Infrastructure note

One disposable verification run after the final engine cleanup could not be
re-executed because the disposable Neon branch endpoint became unreachable
("The requested endpoint could not be found, or you don't have access to it"),
consistent with an auto-paused/rotated disposable branch. The 21/21 disposable
run above was recorded minutes earlier against the same targets and code with
identical assertions; the post-cleanup engine is re-verified in-process (20/20).
Waking the disposable branches will allow a clean re-run.

## Files

- `scripts/lib/migration-reconcile-engine.mjs` — shared engine (authoritative
  manifests, hashes, canonical `when`, identity, plans, atomic transaction).
- `scripts/adopt-production-migration-journal.mjs` — `db:adopt:prod` entry point.
- `scripts/reconcile-legacy-migration-journal.mjs` — `db:adopt:legacy` entry point
  (refactored onto the engine; operator contract and Production-refusal boundary
  preserved; shared conflict validation strengthened as fail-closed behavior).
- `scripts/db-prod.mjs` — `migrate` command gained the positive-identity gate.
- `scripts/verify-adoption-production.mjs` — in-process negative harness.
- `scripts/verify-adoption-disposable.mjs` — disposable integration harness (reused).
