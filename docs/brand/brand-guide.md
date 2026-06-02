# Brand Guide

Aredir Labs company brand for aredirlabs.com and aligned product marketing.

## Brand essence

**Aredir Labs** is an independent software lab building focused SaaS products for real-world workflows—fitness, education, workflow automation, and operational systems.

## Positioning

Independent software lab building focused SaaS products.

## Tone

| Attribute | Expression |
|-----------|------------|
| Calm | Measured copy; no hype |
| Capable | Clear competence; show craft |
| Technical | Precise without jargon overload |
| Founder-led | Direct, accountable voice |
| Practical | Outcomes and workflows first |
| Trustworthy | Honest status and scope |

## Color palette (implemented)

| Token | Role | Usage |
|-------|------|--------|
| Deep Navy (`--brand-navy`) | Primary brand, headings, logo mark | Headers, primary buttons (light mode) |
| Charcoal (`--brand-charcoal`) | Depth, dark surfaces | Dark mode backgrounds |
| Slate (`--brand-slate`) | Secondary text | Muted copy, metadata |
| White / near-white | Backgrounds | Light mode canvas |
| Subtle Orange (`--brand-accent`) | Accent, CTAs, links | Related to AlignFit family but distinct (`oklch` hue ~45–48) |

CSS variables live in `src/app/globals.css`. Tailwind utilities: `bg-brand-navy`, `text-brand-accent`, etc.

## Typography

- **UI / body:** Geist Sans (via `next/font`)
- **Monospace:** Geist Mono (code or technical labels when needed)
- Headings: semibold, tight tracking

## Design reference

Inspired by modern SaaS (Vercel, Linear, Stripe) — clean layout, generous whitespace, subtle borders — without copying any single brand.

## Logo

- Text + “A” mark in `SiteLogo` component (`src/components/site-logo.tsx`)
- Favicon: `src/app/icon.svg`
- See [logo direction](./logo-direction.md) for asset checklist

## Application on web

- `SiteHeader` / `SiteFooter` on all pages
- Light/dark via `ThemeToggle` (class-based `.dark` on `<html>`)
- OG image: `src/app/opengraph-image.tsx`

## Related

- [Voice and tone](./voice-and-tone.md)
- [Logo direction](./logo-direction.md)
- [UI patterns](../architecture/ui-patterns.md)
