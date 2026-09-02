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
| `db:adopt:legacy` | Governed migration-journal adoption | Reconciling a live database that was materialized before tracked-migration authority |

## Tracked migration authority package

The tracked corpus now comprises a historical baseline plus the forward migrations:

| Sequence (journal idx) | Migration | `when` (ms) | Purpose |
| --- | --- | --- | --- |
| 0 | `0000_workspace_foundation_baseline` | `1781049600000` (2026-06-10) | Historical baseline for the pre-authority workspace foundation |
| 1–8 | `0000_engineering_work_002` … `0007_operational_focus` | unchanged | Existing tracked migrations, byte-for-byte unchanged |
| 9 | `0008_workspace_project_prompt_reconciliation` | `1788235827614` | Forward reconciliation of `workspace_project_prompts` |

Only `drizzle/meta/_journal.json` is version-controlled; no snapshots are tracked. Tags were added for the two new
migrations; the tags of the existing 0000–0007 migrations and their `when` values are unchanged.

### Historical baseline composition

`0000_workspace_foundation_baseline.sql` captures the common materialized pre-tracked workspace foundation that predates
tracked-migration authority and can be independently proven on legacy environments:

- `workspace_project_notes`, `workspace_project_milestones`, and `workspace_project_documents` are in the baseline because
  they are both **pre-authority and materially present** in Production.
- `workspace_project_prompts` and its two enums are **not** in the baseline.

**Prompts placement — deliberate decision.** The original implementation authorization requested `workspace_project_prompts`
in the historical baseline. The implementation deliberately departed from that instruction: Production does not materially
contain prompts, which prevents the baseline from being truthfully adopted as a single materialized migration boundary on
legacy Production (the adoption tooling proves each adopted migration's objects exist before writing journal rows).
Prompts, although declared before tracked-migration authority began, was **never materialized in Production** and is
therefore intentionally re-projected into governed authority through the first forward reconciliation migration,
`0008_workspace_project_prompt_reconciliation.sql`.

Notes/milestones/documents are in the baseline because they are both pre-authority and materially present; prompts is the
exceptional sibling because it was pre-authority but absent from Production. `0008` does **not** imply that prompts was
historically designed after `0007`; it is a reconciliation placement chosen to establish one convergent migration history
for fresh and adopted legacy environments alike. `focus_version` (introduced by 0007) is likewise provided by 0007, not
the baseline.

### Legacy adoption (`db:adopt:legacy`)

`scripts/reconcile-legacy-migration-journal.mjs` adopts a live database that was materialized before tracked-migration
authority without re-executing any DDL. It:

- requires `ADOPT_LEGACY=true` plus an explicit `ADOPT_DATABASE_URL` (and optional `LEGACY_DATABASE_URL`);
- refuses any target that matches a known Production identifier (`ep-nameless-dawn-a61gilim`,
  `br-crimson-shape-a6q4y35g`);
- verifies the materialized identity against an expected manifest (tables, enum UDTs, `focus_version` column) before
  writing the journal;
- writes only the journal rows (`hash`, `when`) for baseline + 0000–0007 that are absent, in index order, without
  re-running their SQL; and
- is idempotent — a repeat reconciliation does not duplicate journal rows.

`scripts/verify-adoption-disposable.mjs` drives fresh, legacy, and negative scenarios against operator-provided
disposable Neon targets.

## Verification result

The migration files and journal contain no secrets or connection data and are referenced by the canonical command.
Static verification is recorded in AREDIR-DB-002. End-to-end verification (fresh reconstruction, legacy adoption,
fresh-vs-legacy schema equivalence, and negative guards) was executed on disposable Neon targets and is recorded in the
deliverable report; no non-disposable database was contacted.
