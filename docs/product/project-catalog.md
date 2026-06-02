# Project Catalog

Products displayed on aredirlabs.com. Source of truth for copy: `src/lib/site-config.ts`.

## Products

### AlignFit

- **Focus:** AI-assisted training, nutrition, and wellness
- **Status:** Active Build
- **Route:** `/projects/alignfit`
- **Description:** AI-assisted training, nutrition, and wellness platform.

### ClassForge

- **Focus:** Educator workflow and lesson planning
- **Status:** In Development
- **Route:** `/projects/classforge`
- **Description:** Educator workflow and lesson-planning toolkit.

### LeagueOS

- **Focus:** Fantasy sports operations and league management
- **Status:** Concept
- **Route:** `/projects/leagueos`
- **Description:** Fantasy sports operations and league management platform.

## Adding or updating a product

1. Edit `projects` array in `src/lib/site-config.ts`.
2. Add route under `src/app/projects/[slug]/` via `generateStaticParams` (automatic from config).
3. Update this catalog and [information architecture](./information-architecture.md) if IA changes.

## Shared standards

All products align with `docs/agent/` and `docs/architecture/`. Product-specific sites live in their own repositories when launched.

## Related

- [Future product standards](../architecture/future-product-standards.md)
- [Site brief](./site-brief.md)
