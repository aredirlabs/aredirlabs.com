# PROJECT-UX-005 — Authenticated Visual-System Foundation Implementation

| Field | Value |
| --- | --- |
| **Package** | PROJECT-UX-005 |
| **Type** | Implementation record |
| **Status** | Complete |
| **Date** | 2026-08-23 |
| **Remediation date** | 2026-08-23 |
| **Governing architecture** | PROJECT-UX-004 |
| **Scope** | Authenticated visual-system foundation primitives, theme, tokens, representative integration |

---

## Objective

Implement and validate the shared authenticated visual-system foundation required by PROJECT-UX-004. Establish reusable visual and semantic primitives for the authenticated environment, surface hierarchy, inset hierarchy, structured rows, operational state labels, metadata, disclosure, timeline/history, empty states, failure states, geometry, authority typography, semantic operational-role mapping, and authenticated theme foundation.

## Governing architecture

PROJECT-UX-004 — Authenticated Visual System and Operating Environment Architecture.

## Scope

- Authenticated theme foundation (dark-default, persistent preference, light support, public isolation)
- CSS token foundation (surface levels, operational roles, geometry, typography)
- 10 reusable UI primitives
- Semantic operational-role mapping utility
- Representative integration into 4 existing authenticated surfaces
- 49 foundation contract/behavior/semantic/boundary tests
- Public site boundary verification

## Anti-scope (NOT implemented)

- Operational Focus (Package 2)
- Focus persistence, focus selection UI
- Project restructuring (Package 5)
- Workspace restructuring
- Engineering Work inventory redesign (Package 4)
- Unified Engineering Work detail redesign (Package 6)
- Discussion/threading
- Lineage/relationship graph
- Command palette (Package 3)
- Full contextual inspector
- Full master/detail shell
- Fake telemetry, activity metrics, velocity, health scores
- Database remediation, BUG-001 remediation
- Schema changes, migrations
- Project-memory changes
- New Engineering Work lifecycle semantics

---

## Implementation decisions

### 1. Theme foundation (remediated F-01, F-09)

- `AuthenticatedThemeProvider` (client component) is mounted inside the workspace layout
- **Root direct-entry initialization**: pathname-aware `<Script strategy="beforeInteractive">` is rendered inside the explicit root `<head>` and selects the authenticated or public environment before hydration
- **Authenticated direct entry**: reads `aredir-auth-theme` and defaults dark when no authenticated preference exists
- **Public direct entry**: reads `aredir-theme` and otherwise follows the public system preference
- **Client transitions**: `AuthenticatedThemeProvider` uses `useLayoutEffect` to apply authenticated preference before paint and restore public explicit-or-system preference on exit
- Uses **separate localStorage keys**: `aredir-auth-theme` (authenticated) and `aredir-theme` (public)
- `suppressHydrationWarning` on `<html>` handles server/client class mismatch
- No inline `<script>` in workspace layout (React server components do not execute scripts on client navigation)
- No test-only globals or debug controls; runtime preference can be set directly through localStorage for acceptance

### 2. CSS token architecture

Added to `globals.css`:
- **Surface level tokens**: `--surface-environment`, `--surface-surface`, `--surface-inset`
- **Operational role tokens**: `--role-actionable`, `--role-attention`, `--role-settled`, `--role-inert` (with bg/border variants for both themes)
- **Taxonomy tokens**: `--taxonomy-bg`, `--taxonomy-border`, `--taxonomy-text`
- **Geometry tokens**: `--radius-surface`, `--radius-inset`, `--radius-control`, `--radius-badge`
- **Spacing tokens**: `--space-surface-x/y`, `--space-inset-x/y`, `--space-row-x/y`
- **Typography tokens**: `--type-altitude`, `--type-section`, `--type-truth`, `--type-narrative`, `--type-metadata`, `--type-identifier`, `--type-state`, `--type-evidence`

All tokens are mapped to Tailwind utility classes via `@theme inline`.

Role text colors are calibrated for WCAG AA (4.5:1) against their role backgrounds at the minimum rendered size (0.6875rem / 11px). See F-02 remediation details below.

### 3. Primitives created

