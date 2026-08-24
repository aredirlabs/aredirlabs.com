# PROJECT-UX-007 — Package 3 Implementation

| Field | Value |
| --- | --- |
| **Package** | PROJECT-UX-007 Package 3 |
| **Type** | Implementation record |
| **Status** | **COMPLETE** |
| **Date opened** | 2026-08-23 |
| **Date closed** | 2026-08-23 |
| **Governing architecture** | PROJECT-UX-007; PROJECT-UX-004; PROJECT-UX-005; PROJECT-UX-006; AREDIR-DISCOVERY-009 through -012 |

---

## Final disposition

**PROJECT-UX-007 Package 3 — Project Operating Context and Work Inventory Boundary is COMPLETE.**

All defined Package 3 acceptance criteria are satisfied across automated presentation-rule tests, build, package-scoped lint, `git diff --check`, read-only legitimate-data shaping, and authenticated operator/browser acceptance. No Package 3-specific blocker remains.

Package 3 scope is closed. **Package 4 was not started** and is not authorized by this closure.

Observed inventory visual density, narrow-list compression, missing authenticated theme-switch control, and duplicate New Engineering Work affordances are **nonblocking downstream UX evidence**. They were not remediated in Package 3.

---

## Implemented boundary

Package 3 separates Project operating context from complete Engineering Work inventory.

Implemented:

1. **Project operating brief** at the top of authenticated Project detail: identity, status, stage, target where present, and Project-local navigation (registry, inventory, new Work).
2. **Operational Focus** inside that brief, ahead of the Work projection. Zero focus is compact. One/many focus retains Package 2 projection, suppression, singleton/plural next-step, and clear control. Persistence, schema, lifecycle, actions, and concurrency are unchanged.
3. **Bounded Project Work projection** replacing the unbounded embedded collection. It discloses total and bound, renders only the documented subset, keeps every shown item navigable, and links to the complete inventory. No displayed item is labeled primary.
4. **Complete Project-scoped Engineering Work inventory** at `/workspace/projects/[slug]/engineering-work`. Every owned Work record is listed. Existing Work detail, activate, edit, evidence, complete, and new routes are retained. Not master/detail; no filters, search, saved views, row-selection URL state, previews, inspector, sibling traversal, or ranking.
5. **Project-detail reordering** so current Project truth precedes overview, registry metadata, milestones, documents, prompts, notes, and Operational Focus history. Those records remain reachable through disclosure or the existing collapsed history primitive.
6. **Responsive composition** using existing PROJECT-UX-005 primitives (`Surface`, `OperationalRow`, `EmptyState`, `FailureState`, `Disclosure`, `MetadataField`) without a new component system.
7. **Empty vs failed Work retrieval** distinguished on both Project detail and inventory, with Project orientation and a return path preserved.

Not implemented (explicit Package 3 exclusions):

- Authenticated shell architecture, activity rail, global orientation band, persistent Project context rail
- Master/detail, contextual inspector, filters/search, saved views
- Unified Engineering Work detail, form redesign, invoked authoring, command surface
- Personal focus, assignment, ranking, recommendation, notifications, comments
- Automatic focus transfer, priority authority, lifecycle/relationship/schema/migration/seed changes
- BUG-001 remediation and unrelated backlog

---

## Deterministic bounded-projection rule

**Presentation-only.** Documented in `src/lib/workspace/project-engineering-work-projection.ts` and covered by `src/lib/workspace/project-engineering-work-projection.test.ts`.

### Membership and order

1. Take the complete set of Engineering Work records owned by the Project.
2. Sort by Engineering Work `id`, lexicographic ascending.
3. Membership of the bounded projection is the first `PROJECT_ENGINEERING_WORK_PROJECTION_LIMIT` (5) records of that ordered set.
4. If total ≤ bound, every record is shown.
5. `total`, `bound`, and `omitted` are returned and disclosed by the Project surface.

Identifier order is identity-stable. Work IDs are random UUID-backed keys (`eng_work_${uuid}`) or stable seed keys; they are not a time-ordered ranking.

### Explicit non-inputs

Membership and order do **not** derive from:

- Operational Focus
- continuation
- attention
- `priority`
- recommendation
- recency (`createdAt`, `updatedAt`)
- lifecycle rank
- inferred importance
- title
- condition
- current next action
- input-array order from the query

Omission from the bounded set conveys no operational meaning. The complete inventory is the recovery path.

The projection result has no `primary` field and the UI does not label a shown item as primary, current, most important, next, or focused unless that fact is independently true (the existing Operational Focus marker is shown only when the Work is in the current shared selection set).

### Complete inventory grouping

