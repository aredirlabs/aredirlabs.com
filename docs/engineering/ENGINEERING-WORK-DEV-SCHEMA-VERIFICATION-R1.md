# Engineering Work Dev Schema Verification R1

## Verification status

**Validated**

Catalog inspection after migration confirmed exactly one of each required table:

- `workspace_engineering_work`
- `workspace_engineering_work_repository_references`

Both tables are empty. The catalog also contains exactly the five approved Engineering Work enums.

## Engineering Work table

| Area | Actual evidence |
| --- | --- |
| Primary key / uniqueness | `id text NOT NULL`, primary key, unique btree index `workspace_engineering_work_pkey` |
| Project relation | `project_id text NOT NULL` → `workspace_projects(id)`; `ON DELETE CASCADE`, `ON UPDATE NO ACTION` |
| Required fields | `title`, `summary`, `type`, `workflow`, and `current_next_action` are `NOT NULL` |
| Lifecycle | `state engineering_work_state NOT NULL DEFAULT 'proposed'` |
| Optional operational fields | `current_outcome`, `priority`, `condition`, and `condition_rationale` are nullable text |
| Timestamps | `created_at` and `updated_at` are `timestamp NOT NULL DEFAULT now()` |

## Repository References table

| Area | Actual evidence |
| --- | --- |
| Primary key / uniqueness | `id text NOT NULL`, primary key, unique btree index `workspace_engineering_work_repository_references_pkey` |
| Work relation | `engineering_work_id text NOT NULL` → `workspace_engineering_work(id)`; `ON DELETE CASCADE`, `ON UPDATE NO ACTION` |
| Required reference fields | `repository`, `source_location`, `artifact_class`, and `authority` are `NOT NULL` |
| Optional metadata | `artifact_identifier`, `branch`, `commit_hash`, `last_reviewed_at`, and `note` are nullable |
| Status | `reference_status engineering_work_reference_status NOT NULL DEFAULT 'expected'` |
| Timestamps | `created_at` and `updated_at` are `timestamp NOT NULL DEFAULT now()` |

## Enum evidence

| Enum | Actual values |
| --- | --- |
| `engineering_work_type` | feature, task, bug, research, architecture, verification, documentation, maintenance, release |
| `engineering_work_workflow` | delivery, defect, discovery, research, architecture, maintenance, verification, documentation, promotion, release |
| `engineering_work_state` | proposed, active, in_review, completed, closed, cancelled, superseded |
| `engineering_work_reference_authority` | repository_authoritative, external_read_only, workspace_derived |
| `engineering_work_reference_status` | expected, verified, stale, missing |

The implemented nullability, defaults, indexes, foreign keys, and enum values match the approved Drizzle schema and Engineering Work contracts. No additional indexes or uniqueness constraints were specified by the approved migration.
