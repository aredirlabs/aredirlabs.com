# Environment Mapping

## Confirmed repository topology

```text
Production domain (aredirlabs.com)
  -> Vercel Production
  -> Neon aredirlabs-prod (documented production target)

Vercel Preview
  -> not currently part of the supported Aredir operating model
  -> no active Preview deployments exist
  -> DATABASE_URL target: n/a — no guaranteed Preview database mapping

Local development
  -> ignored .env.local
  -> Neon aredirlabs-dev (confirmed Dev branch `br-wandering-snow-a60tz3pl`)
```

## Mapping status

| Environment | Configuration status | Database target status |
| --- | --- | --- |
| Production | Documented only; not inspected or changed | `aredirlabs-prod` documented; excluded from this package |
| Preview | **Not supported** — no active deployments, not an assumed third environment | n/a |
| Local | Ignored `.env.local` validated | Confirmed `aredirlabs-dev` in project `plain-band-91202732`; pre-Engineering Work schema |

Vercel is documented to use the variable names `WORKSPACE_ALLOWED_EMAILS`, `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, and `NEXT_PUBLIC_SITE_URL` for Production. The exact database target resolution for the Production scope was not observable in this session.

## Environment roles

Production is the only persistent operational environment and the sole authority for Aredir company, project, and work state. Local/Development is a verification environment, not a parallel operational environment. Dev data is not expected to mirror Production data, and Production data must not be synchronized into Development for ordinary UI/workflow development.

Preview is currently unsupported and unused rather than an assumed third environment. Any future Preview environment requires an explicitly non-Production database target and appropriate environment/auth configuration before authenticated workspace functionality is enabled.

## Production exclusion evidence

- No production connection value was read, copied, or used.
- No Vercel environment variable was inspected or changed.
- No Neon branch setting, query, migration, seed, reset, or schema operation was performed.
- Local configuration remains absent rather than falling back to an unknown or production target.

## Configuration risk

Preview-to-Production database risk is **n/a while Preview is unsupported**. Because Preview is not part of the operating model and no active Preview deployments exist, no Preview-to-Production database risk is currently present. If Preview is introduced later, its database mapping must be explicitly non-Production and verified before any authenticated workspace use.

## Next required evidence

The local Dev target is now confirmed through a read-only connection. Because Preview is not a supported environment, no Preview database mapping evidence is required. For Production, the documented `aredirlabs-prod` target is the sole operational authority; any Production work follows the governed tracked-migration path with human authorization.
