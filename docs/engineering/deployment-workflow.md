# Deployment Workflow

Standard deployment path for Aredir Labs Next.js projects on Vercel.

## Environment model

Production is the only persistent operational environment and the sole authority for Aredir company, project, and work state. Local/Development is a verification environment used for engineering verification and migration rehearsal — it is not a parallel operational environment and is not expected to mirror Production data.

Preview is not currently part of the supported Aredir operating model. No active Preview deployments exist. If Preview is introduced later, authenticated workspace functionality must not be enabled until Preview has an explicitly non-Production database target and appropriate environment/auth configuration.

## Pipeline overview

```
Local development
       ↓
Feature branch
       ↓
Pull request
       ↓
Manual QA (local / disposable verification environment)
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
- Ensure CI checks pass.

## Verification before merge

- Verify changed behavior locally or on a disposable verification environment (see `docs/qa/manual-qa-checklist.md`).
- Do not merge with failing checks or unresolved Blocker/High bugs.
- Preview is not currently a supported verification environment and must not be used for authenticated workspace testing.
- Unverified local code must never operate directly against the Production database.

## Production

- Merging to `main` triggers production deploy on Vercel.
- Run `docs/qa/release-checklist.md` for release-bound merges.
- Verify production URL, analytics (if configured), and key flows.
- Authenticated human runtime acceptance against Production remains part of the accepted delivery model.

## Rollback

- Use Vercel instant rollback to a prior production deployment if a critical issue ships.
- File a Blocker bug and document incident in the issue.

## Related

- [Environment strategy](./environment-strategy.md)
- [Manual QA checklist](../qa/manual-qa-checklist.md)
- [Release checklist](../qa/release-checklist.md)
