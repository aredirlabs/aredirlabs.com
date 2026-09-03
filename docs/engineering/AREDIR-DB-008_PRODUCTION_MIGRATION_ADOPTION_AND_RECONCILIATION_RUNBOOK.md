# AREDIR-DB-008 — Production Migration Adoption & Reconciliation Runbook

> Engineering Work 008 — Production migration authority adoption and forward reconciliation.
> Authoritative scope: historical journal adoption (baseline + 0000–0007) followed by forward migration 0008.

**Authority status:** Architecture B accepted. Implementation complete. Production execution requires explicit human authorization per phase below.

**No Production mutation is authorized by this document.** This runbook is an operational procedure reference only.

---

## Scope

This runbook governs:

1. Adopting the already-materialized Production migration history into the Drizzle journal (baseline + 0000–0007).
2. Executing the forward reconciliation migration 0008 (`workspace_project_prompts` table + enums) after explicit separate authorization.

**Explicitly prohibited during this runbook:**

- `npm run db:push:prod`
- `npm run db:seed:prod`
- Creating or altering schema outside of Drizzle migrations
- Inserting migration journal rows by hand
- Creating or restoring Neon branches or snapshots
- Mutating Engineering Work records
- Staging or committing unless explicitly instructed

---

## Production Identity (Frozen)

```
project:  plain-band-91202732
branch:   br-crimson-shape-a6q4y35g
endpoint: ep-nameless-dawn-a61gilim
database: neondb
```

All Production write commands perform a live positive-identity gate against these four values. Mismatch = abort.

---

## Commands Reference

| Script | Command | Purpose |
|--------|---------|---------|
| `db:adopt:prod` | `npm run db:adopt:prod` | Historical journal adoption (reconciliation only; no DDL) |
| `db:migrate:prod` | `npm run db:migrate:prod` | Forward migration via Drizzle Kit (identity-gated) |

**Do not use `db:push:prod`, `db:seed:prod`, or ad-hoc SQL for Production writes.**

---

## Environment Variables

### For `db:adopt:prod`

The script reads environment from the process. Two variables must be set in the process environment (not in `.env.production.local`):

| Variable | Required value | Notes |
|----------|----------------|-------|
| `ADOPT_PROD` | `1`, `true`, or `yes` | Positive authorization. `ADOPT_LEGACY` is never consulted. |
| `PROD_ADOPT_DATABASE_URL` | The Production Neon connection string | No fallback. If empty → exit 2 immediately. |

**PowerShell session example (no credential persistence):**

```powershell
$env:ADOPT_PROD = "true"
$env:PROD_ADOPT_DATABASE_URL = "postgresql://<user>:<password>@ep-nameless-dawn-a61gilim.neon.tech/neondb?sslmode=require"
npm run db:adopt:prod
```

**Do not:**
- Embed credentials in committed files or documentation.
- Print `PROD_ADOPT_DATABASE_URL` in diagnostic output.
- Use `DATABASE_URL` (`.env.local` / `.env.production.local`) for adoption. The adoption script does not read those.

### For `db:migrate:prod`

The script reads from `.env.production.local` (loaded by `db-prod.mjs`):

| Variable | Source | Required value |
|----------|--------|----------------|
| `CONFIRM_PROD_DB` | Process environment | `true` |
| `DATABASE_URL` | `.env.production.local` | Production Neon connection string |

**PowerShell session example:**

```powershell
$env:CONFIRM_PROD_DB = "true"
npm run db:migrate:prod
```

**If both commands run in the same session,** ensure the connection strings resolve to the same Production database identity. The adoption command proves identity via `PROD_ADOPT_DATABASE_URL`; the migration command proves identity via `.env.production.local` → `DATABASE_URL`. Both must target `ep-nameless-dawn-a61gilim` / `neondb`.

---

## Phases

---

### Phase 0 — Operator Authorization

**Gate: Human authorization required before any Production execution.**

Before proceeding, confirm:

