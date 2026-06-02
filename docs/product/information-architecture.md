# Information Architecture

Planned structure for aredirlabs.com. Update as pages ship.

## Primary navigation (planned)

| Page | Slug | Purpose |
|------|------|---------|
| Home | `/` | Company overview, hero, primary CTA |
| Products | `/products` | Portfolio overview |
| About | `/about` | Team, mission, story |
| Contact | `/contact` | Inquiry form or contact details |

## Secondary / footer

- Privacy policy (`/privacy`)
- Terms of service (`/terms`) — if required
- Social / GitHub links (when applicable)

## Product deep links

Individual products may link out to their own domains or subpaths as defined in [project catalog](./project-catalog.md).

## Content types

| Type | Source (planned) |
|------|------------------|
| Marketing copy | MDX or Sanity |
| Product entries | Structured list / CMS |
| Legal | Static MDX pages |

## SEO

- Unique `title` and `description` per route
- Open Graph and Twitter card metadata in root or per-page layout
- Semantic heading hierarchy per page

## Related

- [Site brief](./site-brief.md)
- [UI patterns](../architecture/ui-patterns.md)
