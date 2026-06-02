# Environment Strategy

## Environments

| Environment | Purpose | URL pattern |
|-------------|---------|-------------|
| Local | Development | `http://localhost:3000` |
| Preview | PR review / QA | `*.vercel.app` (per deployment) |
| Production | Live site | `aredirlabs.com` (when configured) |

## Environment variables

### Local

- Copy `.env.example` to `.env.local` when example file exists.
- Never commit `.env`, `.env.local`, or secrets.

### Naming

- `NEXT_PUBLIC_*` — exposed to the browser; non-sensitive only.
- Server-only variables — no `NEXT_PUBLIC_` prefix; API keys, tokens, webhooks.

### Vercel

- Set variables per environment: Production, Preview, Development.
- Document required variables in this file as they are introduced.

| Variable | Environments | Description |
|----------|--------------|-------------|
| _(none yet)_ | — | Add rows as integrations are added |

## Sanity (when integrated)

- Separate datasets or tokens per environment if required by project policy.
- Preview may use draft content; production uses published content only.

## Secrets handling

- Store secrets in Vercel project settings or approved secret manager.
- Rotate on exposure; never log secret values.

## Related

- [Technical overview](./technical-overview.md)
- [Deployment workflow](./deployment-workflow.md)
