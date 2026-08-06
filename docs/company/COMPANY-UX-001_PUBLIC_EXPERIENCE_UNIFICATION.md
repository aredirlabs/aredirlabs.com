# COMPANY-UX-001 — Public Experience Unification

**Status:** Implemented

**Owner:** Aredir Labs

**Implemented:** 2026-08-06

**Scope:** Public-site presentation consistency

## Objective

Unify the visual language of the public Aredir Labs website using the Engineering page as the canonical design reference. This work changes presentation only. It does not change routes, content architecture, metadata, authentication, operational behavior, the database, Engineering Work, or Workspace.

## Canonical reference

The Engineering page establishes the public visual language:

- dark, high-weight identity heroes;
- a consistent `4xl` to `5xl` primary heading hierarchy;
- orange for engineering emphasis and primary calls to action;
- blue for links, controls, and navigation;
- neutral reading surfaces for editorial content;
- `SectionShell` spacing and the shared six-column content boundary;
- restrained borders and background transitions; and
- alternating dense ideas, quiet reading, evidence, and invitation.

Home retains its brand mark and Engineering retains its ship. These are page-specific identity elements inside a shared hero rhythm, not competing hero systems.

## Hero unification

`PublicPageHero` provides the common dark hero for About, Projects, Contact, and project details. It centralizes:

- dark background and engineering backdrop;
- responsive minimum height;
- eyebrow color and spacing;
- heading scale and line height;
- description width and leading; and
- transition into the following reading surface.

Home was aligned to the same minimum-height, heading, spacing, and CTA conventions without removing its existing artwork.

## Card classification

| Surface | Classification | Decision |
|---|---|---|
| Project cards | Entity representation | Retained |
| Engineering resource cards | Navigation destinations | Retained |
| Home mission bullets | Editorial information | Replaced with a numbered ruled list |
| Home contact invitation | Editorial CTA | Replaced with a dark transition section |
| Engineering principles | Editorial philosophy | Replaced with a ruled editorial grid |
| Engineering lifecycle on mobile | Editorial sequence | Replaced with a border-led list |
| Engineering closing quotation | Editorial reflection | Removed decorative card container |
| Project overview | Editorial information | Removed decorative card container |
| Contact email | Contact information | Replaced with a typographic contact block |

Cards remain only where an independent entity or navigation destination benefits from a clear boundary.

## Color semantics

- **Dark:** page identity, mission, footer, and major transitions.
- **White and neutral:** reading, exploration, and explanatory sections.
- **Orange:** engineering emphasis, numbered insights, highlighted phrases, and primary CTAs.
- **Blue:** links, project navigation, destination-card interaction, and controls.

Status colors remain domain-specific indicators and are not decorative accents.

## Section rhythm

The implementation retains `SectionShell` as the spacing authority for public editorial sections. Page heroes use consistent content boundaries and responsive vertical weight. Editorial groupings use shared border rules, while muted sections provide measured transitions without creating isolated panels.

## Responsive validation

Validation covers desktop, tablet, and mobile for:

- hero hierarchy and content width;
- navigation continuity;
- section spacing and transitions;
- CTA treatment;
- card behavior for retained entities and destinations;
- horizontal overflow; and
- readable editorial layouts.

Automated lint, production build, and diff checks are required alongside viewport validation.

### Validation results

- Desktop: 1440 × 900 across Home, About, Engineering, Projects, and Contact.
- Tablet: 834 × 1112 across the same routes.
- Mobile: 390 × 844 across the same routes.
- Exact browser metrics confirmed no horizontal overflow at any tested viewport.
- Public navigation and the AlignFit project detail returned successful responses alongside the primary route set.
- Lint, production build, and diff checks passed after implementation.

## Non-goals preserved

This package does not redesign branding or navigation, introduce animation or pages, change project content, modify SEO or routing, or alter any authenticated, operational, or persistence behavior.