| Primitive | File | Purpose |
| --- | --- | --- |
| `Environment` | `src/components/ui/environment.tsx` | Authenticated altitude field and structural base |
| `Surface` | `src/components/ui/surface.tsx` | Primary operating content region (default/primary/attention/danger variants) |
| `Inset` | `src/components/ui/inset.tsx` | Subordinate content within a Surface |
| `OperationalRow` | `src/components/ui/structured-row.tsx` | Dense inventory row with identity, state, metadata, action |
| `StateLabel` | `src/components/ui/state-label.tsx` | Four operational roles + neutral taxonomy |
| `MetadataField` | `src/components/ui/metadata-field.tsx` | Label/value/identifier semantics |
| `MetadataGroup` | `src/components/ui/metadata-field.tsx` | Responsive grid composition for metadata |
| `Disclosure` | `src/components/ui/disclosure.tsx` | Accessible subordinate-content reveal (collapsed by default) |
| `Timeline` | `src/components/ui/timeline.tsx` | History region, collapsed by default via `<details>` |
| `TimelineEntry` | `src/components/ui/timeline.tsx` | Single lifecycle transition with full evidence fields |
| `EmptyState` | `src/components/ui/empty-state.tsx` | Truthful absence with optional action |
| `FailureState` | `src/components/ui/failure-state.tsx` | Four failure classes with known-facts pattern |

### 4. Semantic operational-role mapping

Created `src/lib/workspace/operational-role-mapping.ts` with pure functions:
- `getEngineeringWorkStateRole(state)` → actionable/attention/settled/inert
- `getProjectStatusRole(status)` → actionable/inert
- `getReferenceStatusRole(status)` → attention/settled/neutral
- `getMilestoneStatusRole(status)` → actionable/attention/settled/inert

Per PROJECT-UX-004 §9: "A role is a presentation family, not a lifecycle state."

### 5. Badge migration

- `EngineeringWorkStateBadge` now uses `StateLabel` with role from `getEngineeringWorkStateRole`
- `ProjectStatusBadge` now uses `StateLabel` with role from `getProjectStatusRole`
- `ProjectStageBadge` uses `StateLabel` with `neutral` role (stage is taxonomy per §9)
- Type/workflow badges use unified geometry via `--radius-badge` and `--type-state` tokens
- Hardcoded Tailwind palette colors (`amber-500`, `sky-500`, etc.) replaced with semantic role tokens

---

## Theme behavior (remediated F-01, F-09)

| Behavior | Implementation |
| --- | --- |
| Authenticated dark default | Pathname-aware `beforeInteractive` initializer reads `aredir-auth-theme`; defaults dark if no preference is stored |
| Public default | The same initializer reads `aredir-theme`; without an explicit preference it follows `prefers-color-scheme` |
| Persistent preference (auth) | `localStorage` key `aredir-auth-theme` (separate from public `aredir-theme`) |
| Persistent preference (public) | `localStorage` key `aredir-theme` (separate from auth `aredir-auth-theme`) |
| Light support | Full light token set in `:root`; toggle available via `ThemeToggle` |
| Public site unaffected | Separate storage keys; provider cleanup restores public theme on unmount |
| Direct-entry first paint | Root `beforeInteractive` initializer chooses the environment from `window.location.pathname` before hydration |
| Client transitions | Provider layout effect applies auth theme and restores public explicit-or-system theme before paint |
| Testable contract | Pure resolution functions plus execution of the production initializer; browser acceptance manipulates localStorage directly |

---

## Semantic operational-role mapping

| Domain axis | Actionable | Attention | Settled | Inert | Neutral taxonomy |
| --- | --- | --- | --- | --- | --- |
| Engineering Work state | `active`, `in_review` | — | `completed`, `closed`, `cancelled` | `proposed`, `superseded` | — |
| Project status | `active`, `testing` | — | — | `planning`, `paused`, `archived` | — |
| Project stage | — | — | — | — | All values |
| Reference status | — | `stale`, `missing` | `verified` | — | `expected` |
| Milestone status | `active` | `blocked` | `completed` | `planned`, `deferred` | — |

---

## Representative surfaces integrated

