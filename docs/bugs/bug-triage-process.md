# Bug Triage Process

How Aredir Labs reports, prioritizes, fixes, verifies, and closes bugs.

## Reporting

1. Search existing issues and [known-issues.md](./known-issues.md) for duplicates.
2. File a GitHub issue using **Bug report** template (`.github/ISSUE_TEMPLATE/bug_report.md`) or copy from [bug-report-template.md](./bug-report-template.md).
3. Include reproduction steps, environment, and severity.

## Severity levels

| Level | Definition | Response target |
|-------|------------|-----------------|
| **Blocker** | Production unusable, security issue, or data integrity risk | Immediate; hotfix or rollback |
| **High** | Core flow broken; affects many users | Same or next business day |
| **Medium** | Degraded experience; workaround available | Scheduled in sprint |
| **Low** | Cosmetic, rare edge case, nice-to-fix | Backlog |

## Triage workflow

```
New issue
    ↓
Triage (assign severity, owner, duplicate check)
    ↓
Scheduled / In progress
    ↓
Fix on branch → PR → Preview
    ↓
QA verification
    ↓
Merge → Production
    ↓
Close issue (link PR)
```

### Triage checklist

- [ ] Reproduced or confirmed with reporter
- [ ] Severity label applied
- [ ] Duplicate of existing issue? Link and close duplicate.
- [ ] Assigned owner
- [ ] Acceptance criteria for fix documented in issue

## QA verification

Before closing:

- [ ] Fix deployed to preview (or production for hotfix)
- [ ] Original reproduction steps no longer fail
- [ ] Related smoke paths checked (see `docs/qa/manual-qa-checklist.md`)
- [ ] No new Blocker/High regressions introduced

## Closure

- Close the GitHub issue with a link to the fixing PR.
- Remove entry from [known-issues.md](./known-issues.md) if listed there.
- For production incidents, note deploy version and date in issue comment.

## Escalation

- **Blocker on production:** Notify stakeholders, consider Vercel rollback, track in dedicated issue.
- **Security:** Do not discuss exploit details publicly; restrict issue visibility if needed.

## Related

- [Bug report template](./bug-report-template.md)
- [Known issues](./known-issues.md)
- [Manual QA checklist](../qa/manual-qa-checklist.md)
