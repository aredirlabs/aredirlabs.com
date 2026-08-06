# PROJECT-UX-002 — Refinement Candidates

| Field | Value |
|---|---|
| Status | Complete — no canonical refinement recommended |
| Governing input | [Operational Application Assessment](./PROJECT-UX-002_OPERATIONAL_APPLICATION_ASSESSMENT.md) and [Phase 0 Discovery Inventory](../discovery/PROJECT-UX-002_EXISTING_AREDIR_EXPERIENCE_DISCOVERY.md) |
| Canonical authority | [AREDIR-UX-001 Workspace Experience Architecture](../company/architecture-patterns/AREDIR_UX_001_WORKSPACE_EXPERIENCE_ARCHITECTURE.md) |
| Proposed new terminology | None |

## Decision

No refinement candidate meets all required thresholds:

1. supported by implementation evidence;
2. not already covered by canonical guidance;
3. reusable across capabilities; and
4. sufficiently general for company architecture.

AREDIR-UX-001 already governs the concerns demonstrated by the current Workspace: clear Mission, one dominant Primary Action, relevant and subordinate Supporting Context, journey-led Navigation, and purposeful Identity. The Product Operating Environment Philosophy already governs current position and next correct action. The Evidence Lifecycle Pattern already governs the need to distinguish observation, evidence, interpretation, knowledge, decision, and outcome.

## Assessed non-candidates

| Observed implementation evidence | Existing canonical principle | Decision | Why it is not a refinement |
|---|---|---|---|
| Project’s featured Engineering Work and “New Engineering Work” are adjacent in the same section header. | AREDIR-UX-001 — Primary Action and Supporting Context | Do not promote | This is a local hierarchy application issue. The canonical pattern already says one dominant action and reduced competition; no general architectural gap is evidenced. |
| Defect detail gives observation, evidence, Next Investigation, and validation target equal grid treatment. | AREDIR-UX-001 — Supporting Context; Evidence Lifecycle Pattern — distinct lifecycle stages | Do not promote | The existing standards already require relevant hierarchy and distinct evidence stages. One static implementation does not establish an absent company rule, and authenticated comprehension evidence is deferred. |
| Defect intake and edit put structured investigation fields in a continuous group. | AREDIR-UX-001 — Mission, Primary Action, Supporting Context | Do not promote | The Defect flow is a single newly implemented workflow. The finding can guide a future local assessment but does not establish a cross-capability refinement. |
| Defect detail retains generic “Engineering objective” and edit retains generic “Edit Engineering Work” framing. | AREDIR-UX-001 — Mission and Identity | Do not promote | The canonical model already requires purpose and place identity. The observed label fit is implementation-specific and requires no new terminology or company architecture guidance. |
| Workspace uses a continuation projection and Engineering Work surfaces repository references as read-only supporting context. | Capability Distribution Architecture — authority precedes representation | Do not promote | This is an existing, correct application of the canonical authority boundary, not a gap. |
| Parent current operational next action and Defect Next Investigation are separately stored and displayed. | AREDIR-UX-001 — Primary Action / Supporting Context | Do not promote | The distinction is a workflow-specific data and presentation boundary. It is correctly represented without demonstrating a new universal experience principle. |

## Preconditions for reconsideration

A future refinement may be considered only through Aredir’s governed promotion process after evidence shows a recurring cross-capability problem that cannot be resolved by applying an existing canonical principle. At minimum, the evidence should include:

- authenticated runtime observation of the affected surface;
- a clear statement of the existing canonical principle that fails to cover the problem;
- more than one capability or independently validated implementation context; and
- a proposed change that extends, rather than renames or duplicates, AREDIR-UX-001.

Until then, the appropriate action is local implementation assessment against the existing architecture—not a new company principle.
