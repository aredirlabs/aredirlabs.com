# PR Review Template

Use for human and agent-assisted pull request reviews in Aredir Labs repositories.

---

## Summary

<!-- What does this PR do and why? -->

## Type

- [ ] Feature
- [ ] Bug fix
- [ ] Documentation
- [ ] Refactor (no behavior change)
- [ ] Chore / tooling

## Scope check

- [ ] Diff is focused; no unrelated refactors
- [ ] No new dependencies unless justified in description
- [ ] Follows `docs/architecture/` and `docs/engineering/repository-standards.md`
- [ ] Agent operating standard followed (if agent-authored)

## Code quality

- [ ] Naming matches conventions (`docs/architecture/naming-conventions.md`)
- [ ] Components remain small and single-purpose
- [ ] No duplicated logic that should use existing utilities
- [ ] Types are accurate; no unnecessary `any`

## UI / UX (if applicable)

- [ ] Matches brand and UI patterns (`docs/brand/`, `docs/architecture/ui-patterns.md`)
- [ ] Responsive behavior checked
- [ ] Keyboard and screen reader basics considered

## Testing & verification

- [ ] `npm run lint` passed
- [ ] `npm run build` passed
- [ ] Manual QA performed (link checklist items or note N/A)
- [ ] Preview deployment reviewed (if applicable)

## Bugs (if fix)

- [ ] Linked issue or bug ID
- [ ] Reproduction steps verified fixed
- [ ] Regression risk noted

## Reviewer notes

<!-- Questions, risks, follow-ups -->

## Approval

- [ ] Approved
- [ ] Changes requested