1. [ ] A human operator has explicitly authorized this Production execution.
2. [ ] The repository commit containing the Architecture B implementation is the intended deployed/operator baseline.
3. [ ] Repository Git state is clean or understood. Record current state:
   ```powershell
   git status --short
   git log --oneline -3
   ```
4. [ ] The operator environment is correct (correct machine, correct Neon credentials, correct `.env.production.local`).
5. [ ] Implementation acceptance alone does **not** authorize Production execution. A separate human decision is required.

**STOP condition:** If any of the above is not confirmed, do not proceed.

**Record:** Commit hash at execution time: `____________________`

---

### Phase 1 — Recovery Readiness

**Gate: Human Neon-console confirmation required. No recovery confirmation = no Production mutation.**

Before any Production write, log into the Neon console and confirm:

1. [ ] Current Production project identified: `plain-band-91202732` (aredirlabs-prod).
2. [ ] Current Production branch identified: `br-crimson-shape-a6q4y35g` (main).
3. [ ] A fresh pre-operation recovery anchor exists. Options (confirm one):
   - A new Neon branch created specifically for this operation, OR
   - A fresh snapshot taken immediately before this operation, OR
   - PITR history-retention confirmed sufficient for the operation window.
4. [ ] Record recovery artifact:
   - Identifier/name: `____________________`
   - Creation timestamp (UTC): `____________________`
   - PITR/history-retention capability: `____________________`
   - Retention window: `____________________`

**STOP conditions:**
- Recovery anchor not confirmed → STOP.
- PITR/history-retention unknown or insufficient → STOP.

**Do not assume the historical 2026-08-20 snapshot is sufficient for this operation.** Verify current state independently.

**Important:** The runbook verifies that a recovery anchor exists. It does **not** automatically restore on failure. A restore is a separate destructive/operational decision requiring explicit human authorization (see Phase 7).

---

### Phase 2 — Preflight Identity & Materialization

**Gate: Environment prepared for adoption.**

Prepare the adoption command environment:

1. [ ] `.env.production.local` exists at repository root and contains a valid `DATABASE_URL` pointing to the Production Neon database.
2. [ ] Open a PowerShell session in the repository root.
3. [ ] Set environment variables for adoption:
   ```powershell
   $env:ADOPT_PROD = "true"
   $env:PROD_ADOPT_DATABASE_URL = "<Production connection string>"
   ```
4. [ ] Confirm `PROD_ADOPT_DATABASE_URL` is not `DATABASE_URL` from `.env.local` (dev) and is not a disposable target.

**The adoption command itself performs the live identity and materialization gates.** Do not duplicate those proofs manually unless there is a specific read-only verification reason.

**Expected identity the command will verify (for operator awareness):**

```
project=plain-band-91202732 branch=br-crimson-shape-a6q4y35g endpoint=ep-nameless-dawn-a61gilim database=neondb
```

**STOP condition:** If `PROD_ADOPT_DATABASE_URL` is empty or not set → the command exits immediately with exit code 2.

---

### Phase 3 — Historical Journal Adoption

**Gate: Human-executed command with explicit prior authorization.**

**Command:**

```powershell
npm run db:adopt:prod
```

**What this command is permitted to do:**

- Prove baseline + 0000–0007 materialization (all tables, types, columns, indexes, constraints from the manifest).
- Require prompts table and both prompt enums to be ABSENT.
- Validate existing journal state; refuse conflicting/unexpected history.
- Atomically create the Drizzle journal structure (`drizzle` schema + `__drizzle_migrations` table) if not present.
- Insert journal rows for baseline + 0000–0007 only (hash + canonical `when` from `_journal.json`).
- Verify resulting journal state.

**What this command does NOT do:**

- Replay historical DDL or execute migration SQL.
- Execute 0008.
- Migrate schema forward.
- Seed data.
- Push schema.

**Expected outcomes:**

