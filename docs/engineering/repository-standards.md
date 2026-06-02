# Repository Standards

Guardrails and file standards for Aredir Labs Git repositories.

## Text file standards

Enforced via `.editorconfig` and `.gitattributes`:

| Rule | Value |
|------|--------|
| Character encoding | UTF-8 |
| Line endings | LF (`eol=lf` in Git) |
| Final newline | Required on all text files |
| Trailing whitespace | Trimmed (except Markdown, where trailing spaces can be meaningful) |
| Indentation | 2 spaces (default) |

### EditorConfig

See root `.editorconfig` for per-glob rules.

### Git attributes

See root `.gitattributes` for:

- `text=auto eol=lf` on text files
- Binary declarations for images and fonts
- CRLF only for Windows batch files (`.cmd`, `.bat`)

## Repository hygiene

- **`.gitignore`** — Node, Next.js, env files, OS junk.
- **No secrets in Git** — use environment variables.
- **No generated artifacts** — do not commit `.next/`, `node_modules/`, build output.

## Branch protection (recommended)

- Require PR before merge to `main`.
- Require status checks: lint, build (CI when added).
- Require at least one approval for production repos.

## CODEOWNERS

See `.github/CODEOWNERS` for default review assignments. Update with real GitHub usernames or teams.

## Documentation

- All project docs live under `docs/`.
- Prompts and implementation index under `docs/prompts/`.
- Agent standard is mandatory: `docs/agent/coding-agent-operating-standard.md`.

## GitHub templates

- Bug reports: `.github/ISSUE_TEMPLATE/bug_report.md`
- Features: `.github/ISSUE_TEMPLATE/feature_request.md`
- Pull requests: `.github/PULL_REQUEST_TEMPLATE.md`

## Related

- [Coding agent operating standard](../agent/coding-agent-operating-standard.md)
- [Deployment workflow](./deployment-workflow.md)
