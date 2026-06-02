# Future Product Standards

Guidelines when spinning up new Aredir Labs products from this template.

## Starting a new product

1. Clone or generate from the Aredir Labs template repository.
2. Run **prompt-001A** (foundation) if not already present.
3. Customize `docs/product/site-brief.md` and `docs/brand/`.
4. Configure environments per `docs/engineering/environment-strategy.md`.

## Must carry forward

- `docs/agent/coding-agent-operating-standard.md` and guarded prompt prefix
- `.editorconfig` and `.gitattributes`
- GitHub issue and PR templates
- Bug severity levels and QA workflow
- Naming and component conventions

## Product-specific overrides

Document overrides in the product repo under `docs/product/`:

- Information architecture
- CMS schema (if different from template)
- Auth and data boundaries
- Third-party integrations

## Shared ecosystem

| Product | Focus |
|---------|--------|
| AlignFit | Fitness / alignment product |
| ClassForge | Class and training management |
| LeagueOS | League and competition operations |
| aredirlabs.com | Company marketing site (this repo) |

## Technical baseline

- Next.js App Router + TypeScript + Tailwind
- Vercel deployment with preview URLs on PRs
- Optional Sanity for structured content

## Before first production deploy

- [ ] Environment variables set in Vercel
- [ ] `docs/qa/release-checklist.md` completed
- [ ] Domain and DNS documented
- [ ] Error monitoring configured (when adopted)

## Related

- [Project conventions](./project-conventions.md)
- [Deployment workflow](../engineering/deployment-workflow.md)
