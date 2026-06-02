# Guarded Prompt Template

Use this template for all implementation prompts in Aredir Labs projects. Copy, fill in placeholders, and save under `docs/prompts/` when appropriate.

---

## Prompt: [TITLE]

**ID:** prompt-XXX  
**Depends on:** [e.g. prompt-001A-foundation]  
**Scope:** [feature | fix | docs | infra]

### Required prefix (do not omit)

```
You are working inside an existing production-bound Next.js application.

Before coding, read docs/agent/coding-agent-operating-standard.md and follow it strictly.

Do not make broad rewrites.
Do not introduce new libraries, architecture, patterns, or dependencies unless explicitly requested.
Inspect existing files and conventions first.
Preserve routing, styling, accessibility, content structure, and existing behavior unless this prompt explicitly changes them.
```

### Goal

[One paragraph: what success looks like.]

### In scope

- [ ] Item 1
- [ ] Item 2

### Out of scope

- [ ] Item 1 (explicitly excluded)

### Files to inspect first

- `path/to/relevant/file.tsx`
- `docs/architecture/...`

### Implementation notes

[Constraints, design references, copy, URLs, acceptance criteria.]

### Verification

- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] Manual QA: [link or checklist section]

### Completion report (required)

Agent must report: what changed, files changed, checks run, passed/failed checks, manual QA still required.

---

## Checklist before sending a prompt

- [ ] Required prefix included
- [ ] Scope bounded (in / out)
- [ ] No implicit new dependencies
- [ ] Verification steps defined
- [ ] Dependencies on prior prompts noted
