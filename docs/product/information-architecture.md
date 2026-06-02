# Information Architecture

Implemented structure for aredirlabs.com (Prompt 001B).

## Primary navigation

| Page | Slug | Status |
|------|------|--------|
| Home | `/` | Live |
| About | `/about` | Live |
| Projects | `/projects` | Live |
| Contact | `/contact` | Live |

Header nav: About, Projects, Contact (+ logo home, theme toggle, Contact CTA on desktop).

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
- Nav links (About, Projects, Contact, Projects)
- Copyright + email

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