The complete inventory lists every Project-owned Work record. Groups are the Work record's own lifecycle state, in `ENGINEERING_WORK_STATES` enum order, with empty groups omitted. Within each group, the same identifier presentation order is used. Group sequence is taxonomy of existing Work lifecycle authority, not a ranking of importance.

---

## Affected routes and components

| Path | Change |
| --- | --- |
| `src/app/workspace/projects/[slug]/page.tsx` | Recomposed around operating brief, focus, bounded projection, then secondary disclosure/history |
| `src/app/workspace/projects/[slug]/engineering-work/page.tsx` | **New** complete inventory route |
| `src/components/workspace/project-operating-brief.tsx` | **New** Project identity/posture/nav |
| `src/components/workspace/project-engineering-work-projection.tsx` | **New** bounded projection surface |
| `src/components/workspace/project-engineering-work-inventory.tsx` | **New** complete inventory surface |
| `src/components/workspace/project-engineering-work-row.tsx` | **New** shared `OperationalRow` composition |
| `src/components/workspace/project-operational-focus-section.tsx` | Compact zero-focus; history extracted; Surface wrapper removed so the brief owns chrome |
| `src/components/workspace/project-focus-history-timeline.tsx` | Outer margin removed so history can sit in a subordinate Surface |
| `src/components/workspace/project-engineering-work-section.tsx` | **Removed** unbounded collection with lifecycle-rank “primary” item |
| `src/lib/workspace/project-engineering-work-projection.ts` | Presentation rule, bound constant, inventory grouping, href helpers |
| `src/app/workspace/projects/[slug]/engineering-work-actions.ts` | Revalidate inventory path |
| `src/app/workspace/projects/[slug]/operational-focus-actions.ts` | Revalidate inventory path (focus marker freshness only; no focus mutation from navigation) |
| `package.json` | Register Package 3 presentation tests |

Existing nested routes retained:

- `/workspace/projects/[slug]/engineering-work/new`
- `/workspace/projects/[slug]/engineering-work/[workId]`
- `.../activate`, `.../edit`, `.../evidence`, `.../complete`

---

## Preserved authority semantics

- Project identity, status, stage, target, and milestones remain Project authority.
- Work lifecycle, next action, condition, outcome, and workflow remain Work authority.
- Operational Focus remains explicit shared Project selection with query-time derived projection. It is not inventory selection, continuation, attention, priority, or personal work.
- Zero, one, and many focused Work items remain equally truthful. Singular Project next step appears only for exactly one projected focus with a usable Work next action.
- Continuation and attention remain independently derived (unchanged Workspace queries).
- Null/zero focus is communicated; it is not suppressed.
- Presentation order is non-authoritative.
- No schema, migration, seed, persistence, or lifecycle behavior changes.
- Opening or navigating a Work row does not call focus commands.

---

## Tests

Added: `src/lib/workspace/project-engineering-work-projection.test.ts`

Proves:

- membership is first N of identifier-sorted records
- default bound is 5
- totals/omitted disclosure
- empty collection
- input-order independence
- lifecycle, recency, priority, focus, continuation, condition, and title do not determine membership/order
- mutating those fields on the same ids leaves the projection unchanged
- result has no `primary` field
- inventory grouping is complete, identifier-ordered within groups, omits empty groups

No Package 2 operational-focus tests were changed.

---

## Acceptance evidence by layer

| Layer | Scope | Disposition |
| --- | --- | --- |
| **Operator / browser** | Authenticated UI on legitimate dev data | **Verified** — AredirLabs.com operating context, focus-before-projection, EDITOR-001 independence, 5-of-19 bound, complete 19-record inventory, Work detail without focus mutation, ClassForge empty/zero-focus, narrow/mobile functional acceptance |
| **Automated / static** | Presentation-rule tests, build, lint, whitespace | **Verified** — 146/146 tests, build success, inventory route present, eslint pass, `git diff --check` pass |
| **Read-only data shaping** | Authorized dev database | **Verified** — totals and identifier-bound membership match operator observation; no writes |
| **Browser not reproduced** | Plural focus, Replace, Work-retrieval failure injection, authenticated in-product theme switching | **Supported at lower layers / deferred** — not required for Package 3 closure; theme switching is downstream shell/visual-system follow-up |

---

## Runtime acceptance status

| Layer | Status |
| --- | --- |
| Automated presentation-rule tests | **PASS** — `npm test` 146/146, including 11 Package 3 presentation-rule tests |
| Build | **PASS** — `npm run build`; inventory route `ƒ /workspace/projects/[slug]/engineering-work` present; existing Work nested routes retained |
| Package-scoped lint | **PASS** — eslint on Package 3 changed TypeScript files |
| `git diff --check` | **PASS** |
| Unauthenticated route probe | **PASS** — Project detail, inventory, and `engineering-work/new` return 307 to `/sign-in` |
| Read-only legitimate DB shaping | **PASS** — no rows were written; AredirLabs.com 19 / bound 5; ClassForge 0 |
| Authenticated operator/browser | **PASS** — see matrix below |

