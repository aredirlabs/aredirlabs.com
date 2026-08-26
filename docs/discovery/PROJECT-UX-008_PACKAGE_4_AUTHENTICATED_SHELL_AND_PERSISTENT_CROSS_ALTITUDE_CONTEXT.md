# PROJECT-UX-008 — Package 4 Authenticated Shell and Persistent Cross-Altitude Context

| Field | Value |
| --- | --- |
| Package | Package 4 discovery / architecture boundary |
| Status | **COMPLETE** — authorized, implemented, operator-accepted |
| Depends on | PROJECT-UX-004 through -007; AREDIR-DISCOVERY-009 through -012 |
| Date | 2026-08-25 |

## 1. Decision

Recommend one Package 4: **Authenticated Shell and Persistent Cross-Altitude Context**.

It establishes a durable authenticated environment around the existing Workspace, Project, Project Engineering Work inventory, and Engineering Work routes. The shell preserves global orientation and, below Workspace, the current Project while the primary working surface changes. It adds no domain state, persistence, or new operational behavior.

## 2. Problem being solved

The authenticated product currently works as a set of capable routes inside a conventional sidebar/header. An operator loses visible Project context on inventory and Work-detail routes, repeats route-level orientation, and cannot change the already-supported authenticated theme after sign-in. Narrow navigation is functional but is a compressed desktop navigation pattern rather than a purpose-designed orientation model.

Package 4 makes the environment coherent without treating navigation state as lifecycle, focus, continuation, attention, priority, or Project/Work authority.

## 3. Shell/context model

The shell has three context scopes:

| Scope | Truth carried | Source | Shell responsibility |
| --- | --- | --- | --- |
| Global environment | authenticated Workspace identity, current altitude, global destinations, environment controls | route and authenticated environment | keep the operator oriented and able to move between existing global surfaces |
| Project | Project identity, status, stage, target when present, Project-local destinations | Project record and URL slug | remain visible at Project and Engineering Work altitude; never derive or mutate Project state |
| Engineering Work | selected Work identity and current route activity | URL work id and authoritative Work retrieval | identify the Work in the orientation band and primary surface; never turn selection into Operational Focus |

The shell may hold only ephemeral presentation state for navigation disclosure and a narrow-surface menu. Read-only retrieval/composition may resolve URL identifiers into existing authoritative Project and Engineering Work truth; it must not create new context persistence, competing context authority, or changes to domain-query semantics. URL plus authoritative server state reconstructs identity-bearing context after refresh, deep link, or Back navigation.

## 4. Persistent-context hierarchy

```text
Authenticated environment
├─ Workspace altitude: global orientation + Workspace operating surface
└─ Project altitude: global orientation + Project context + Project operating surface
   └─ Engineering Work altitude: global orientation + Project context + Work identity + Work-local surface
```

Project context persists from Project to its complete Engineering Work inventory and a Work detail or existing Work-local action route. Leaving a Work-scoped route while remaining Project-scoped clears Work context. Leaving any Project-scoped route clears both Project and Work context, including transitions to Workspace and every other global/non-Project authenticated route. Workspace does not pretend to select a Project merely because continuation or attention links to one.

## 5. Spatial regions introduced now

1. **Activity rail / narrow navigation entry** — global destinations that already exist: Workspace, Projects, Documents, Prompts, Knowledge Assets, and Settings.
2. **Orientation band** — persistent altitude and compact ancestry. At minimum it communicates `Workspace`, then Project identity where applicable, then Work identity where applicable. It reserves spatial responsibility for a future command-entry location without authorizing a trigger, invocation state, or placeholder behavior.
3. **Project context rail** — wide-screen, Project-scoped region at Project and Work altitudes. It shows authoritative Project identity and stable local traversal to existing Project surfaces; it does not show a second inventory or create a new Project summary.
4. **Primary operating surface** — the existing route content, made the dominant remaining region.
5. **Reserved contextual-inspector boundary** — no resident empty panel and no behavior now. The shell establishes only the spatial responsibility for future subordinate evidence, relationships, provenance, history, and integrations; no inspector trigger, state, invocation, or placeholder behavior is authorized.
6. **Environment controls** — durable signed-in controls in the orientation-band utility area, including theme and sign out.

No context inventory, master/detail composition, inspector content, command palette, or user-customizable panels are introduced by this package.

## 6. Desktop behavior

On wide screens, the activity rail and orientation band persist. Workspace uses the primary surface at full useful width. Project and Engineering Work routes additionally show the Project context rail, so moving among Project overview, complete Work inventory, and a Work route retains the same parent identity and local destinations.

