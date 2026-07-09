# Information Architecture

Implemented structure for aredirlabs.com (Prompt 001B, SITE-ENGINEERING-001).

## Primary navigation

| Page | Slug | Status |
|------|------|--------|
| Home | `/` | Live |
| About | `/about` | Live |
| Projects | `/projects` | Live |
| Engineering | `/engineering` | Live |
| Contact | `/contact` | Live |

Header nav: About, Projects, Engineering, Contact (+ logo home, theme toggle, Contact CTA on desktop).

**Engineering** is the public engineering experience. Detailed Engineering Operating System materials live in repository docs and the authenticated workspace — not as public site routes.

## Engineering section (public)

| Page | Slug | Role |
|------|------|------|
| Engineering | `/engineering` | Philosophy, principles, practice — only public engineering touchpoint |

Former public routes `/engineering-operating-system` and `/docs/company/*` permanently redirect to `/engineering`.

### Engineering page sections (`/engineering`)

1. Hero — ship artwork, headline, philosophy copy, CTAs
2. Why engineering matters
3. Our principles (six public-facing cards)
4. Why this matters (philosophy → practice bridge)
5. How we build (engineering journey)
6. Behind every project (public-safe on-page / portfolio / contact links)
7. Our journey (ship metaphor conclusion)

## Project detail routes

| Product | Slug | Status label |
|---------|------|----------------|
| AlignFit | `/projects/alignfit` | Active Build |
| ClassForge | `/projects/classforge` | In Development |
| LeagueOS | `/projects/leagueos` | Concept |

## Home page sections

1. Hero — headline, supporting copy, View Projects / Contact
2. Projects preview — three project cards
3. About preview — founder-led bullets + link to About
4. Contact CTA — link to Contact

## Footer

- Logo + tagline
- Nav links (About, Projects, Engineering, Contact)
- Copyright + email (`info@aredirlabs.com`)

## SEO

- Root metadata: `src/lib/metadata.ts` + `layout.tsx`
- Per-page titles via `pageMetadata()` template: `%s · Aredir Labs`
- `src/app/icon.svg` — favicon
- `src/app/opengraph-image.tsx` — OG image

## Future (not in v1)

- Privacy / terms pages
- External product URLs when live
- Blog or changelog

## Related

- [Site brief](./site-brief.md)
- [Project catalog](./project-catalog.md)
- [Public engineering experience](../architecture/public-engineering-experience.md)
