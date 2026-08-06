# ENGINEERING-WORK-012 — Workflow Context Architecture

## Classification

Validated. Defect Context is the first and only workflow-specific persistence extension in this package. It keeps one canonical Engineering Work record while retaining defect investigation facts in a durable, project-scoped child record.

## Persistence-gate evidence

`DEFECT-INTAKE-001` established that the parent record's `summary` and `current_next_action` cannot faithfully preserve observed behavior, expected behavior, reproduction, environment, evidence, and next investigation. They remain parent concerns and must not become an encoded Defect payload.

The bounded model is therefore:

```text
workspace_engineering_work
  1 ─── 0..1 workspace_engineering_work_defects
```

`workspace_engineering_work_defects.engineering_work_id` is both the primary key and a foreign key to the parent. This makes the relationship one-to-one, prevents orphan records, and cascades deletion when the canonical parent is deleted.

## Canonical parent and context boundary

| Canonical Engineering Work | Defect Context |
| --- | --- |
| identity, project, title, type, workflow, lifecycle, timestamps | observed behavior, expected behavior, reproduction, environment, evidence, next investigation |
| concise defect synopsis in `summary` | detailed investigation record |
| operational `current_next_action` surfaced by Workspace and Project | engineer-facing `next_investigation` within the defect |
| related knowledge and repository evidence | no independent project identity or standalone authority |

The parent context remains authoritative for project scope. The child table has no project column; every read, create, and update helper resolves the parent through `workspace_projects.slug` and requires `workflow = defect`.

## Field semantics

All Defect Context fields are required structured text in this first slice:

| Field | Meaning |
| --- | --- |
| `observed_behavior` | What actually happened |
| `expected_behavior` | What should have happened |
| `reproduction_steps` | The smallest known repeatable sequence; an intermittent-event statement is valid |
| `environment` | Runtime and system context |
| `evidence` | HTTP status, console or stack-trace summary, screenshot reference, or log reference; not an attachment |
| `next_investigation` | The immediate defect-investigation or verification continuation |

The required `environment`, `evidence`, and `next_investigation` fields follow ENGINEERING-WORK-012, superseding the earlier intake placeholder's optional-field proposal.

## Application contract

`src/lib/workspace/defect-context.ts` provides only the needed typed operations:

- project-scoped retrieval by parent Engineering Work identity;
- creation only for an existing parent in the existing `defect` workflow;
- update only after resolving the same parent through the owning project.

The later Defect intake package must compose parent creation and child creation atomically. No form, server action, detail presentation, historical-record conversion, or seed data is included here.

## Integrity and transition limitation

The database foreign key rejects a context without a parent; the child primary key prevents more than one context for a parent; and cascade deletion prevents orphaning. The data-access helpers never accept project authority from the child record.

Workflow transitions are intentionally not supported for a record with Defect Context. The baseline Engineering Work contract already treats workflow as stable after creation. Context-retention semantics for a future transition have not been defined and must not be inferred.

## Rejected alternatives

- Generic JSON context: loses explicit nullability, field names, relational constraints, and queryability.
- Generic polymorphic workflow-context engine: anticipates unsupported future workflows without evidence.
- Six generic parent columns: changes the shared Engineering Work conversation to accommodate one workflow.
- Direct project ID on Defect Context: duplicates authority with no demonstrated integrity or query requirement.
- Flattening into summary or next action: fails the DEFECT-INTAKE-001 persistence gate.

## Future extension guidance

Future workflows require their own evidence, persistence assessment, and an explicit decision about whether a similarly narrow child context is warranted. This Defect table is not a template that automatically authorizes contexts for Discovery, Architecture, Verification, Documentation, or any other workflow.
