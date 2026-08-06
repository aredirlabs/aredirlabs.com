# DEFECT-INTAKE-001-R1 — Workflow-Aware Defect Implementation

## Implementation

The Defect workflow now has its own creation, detail, and editing conversation while retaining one canonical Engineering Work parent record.

The shared parent stores title, familiar type, workflow, lifecycle state, concise defect synopsis, and current operational next action. The one-to-one Defect Context stores observed behavior, expected behavior, reproduction steps, environment, evidence, next investigation, and validation target.

## Atomic mutation contract

Defect creation is a single PostgreSQL CTE statement. It resolves the route-scoped project, inserts the parent, then inserts the context from the returned parent identity. If any stage fails, the statement fails and neither record remains.

Defect editing is likewise a single CTE statement. It updates the parent only when it is a route-scoped Defect record that already owns context, then updates the linked context. A missing project, parent, or context produces no parent update.

Delivery creation and updates retain their existing Drizzle paths and persistence shape.

## Context and parent semantics

Parent summary is a concise defect synopsis. Parent current next action is the operational continuation surfaced in Workspace and Project views. Defect `next_investigation` is the engineering investigation step. They are deliberately separate.

Defect workflow is locked on the edit form. A record owning Defect Context cannot transition to another workflow until context-retention semantics are designed.

## Validation target extension

The R1 conversation required a validation target. `0002_defect_context_validation_target.sql` adds it as required structured text to the validated Defect Context table. The table had zero rows before the additive migration, so no backfill was required.