| Surface | Changes | Why chosen |
| --- | --- | --- |
| Engineering Work detail (defect branch) | Surface, MetadataField, Disclosure, Timeline, EmptyState, FailureState | Canonical reference pattern from DEFECT-UX-001 |
| Engineering Work detail (non-defect branch) | Surface, MetadataField, EmptyState, FailureState | Replace equal-weight card stack |
| Project engineering-work section | Surface, EmptyState, FailureState (neutral, no focus endorsement) | Proves variant usage, error/empty patterns |
| Workspace root | FailureState (unknown class) | Proves authenticated error presentation |

---

## Geometry changes

| Token | Value | Purpose |
| --- | --- | --- |
| `--radius-surface` | `0.375rem` | Structural regions: precise, nearly square |
| `--radius-inset` | `0.25rem` | Subordinate content: smaller, quieter |
| `--radius-control` | `0.375rem` | Interactive controls |
| `--radius-badge` | `0.25rem` | State labels: restrained, not pills |
| `--space-surface-x` | `1.5rem` | Surface horizontal padding |
| `--space-surface-y` | `1.5rem` | Surface vertical padding |
| `--space-inset-x` | `1rem` | Inset horizontal padding |
| `--space-inset-y` | `0.75rem` | Inset vertical padding |

Per PROJECT-UX-004 §7: "Structural regions use small or nearly square radii."

---

## Typography changes

| Token | Size | Use |
| --- | --- | --- |
| `--type-altitude` | `1.875rem` | Page/altitude heading |
| `--type-section` | `1.125rem` | Section heading |
| `--type-truth` | `1rem` | Operational truth, primary state |
| `--type-narrative` | `0.875rem` | Narrative prose, descriptions |
| `--type-metadata` | `0.75rem` | Labels, secondary facts |
| `--type-identifier` | `0.75rem` | IDs, slugs, paths (monospace) |
| `--type-state` | `0.6875rem` | State labels, badges |
| `--type-evidence` | `0.8125rem` | Evidence, history text |

Per PROJECT-UX-004 §12: "Monospace for labels/identifiers; normal readable typography for narrative prose."

---

## WCAG AA contrast remediation (F-02)

Role text colors were recalibrated for WCAG AA compliance at 0.6875rem (11px) against their respective role backgrounds:

| Role | Light text | Light bg | Light result | Dark text | Dark bg | Dark result |
| --- | --- | --- | --- | --- | --- | --- |
| Actionable | `oklch(0.38 0.18 262)` | `oklch(0.55 0.18 262 / 6%)` | ≥4.5:1 | `oklch(0.74 0.16 262)` | `oklch(0.70 0.16 262 / 8%)` | ≥4.5:1 |
| Attention | `oklch(0.40 0.14 70)` | `oklch(0.62 0.13 70 / 6%)` | ≥4.5:1 | `oklch(0.82 0.13 78)` | `oklch(0.80 0.13 78 / 8%)` | ≥4.5:1 |
| Settled | `oklch(0.45 0.02 262)` | `oklch(0.50 0.02 262 / 5%)` | ≥4.5:1 | `oklch(0.74 0.012 262)` | `oklch(0.72 0.012 262 / 6%)` | ≥4.5:1 |
| Inert | `oklch(0.38 0.01 260)` | `oklch(0.70 0.01 260 / 5%)` | ≥4.5:1 | `oklch(0.66 0.01 262)` | `oklch(0.55 0.01 262 / 6%)` | ≥4.5:1 |
| Taxonomy | `oklch(0.42 0.02 262)` | `oklch(0.96 0.006 260)` | ≥4.5:1 | `oklch(0.74 0.012 262)` | `oklch(0.26 0.006 262)` | ≥4.5:1 |

---

## Accessibility verification

- StateLabel uses `aria-label` for text content
- Disclosure uses native `<details>/<summary>` for keyboard and AT support
- FailureState uses `role="alert"` for error announcement
- EmptyState uses `role="status"` for absence communication
- Focus-visible ring applied to all interactive primitives
- Color is never the sole carrier of meaning (text labels always present)
- `--type-state` minimum size is `0.6875rem` (11px) — above micro-text threshold
- Reduced-motion: `motion-reduce:transition-none` on OperationalRow hover, Disclosure chevron, and Timeline collapsed-state chevron
- OperationalRow prevents nested interactive content (action not rendered inside href anchor)
- Timeline uses valid `<ol>/<li>` composition (empty state renders as `<li>` not `<p>`)

