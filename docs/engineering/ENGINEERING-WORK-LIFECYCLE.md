# Engineering Work Lifecycle

## First-slice recommendation

Use five canonical progress states and two terminal alternatives:

```text
Proposed → Active → In Review → Completed → Closed
     └──────────────────────────────→ Cancelled
     └──────────────────────────────→ Superseded
Active / In Review ────────────────→ Cancelled or Superseded
Completed ─────────────────────────→ Superseded (only on material replacement before closure)
```

`Ready` is a derived readiness condition, not a state. `Paused`, `blocked`, `waiting`, `at risk`, `needs clarification`, `needs verification`, and `ready for promotion` are conditions with an optional rationale/date/reference, not lifecycle states. This aligns with the existing Aredir principle that operational conditions should not automatically become lifecycle states.

## States and transitions

| State | Meaning | Allowed transitions |
| --- | --- | --- |
| Proposed | Work is captured but not yet being undertaken. | Active, Cancelled, Superseded |
| Active | Work is underway. | In Review, Completed when review is inapplicable, Cancelled, Superseded |
| In Review | Work outcome/evidence is being assessed. | Active (rework), Completed, Cancelled, Superseded |
| Completed | Intended operational outcome is achieved and evidence/disposition has been assessed. | Closed, Superseded only when a replacement invalidates the completed outcome before closure |
| Closed | Completion and final operational disposition are recorded. | None |
| Cancelled | Work will not continue. | None |
| Superseded | A replacement Work record governs continued pursuit. | None |

## Readiness rules

Activation requires enough context to act, not a separate status transition. At minimum the record has a Project, title, summary, type, workflow, and a known next action or explicit reason that no action is currently possible. A linked repository work package, dependency review, or verification expectation is required only when the selected workflow or work scope makes it relevant.

## Completion and closure

- **Completed** means the stated operational outcome is reached, or its disposition is explicitly accepted; applicable repository references/evidence are cited rather than copied.
- **Closed** means the record’s final state, successor/cancellation information, residual follow-up, and knowledge/promotion disposition have been recorded. It is an administrative/traceability decision after completion, not an automatic event.

Completion does not publish documentation, perform promotion, merge code, or synchronize a repository. Those are separate actions and artifact authorities.

## Cancellation and supersession

- **Cancelled** records an intentional stop. Record a concise rationale and any resulting follow-up/related Work.
- **Superseded** records replacement by a different Engineering Work item. It requires a successor relation; the successor reciprocally identifies the superseded Work.
- Neither terminal outcome deletes the record, linked references, or historical meaning.

## Lifecycle invariants

- There is one canonical lifecycle state at a time.
- Conditions do not change lifecycle state by themselves.
- A transition requires a rationale when cancelling, superseding, returning from review to active, or completing without review.
- Work cannot close directly from Proposed, Active, or In Review.
- Dependency blockage may keep Work Active; it does not create a separate blocked state.
- Workflow classification does not change across transitions.

## Deferred lifecycle behavior

No baseline automation calculates readiness, promotes work, enforces workflow-specific checklists, assigns reviewers, or derives state from commits/CI. These may be evaluated only after real use demonstrates a need.
