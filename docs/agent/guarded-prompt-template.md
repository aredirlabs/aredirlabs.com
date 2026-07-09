# Guarded Prompt Template

Use this template **when an Implementation Brief / Prompt is needed**. An Engineering Work Package is the required implementation specification; a separate prompt is optional and should not be created when it would only repeat the work package.

See [Engineering Work Package vs Implementation Brief](../company/playbooks/FEATURE_DELIVERY_STANDARD.md#engineering-work-package-vs-implementation-brief).

Copy, fill in placeholders, and save under `docs/prompts/` when appropriate.

---

## Prompt: [TITLE]

**ID:** prompt-XXX  
**Work Package:** [e.g. BODY-UX-004 / AREDIR-KB-00N] — authoritative scope  
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

[One paragraph: what success looks like. Must align with the work package — do not expand scope.]

### In scope

- [ ] Item 1 (from work package)
- [ ] Item 2

### Out of scope

- [ ] Item 1 (explicitly excluded — from work package non-goals)

### Files to inspect first

- `path/to/relevant/file.tsx`
- `docs/architecture/...`

### Implementation notes

[Sequencing, risk controls, multi-path constraints, coordination — reasons this brief exists beyond the work package.]

### Verification

- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] Manual QA: [link or checklist section]

### Completion report (required)

Agent must report: what changed, files changed, checks run, passed/failed checks, manual QA still required.

---

## Checklist before sending a prompt

- [ ] Work package already exists and is the source of truth
- [ ] This brief is needed (sequencing / risk / multi-system / coordination) — not a duplicate of the work package
- [ ] Required prefix included
- [ ] Scope bounded (in / out) and does not expand the work package
- [ ] No implicit new dependencies
- [ ] Verification steps defined
- [ ] Dependencies on prior prompts noted