| Outcome | Meaning | Action |
|---------|---------|--------|
| Exit 0, `adopted` | Journal rows written; adoption complete | Proceed to Phase 4 |
| Exit 0, `noop` | All 9 adopted rows already present; nothing written | Proceed to Phase 4 |
| Exit 2 | Authorization or URL unavailable | Fix env vars; re-run |
| Exit 3 | Live identity mismatch | **STOP** — investigate |
| Exit 4 | Materialization failure, prompts unexpectedly present, or journal conflict | **STOP** — investigate |
| Exit 1 | Runtime error | **STOP** — investigate |

**Operator stop conditions (do not continue):**
- Any exit code ≠ 0 with non-noop status.
- Materialization proof fails (missing tables/types from manifest).
- Prompts unexpectedly present before adoption.
- Journal conflict or unexpected history.
- Adoption transaction failure.

---

### Phase 4 — Adoption Acceptance Checkpoint

**Gate: Explicit human review of adoption output before forward migration.**

After Phase 3, review the command output and confirm:

1. [ ] The command exited with code 0.
2. [ ] Output confirms `Positive Production identity: exact match confirmed on all four values.`
3. [ ] Output confirms `Materialization proof: passed for all adopted migrations (baseline + 0000..0007).`
4. [ ] Output confirms `Prompts-absence proof: workspace_project_prompts and both enums absent.`
5. [ ] Output confirms `Recorded only baseline + 0000..0007. No migration SQL was executed; 0008 was not invoked.`
6. [ ] Journal now contains 9 rows (or was already complete from a prior adoption).
7. [ ] 0008 is **not** in the journal (remains unapplied).

**Expected post-adoption authority state:**

- `baseline + 0000–0007` are truthfully journaled with canonical hashes and timestamps.
- `0008_workspace_project_prompt_reconciliation` remains unapplied.
- `workspace_project_prompts` table absent.
- `workspace_project_prompt_type` enum absent.
- `workspace_project_prompt_status` enum absent.
- All pre-0008 operational data remains present (no DDL was executed).

**STOP condition:** Forward migration must **not** automatically follow adoption. A separate human authorization checkpoint is required (Phase 5).

**Record:**
- Adoption result: `adopted` / `noop`: `____________________`
- Journal row count: `____________________`

---

### Phase 5 — Forward Migration 0008

**Gate: Separate human authorization required. Only after Phase 4 acceptance.**

#### Pre-execution check

Before executing, confirm:

1. [ ] Phase 4 acceptance checkpoint completed and accepted.
2. [ ] The repository migration journal still identifies `0008_workspace_project_prompt_reconciliation` as the **only** intended forward migration.
   ```powershell
   # Read-only verification: check the journal entry for 0008
   node -e "const j = require('./drizzle/meta/_journal.json'); const t = j.entries.filter(e => e.tag.includes('0008')); console.log('0008 entries:', t.length === 1 ? '1 (idx ' + t[0].idx + ')' : t.length);"
   ```

   **STOP** if the output is not exactly `0008 entries: 1 (idx 9)`. If more than one entry or the tag is missing, the migration set is not the accepted baseline.
3. [ ] No additional unreviewed migration files exist beyond the accepted baseline:
   ```powershell
   # Read-only: list all migration files
   Get-ChildItem drizzle/*.sql | Select-Object Name
   ```
   Expected: 10 files (`0000_workspace_foundation_baseline.sql` through `0008_workspace_project_prompt_reconciliation.sql`). No unexpected files.
4. [ ] A human operator has explicitly authorized execution of forward migration 0008.

**If additional unreviewed migrations exist at execution time: STOP. Do not execute a migration set broader than the accepted runbook scope without a new human decision.**

#### Execution

**Command:**

```powershell
$env:CONFIRM_PROD_DB = "true"
npm run db:migrate:prod
```

**What this command does:**

