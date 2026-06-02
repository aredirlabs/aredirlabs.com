# Prompt 001C — Techno-Mythic Design System & Desktop-First Marketing Site

**ID:** prompt-001C
**Depends on:** [prompt-001B-branding-site.md](./prompt-001B-branding-site.md)
**Scope:** feature (visual system + motif language + layout uplift; no new routes, no backend)

---

## Required prefix (do not omit)

```
You are working inside an existing production-bound Next.js application.

Before coding, read docs/agent/coding-agent-operating-standard.md and follow it strictly.

Do not make broad rewrites.
Do not introduce new libraries, architecture, patterns, or dependencies unless explicitly requested.
Inspect existing files and conventions first.
Preserve routing, styling, accessibility, content structure, and existing behavior unless this prompt explicitly changes them.
```

---

## Design intent (read first)

Aredir Labs is a **workshop where engineering meets myth — a forge for intelligent software.** The visual system fuses three influences into one cohesive, restrained whole:

1. **Modern tech** — the "venture architecture / command-center" base from the Aredir Systems concept (`DESIGN.md`): precise, technical, data-legible.
2. **Fantasy** — a *techno-mythic* layer expressed through original motif (sigils, runes/glyphs, constellation/star fields, a forge-ember accent), not through literal fantasy art.
3. **Gaming** — subtle HUD/seal/hex-grid framing and a sense of craft/progression.

**The fantasy lives in motif, metaphor, and naming — never in hype copy.** Surfaces look mythic; the words stay calm, honest, and accountable (see `docs/brand/voice-and-tone.md`). Done right this reads like a sophisticated studio with a story, not a themed costume. When in doubt, dial the fantasy *down* and let the technical base carry it.

### Brand story (suggested copy — owner to confirm before publishing)

"Aredir" derives from the owner's love of high fantasy; it evokes Sindarin-style roots (loosely *ar(a)-* "noble/royal" + *dîr* "man"). **Do not assert a definitive Tolkien-canon translation as fact** — frame it as the studio's own naming story. A usable About line: *"Named for an old word for a noble craftsman, Aredir Labs is a workshop for software — where careful engineering meets a little myth."* Keep it light; verify any linguistic claim before shipping.

### ⚠ Intellectual-property guardrail (hard rule)

Take inspiration from the *genre*, never the IP. The Tolkien Estate enforces aggressively.

- ❌ No Middle-earth names, places, characters, languages, or quotes (no Gondor, Rivendell, Elvish phrases, "one ring," etc.).
- ❌ No reproduction of Tolkien's tengwar or cirth scripts, his maps, or ring/eye/white-tree motifs.
- ❌ No other franchises' assets (no LOTR/D&D/Elder Scrolls/etc. logos, fonts, or art).
- ✅ Build an **original mythos**: invent our own runeforms/glyphs, our own sigil, our own constellation. Generic high-fantasy + sci-fi fusion only.
- ✅ All imagery is **original, in-code SVG** (see Imagery approach). No stock or AI-generated fantasy art, no new font/asset dependencies.

### Also reject (off-brand, from the source concept)

- ❌ Fabricated metrics or numbers ("$142.8M total value locked," fake latency/accuracy/growth stats, contract counts). Invent nothing.
- ❌ VC/hype framing ("Ecosystem of Tomorrow," "institutional investors," "Download Studio Report").
- ❌ The concept's placeholder product names (Pulse Analytics, Lumina Learning, DraftElite). Use only the real products: **AlignFit, ClassForge, LeagueOS** (in `src/lib/site-config.ts`).
- ❌ Mobile-first layout — this pass is **desktop-first**.

If the concept and the brand voice ever conflict, the brand voice wins.

### Desktop-first definition

Compose the primary design for a wide viewport (≥1024px): real multi-column bento layouts, generous scale, a confident hero. Then collapse gracefully to tablet and mobile (single/two-column stacks, no horizontal scroll, tap targets ≥44px). "Desktop-first" governs **layout**, not color mode.

### Theme decision