---

## Responsive verification

Primitives use flexible layouts:
- `MetadataGroup` supports responsive grid (`sm:grid-cols-2`, etc.)
- `OperationalRow` uses `flex` with `min-w-0 flex-1` for truncation
- `Surface`/`Inset` use percentage-based padding via tokens
- `Disclosure` content wraps naturally
- All integrated surfaces retain existing responsive behavior

Operator runtime acceptance at approximately 390×844 passed in authenticated light and dark. No horizontal overflow, clipping, broken wrapping, or theme-specific responsive regression was observed.

---

## Final operator runtime acceptance

The remaining bounded verification was completed against the local authenticated Aredir environment using an existing persisted Completed Defect. No verification fixture or artificial lifecycle data was created.

### Completed Engineering Work and Timeline

- Completed Engineering Work detail rendered correctly.
- Lifecycle History rendered collapsed by default and expanded/collapsed correctly.
- Because the persisted record predates post-migration lifecycle-history capture, the interface truthfully rendered: “No post-migration lifecycle history has been recorded.”
- Record Details remained correctly composed after expanding the Timeline.
- With `prefers-reduced-motion: reduce`, disclosure state remained correct without inappropriate transition behavior.

### Computed runtime contrast

Edge DevTools accessibility inspection measured actually rendered authenticated UI:

| Theme | Rendered element | Contrast | Result |
| --- | --- | ---: | --- |
| Dark | TYPE taxonomy label | 14.28:1 | PASS |
| Dark | BUG type badge | 6.73:1 | PASS |
| Dark | DEFECT workflow badge | 6.93:1 | PASS |
| Dark | COMPLETED settled lifecycle state | 7.18:1 | PASS |
| Dark | PROPOSED inert lifecycle state | 5.51:1 | PASS |
| Light | PROPOSED inert lifecycle state | 8.58:1 | PASS |

The rendered PROPOSED state exercises the previously remediated inert operational role and exceeds the 4.5:1 WCAG AA requirement in both authenticated themes.

---

## Tests

| Test file | Tests | Status |
| --- | --- | ---|
| `visual-system-foundation.test.ts` | 49 | All passing (included in `npm test`) |
| `workspace-operational.test.ts` | 43 | All passing (pre-existing) |
| `engineering-work-history.test.ts` | — | Pre-existing |
| `repository-reference-persistence.test.ts` | — | Pre-existing |
| `queries-sql-structure.test.ts` | — | Pre-existing |

Foundation tests verify: operational-role mapping behavioral correctness (all domain values), primitive export contracts, badge migration source-level verification, pure public/authenticated theme resolution, authenticated route recognition, execution of the actual pre-paint initializer for default/stored/system cases, storage-key isolation, layout-effect transition ownership, absence of the invalid Workspace script mechanism, CSS token existence in both themes, Timeline collapsed-by-default `<details>` usage, OperationalRow nested-interactive prevention, and reduced-motion contracts. These tests do not claim to prove browser paint behavior.

---

## Build result

- `npx tsc --noEmit`: fails — one pre-existing error at `engineering-work-history.test.ts:392` (ES2018 regex flag targeting issue, exit code 2). No errors introduced by this package.
- `npm run build`: success (Next.js 16.2.7/Turbopack; 2.6s compile, TypeScript phase successful)
- `npm run lint`: clean for PROJECT-UX-005 files; pre-existing 3 errors + 1 warning in `queries-sql-structure.test.ts` only
- `git diff --check`: clean

---

## Files changed

