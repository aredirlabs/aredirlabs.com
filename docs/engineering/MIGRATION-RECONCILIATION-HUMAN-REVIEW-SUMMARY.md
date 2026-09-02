# Migration Reconciliation — Human Review Corrections Summary

Scope of this record: the documentation-only corrections applied after the first human review of the Tracked Migration
Authority Reconciliation package. No migration SQL, scripts, `schema.ts`, migration journal entries, databases,
Engineering Work state, or package behavior were changed. Nothing was staged or committed.

## 1. Prompts/baseline decision record corrected

The implemented architecture remains **accepted**:

- `drizzle/0000_workspace_foundation_baseline.sql` does **not** contain `workspace_project_prompts` or its two enums.
- `drizzle/0008_workspace_project_prompt_reconciliation.sql` introduces those objects **universally**.
- Fresh and legacy paths therefore converge on the same canonical migration history and final schema.

The documentation now records the decision accurately in `TRACKED-MIGRATION-PATH-REPORT.md` and `AREDIR-DB-002.md`:

- The **original implementation authorization requested prompts in the historical baseline**.
- The implementation **deliberately departed** because Production does not materially contain prompts, which prevents the
  baseline from being truthfully adopted as a single materialized migration boundary on legacy Production.
- The baseline represents the **common materialized pre-tracked workspace foundation** that can be independently proven
  on legacy environments.
- `workspace_project_prompts`, although **declared before tracked-migration authority began**, was **never materialized
  in Production** and is therefore intentionally re-projected into governed authority through the first forward
  reconciliation migration (`0008`).

Explicit notes added:

- `notes` / `milestones` / `documents` are in the baseline because they are both pre-authority and materially present.
- `prompts` is the **exceptional sibling**: pre-authority but absent from Production.
- `0008` does **not** imply prompts was historically designed after `0007`.
- `0008` is a **reconciliation placement** chosen to establish one convergent migration history for fresh and adopted
  legacy environments.

The documentation does **not** claim that the original task required prompts to be excluded from the baseline; it states
that the original request was for prompts *in* the baseline and that the departure from that request was deliberate and
Production-grounded.

## 2. BUG-001 narrative status corrected

The free-form lifecycle classification **In-Review** was removed from the added BUG-001 documentation (`docs/bugs/
BUG-001_WORKSPACE_PROMPTS_UNAVAILABLE_IN_PRODUCTION.md`). It was replaced with neutral factual wording:

> A separately authorized repository remediation package addresses the schema gap (but not the failure-surface UI
> defects)… Repository remediation package authored and verified on disposable environments; Production adoption and
> schema reconciliation remain pending separate human authorization.

The record explicitly states it must **not** be described as Closed or resolved in Production. All formal triage fields
under `## For triage use only` (Triage date, Owner, Target fix, QA verified, Closed) were preserved **unchanged** — all
remain blank as committed. BUG-001 is not described as Closed or resolved in Production.

## 3. Implementation artifacts preserved

No implementation artifact was altered by this correction round. Unchanged (and not touched): `0000_workspace_foundation
_baseline.sql`, `0008_workspace_project_prompt_reconciliation.sql`, the original `0000`–`0007` SQL files,
`scripts/reconcile-legacy-migration-journal.mjs`, `scripts/verify-adoption-disposable.mjs`, `drizzle/meta/_journal.json`,
and `package.json`. No `schema.ts` change, no database contact, no seed, no migration execution.

## 4. Verification (documentation-only)

- Inspected the final diff: only the four documentation files were modified
  (`BUG-001_WORKSPACE_PROMPTS_UNAVAILABLE_IN_PRODUCTION.md`, `AREDIR-DB-002.md`, `DEV-DATABASE-SCHEMA-POSTURE.md`,
  `TRACKED-MIGRATION-PATH-REPORT.md`).
- `git diff --check -- docs/`: passed (no whitespace errors or conflict markers).
- Confirmed zero occurrences of "In-Review" remain in docs.
- Confirmed the BUG-001 triage table is byte-identical to its committed state.
- Confirmed no implementation files appear in the correction diff.
- The disposable database A/B suite was **not** rerun; Dev and Production were not contacted.

## Final status

Corrections applied and verified. No changes to implementation artifacts; nothing staged or committed. Pending human
review.
