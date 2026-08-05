# ENGINEERING-WORK-UPDATE-001

## Evidence and scope

Self-hosted backlog intake produced an accidental duplicate WORKBENCH-001 record and showed that live Engineering Work needs correction and refinement without direct database intervention. This package adds only project-scoped updates for title, familiar type, workflow, lifecycle state, objective/summary, and recommended next action.

The edit route resolves the project from its slug and the record from both project identity and work ID. The server action authenticates every request, validates canonical schema enum values and existing text limits, trims values, preserves `created_at`, and updates `updated_at`. It cannot authorize an update by work ID alone.

No schema fields, deletion, retirement semantics, duplicate detection, history, comments, roles, assignments, or related-record changes are included. Repository references and related knowledge remain attached to the unchanged work ID.

## Concurrency boundary

`updated_at` was inspected for stale-edit detection. Existing PostgreSQL timestamps may retain sub-millisecond precision while browser form values do not, so an equality check would be unreliable without a deliberate data-contract change. Stale-edit protection is deferred rather than partially implemented.
