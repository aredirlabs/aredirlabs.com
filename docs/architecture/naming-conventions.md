# Naming Conventions

Consistent naming across Aredir Labs repositories.

## Files and directories

| Asset | Convention | Example |
|-------|------------|---------|
| Component files | `kebab-case.tsx` | `site-header.tsx` |
| Utility modules | `kebab-case.ts` | `format-date.ts` |
| Route segments | `kebab-case` (Next.js App Router) | `about-us/page.tsx` |
| Directories | `kebab-case` | `components/ui/` |
| Test files | `*.test.ts` or `*.test.tsx` | `button.test.tsx` |
| Docs | `kebab-case.md` | `bug-triage-process.md` |

## Code identifiers

| Asset | Convention | Example |
|-------|------------|---------|
| React components | `PascalCase` | `SiteHeader` |
| Functions | `camelCase` | `formatDate` |
| Variables | `camelCase` | `isLoading` |
| Constants | `SCREAMING_SNAKE_CASE` or `camelCase` for config objects | `MAX_ITEMS`, `siteConfig` |
| Types / interfaces | `PascalCase` | `NavItem`, `ButtonProps` |
| Enums | `PascalCase` members | `Severity.High` |
| CSS modules (if used) | `camelCase` class exports | `styles.primaryButton` |

## Git and branches

| Asset | Convention | Example |
|-------|------------|---------|
| Feature branches | `feature/short-description` | `feature/contact-form` |
| Bugfix branches | `fix/short-description` | `fix/mobile-nav-overflow` |
| Docs branches | `docs/short-description` | `docs/foundation-standards` |

## Environment variables

- Public (browser): `NEXT_PUBLIC_*`
- Server-only: descriptive `SCREAMING_SNAKE_CASE` without `NEXT_PUBLIC_`

## Sanity / CMS (when applicable)

- Schema types: `camelCase` document type names per Sanity conventions
- Slugs: `kebab-case`

## Related

- [Project conventions](./project-conventions.md)
- [Repository standards](../engineering/repository-standards.md)
