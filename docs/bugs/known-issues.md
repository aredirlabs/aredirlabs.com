# Known Issues

Tracked bugs not yet fixed or awaiting deploy. For resolved issues, use GitHub issue history.

## Format

```markdown
### [BUG-001] Short title

- **Severity:** Medium
- **Status:** Open | In progress | Fixed (pending deploy)
- **Issue:** #123
- **Summary:** One-line description
- **Workaround:** If any
```

---

## Open issues

### [BUG-001] Prompt Library unavailable in Production

- **Severity:** High
- **Status:** Open
- **Issue:** Not yet filed in GitHub
- **Summary:** `/workspace/prompts` fails in Production because `workspace_project_prompts` is absent from the tracked
  migration corpus, so `db:migrate:prod` cannot create it while `db:push:prod` is prohibited. `notes`, `milestones`, and
  `documents` share the same gap and will break in any newly provisioned environment.
- **Workaround:** None in product. Dev is unaffected.
- **Detail:** [BUG-001_WORKSPACE_PROMPTS_UNAVAILABLE_IN_PRODUCTION.md](BUG-001_WORKSPACE_PROMPTS_UNAVAILABLE_IN_PRODUCTION.md)

---

## Recently fixed (archive last 30 days)

_None yet._

---

When adding issues, prefer GitHub as the source of truth and link here only for high-visibility or release-blocking tracking.
