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

Techno-mythic system: a technical "command-center" base with mythic accents. Tokens live in `src/app/globals.css` (light `:root` + `.dark`), exposed as Tailwind utilities.

| Token | Role | Usage |
|-------|------|--------|
| Arcane Blue (`--primary`) | Primary brand, links, active states | Buttons, active nav, signal accents |
| Emerald (`--success`) | Growth / healthy status | `Active Build` status, positive states |
| Forge Ember (`--ember`) | Warm highlight | Sigil apex star, special CTA, `Concept` status |
| Arcane Violet (`--arcane`) | Rare accent (reserved) | Future gaming/portfolio dialects (e.g. LeagueOS) |
| Charcoal "void" (`--background` dark) | Canvas | Dark-mode base; the showcase experience |
| Ghost border (`--border`) / grid (`--grid-line`) | Structure, "blueprint" depth | 1px borders, subtle grid textures |

The legacy `--brand-*` aliases remain; `--brand-accent` now points to `--primary` (arcane blue), not orange.

## Typography

- **Headings:** Geist (via `next/font`) — semibold, tight tracking
- **UI / body:** Inter (via `next/font`)
- **Labels / metadata:** JetBrains Mono — uppercase, letter-spaced (the "schematic" voice)

## Design reference

Inspired by modern SaaS (Vercel, Linear, Stripe) — clean layout, generous whitespace, subtle borders — without copying any single brand.

## Logo

- Original **sigil** (A-rune in a hex seal, ember apex star) in `Sigil` (`src/components/sigil.tsx`), used by `SiteLogo`; standalone asset at `public/logo-mark.svg`
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
