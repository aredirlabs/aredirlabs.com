# Public Engineering Experience

Distinction between the public Engineering page and internal Engineering Operating System (EOS) materials.

## Public vs internal

| Surface | Route / location | Audience | Purpose |
|---------|------------------|----------|---------|
| **Public Engineering Experience** | `/engineering` | First-time visitors, partners, candidates | Inspire confidence in *how* Aredir Labs engineers — philosophy, principles, practice |
| **Engineering Operating System** | Repository docs (`docs/company/`) and authenticated workspace | Internal team | Detailed methodology — pillars, lifecycle, governance, playbooks, standards |

The public page must **not** expose internal methodology, governance records, playbooks, repository standards, or private workspace docs.

`/engineering-operating-system` and `/docs/company/*` **redirect to `/engineering`**. They are not public documentation gateways.

## Information flow

```
Visitor lands on /engineering
        │
        ├── Learns why engineering matters
        ├── Sees public principles
        ├── Understands how we build
        └── "Behind Every Project" → public-safe on-page links
                    │
                    ├── #how-we-build
                    ├── #principles
                    ├── /projects
                    └── /contact
```

Internal EOS depth remains in the repository Knowledge Base and authenticated workspace — not linked from the public site.

## Hero

- **Artwork:** `public/images/engineering-ship.png` (571×1024, approved raster, `next/image`, priority)
- **Treatment:** Environmental bleed — cropped past viewport edges, edge-faded into the night field (not a framed portrait cell)
- **Backdrop:** `EngineeringHeroBackdrop` — quiet night field (no competing orbs)
- **Removed:** SVG wireframe ship (`eos-ship-artwork.tsx`)

## Components

| Component | Location | Used on |
|-----------|----------|---------|
| `EngineeringHeroBackdrop` | `src/components/engineering/` | `/engineering` hero |
| `EngineeringHeroShip` | `src/components/engineering/` | `/engineering` hero |
| `EosPillarCard` | `src/components/eos/` | `/engineering` principles |
| `EosFlowDiagram` | `src/components/eos/` | `/engineering` journey |
| `EosExploreCard` | `src/components/eos/` | `/engineering` public-safe resource cards |

Content data:

- `src/lib/engineering-content.ts` — public principles, build steps, public-safe resource links

## Navigation

`src/lib/site-config.ts` — primary nav **Engineering** → `/engineering`.

Redirects (`next.config.ts`):

- `/engineering-operating-system` → `/engineering`
- `/docs/company` and `/docs/company/*` → `/engineering`

## Work items

**SITE-ENGINEERING-001** — Redesign the Public Engineering Experience.

**SITE-ENGINEERING-002** — Hero artwork environmental integration (crop, edge dissolve, no framed portrait).

**SITE-ENGINEERING-003** — Protect engineering methodology routes (public/internal separation).

## Related

- [Information architecture](../product/information-architecture.md)
- [UI patterns](./ui-patterns.md)
- [Engineering Operating System](../company/ENGINEERING_OPERATING_SYSTEM.md) — canonical methodology (repository markdown, not a public route)
