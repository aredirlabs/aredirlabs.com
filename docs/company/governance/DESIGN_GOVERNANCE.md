# Design Governance

**Status:** Company Standard  
**Owner:** Aredir Labs  
**Domain:** Design  
**Last reviewed:** 2026-06-25  
**Next review due:** 2026-09-12

## Purpose

Document **product-agnostic** design principles for Aredir Labs products. This covers UX philosophy, visual hierarchy, interaction consistency, and design system evolution — not product-specific screen specifications.

Product UI specifications remain in product repositories.

---

## Workspace-first UX

When a product includes AI or multi-step workflows, organize the experience around **workspace surfaces**:

| Principle | Application |
|-----------|-------------|
| **Surfaces over chat** | Primary value lives in structured workspace views — timelines, dashboards, detail panels |
| **Persistent state** | Users return to the same workspace objects; intelligence is not ephemeral |
| **Actionable context** | Every surface shows provenance — what is known, who said it, when it changed |
| **Chat supports work** | Conversation initiates or refines workspace actions; it does not replace them |

**Canonical experience architecture:** [Workspace Experience Architecture](../architecture-patterns/AREDIR_UX_001_WORKSPACE_EXPERIENCE_ARCHITECTURE.md) (AREDIR-UX-001) — mission, environment, identity, and composition philosophy for all workspaces.

**Canonical AI surface topology:** [Workspace-First AI Experience Pattern](../architecture-patterns/WORKSPACE_FIRST_AI_EXPERIENCE_PATTERN.md)

For multi-advisor products: [Human + AI Advisor Workspace Pattern](../ai-patterns/HUMAN_AI_ADVISOR_WORKSPACE_PATTERN.md)

---

## Visual hierarchy

| Rule | Detail |
|------|--------|
| **One primary action** | Single clear CTA per viewport section when possible |
| **Heading discipline** | One `h1` per page; descending levels without skips |
| **Content width** | Max-width containers for readability |
| **Section rhythm** | Consistent vertical spacing between sections |
| **Typography** | Comfortable line height; project tokens over one-off values |

Products define specific tokens in `globals.css` and brand docs. Principles apply regardless of visual theme.

---

## Dashboard philosophy

Internal and product dashboards should prioritize **operational clarity** over visual density:

| Principle | Detail |
|-----------|--------|
| **Status at a glance** | Key metrics and states visible without drilling down |
| **Progressive disclosure** | Summary first; detail on demand |
| **Consistent status vocabulary** | Shared status labels across products where possible |
| **Action proximity** | Primary actions near the data they affect |
| **Empty states** | Clear guidance when no data exists — not blank screens |

The Aredir Labs workspace (`/workspace`) exemplifies this philosophy for internal portfolio management.

---

## Interaction consistency

| Pattern | Standard |
|---------|----------|
| **Buttons vs links** | `<button>` for actions; `<a>` for navigation |
| **External links** | `target="_blank"` with `rel="noopener noreferrer"` |
| **Forms** | Labels, focus rings, inline validation, loading/success/error states |
| **Navigation** | Mobile menu with keyboard support; `aria-current="page"` for active items |
| **Feedback** | Loading and error states for all async actions |

**Reference:** [UI patterns](../../architecture/ui-patterns.md)

---

## Information architecture

Product information architecture is **product-owned** but follows shared principles:

| Principle | Detail |
|-----------|--------|
| **Shallow navigation** | Critical paths reachable in ≤3 clicks |
| **Consistent labeling** | Terms match user mental models; glossary in product docs |
| **Public vs protected** | Clear separation of marketing, app, and workspace routes |
| **Portfolio coherence** | Products in the Aredir Labs ecosystem share navigational patterns where appropriate |

Template reference: [Information architecture](../../product/information-architecture.md) (this site). Product repos customize in `docs/product/`.

---

## Accessibility

Design and engineering share accessibility responsibility:

| Area | Requirement |
|------|-------------|
| **Color contrast** | WCAG AA minimum for text and interactive elements |
| **Focus visibility** | Visible focus rings; no outline removal without replacement |
| **Motion** | Respect `prefers-reduced-motion` |
| **Screen readers** | Semantic HTML first; ARIA only when native semantics insufficient |
| **Forms** | Labels, error association, keyboard submission |

Accessibility verification is part of [Engineering Governance — Definition of Done](./ENGINEERING_GOVERNANCE.md#definition-of-done).

---

## Component reuse

| Principle | Detail |
|-----------|--------|
| **Primitives first** | Shared UI primitives (`components/ui/`) before feature-specific components |
| **Composition** | Prefer children and slots over excessive prop APIs |
| **No god components** | Split when files exceed ~150 lines or mix unrelated concerns |
| **Server by default** | Client boundaries as low in the tree as possible |
| **Extract, don't copy** | Repeated markup becomes a shared primitive |

**Reference:** [Component guidelines](../../architecture/component-guidelines.md)

Patterns proven across products should be extracted to the template repo and considered for promotion — not copied wholesale between product repos.

---

## Design system evolution

Design systems evolve through governed iteration:

```
Product need → Implement in product → Prove reuse → Extract to template → Promote if cross-product
```

| Stage | Location |
|-------|----------|
| Product-specific tokens and components | Product repo |
| Shared primitives and patterns | Aredir Labs template (`docs/architecture/`, `src/components/ui/`) |
| Cross-product UX philosophy | `docs/company/governance/` and architecture patterns |
| Brand standards | `docs/brand/` (customized per product) |

Breaking visual changes require manual QA across affected routes and themes (light/dark when enabled).

Brand reference for this site: [Brand guide](../../brand/brand-guide.md), [Voice and tone](../../brand/voice-and-tone.md).

---

## What stays in product repos

The following are **not** company design standards — they remain product-owned:

- Screen-level UI specifications and mockups
- Product-specific component libraries beyond shared primitives
- Domain-specific dashboard layouts (e.g., nutrition tracking, training calendar)
- Product color palettes that diverge from company brand
- Feature-specific interaction flows

Extract product-agnostic principles from product work through the [promotion process](../PROMOTION_PROCESS.md).

---

## Related

- [Engineering Operating System](../ENGINEERING_OPERATING_SYSTEM.md)
- [Governance Index](../GOVERNANCE_INDEX.md)
- [UI patterns](../../architecture/ui-patterns.md)
- [Component guidelines](../../architecture/component-guidelines.md)
- [Workspace Experience Architecture](../architecture-patterns/AREDIR_UX_001_WORKSPACE_EXPERIENCE_ARCHITECTURE.md)
- [Workspace-First AI Experience Pattern](../architecture-patterns/WORKSPACE_FIRST_AI_EXPERIENCE_PATTERN.md)
- [Engineering Governance](./ENGINEERING_GOVERNANCE.md)
