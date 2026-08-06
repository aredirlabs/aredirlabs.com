# ENGINEERING-WORK-011 — Workflow-Aware Engineering Intake

## Status

Implemented: framework and Delivery slice. No database migration is required.

## Purpose

Engineering Work remains one domain model while its creation experience changes its conversation according to the selected workflow. A workflow is an intake lens, not a separate record type or persistence model.

## Invariant Engineering Work model

Every Engineering Work record has these cross-workflow concerns:

| Concern | Current representation |
| --- | --- |
| Record identity | Generated `eng_work_*` ID |
| Project | Route-derived `projectId` |
| Title | `title` |
| Workflow | `workflow` |
| Lifecycle | `state` |
| Familiar type | `type` |

The current shared persistence contract also retains `summary` and `currentNextAction`. They are intentionally not reinterpreted as workflow-specific stored fields in this package.

## Workflow inventory and intended conversations

All entries below correspond to values already present in the Engineering Work workflow enum. This package does not change that enum.

| Workflow | Engineering intent | Minimum conversation | Naturally optional |
| --- | --- | --- | --- |
| Delivery | Plan and carry out an implementation change | Objective, Scope, Recommended next action | Scope |
| Defect | Record and investigate a software defect | Observed behavior, Expected behavior, Reproduction, Environment, Evidence, Next investigation | Environment, Evidence, Next investigation |
| Discovery | Understand an opportunity or uncertainty | Observation, Evidence, Hypothesis, Recommended next step | Evidence, Hypothesis |
| Research | Answer a bounded engineering question | Research question, Context, Evidence, Conclusion, Recommended next step | Context, Evidence, Conclusion |
| Architecture | Make or record a technical design decision | Problem, Constraints, Decision, Expected impact | Constraints, Expected impact |
| Maintenance | Sustain system health or reliability | Maintenance need, Affected area, Risk if deferred, Recommended next action | Affected area, Risk if deferred |
| Verification | Validate an engineering outcome | Validation target, Result, Evidence, Remaining risk | Evidence, Remaining risk |
| Documentation | Improve engineering documentation | Documentation need, Audience, Source material, Recommended next action | Audience, Source material |
| Promotion | Prepare a validated practice or asset for broader adoption | Candidate, Validation evidence, Target audience, Recommended next action | Validation evidence, Target audience |
| Release | Prepare a change for release | Release target, Included change, Validation status, Recommended next action | Included change, Validation status |

## UI architecture

`src/lib/workspace/engineering-work-intake.ts` is the single typed configuration for workflow intent, field definitions, requiredness, and implementation status. It is exhaustively keyed by the existing `EngineeringWorkWorkflow` union.

The create form always begins with shared fields: Title, Familiar type, Workflow, and Lifecycle state. Selecting Workflow updates a workflow-conversation section using this configuration.

Only Delivery is implemented. Its Objective and Recommended next action retain their existing controls, names, requiredness, validation, and persistence. Every other workflow receives a deliberate placeholder that shows its future conversation and clearly states that the current shared fields remain in use. No workflow-specific input is submitted or stored.

The existing server action remains the sole create path. It continues to validate the established enum values and inserts one `workspace_engineering_work` record with the unchanged fields. Project scope and record identity remain server-owned.

## Deferred Defect implementation and validation

Defect is configured but not implemented. Its later slice will render and validate the Defect conversation without introducing a second Engineering Work type or independent create flow. Persistence decisions, if needed, are out of scope for this package.

The existing HTTP 431 browser-state Engineering Work record is a preserved baseline for that later validation. It must not be edited, replaced, or duplicated by ENGINEERING-WORK-011. The Defect package will compare its structured intake against that unchanged record.

## Non-goals confirmed

This package does not add workflow enums, schema columns or migrations, workflow-specific persistence or validation, priority, rationale, dependencies, work-package creation, or lifecycle redesign.