### New files
- `src/components/authenticated-theme-provider.tsx`
- `src/components/ui/environment.tsx`
- `src/components/ui/surface.tsx`
- `src/components/ui/inset.tsx`
- `src/components/ui/state-label.tsx`
- `src/components/ui/structured-row.tsx`
- `src/components/ui/metadata-field.tsx`
- `src/components/ui/disclosure.tsx`
- `src/components/ui/timeline.tsx`
- `src/components/ui/empty-state.tsx`
- `src/components/ui/failure-state.tsx`
- `src/lib/workspace/operational-role-mapping.ts`
- `src/lib/theme-preference.ts`
- `src/lib/workspace/visual-system-foundation.test.ts`
- `docs/discovery/PROJECT-UX-005_AUTHENTICATED_VISUAL_SYSTEM_FOUNDATION_IMPLEMENTATION.md`

### Modified files
- `src/app/globals.css` — Added surface, role (AA-calibrated), geometry, typography, taxonomy tokens
- `src/app/layout.tsx` — Added pathname-aware `next/script` `beforeInteractive` environment initializer inside the explicit root `<head>`; corrected the invalid former direct-child-of-`<html>` placement
- `src/app/workspace/layout.tsx` — Removed invalid nested script mechanism; mounts AuthenticatedThemeProvider
- `src/components/theme-toggle.tsx` — Uses shared public resolution rules and storage-safe preference access
- `src/components/workspace/engineering-work-badges.tsx` — Migrated to StateLabel + role mapping
- `src/components/workspace/project-status-badge.tsx` — Migrated to StateLabel + role mapping
- `src/components/workspace/project-engineering-work-section.tsx` — Migrated to Surface, EmptyState, FailureState; removed focus endorsement
- `src/app/workspace/projects/[slug]/engineering-work/[workId]/page.tsx` — Migrated to Surface, MetadataField, Disclosure, Timeline, EmptyState, FailureState; restored all history evidence
- `src/app/workspace/page.tsx` — Migrated to FailureState (unknown class)
- `package.json` — Added `visual-system-foundation.test.ts` to test script

## Intentionally deferred work

1. **Full Project detail restructure** (Package 5) — not in scope
2. **Engineering Work inventory with master/detail** (Package 4) — not in scope
3. **Workspace instrumentation** (Package 7) — not in scope
4. **Command surface** (Package 3) — not in scope
5. **Operational Focus** (Package 2) — explicitly excluded
6. **Theme selector UX** — no user-facing settings panel created; preference persists via localStorage
7. **Overlay/InvokedPanel primitive** — deferred to Package 3 (shell work)
8. **Inventory/Table primitive family** — deferred to Package 4

---

## Known limitations

1. The `ThemeToggle` component exists but is not rendered in the workspace nav. Theme is set automatically to dark on first visit. A settings page toggle is deferred.
2. The workspace nav still uses `bg-card/40` instead of `bg-surface-surface/40` — nav restructure is Package 3.
3. The project detail page still uses inline `rounded-lg border border-border bg-card p-6` containers — full adoption is Package 5.
4. `npx tsc --noEmit` exits nonzero due to a pre-existing ES2018 regex targeting error in `engineering-work-history.test.ts:392`, unrelated to this package.
5. The `queries-sql-structure.test.ts` file has pre-existing ESLint errors (3 `no-explicit-any`, 1 `no-unused-vars`) unrelated to this package.
6. The root `beforeInteractive` initializer runs on initial document load; client environment transitions are owned by the authenticated provider's layout-effect mount/cleanup boundary.
7. Static and VM execution tests verify selection logic and initializer execution; operator runtime acceptance subsequently verified direct loads, cross-environment transitions, logout persistence, both authenticated themes, and narrow responsive behavior.
8. Runtime verification falsified the former placement of the `beforeInteractive` Script directly beneath `<html>`. After moving it into the explicit root `<head>`, the operator could not reproduce the script-placement or hydration errors and observed no new console errors.
9. Final operator acceptance verified the persisted Completed Engineering Work detail, collapsed/expanded Timeline behavior, truthful absence of post-migration history, stable Record Details composition, reduced-motion behavior, and computed contrast in rendered authenticated UI.

---

## Finding-by-finding closure matrix

