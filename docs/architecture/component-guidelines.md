# Component Guidelines

Standards for React components across Aredir Labs Next.js projects (AlignFit, ClassForge, LeagueOS, and future products).

## Principles

1. **Small and reusable** — Prefer focused components over large page-level monoliths.
2. **Single responsibility** — One clear purpose per component (display, form field, layout slot, etc.).
3. **Avoid bloat** — Split when a file exceeds ~150 lines or mixes unrelated concerns.
4. **Composition over configuration** — Prefer children and slots over excessive prop APIs.

## File organization

```
src/
├── app/                 # Routes, layouts, page composition
├── components/
│   ├── ui/              # Primitive UI (buttons, inputs)
│   ├── layout/          # Header, footer, shell
│   └── [feature]/       # Feature-specific components
└── lib/                 # Utilities, helpers (not components)
```

## Component structure

```tsx
// 1. Imports
// 2. Types / interfaces
// 3. Component
// 4. Subcomponents (only if tightly coupled and small)
```

## Props and state

- Prefer explicit typed props; extend HTML element props when wrapping native elements.
- Lift state only when multiple siblings need it; otherwise keep state local.
- Avoid prop drilling beyond two levels — consider composition or context sparingly.

## Server vs client

- Default to Server Components in the App Router.
- Add `"use client"` only when hooks, browser APIs, or event handlers require it.
- Keep client boundaries as low in the tree as possible.

## Styling

- Use Tailwind utility classes consistent with project tokens.
- Do not inline one-off magic numbers when a token or existing pattern exists.
- Support light/dark modes when the project uses theme switching.

## Accessibility

- Use semantic HTML (`button`, `nav`, `main`, headings in order).
- Provide `aria-*` only when native semantics are insufficient.
- Ensure focus states and keyboard operability for interactive elements.

## Anti-patterns

- God components that fetch, format, and render entire pages.
- Copy-pasting similar markup instead of extracting a shared primitive.
- Business logic embedded in presentational components without clear separation.

## Related

- [Naming conventions](./naming-conventions.md)
- [UI patterns](./ui-patterns.md)
- [Project conventions](./project-conventions.md)