Keep the existing light/dark toggle. Tune the **dark theme as the showcase** (it suits the mythic + command-center look) with a clean, equally-considered light counterpart. Do not break `ThemeToggle`. (Dark-only could be adopted later by removing the light block — but keep both this pass.)

---

## Goal

Bring aredirlabs.com to a polished, on-brand "initial use" state: a cohesive techno-mythic design system (tokens + typography + an original motif language + a small set of reusable primitives) applied across all existing pages, composed desktop-first and fully responsive to mobile, in both light and dark themes — using only original in-code SVG, no new npm dependencies, no invented metrics, and no third-party IP.

---

## In scope

- [ ] **Tokens** — Update `src/app/globals.css` with the reconciled palette (arcane/electric blue, emerald, forge-ember gold, optional arcane violet) plus surface, ghost-border, grid-line, and status tokens for both `:root` (light) and `.dark`. Re-point or extend existing `--brand-*` aliases.
- [ ] **Typography** — Load **Inter** (body) and **JetBrains Mono** (labels) via `next/font/google` in `layout.tsx`; keep **Geist** for headings. Wire `--font-heading`, `--font-sans`, `--font-mono` in `globals.css` and add the type-scale tiers as small utilities/component classes.
- [ ] **Motif system (original SVG)** — Add a small, reusable set of themeable SVG motifs (see Motif system below): the **sigil/mark**, a **rune/glyph divider or border**, a faint **constellation/star-field** and/or **hex-grid** background texture, and **forge-ember** accent usage. All monoline where possible, driven by `currentColor` + accent tokens, and `aria-hidden` when decorative.
- [ ] **Visual primitives (reuse-first)** — Consistent with `docs/architecture/component-guidelines.md`: a bento `Card`/surface treatment (1px ghost border, tonal fill, brighter top edge, light backdrop-blur for overlays); a monospace `Eyebrow`/label style (uppercase, tracked); a `StatusChip` mapping `Active Build → emerald`, `In Development → blue/neutral`, `Concept → ember/muted` (extend `statusStyles` in `project-card.tsx`); and a `BentoGrid` wrapper (or documented grid utilities). Prefer restyling `ProjectCard` and `SectionShell` over parallel components.
- [ ] **Site shell** — Restyle `SiteHeader` (glass/blur, mono nav, electric-blue active/hover, `aria-current` on active route, sigil in logo) and `SiteFooter`. Widen the layout container for desktop (`max-w-6xl`/`max-w-7xl` where appropriate) while keeping a comfortable reading measure for long-form text.
- [ ] **Homepage (`/`)** — Desktop-first hero (mono eyebrow → display headline → honest supporting line → primary + ghost CTA) with a subtle constellation/grid backdrop and the sigil; a bento product grid (AlignFit / ClassForge / LeagueOS with honest status chips); a mission/approach section; a CTA section. Real copy from the brief; no fabricated numbers.
- [ ] **Other pages** — Apply the system to `/about` (good home for the brand story + rune divider), `/projects`, `/projects/[slug]`, and `/contact` so they read as one site. Preserve all routes, content structure, and the contact page's honest "no form yet" note.
- [ ] **Identity assets** — Replace `src/app/icon.svg` and the `src/components/site-logo.tsx` mark with the new **sigil** (a starter asset is provided — see Motif system), and update `src/app/opengraph-image.tsx` to the new palette + sigil. Provide a simplified sigil variant for the 32px favicon (drop the vertex ticks/feet sparks; keep hex + A + apex star).
- [ ] **Accessibility & motion** — Visible focus rings, WCAG AA contrast in **both** themes, semantic heading order, decorative SVG `aria-hidden`, and `prefers-reduced-motion` honored for any animated motif (e.g. twinkling stars must freeze).

## Out of scope (explicitly excluded)