| Finding | Classification | Severity | Remediation | Evidence | Status |
| --- | --- | --- | --- | --- | --- |
| **F-01** | ARCHITECTURE VIOLATION | High | Removed invalid React-rendered Workspace script; after runtime exposed the root Script as an invalid direct child of `<html>`, moved the pathname-aware `beforeInteractive` initializer into the explicit root `<head>`; provider uses a layout effect for client entry and public-theme restoration on exit; storage keys remain independent | Static/VM coverage verifies selection logic. Operator runtime acceptance passed authenticated default/light/dark, public/authenticated isolation, logout persistence, subsequent public navigation, repeated reload/authentication/theme transitions, and found no script-placement, hydration, or new console errors | **CLOSED** |
| **F-02** | ACCESSIBILITY DEFECT | High | Role text colors recalibrated for WCAG AA at 11px in both themes; dark inert brightened to `oklch(0.66 0.01 262)` for ≥4.5:1 on all backgrounds | Token calculations are corroborated by Edge DevTools inspection of rendered UI: dark TYPE 14.28:1, BUG 6.73:1, DEFECT 6.93:1, COMPLETED 7.18:1, PROPOSED inert 5.51:1; light PROPOSED inert 8.58:1 | **CLOSED** |
| **F-03** | FUNCTIONAL DEFECT | High | TimelineEntry now accepts and renders `decisionBasis`, `nextActionTransition`, `outcomeTransition`, `finalDisposition`; EngineeringWorkHistory passes all fields | `timeline.tsx` contains all new props; `page.tsx` history component passes `decisionBasis={basis}`, `nextActionTransition`, `outcomeTransition`, `finalDisposition` | **CLOSED** |
| **F-04** | ARCHITECTURE VIOLATION | Medium | Removed `variant="primary"` from Surface; removed "Current operational focus" and "Most important work" labels; removed actionable styling from first-record article; changed failure class to "unknown" | `project-engineering-work-section.tsx` uses `variant="default"` (no variant prop); no `text-role-actionable` or `border-role-actionable-border` in article styling | **CLOSED** |
| **F-05** | ARCHITECTURE VIOLATION | Medium | Timeline uses native `<details>/<summary>` for collapsed-by-default; empty state renders as `<li>` instead of `<p>` in `<ol>` | Static contract tests pass; operator verified an existing Completed Defect renders collapsed by default, expands/collapses correctly, truthfully reports no post-migration history, and preserves Record Details composition | **CLOSED** |
| **F-06** | ARCHITECTURE VIOLATION | Medium | All catch-all error classifications changed to `unknown`; failure guidance made source-neutral (no database/development-environment implications) | Work detail page: `failureClass="unknown"`, message "Please try again or contact support if the issue persists."; workspace page: same pattern; project section: `failureClass="unknown"` | **CLOSED** |
| **F-07** | ACCESSIBILITY DEFECT | Medium | OperationalRow: action not rendered when `href` is set (`action && !href`); added `motion-reduce:transition-none`; Timeline: collapsed-state chevron has `motion-reduce:transition-none`, empty state uses `<li>`; Disclosure: chevron has `motion-reduce:transition-none` | Static contracts verify nested-interaction prevention and reduced-motion classes; operator verified disclosure state remained correct under `prefers-reduced-motion: reduce` without inappropriate transition behavior | **CLOSED** |
| **F-08** | VERIFICATION GAP | Medium | Replaced source-string assertions that accepted the failed root Script architecture with executable environment-resolution and initializer tests; foundation suite remains in `npm test` | `visual-system-foundation.test.ts` contains 49 tests; theme cases execute the production initializer and assert authenticated default/light/dark, public stored/system behavior, storage-unavailable fallbacks, route selection, and storage-key isolation | **CLOSED** |
| **F-09** | VERIFICATION GAP | High | Corrected authenticated browser verification was performed at desktop and approximately 390×844, in light and dark, including direct loads, public/authenticated isolation, logout, public navigation after logout, and repeated transitions | All reported theme and responsive cases passed; former script-placement/hydration errors were not reproduced; no new console errors occurred; development runtime remained stable | **CLOSED** |
| **F-10** | VERIFICATION GAP | Low | Corrected verification evidence: `npx tsc --noEmit` fails with exit code 2 due to pre-existing `engineering-work-history.test.ts:392` ES2018 regex targeting error (not clean/successful); pre-existing `queries-sql-structure.test.ts` ESLint errors documented as 3 errors + 1 warning | `tsc --noEmit` output confirms one error at `engineering-work-history.test.ts:392`; "Build result" and "Known limitations" sections updated | **CLOSED** |