- Reads `DATABASE_URL` from `.env.production.local`.
- Performs positive Production identity verification (exact match on all four values).
- Drizzle Kit sees the adopted history (9 rows in `drizzle.__drizzle_migrations`).
- Executes only unapplied migration(s): `0008_workspace_project_prompt_reconciliation` under the current authority state.
- Historical migrations (0000–0007) must **not** replay.

**Expected outcome:**

- Exit 0: Drizzle applies `0008_workspace_project_prompt_reconciliation.sql`.
- Schema changes: `workspace_project_prompts` table created, `workspace_project_prompt_type` and `workspace_project_prompt_status` enums created.

**STOP conditions (do not continue to Phase 6):**
- Migration wants to apply anything beyond 0008.
- Identity mismatch during migration.
- Runtime failure during migration.

---

### Phase 6 — Production Validation

**Gate: Read-only post-migration validation proving migration objective.**

Run the following read-only checks to confirm the migration succeeded. These are minimal evidence checks — do not query broadly.

Phase 6 uses one shared read-only verification script. Save the following to the temporary directory (do **not** commit it) and run it:

```powershell
# Create the verification script in the pre-approved temp directory
New-Item -ItemType Directory -Force -Path "$env:LOCALAPPDATA\Temp\opencode" | Out-Null
$verify = "$env:LOCALAPPDATA\Temp\opencode\verify-prod-0008.mjs"
```

**Verification script content (`$verify`):**

```powershell
@'
import { neon } from "@neondatabase/serverless";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";

const sql = neon(process.env.DATABASE_URL);

async function main() {
  // 6a. Repository journal reference count
  const j = JSON.parse(readFileSync("./drizzle/meta/_journal.json", "utf8"));
  console.log("Repository journal entries:", j.entries.length);

  // 6a. 0008 hash present in the database journal
  const tag = "0008_workspace_project_prompt_reconciliation";
  const content = readFileSync("./drizzle/" + tag + ".sql", "utf8");
  const hash = createHash("sha256").update(content).digest("hex");
  const rows = await sql`SELECT hash, created_at FROM drizzle.__drizzle_migrations WHERE hash = ${hash}`;
  console.log(rows.length ? "0008 journaled: hash=" + hash.slice(0, 16) + "..." : "0008 NOT in journal");

  // 6b. Prompts schema
  const tbl = await sql`SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='workspace_project_prompts' LIMIT 1`;
  console.log("workspace_project_prompts table:", tbl.length ? "EXISTS" : "MISSING");
  const e1 = await sql`SELECT 1 FROM pg_type t JOIN pg_namespace n ON n.oid=t.typnamespace WHERE n.nspname='public' AND t.typname='workspace_project_prompt_type' AND t.typtype='e' LIMIT 1`;
  console.log("workspace_project_prompt_type enum:", e1.length ? "EXISTS" : "MISSING");
  const e2 = await sql`SELECT 1 FROM pg_type t JOIN pg_namespace n ON n.oid=t.typnamespace WHERE n.nspname='public' AND t.typname='workspace_project_prompt_status' AND t.typtype='e' LIMIT 1`;
  console.log("workspace_project_prompt_status enum:", e2.length ? "EXISTS" : "MISSING");

  // 6c. Existing schema integrity (representative tables)
  for (const t of ["user", "session", "workspace_projects", "workspace_engineering_work", "workspace_project_focus_events", "workspace_project_prompts"]) {
    const r = await sql`SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name=${t} AND table_type='BASE TABLE' LIMIT 1`;
    console.log("table " + t + ":", r.length ? "OK" : "MISSING");
  }

  // 6d. Representative operational data
  const r1 = await sql`SELECT count(*)::int AS c FROM workspace_projects`;
  console.log("workspace_projects rows:", r1[0].c);
  const r2 = await sql`SELECT count(*)::int AS c FROM workspace_engineering_work`;
  console.log("workspace_engineering_work rows:", r2[0].c);
  const r3 = await sql`SELECT count(*)::int AS c FROM workspace_project_prompts`;
  console.log("workspace_project_prompts rows:", r3[0].c);
}

main().catch((e) => {
  console.error("Verification failed:", e?.message ?? e);
  process.exit(1);
});
'@ | Set-Content -Path $verify -Encoding UTF8
```