- [ ] No new routes/pages, CMS, contact form, backend, or analytics.
- [ ] No new npm dependencies (next/font/google is built in; no font packages, animation libs, icon packs, or component libraries).
- [ ] No raster/stock/AI-generated imagery; no third-party IP of any kind.
- [ ] No per-product "portfolio dialects" yet (the concept's fitness/fantasy-sports accent variants) — the motif/token system should *enable* them later (e.g. LeagueOS → arcane-violet gaming dialect), but do not build them now.
- [ ] No full logo redesign beyond adopting the provided sigil; no new wordmark typeface.
- [ ] No content/voice rewrite beyond light polish; invent no products, metrics, or claims.

## Files to inspect first

- `src/app/globals.css` (tokens, Tailwind v4 `@theme inline`, light/dark blocks)
- `src/app/layout.tsx` (font loading, shell)
- `src/components/` — `site-header.tsx`, `site-footer.tsx`, `site-logo.tsx`, `project-card.tsx`, `section-shell.tsx`, `theme-toggle.tsx`, `ui/button.tsx`
- `src/app/page.tsx`, `about/page.tsx`, `projects/page.tsx`, `projects/[slug]/page.tsx`, `contact/page.tsx`
- `src/lib/site-config.ts`, `src/lib/metadata.ts`, `src/app/icon.svg`, `src/app/opengraph-image.tsx`
- `docs/brand/brand-guide.md`, `docs/brand/voice-and-tone.md`, `docs/architecture/ui-patterns.md`, `docs/architecture/component-guidelines.md`
- Reference only (do not import or copy): the design concept `DESIGN.md` + screenshot.

## Implementation notes

### Reconciled color tokens (starting values — verify AA contrast, then keep as canonical)

OKLCH approximations of the concept's palette plus the mythic accents, mapped onto the existing variable structure.

**Dark theme (`.dark` — showcase):**
```css
--background: oklch(0.18 0.004 260);     /* deep charcoal "void" */
--foreground: oklch(0.92 0.004 260);
--card: oklch(0.22 0.004 260);
--card-foreground: oklch(0.92 0.004 260);
--muted: oklch(0.26 0.005 260);
--muted-foreground: oklch(0.72 0.012 260);
--border: oklch(1 0 0 / 9%);             /* ghost border */
--input: oklch(1 0 0 / 12%);
--primary: oklch(0.64 0.18 262);         /* arcane / electric blue */
--primary-foreground: oklch(0.16 0.02 262);
--ring: oklch(0.70 0.16 262);
--success: oklch(0.66 0.15 165);         /* emerald — active/growth */
--warning: oklch(0.80 0.13 78);          /* (semantic warning) */
--ember: oklch(0.80 0.12 72);            /* forge gold — highlights, sigil, special CTA */
--arcane: oklch(0.62 0.16 300);          /* OPTIONAL arcane violet — rare/gaming accent */
--grid-line: oklch(1 0 0 / 6%);          /* blueprint grid / hex texture */
--brand-navy: var(--background);
--brand-accent: var(--primary);          /* accent is electric blue now, not orange */
```

**Light theme (`:root` — clean counterpart):**
```css
--background: oklch(0.99 0.003 260);
--foreground: oklch(0.24 0.02 262);
--card: oklch(1 0 0);
--muted: oklch(0.96 0.006 260);
--muted-foreground: oklch(0.50 0.02 262);
--border: oklch(0.90 0.01 260);
--primary: oklch(0.55 0.18 262);         /* darkened for AA on white */
--primary-foreground: oklch(0.99 0 0);
--ring: oklch(0.55 0.18 262);
--success: oklch(0.55 0.14 165);
--warning: oklch(0.62 0.13 70);
--ember: oklch(0.66 0.12 68);
--arcane: oklch(0.52 0.16 300);
--grid-line: oklch(0.90 0.01 260);
```

Expose new tokens in `@theme inline` (`--color-success`, `--color-ember`, `--color-arcane`, `--color-grid-line`) so they're usable as `bg-ember/10`, `text-arcane`, `border-grid-line`, etc. Leave existing chart/sidebar tokens untouched unless needed.

### Typography wiring

- `layout.tsx`: import `Geist`, `Inter`, `JetBrains_Mono` from `next/font/google`; keep `suppressHydrationWarning`.
- `globals.css`: `--font-heading: var(--font-geist)`, `--font-sans: var(--font-inter)`, `--font-mono: var(--font-jetbrains)`; apply heading font to `h1–h4`.
- Scale (from `DESIGN.md`): display ~48px, headings 32/24/20 (Geist, tight tracking, semibold); body 18/16/14 (Inter, relaxed line height); labels 13/11 **uppercase, ~0.06em tracking** (JetBrains Mono). Small utilities only — don't over-engineer.

### Motif system (original, themeable SVG)

A starter **sigil** asset accompanies this prompt (`aredir-sigil.svg`): an angular "A" rune inside a hex seal with an ember-gold apex star and runic vertex ticks. Use it as the basis for icon/logo/OG; refine as needed. Build the rest in the same spirit:

- **Sigil / mark** — hex seal + A-rune + apex star. Monoline `currentColor` variant for inline logo use; "plinth" variant (dark rounded field + glow) for favicon/OG. Keep it legible at 32px (favicon drops ticks/sparks).
- **Runes / glyphs** — an original, abstract glyph row usable as a section divider or eyebrow flourish. Invented forms only; not real runes or any conscript.
- **Constellation / star field** — a faint scatter of small stars + thin connecting lines as a hero/section backdrop (very low opacity, behind content, never reducing text contrast). If animated (gentle twinkle/drift), it must freeze under `prefers-reduced-motion`.
- **Hex grid** — an optional whisper-quiet hex or square blueprint grid using `--grid-line`, for section dividers or card backdrops. Subtle, not loud.
- **Forge-ember accent** — `--ember` reserved for the sigil's star, rare highlight strokes, and at most one "special" CTA. Use sparingly so it stays special.

Depth is tonal layering + 1px ghost borders + a slightly brighter top edge on cards; glass (`backdrop-blur` + translucent border) only for the sticky header/overlays. Avoid heavy drop shadows. Radii: ~4px chips/inputs/buttons, ~8px cards, ~12px large containers (align to `--radius`).

### Bento / layout

12-column mental model on desktop; product cards span responsibly (3 cols at `lg`, 2 at `md`, 1 on mobile). Generous gutters on desktop; comfortable measure for prose. Hero is the showcase moment: sigil + display headline + constellation/grid backdrop + primary/ghost CTAs.

### Voice / copy (honest, calm — fantasy only in motif/metaphor)

- Hero headline candidate: *"Building intelligent software that helps people learn, perform, and make better decisions."* Support line: AI-powered SaaS, quality engineering, modern product development.
- Mission: adapt the brief's statement; optionally the brand-story line on `/about`.
- Products: AlignFit (Active Build / UAT), ClassForge (In Development), LeagueOS (Concept) — descriptions from `site-config.ts`.
- Mono eyebrows welcome (`THE FORGE`, `PORTFOLIO`, `MISSION`). A *little* mythic metaphor in headings is fine; no fabricated stats, no hype, anywhere.

## Verification

- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] Manual QA per `docs/qa/manual-qa-checklist.md`, specifically:
  - [ ] All five routes render in **both** themes; toggle persists.
  - [ ] Desktop (≥1280px), tablet (~768px), mobile (~375px): no horizontal scroll, readable measure, tap targets ≥44px.
  - [ ] Keyboard nav: visible focus rings; `aria-current` on active nav; skip link works; decorative motifs are `aria-hidden`.
  - [ ] AA contrast spot-check (body, muted, links, chips, text over any star/grid backdrop) in both themes.
  - [ ] `prefers-reduced-motion` freezes all motif animation.
  - [ ] No fabricated metrics, no hype, and **no third-party IP** anywhere.

## Completion report (required)

Report what changed, files changed, checks run, passed/failed checks, and manual QA still required — per `docs/agent/coding-agent-operating-standard.md`. Do not claim success unless `lint` and `build` were actually run and results reported honestly.

---

## Index update

After completion, update `docs/prompts/implementation-index.md`:

| 001C | [Techno-mythic design system & desktop-first site](./prompt-001C-design-system-uplift.md) | Complete | 001B |