### Closure summary

| Status | Count | Findings |
| --- | --- | --- |
| CLOSED | 10 | F-01 through F-10 |
| PARTIALLY CLOSED | 0 | None |

---

## Acceptance evidence

1. ✅ 92/92 total tests pass (49 foundation + 43 existing, unified `npm test`)
2. ❌ `npx tsc --noEmit` fails — one pre-existing error at `engineering-work-history.test.ts:392` (exit code 2), no errors from this package
3. ✅ `npm run build` succeeds (Turbopack)
4. ✅ `npm run lint` clean for package files (pre-existing issues in `queries-sql-structure.test.ts` only)
5. ✅ `git diff --check` clean
6. ✅ All 10 primitives implemented and exported
7. ✅ Authenticated theme resolves dark by default in the pathname-aware pre-hydration initializer
8. ✅ Public explicit-or-system theme is restored by the provider layout-effect cleanup contract
9. ✅ Root layout places the tested environment-aware `beforeInteractive` initializer in the explicit root `<head>`; operator rerun found no script-placement or hydration errors
10. ✅ Storage keys separated (`aredir-auth-theme` vs `aredir-theme`)
11. ✅ No inline script in workspace layout (React server component)
12. ✅ No test-only globals or authenticated theme debugging exports introduced
13. ✅ Operational role mapping covers all domain axes with behavioral assertions
14. ✅ Role text colors calibrated for WCAG AA at 11px (including dark inert `oklch(0.66 0.01 262)`)
15. ✅ Timeline preserves all previously rendered evidence fields
16. ✅ Timeline collapsed by default via `<details>`
17. ✅ Timeline chevron respects reduced-motion preference
18. ✅ Catch-all failures classified as `unknown` with source-neutral guidance
19. ✅ OperationalRow prevents nested interactive content
20. ✅ Reduced-motion respected on OperationalRow, Disclosure, and Timeline transitions
21. ✅ Public ThemeToggle retains independent `aredir-theme` ownership and uses shared storage-safe resolution
22. ✅ No scope expansion detected
23. ✅ Operational Focus NOT implemented
24. ✅ BUG-001/database remediation NOT implemented
25. ✅ Project/Workspace/Engineering Work structural redesign NOT performed
26. ✅ Authenticated default, explicit light, and explicit dark passed operator runtime acceptance
27. ✅ Public-light/authenticated-dark and public-dark/authenticated-light isolation passed
28. ✅ Logout preserved both independent preferences; subsequent public navigation honored the public preference
29. ✅ Sign Out terminated at the existing Workspace sign-in surface
30. ✅ Repeated reload, authentication, logout, and theme-transition testing remained stable with no new console errors
31. ✅ Authenticated narrow/mobile acceptance at approximately 390×844 passed in light and dark without responsive regression
32. ✅ Existing persisted Completed Defect detail rendered correctly; Timeline was collapsed by default, operated correctly, and truthfully reported no post-migration lifecycle history
33. ✅ Record Details remained correctly composed after Timeline expansion
34. ✅ Reduced-motion runtime behavior preserved correct disclosure state without inappropriate transitions
35. ✅ Edge DevTools inspection confirmed rendered contrast above 4.5:1 for tested taxonomy, type, workflow, settled, and inert states in authenticated themes

---

## Package 2 authorization

All PROJECT-UX-005 acceptance gates are satisfied. Package 2 may begin as a separate bounded Engineering Work package. This authorization does not begin or implement Package 2.

## Recommended next Engineering Work action

Package 2 — Operational Focus authority implementation (AREDIR-DISCOVERY-012 MVP) is the authorized recommended next Engineering Work action.

---

## Completion decision

**COMPLETE**

F-01 through F-10 are closed by the combined repository, automated verification, build, and operator runtime evidence. No PROJECT-UX-005 acceptance blocker remains. Package 2 is authorized to begin separately.