The orientation band holds compact ancestry rather than duplicating the context rail. A stable return destination takes the operator to the Project or complete inventory as appropriate; browser Back retains normal route semantics. The primary surface expands when no contextual inspector is invoked.

## 7. Narrow/mobile behavior

Narrow screens use a compact fixed orientation header with the current ancestry and environment controls. Global navigation is invoked from a dedicated menu/sheet rather than rendered as a horizontally scrolling row of every global destination.

At Project and Work altitude, Project context is available through a distinct contextual disclosure/sheet reached from the orientation header. It preserves Project identity and local destinations without simultaneously showing global navigation, Project navigation, and route content. Selection navigates to existing routes; Back returns through the route sequence. The menu/disclosure state is ephemeral and is not encoded as domain state.

## 8. Theme/environment-control placement

Place the authenticated light/dark control in the orientation band's persistent utility area, beside the account/session control; it is reachable at every authenticated altitude and in the narrow header. Settings remains a destination for future broader preferences, not the only way to change an immediate environment setting.

The control uses the existing authenticated theme provider and authenticated preference key. It must not overwrite public-site preference, change domain data, or introduce identity-backed preference persistence in this package.

## 9. Included capabilities

- A shared authenticated frame with altitude-aware orientation.
- Persistent Project context across existing Project and Work routes.
- Desktop activity rail, orientation band, and conditional Project context rail.
- Purpose-designed narrow global navigation and Project-context access.
- Visible authenticated theme control using existing behavior.
- Stable spatial reservations for a future inspector and command entry, without triggers, state, invocation, interfaces, or placeholder behavior.
- Route-derived ancestry and accessible labels, keyboard focus, and landmarks.

## 10. Explicit deferrals

- Any schema, migration, action, persistence change, or change to domain-query semantics.
- PROJECT-UX-004's global attention entry, until a destination and behavior are separately authorized.
- Personal focus, assignments, ranking, recommendation, notification, or new focus/lifecycle semantics.
- Engineering Work-detail redesign, Work-local tabs, or changes to lifecycle controls.
- Full inventory master/detail, filtering, selection state, or changes to Package 3's truthful complete inventory.
- Inspector content or behavior; command execution, search, or shortcuts.
- Communication/discussions, architecture/design canvas, code editing, tests/stories surface, AI orchestration, role-specific views, and external integrations.
- User-arranged panels, saved shell layout, and cross-device shell preferences.

## 11. Architectural invariants

- Project identity, posture, milestones, and target remain Project authority.
- Engineering Work lifecycle, next action, condition, outcome, workflow, evidence, and history remain Work authority or their existing source authority.
- Operational Focus remains explicit shared Project authority; navigation, current route, and Work selection neither create nor change it.
- Continuation and attention remain independent Workspace-derived projections.
- Priority remains non-operational metadata.
- Active navigation selection is URL-derived, non-authoritative UI state. It never implies lifecycle, Operational Focus, continuation, attention, priority, or other domain authority.
- URL/server truth, not client shell state, reconstructs identity-bearing context.
- Deep links, refresh, and browser history must remain valid without a prior shell session.
- The shell presents truth; it neither ranks, recommends, nor silently transfers authority.

## 12. Affected routes/components

Primary implementation boundary:

- `src/app/workspace/layout.tsx`
- `src/components/workspace/workspace-nav.tsx` (replace its conventional desktop/narrow presentation responsibility)
- `src/components/authenticated-theme-provider.tsx` and a small authenticated-only theme control
- new shell/orientation/Project-context components, if composition requires them
- existing Workspace, Project detail, Project Engineering Work inventory, Engineering Work detail, and existing Work-local action routes for route-derived context inputs and surface spacing only

Routes in scope are `/workspace`, `/workspace/projects`, `/workspace/projects/[slug]`, `/workspace/projects/[slug]/engineering-work`, `/workspace/projects/[slug]/engineering-work/[workId]`, and their existing Work-local action descendants. Documents, Prompts, Knowledge Assets, and Settings participate as global destinations but are not otherwise redesigned.

## 13. Operator-visible acceptance criteria

1. An authenticated operator can identify the current altitude and, below Workspace, the current Project before reading page-body content.
2. Moving Project overview → complete Work inventory → Work detail retains visible Project identity and stable routes back to the parent context.
3. Opening a Work, using a local action route, refreshing, deep-linking, and browser Back preserve correct route-derived orientation without changing Operational Focus, continuation, attention, lifecycle, or priority.
4. Desktop presents durable global movement and conditional Project context without reducing the primary surface to an unusable narrow column.
5. Narrow screens provide intentional global navigation and separately available Project context without horizontal navigation overflow, clipped controls, or lost orientation.
6. Light/dark switching is visible and operable after sign-in at every authenticated altitude; public and authenticated preferences remain separate.
7. The shell reserves a coherent future location for inspector and command invocation while presenting neither as empty chrome nor as working capability.

