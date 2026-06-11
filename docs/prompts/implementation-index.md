# Implementation Index

Ordered prompts for building aredirlabs.com.

| ID | Prompt | Status | Depends on |
|----|--------|--------|------------|
| 001A | [Foundation, standards & workflow](./prompt-001A-foundation.md) | Complete | — |
| 001B | [Branding, site shell & company website](./prompt-001B-branding-site.md) | Complete | 001A |
| 001C | [Techno-mythic design system & desktop-first site](./prompt-001C-design-system-uplift.md) | Complete | 001B |
| 001D+ | _(future prompts)_ | Planned | 001C |

## Workspace (internal)

| ID | Prompt | Status | Depends on |
|----|--------|--------|------------|
| [001](../plan/docs/AREDIR-WORKSPACE-001-VERIFICATION.md) | Workspace foundation — auth, protected routes, dashboard, project registry | Complete | 001C |
| [002A](../plan/docs/NEON-ENVIRONMENT-VERIFICATION.md) | Neon environment finalization — dev/prod split, Drizzle, seed baseline | Complete | 001 |
| [003](../plan/docs/AREDIR-WORKSPACE-003-PROJECT-DETAILS.md) | Project detail pages — registry-backed internal product views | Complete | 002A |
| [004](../plan/docs/AREDIR-WORKSPACE-004-PROJECT-NOTES.md) | Project notes and decision log — lightweight project memory | Complete | 003 |
| [005](../plan/docs/VERCEL-PRODUCTION-DEPLOYMENT.md) | Vercel production setup — safe prod DB scripts and deployment checklist | Complete | 004 |
| [006](../plan/docs/AREDIR-WORKSPACE-006-PROJECT-STATUS-MILESTONES.md) | Project status and milestones — lightweight operational visibility | Complete | 005 |

Verification docs live under `plan/docs/`.

## Rules

1. **001A** must be committed before feature prompts.
2. Every implementation prompt must include the [coding agent operating standard](../agent/coding-agent-operating-standard.md) prefix.
3. Use [guarded prompt template](../agent/guarded-prompt-template.md) for new prompts.
4. Update this index when adding prompts.

## Verification baseline

```bash
npm run lint
npm run build
npm run db:push
npm run db:seed
```

Plus manual QA when user-facing behavior changes. Workspace milestones also verify idempotent seeding (`npm run db:seed` twice).

## Related

- [Coding agent operating standard](../agent/coding-agent-operating-standard.md)
- [Site brief](../product/site-brief.md)
