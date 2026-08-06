# DEFECT-INTAKE-001 — Workflow-Aware Defect Experience

## Classification

Not validated. The Defect workflow cannot yet capture its engineering conversation without collapsing distinct information into the generic Engineering Work fields. This package intentionally stops at the persistence gate rather than compromising the shared model.

## Workflow review

`ENGINEERING-WORK-011` remains the baseline:

- Delivery is the only implemented workflow conversation.
- Defect is already present as a placeholder in the workflow-aware intake configuration.
- The shared Engineering Work concerns remain title, familiar type, workflow, lifecycle, project, and record identity.
- No workflow enum was changed.

## Required Defect conversation

A Defect record needs the following independent, readable investigation fields below the shared fields:

| Field | Purpose | Required |
| --- | --- | --- |
| Observed Behavior | What actually happened | Yes |
| Expected Behavior | What should have happened | Yes |
| Reproduction | Minimal repeatable steps | Yes |
| Environment | Relevant local, production, browser, authentication, database, or version context | No |
| Evidence | Concise supporting evidence such as an HTTP status, stack trace, screenshot reference, or console-output summary | No |
| Next Investigation | Immediate engineering continuation | No |

This is intentionally a defect-reporting conversation, not a delivery-plan conversation. Attachment management, uploads, markdown editing, and the other stated non-goals remain out of scope.

## Persistence assessment

The present `workspace_engineering_work` persistence contract has two content fields beyond the shared record concerns:

- `summary` — required, currently labelled and validated as an Objective.
- `current_next_action` — required, currently labelled and validated as a Recommended next action.

Neither field can honestly represent the six Defect concepts. Combining observed behavior, expectation, reproduction, environment, and evidence into `summary` would make a generic text blob; using `current_next_action` for Next Investigation would also retain a Delivery-shaped presentation while losing the other distinctions. Existing nullable operational fields (`current_outcome`, `condition`, and `condition_rationale`) do not provide a coherent Defect contract and must not be repurposed implicitly.

The create and update server actions currently require `summary` and `current_next_action` for every workflow, and the detail page always presents them as an engineering objective and recommended next action. Therefore persistence and detail presentation do not support the Defect conversation without ambiguity.

## Narrow schema recommendation

Before Defect UI implementation, add a one-to-one Defect detail table keyed by Engineering Work identity, for example `workspace_engineering_work_defects`:

| Column | Nullability |
| --- | --- |
| `engineering_work_id` (primary key and foreign key to `workspace_engineering_work.id`) | Required |
| `observed_behavior` | Required |
| `expected_behavior` | Required |
| `reproduction` | Required |
| `environment` | Optional |
| `evidence` | Optional |
| `next_investigation` | Optional |
| `created_at`, `updated_at` | Required |

The server action should accept and validate this detail only when `workflow === "defect"`, insert it transactionally with the unchanged base Engineering Work row, and scope reads and updates through the owning project. Defect detail presentation should then render the six labels directly. Delivery must continue using the current base-record persistence and UI unchanged.

This is a narrowly scoped extension: it preserves one shared Engineering Work model, uses the existing workflow enum, introduces no new work type, and avoids reserving generic columns for one workflow's semantics.

## HTTP 431 comparison baseline

The historical HTTP 431 browser-state event remains unchanged. Its documented cause was accumulated localhost authentication and browser state causing excessive request headers before the server action ran. In the existing generic record, that information is necessarily mixed into Objective and Recommended next action prose.

The proposed Defect conversation would improve the comparison as follows:

| Criterion | Generic record | Proposed Defect record |
| --- | --- | --- |
| Readability | Investigation facts are mixed with intent | Observed and expected behavior are distinct |
| Completeness | Reproduction, environment, and evidence compete for free text | Each investigation concern has a dedicated field |
| Scanability | Reader must parse narrative | Labels expose the investigation state immediately |
| Investigation quality | Next action is detached from evidence context | Next Investigation follows the recorded evidence and environment |

No new Defect Engineering Work was created because the required structured persistence does not exist. Creating one through the current form would force the rejected flattened representation and would not be a valid comparison.

## Architectural observations

The workflow-aware framework correctly separates the conversation selected in the UI from the shared Engineering Work identity, type, workflow, lifecycle, and project scope. The first non-Delivery workflow demonstrates that conversation configuration alone is insufficient when the domain needs durable, independently readable facts. The recommended one-to-one detail table keeps that boundary explicit and provides a reusable pattern for any future workflow that needs structured persistence.
