# UAT Checklist

User Acceptance Testing before major releases or stakeholder sign-off. Builds on [manual QA](./manual-qa-checklist.md) with business-facing validation.

## When to run UAT

- Pre-launch or milestone releases
- Changes to IA, core messaging, or contact flows
- Stakeholder-requested review

## Environment

- [ ] **Preview** or **staging** URL shared with reviewers (not local-only)
- [ ] Production-like content (not lorem ipsum on key pages)
- [ ] Deploy version / commit SHA recorded

## Content & messaging

- [ ] Company name, product names, and links accurate
- [ ] No placeholder copy on user-facing pages in scope
- [ ] Legal pages present if required (privacy, terms)
- [ ] Contact information correct

## User journeys

| Journey | Pass | Notes |
|---------|------|-------|
| Land on home → understand what Aredir Labs does | [ ] | |
| Navigate to products / portfolio | [ ] | |
| Reach contact or CTA goal | [ ] | |
| External product links work | [ ] | |

## Cross-browser (sample)

- [ ] Chrome (latest)
- [ ] Safari (latest, if available)
- [ ] Firefox (latest)

## Performance (smoke)

- [ ] First load feels acceptable on throttled mobile (DevTools)
- [ ] No obvious layout shift on hero / above fold

## Sign-off

| Stakeholder | Role | Date | Approved |
|-------------|------|------|----------|
| | | | [ ] |

## Issues found

Log via GitHub bug template; set severity per `docs/bugs/bug-triage-process.md`.

## Related

- [Release checklist](./release-checklist.md)
- [Bug triage process](../bugs/bug-triage-process.md)