The `@' ... '@` here-string preserves the script verbatim (no PowerShell interpolation), so the backtick SQL template literals inside are safe. Do not paste the script inline into a PowerShell `node -e "..."` string.

**Run the verification:**

```powershell
$env:CONFIRM_PROD_DB = "true"
node --env-file=.env.production.local $verify
```

**Expected results:**

| Check | Expected |
|-------|----------|
| 6a repository journal entries | 10 |
| 6a 0008 in database journal | `0008 journaled: hash=...` |
| 6b prompts table | `EXISTS` |
| 6b prompt_type enum | `EXISTS` |
| 6b prompt_status enum | `EXISTS` |
| 6c all six tables | `OK` |
| 6d `workspace_projects` / `workspace_engineering_work` rows | existing counts (≥ 0) |
| 6d `workspace_project_prompts` rows | 0 |

#### 6e. Application/runtime acceptance

If the application has prompt-related runtime tests or acceptance checks, run them now:

```powershell
npm run test
```

Confirm prompt-related tests pass and no regressions in existing workspace tests.

**STOP conditions:**
- 0008 not in journal after migration.
- Prompts table or enums missing after migration.
- Pre-existing tables missing after migration.
- Evidence of operational-data loss or corruption.
- Runtime acceptance failures related to prompt changes.

---

### Phase 7 — Operational Acceptance

**Gate: Explicit human decision.**

After Phase 6 validation, the human operator decides:

| Decision | Action |
|----------|--------|
| **Accept** | Record disposition. Engineering Work may be marked complete. |
| **Reject / investigate** | Record findings. Do not mark Engineering Work complete. Investigate before re-running. |
| **Restore / recovery** | If material failure occurred: a restore is a separate destructive/operational decision requiring explicit human authorization. Capture evidence before deciding (see Recovery Handling below). |

**Record:**
- Final disposition: `____________________`
- Decision timestamp (UTC): `____________________`
- Operator: `____________________`

---

## Failure and Stop Conditions

| Condition | Phase | Action |
|-----------|-------|--------|
| Production identity mismatch | 2, 3, 5 | **STOP.** Investigate. Do not improvise forward. |
| Recovery anchor not confirmed | 1 | **STOP.** Do not proceed to any write. |
| PITR/history retention unknown/insufficient | 1 | **STOP.** |
| Repository baseline not expected | 0 | **STOP.** Confirm correct commit. |
| Unexpected migration files after accepted baseline | 5 | **STOP.** Do not execute. Require new human decision. |
| Adoption materialization failure | 3 | **STOP.** Resolve missing objects. Re-run adoption only. |
| Prompts unexpectedly present before adoption | 3 | **STOP.** Schema not in expected pre-0008 state. |
| Conflicting/unknown journal history | 3 | **STOP.** Do not silently normalize. |
| Adoption transaction failure | 3 | **STOP.** No journal write occurred. Investigate. |
| Post-adoption journal mismatch | 4 | **STOP.** Do not proceed to migration. |
| Historical migration replay attempt | 5 | **STOP.** Unexpected behavior. Investigate. |
| Migration wants to apply beyond accepted forward scope | 5 | **STOP.** Do not execute. Require new human decision. |
| Post-migration schema mismatch | 6 | **STOP.** Investigate. |
| Evidence of operational-data loss/corruption | 6 | **STOP.** Consider recovery decision (Phase 7). |

**For every hard stop: do not improvise forward. Stop and return to human review.**

---

## Recovery Handling

This runbook requires that a recovery anchor exists before any Production write (Phase 1). However:

- **The runbook does not automatically restore on failure.**
- **A restore is a separate destructive/operational decision requiring explicit human authorization.**