## 14. Risks/regression boundaries

- Shell composition can accidentally duplicate Project data or make it stale. Project context must be supplied from the same authoritative route retrieval, with explicit failure/not-found behavior.
- Moving route content under a new frame can affect scroll restoration, sticky behavior, keyboard landmarks, and narrow viewport height. Verify these across the stated routes.
- Theme changes can reintroduce flash, hydration mismatch, or public/authenticated preference leakage. Preserve the existing before-paint initialization and separate keys.
- Navigation refactoring can break auth redirects, active-route indication, direct entries, or existing Work action routes. Those behavior contracts are regression boundaries.
- The reserved inspector/command locations must not be interpreted as authorization for hidden actions or invented domain state.

## 15. Relationship to the Work-level prototype evidence

The disposable prototype establishes only the reusable principle: **persistent Work context plus a changeable working surface**. Package 4 generalizes that principle one altitude upward: persistent Project context surrounds existing Work-local routes, while the primary surface changes by route. It does not retain the prototype's tabs, query parameters, dimensions, component names, counts, or styling as architecture.

## 16. Logical next package, not authorized

After Package 4 is implemented and verified, the logical next discovery/implementation decision is an **Engineering Work operations surface and contextual-inspector boundary**: determine whether existing Work detail can be reorganized around a single Work-local operating surface and which subordinate information first warrants an invoked inspector. It must separately authorize any inventory master/detail or command behavior.

## 17. Implementation and closure

### Implementation

Implemented the smallest coherent Package 4 solution satisfying the authorized record:

- **Activity rail** — icon-only desktop global navigation (w-14)
- **Orientation band** — desktop top bar with ancestry breadcrumb, theme toggle, sign out
- **Project context rail** — desktop project-scoped navigation at Project/Work altitude (w-56)
- **Mobile shell** — orientation header with hamburger menu, global nav sheet, project context sheet
- **Authenticated theme toggle** — uses existing `toggleAuthenticatedTheme()`, separate localStorage key
- **Shell context** — URL-derived altitude resolution via `usePathname()`, no persisted shell state
- **Identity resolution** — server actions for read-only project/work name retrieval from URL slugs

No domain state, persistence, schema changes, migrations, seeds, or new operational behavior introduced.

### Mobile defects discovered and corrected

1. **Mobile route scroll ownership** — Narrow/mobile content did not own normal route scrolling; the `md:h-screen md:overflow-hidden` containment on the parent caused the mobile document to be clipped. Removed the fixed-height constraint for mobile viewports so route content owns normal document scrolling.

2. **Mobile navigation sheet visibility** — The `<header>` element had `backdrop-blur`, which per CSS spec establishes a containing block for `fixed`-positioned descendants. The Sheet's `fixed inset-0` was positioned relative to the header, not the viewport, rendering the sheet invisible while the body scroll-lock engaged. Corrected by moving both global-nav and project-context Sheets outside the `<header>` as sibling elements within a React fragment.

### Automated verification

| Check | Result |
|-------|--------|
| `npm run build` | Compiled successfully |
| `npm test` | 146/146 pass, 0 fail |
| `npm run lint` | No new errors (4 pre-existing in test file) |
| `git diff --check` | Clean |

### Operator acceptance

All 17 authenticated runtime checks passed:

- Desktop shell/orientation: PASS
- Workspace altitude: PASS
- Project altitude: PASS
- Work altitude: PASS
- Persistent Project context across routes: PASS
- Work identity at Work altitude: PASS
- Context clearing on scope exit: PASS
- Mobile scrolling (Project, Work, EDITOR-001): PASS
- Mobile global nav sheet visibility/close/reopen/navigation: PASS
- Body scroll restoration after sheet close: PASS
- Project-context mobile navigation: PASS
- Authenticated theme switching and persistence: PASS

### Confirmation

- Package 4 introduced no new domain authority, persistence, or competing context.
- The stashed Engineering Work Operating Console prototype remains stashed and was not applied, copied, or promoted.
- All explicit deferrals in §10 remain preserved.

## 18. Human authorization status

**COMPLETE.** Package 4 is authorized, implemented, operator-accepted, and closed. No further action required on this package.
