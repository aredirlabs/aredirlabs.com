# KNOWLEDGE-001 — Embedded Knowledge Experience

## Classification

Validated with limitations. The implementation is a deliberately narrow, read-only Hydration vertical slice; it does not add a relationship schema or infer knowledge relationships. Authenticated browser screenshots still require a local signed-in session.

## Current-state inventory

| Existing source | Classification | Relationship support used |
| --- | --- | --- |
| Project Documents | project document | Explicit project ownership plus a stable document ID |
| Knowledge Asset Registry | knowledge asset | Stable asset ID plus its existing AlignFit project association |
| Project Prompts | prompt | Available but not connected in this slice |
| Engineering Work repository references | repository-only artifact | Kept separate; no repository body is copied |
| Notes and milestones | unsupported | No knowledge-detail route or trustworthy work relationship |

The application has project-scoped document detail routes and Knowledge Asset detail routes. It has no existing generic Engineering Work-to-knowledge relationship field.

## Relationship method selected

`src/lib/workspace/related-knowledge.ts` contains a single deliberate configuration for `eng_work_alignfit_hydration_operational_state`. It resolves only stable identifiers, verifies the document belongs to the active project, and verifies the asset is already linked to that project. There is no title matching, repository search, or inferred relationship behavior. All other Engineering Work records receive the honest empty state.

## Hydration knowledge surfaced

| Item | Class | Authority location | Reason shown |
| --- | --- | --- | --- |
| Platform overview | Architecture project document | Workspace document | Establishes the documented AlignFit platform boundary and named architecture-pattern compatibility. |
| Evidence Lifecycle Pattern | Knowledge asset | Canonical Knowledge Base markdown | Supports confirmation of governing evidence before a bounded architecture outcome. |

The related-knowledge cards expose title, class, contextual relevance, project, authority location, review/update date, and direct detail route. The cards do not render document bodies. Repository references remain in their existing section below Related knowledge.

## Context-preserving navigation

Each related item carries the work ID and project slug as return context. The document and Knowledge Asset detail pages show a `Back to Engineering Work` link when opened from this experience. Direct navigation still retains each source's standard return destination.

## Validation results

| Check | Result |
| --- | --- |
| Hydration-specific related knowledge | Implemented through stable-ID configuration |
| Project isolation | Enforced for the document by project ID and for the asset by existing project association |
| Unrelated Engineering Work | Receives no configuration and therefore the empty state |
| Duplicate prevention | Each configured stable ID is returned once |
| Repository separation | Preserved; no repository body is stored or shown in Related knowledge |
| Keyboard/focus behavior | Links use the existing visible focus-ring treatment on the Engineering Work page |
| Desktop/mobile layout | Cards use existing responsive grid and wrapping styles |
| Lint | Passed (`npm run lint`) |
| Build | Passed (`npm run build`) |
| Whitespace diff check | Passed (`git diff --check`) |
| Authenticated screenshots | Blocked by the absence of a local authenticated browser session |

## Screenshots

No authenticated screenshots are included yet. The route requires an active Better Auth session, and screenshots should be captured during the local authenticated browser validation described in KNOWLEDGE-001.

## Limitations and next observed friction

The mapping is intentionally one work item and two sources. Adding more related knowledge requires a deliberate stable-ID configuration; there is no editor or generic relationship infrastructure. The next friction to observe is whether operators need an auditable, lightweight way to approve a relationship beyond source-controlled configuration.
