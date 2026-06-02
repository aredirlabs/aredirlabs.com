# Prompt 001A — Foundation, Standards & Workflow

**Status:** Documentation and repository infrastructure (no application feature work).

## Goal

Establish the complete project operating system for Aredir Labs before building the actual website. This repository serves as the company-standard template for future projects.

## Delivered

- `docs/` structure (agent, architecture, brand, engineering, product, bugs, qa, prompts)
- `docs/agent/coding-agent-operating-standard.md` (required agent prefix)
- `.editorconfig` and `.gitattributes`
- `.github/` issue templates, PR template, CODEOWNERS
- Professional `README.md`
- This prompt archived for reference

## Required prefix for all future prompts

```
You are working inside an existing production-bound Next.js application.

Before coding, read docs/agent/coding-agent-operating-standard.md and follow it strictly.

Do not make broad rewrites.
Do not introduce new libraries, architecture, patterns, or dependencies unless explicitly requested.
Inspect existing files and conventions first.
Preserve routing, styling, accessibility, content structure, and existing behavior unless this prompt explicitly changes them.
```

## Verification (at completion)

```bash
npm run lint
npm run build
```

Report: what changed, files changed, checks run, passed/failed, manual QA still required.

## Next prompts

See [implementation-index.md](./implementation-index.md). Feature and design implementation begin after 001A is merged.
