# Deployment Workflow

Standard deployment path for Aredir Labs Next.js projects on Vercel.

## Pipeline overview

```
Local development
       ↓
Feature branch
       ↓
Pull request
       ↓
Preview deployment (Vercel)
       ↓
Manual QA on preview URL
       ↓
Merge to main
       ↓
Production deployment
       ↓
Post-deploy validation
```

## Local development

1. Branch from `main`: `feature/*`, `fix/*`, or `docs/*`.
2. Implement with operating standard and architecture docs.
3. Run `npm run lint` and `npm run build` before pushing.

## Pull request

- Fill out `.github/PULL_REQUEST_TEMPLATE.md`.
- Link related GitHub issues.
- Ensure Vercel preview deployment succeeds.

## Preview deployment

- Every PR should receive a Vercel preview URL.
- QA validates critical paths on preview (see `docs/qa/manual-qa-checklist.md`).
- Do not merge with failing checks or unresolved Blocker/High bugs.

## Production

- Merging to `main` triggers production deploy on Vercel.
- Run `docs/qa/release-checklist.md` for release-bound merges.
- Verify production URL, analytics (if configured), and key flows.

## Rollback

- Use Vercel instant rollback to a prior production deployment if a critical issue ships.
- File a Blocker bug and document incident in the issue.

## Related

- [Environment strategy](./environment-strategy.md)
- [Manual QA checklist](../qa/manual-qa-checklist.md)
- [Release checklist](../qa/release-checklist.md)
