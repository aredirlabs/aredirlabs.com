# Technical Overview

## Project

**aredirlabs.com** — Aredir Labs company marketing site and template repository for future Aredir Labs Next.js projects.

## Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Runtime | Node.js (LTS recommended) |
| UI | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Components | shadcn/ui, Radix UI |
| Icons | Lucide React |
| Hosting | Vercel |
| CMS | Sanity (planned / optional) |

## Application structure

```
src/
├── app/
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home
│   └── globals.css     # Global styles
├── components/
│   └── ui/             # Shared UI primitives
└── lib/
    └── utils.ts        # cn() and helpers
```

## Rendering model

- App Router with React Server Components by default.
- Client components only where interactivity requires them.

## Configuration files

| File | Purpose |
|------|---------|
| `next.config.ts` | Next.js configuration |
| `tsconfig.json` | TypeScript paths and strictness |
| `eslint.config.mjs` | Lint rules (Next.js preset) |
| `components.json` | shadcn/ui configuration |
| `postcss.config.mjs` | Tailwind PostCSS pipeline |

## Scripts

```bash
npm run dev      # Local development
npm run build    # Production build
npm run start    # Production server (after build)
npm run lint     # ESLint
```

## Related

- [Environment strategy](./environment-strategy.md)
- [Deployment workflow](./deployment-workflow.md)
- [Repository standards](./repository-standards.md)