### Legitimate development data (read-only)

Observed on the authorized dev database; not modified. Operator acceptance used this same legitimate state.

| Project | Work total | Bounded projection | Notes |
| --- | --- | --- | --- |
| AredirLabs.com (`aredirlabs-com`) | 19 | 5 shown, 14 omitted | Singleton Operational Focus: EDITOR-001 (Active). EDITOR-001 is **not** in the identifier-bounded 5. That is correct: focus is independent of projection membership. |
| AlignFit (`alignfit`) | 2 | 2 shown, 0 omitted | Total ≤ bound; both records appear. Not required for Package 3 operator closure. |
| ClassForge (`classforge`) | 0 | empty | Operator-verified empty collection and compact zero focus. |
| LeagueOS (`leagueos`) | 0 | empty | Truthful empty collection. Not required for Package 3 operator closure. |

AredirLabs.com lifecycle mix (inventory grouping, not ranking): proposed 16, active 1, completed 2.

---

## Authenticated operator / browser acceptance

**Legitimate data.** No lifecycle or focus state was manufactured to increase coverage.

### Browser acceptance matrix

| Check | Result |
| --- | --- |
| AredirLabs.com Project operating context | **PASS** |
| Operational Focus appears before bounded Engineering Work | **PASS** |
| Legitimate singleton focus on EDITOR-001 remains independent from bounded inventory membership | **PASS** |
| Bounded projection correctly shows 5 of 19 records | **PASS** |
| Complete Project Engineering Work inventory exposes all 19 records separately | **PASS** |
| Opening an existing Engineering Work record uses the established detail experience and does not alter Operational Focus | **PASS** |
| ClassForge zero-Work Project state | **PASS** — Project orientation remains intact; zero Operational Focus is compact and explicit; Engineering Work presents a deliberate empty state rather than retrieval failure |
| Narrow/mobile viewport | **PASS** for Package 3 functional/responsive acceptance — no Package 3-blocking clipping, overlap, or navigation failure observed |

### Operator scenarios intentionally not reproduced

| Scenario | Disposition |
| --- | --- |
| Plural Operational Focus | Package 2 lower-layer evidence; not required for Package 3 closure |
| Replace / stale focus command UI | Package 2 lower-layer evidence |
| Injected Work-retrieval failure | FailureState path exists; not injected against live data |
| Authenticated in-product light/dark switch | Downstream shell/visual-system follow-up; not a Package 3 defect |

---

## Downstream UX observations (nonblocking)

These are **not Package 3 defects**. Package 3 was not expanded to remediate them.

1. **Complete Engineering Work inventory remains visually list-heavy** and does not yet express the intended state-centric Aredir engineering operating-environment / operations-center experience. Later inventory/shell work may address this; Package 3 required a complete collection destination, not that visual end-state.
2. **Narrow/mobile inventory is functional** but primarily compresses the record list rather than providing a purpose-designed mobile operating experience. Package 3 required the absence of blocking clipping, overlap, or navigation failure, which was met.
3. **Authenticated operators currently have no visible control for changing the persisted light/dark theme after sign-in.** Theme rendering has previously been observed in both modes, but theme switching cannot currently be exercised through authenticated product UI. Treat as authenticated shell/visual-system follow-up, not a Package 3 implementation defect.
4. **Duplicate New Engineering Work affordances** and remaining spatial inefficiencies are downstream visual/shell refinement evidence.

---

## Explicit deferrals

All PROJECT-UX-007 section 5 exclusions remain deferred, including former PROJECT-UX-004 Packages for shell/persistent context, full inventory master/detail, unified Work detail, and invoked authoring.

Package 4 (shell and persistent cross-altitude context per PROJECT-UX-007 §11) is **not authorized by this implementation** and was **not started**.

---

## Known limitations

- Secondary Project sections still use their pre-existing card chrome when revealed through `Disclosure`. That is presentation nesting, not new authority.
- Inventory grouping by lifecycle is scan taxonomy, not a filter model. There is no query string, saved view, or row-selection route.
- `OperationalRow` with `href` uses a native anchor (existing primitive). Client-side Next.js `Link` wrapping was not introduced.
- Work-retrieval failure on Project detail cannot state a numeric total; the UI states that Work could not be loaded and offers the inventory as the recovery path.
- Plural focus, Replace, and other Package 2 browser scenarios were not reproduced here; Package 2 lower-layer evidence still stands.
- Downstream UX observations above remain open for later packages and must not be read as Package 3 incompleteness.
