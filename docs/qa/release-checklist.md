# Release Checklist

Pre-production and post-production validation for aredirlabs.com releases.

## Pre-merge (PR)

- [ ] All PR checks green (lint, build)
- [ ] [Manual QA checklist](./manual-qa-checklist.md) completed on preview
- [ ] No open **Blocker** or **High** bugs for this release
- [ ] UAT sign-off if milestone release ([uat-checklist.md](./uat-checklist.md))
- [ ] Environment variables verified in Vercel for production

## Merge & deploy

- [ ] PR approved and merged to `main`
- [ ] Vercel production deployment succeeded
- [ ] Deployment URL and commit SHA recorded

## Post-deploy validation

- [ ] Production home page loads (200)
- [ ] Changed routes verified on production
- [ ] SSL / domain correct
- [ ] Metadata (title, description, OG image) correct on key pages
- [ ] Analytics / monitoring receiving events (if configured)
- [ ] No new errors in Vercel/runtime logs (spot check)

## Communication

- [ ] Team notified of release
- [ ] [known-issues.md](../bugs/known-issues.md) updated if applicable
- [ ] GitHub milestone or issues closed as appropriate

## Rollback plan

- [ ] Previous production deployment ID noted in Vercel
- [ ] Owner identified if rollback required

## Pipeline reference

```
Local → Feature Branch → PR → Preview → Manual QA → Merge → Production → Post-deploy validation
```

## Related

- [Deployment workflow](../engineering/deployment-workflow.md)
- [Environment strategy](../engineering/environment-strategy.md)