If a failure occurs that may warrant restoration:

1. **Capture evidence before deciding:**
   - Current database state (table existence, row counts for key tables).
   - Error output from the failed command.
   - Journal state (`SELECT hash, created_at FROM drizzle.__drizzle_migrations`).
   - Any partial schema changes (new tables/enums created by 0008).
   - Recovery anchor identifier and creation timestamp.

2. **Present evidence to human operator for decision.**

3. **If restore is authorized:** Execute via Neon console (point-in-time recovery or branch restore), not via this runbook.

---

## Evidence Record

The following evidence should be captured during execution. **Never record** passwords, connection strings, database credentials, or secrets.

| Evidence item | Value |
|---------------|-------|
| Repository commit/hash | `____________________` |
| Operator authorization timestamp (UTC) | `____________________` |
| Production project | `plain-band-91202732` |
| Production branch | `br-crimson-shape-a6q4y35g` |
| Production endpoint | `ep-nameless-dawn-a61gilim` |
| Production database | `neondb` |
| Recovery anchor identifier/name | `____________________` |
| Recovery anchor creation timestamp (UTC) | `____________________` |
| PITR retention confirmation | `____________________` |
| Adoption command result | `adopted` / `noop` / `failed` |
| Journal post-adoption row count | `____________________` |
| Forward-migration authorization timestamp (UTC) | `____________________` |
| Migration result | `success` / `failed` |
| Final journal row count | `____________________` |
| Prompts schema verification | `table` / `enums` / `all present` |
| Runtime acceptance result | `pass` / `fail` |
| Final human disposition | `accepted` / `rejected` / `restored` |
| Final disposition timestamp (UTC) | `____________________` |

---

## Compact Execution Checklist

```
Phase 0 — Authorization
  [ ] Human authorization obtained
  [ ] Commit baseline confirmed
  [ ] Git state clean or understood: ________________
  [ ] Environment correct

Phase 1 — Recovery Readiness
  [ ] Production project confirmed in Neon console
  [ ] Production branch confirmed in Neon console
  [ ] Recovery anchor created
  [ ] Recovery artifact: ________________
  [ ] PITR retention: ________________

Phase 2 — Preflight
  [ ] .env.production.local present
  [ ] ADOPT_PROD=true set
  [ ] PROD_ADOPT_DATABASE_URL set

Phase 3 — Adoption
  [ ] npm run db:adopt:prod
  [ ] Exit 0

Phase 4 — Adoption Checkpoint
  [ ] Identity match confirmed
  [ ] Materialization proof passed
  [ ] Prompts absent confirmed
  [ ] Journal state correct
  [ ] Human acceptance

Phase 5 — Forward Migration
  [ ] 0008 is only unapplied migration
  [ ] No unexpected migration files
  [ ] Human authorization for 0008
  [ ] CONFIRM_PROD_DB=true set
  [ ] npm run db:migrate:prod
  [ ] Exit 0

Phase 6 — Validation
  [ ] Journal contains 10 entries
  [ ] 0008 hash present in database journal
  [ ] workspace_project_prompts table EXISTS
  [ ] workspace_project_prompt_type enum EXISTS
  [ ] workspace_project_prompt_status enum EXISTS
  [ ] Pre-existing tables intact
  [ ] Operational data present
  [ ] Runtime acceptance pass

Phase 7 — Acceptance
  [ ] Final disposition: ________________
  [ ] Operator: ________________
```

---

## Engineering Work Update & Next Action

After successful Production reconciliation and validation:

1. Update the Engineering Work record to reflect Production reconciliation complete.
2. Record the Production evidence in the Engineering Work repository references.
3. Mark the Engineering Work as complete only after successful Phase 7 acceptance.

**Do not mark Engineering Work complete before Production validation passes.**

---

*This runbook was authored against repository commit `fa213ebe18634ae6f0fdd1fc832b1ba75eb61d0e`. Verify the repository baseline before execution.*
