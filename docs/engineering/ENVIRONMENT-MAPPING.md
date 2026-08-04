# Environment Mapping

## Confirmed repository topology

```text
Production domain (aredirlabs.com)
  -> Vercel Production
  -> Neon aredirlabs-prod (documented production target)

Vercel Preview
  -> Vercel Preview deployment
  -> DATABASE_URL target: unable to determine

Local development
  -> ignored .env.local
  -> Neon aredirlabs-dev (confirmed Dev branch `br-wandering-snow-a60tz3pl`)
```

## Mapping status

| Environment | Configuration status | Database target status |
| --- | --- | --- |
| Production | Documented only; not inspected or changed | `aredirlabs-prod` documented; excluded from this package |
| Preview | Not inspected | Unable to determine |
| Local | Ignored `.env.local` validated | Confirmed `aredirlabs-dev` in project `plain-band-91202732`; pre-Engineering Work schema |

Vercel is documented to use the variable names `WORKSPACE_ALLOWED_EMAILS`, `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, and `NEXT_PUBLIC_SITE_URL` for Production and Preview. The exact database target resolution for each scope was not observable in this session.

## Production exclusion evidence

- No production connection value was read, copied, or used.
- No Vercel environment variable was inspected or changed.
- No Neon branch setting, query, migration, seed, reset, or schema operation was performed.
- Local configuration remains absent rather than falling back to an unknown or production target.

## Configuration risk

Preview-to-Production database risk is **unresolved**, not confirmed: Vercel Preview mapping could not be inspected. It must be verified before Preview is used for workspace mutation or Engineering Work validation.

## Next required evidence

The local Dev target is now confirmed through a read-only connection. Use an authorized Vercel console to record, without values, whether `DATABASE_URL` differs by Production and Preview scope. Preview must remain unverified until that evidence is collected.
