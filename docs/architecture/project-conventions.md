# Project Conventions

Shared patterns for Aredir Labs Next.js applications. New projects should align with this template unless a product-specific doc overrides it.

## Stack (default)

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI primitives:** shadcn/ui + Radix where applicable
- **Deployment:** Vercel (preview + production)
- **CMS (when needed):** Sanity

## Repository layout

```
├── .github/              # Templates, CODEOWNERS
├── docs/                 # All project documentation
├── public/               # Static assets
├── src/
│   ├── app/              # Routes and layouts
│   ├── components/       # React components
│   └── lib/              # Shared utilities
├── .editorconfig
├── .gitattributes
├── AGENTS.md             # Agent / tooling rules
└── README.md
```

## TypeScript

- Strict mode enabled.
- Prefer `interface` for public component props; `type` for unions and utilities.
- Avoid `any`; use `unknown` and narrow when handling external data.

## Imports

- Use path aliases (`@/`) as configured in `tsconfig.json`.
- Order: external → internal → relative → types.
- No default exports for utilities; default export acceptable for page/route components.

## Data fetching

- Prefer Server Components and server-side fetching for content.
- Use client fetching only when interactivity requires it.
- Document caching and revalidation strategy in `docs/engineering/technical-overview.md`.

## Error handling

- User-facing errors: clear, accessible messages; no stack traces in production UI.
- Log server errors appropriately; never log secrets.

## Commits and PRs

- One logical change per PR when possible.
- Use GitHub issue templates for bugs and features.
- Follow the workflow in `docs/engineering/deployment-workflow.md`.

## Cross-project reuse

Patterns proven in **AlignFit**, **ClassForge**, or **LeagueOS** should be documented here or in product-specific docs before being copied wholesale. Prefer extracting shared conventions into this template repo.

## Related

- [Component guidelines](./component-guidelines.md)
- [Future product standards](./future-product-standards.md)
- [Repository standards](../engineering/repository-standards.md)
