# UI Foundation Inventory

## Application shell and information architecture

| Surface | Current structure | Maturity |
| --- | --- | --- |
| Root | `src/app/layout.tsx` supplies fonts, metadata, global CSS, and a skip-to-content link. | Reusable foundation. |
| Public shell | Public route group uses sticky SiteHeader, MainNav, theme toggle, contact action, session-aware Workspace access, and SiteFooter. | Implemented. |
| Auth | Standalone centered sign-in and sign-up forms with the Aredir lockup. | Implemented. |
| Workspace shell | `/workspace` layout renders a vertical desktop sidebar and horizontal mobile navigation. Main content scrolls independently on desktop. | Implemented, reusable. |
| Workspace navigation | Dashboard, Projects, Documents, Prompts, Knowledge Assets, Settings, plus sign out. `/workspace/knowledge` redirects to Knowledge Assets. | Implemented; settings is placeholder. |
| Dashboard | Project count/cards plus an operating snapshot: active/testing/paused-planning counts, next milestone, and blocked milestones. | Implemented projection. |
| Project detail | Overview, milestones, notes, documents, and prompts sections. | Implemented shared operational record view. |
| Cross-project views | Searchable Documents and Prompts pages; project registry. | Implemented. |
| Knowledge Assets | Filterable static registry, detail route, adoption matrix, review dashboard. | Implemented read-only prototype/instrument. |

The public information architecture includes Home, About, Engineering, Projects (index/detail), and Contact. The authenticated architecture is intentionally separate under `/workspace`.

## Design system

The codebase uses Tailwind CSS 4, shadcn styling, Radix dependencies, `class-variance-authority`, `tailwind-merge`, and Lucide icons. Shared primitives and patterns include:

- `Button` from `src/components/ui/button.tsx` with variants/sizes.
- `cn()` utility for class composition.
- Brand/logo/mark components, light/dark asset variants, site header/footer/navigation.
- `Eyebrow`, `SectionShell`, `StatusChip`, cards, divider, hero/constellation/backdrop components.
- Workspace-specific badges for project status/stage, document category, prompt type/status, and knowledge-asset classification.
- Reusable project detail sections and four client-side creation forms.

Global tokens define a light/dark “techno-mythic” palette, semantic primary/muted/destructive/status colors, border/ring/radius values, grid texture utilities, and reduced-motion handling. Typography uses Geist for headings, Inter for body text, and JetBrains Mono for labels/navigation. The implementation uses semantic Tailwind color tokens rather than hard-coded component palettes in most inspected Workspace components.

## Responsive and accessibility behavior

- Desktop Workspace: fixed 224px (`w-56`) sidebar with its own vertical scroll; content is scrollable.
- Mobile Workspace: sticky header with horizontally scrollable navigation and visible sign-out action.
- Public header: desktop main navigation is hidden on small viewports and rendered in a compact second row.
- Auth forms use responsive width constraints and mobile-safe viewport units.
- Visible focus-ring utility classes, accessible navigation labels, `aria-current`, form labels, and the root skip link are present.
- Motion-sensitive twinkle animation is disabled for `prefers-reduced-motion`.

## Reuse assessment

| Foundation | Classification | Rationale |
| --- | --- | --- |
| Root/public shell, brand components, theme toggle | Preserve and reuse | Consistent application-level visual foundation. |
| Workspace shell and nav | Preserve and reuse | Already responsive and supports operational sections. |
| Project detail sections/forms | Reuse with care | They establish section, badge, and server-action interaction patterns but support create-only artifacts. |
| Dashboard operating snapshot | Reusable projection pattern | Clear example of derived operational summaries from persisted records. |
| Documents/prompts lists | Reusable prototype | Filtering/search works against existing record types; no generalized artifact abstraction. |
| Knowledge Asset Registry | Read-only prototype | Useful presentation and taxonomy foundation, but data is static TypeScript rather than persistent/indexed source material. |
| Settings route | Placeholder / prototype | Explicitly states that profile and workspace settings are future work. |

## UI gaps present today

- No account/profile settings or preferences implementation.
- No edit/delete/archive controls for project artifacts.
- No project creation or project administration UI.
- No role-aware navigation or per-project visibility.
- No generic artifact viewer/editor; document and prompt pages are bespoke record views.
- No runtime repository document browser, repository synchronization state, or engineering-artifact index.

This inventory describes the existing visual and interaction foundation only.
