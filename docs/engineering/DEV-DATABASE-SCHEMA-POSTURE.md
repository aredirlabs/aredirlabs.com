# Dev Database Schema Posture

## Classification

**Pre-Engineering Work schema.**

The confirmed Neon Dev connection was inspected through a read-only `information_schema.tables` query. No data rows or sensitive Better Auth records were queried.

## Public table inventory

| Area | Tables observed |
| --- | --- |
| Better Auth | `user`, `session`, `account`, `verification` |
| Workspace foundation | `workspace_settings`, `workspace_projects` |
| Project memory | `workspace_project_milestones`, `workspace_project_notes`, `workspace_project_documents`, `workspace_project_prompts` |
| Engineering Work | Not present |
| Engineering Work references | Not present |
| Public migration-history metadata | Not present |

## Interpretation

The existing Dev database is initialized with the current Workspace baseline but has not received the Engineering Work tables. This aligns with the deferred migration evidence from AREDIR-ENGINEERING-WORK-003/004. AREDIR-DB-001 found that the executable Engineering Work migration and its SQL record are currently untracked, so no tracked migration was available to run; no schema action was performed.

## Protection record

No insert, update, delete, DDL, migration, seed, reset, or schema push was performed. No Production database was accessed.
