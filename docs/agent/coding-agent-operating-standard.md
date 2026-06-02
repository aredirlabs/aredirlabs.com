# Coding Agent Operating Standard

**Status:** Required for all agent-driven implementation work in Aredir Labs repositories.

## Required Prompt Prefix

All implementation prompts must begin with:

```
You are working inside an existing production-bound Next.js application.

Before coding, read docs/agent/coding-agent-operating-standard.md and follow it strictly.

Do not make broad rewrites.
Do not introduce new libraries, architecture, patterns, or dependencies unless explicitly requested.
Inspect existing files and conventions first.
Preserve routing, styling, accessibility, content structure, and existing behavior unless this prompt explicitly changes them.
```

## Core Principles

1. **Inspect before changing** — Read relevant files, patterns, and docs before writing code.
2. **Minimal diff** — Solve the stated problem with the smallest correct change.
3. **No unsolicited dependencies** — Do not add packages, abstractions, or architectural shifts unless the prompt explicitly requests them.
4. **Preserve behavior** — Routing, styling, accessibility, content structure, and existing UX stay intact unless the prompt changes them.
5. **Match conventions** — Follow naming, file layout, and patterns documented in `docs/architecture/` and `docs/engineering/`.
6. **Verify before claiming success** — Run applicable checks and report actual results.

## Before Coding

- [ ] Read this document.
- [ ] Read the active prompt in `docs/prompts/`.
- [ ] Review `docs/architecture/project-conventions.md` and related architecture docs.
- [ ] Inspect files you will touch; note existing patterns.
- [ ] Confirm scope: only change what the prompt requires.

## During Implementation

- Prefer extending existing components over creating parallel implementations.
- Use existing design tokens, utilities, and UI primitives.
- Keep components small and single-purpose (see `docs/architecture/component-guidelines.md`).
- Do not refactor unrelated code “while you’re here.”
- Do not delete or rename routes, env vars, or public APIs without explicit instruction.

## After Implementation — Required Report

When work is complete, report:

| Section | Content |
|--------|---------|
| **What changed** | Brief summary of behavior and scope |
| **Files changed** | List of paths |
| **Checks run** | Commands executed (e.g. `npm run lint`, `npm run build`) |
| **Passed checks** | Which succeeded |
| **Failed checks** | Which failed, with relevant output |
| **Manual QA still required** | Items not covered by automated checks |

**Do not claim success unless checks have been run and results are reported honestly.**

## Quality Gates

Default verification for code changes:

```bash
npm run lint
npm run build
```

Additional gates when applicable:

- Manual QA per `docs/qa/manual-qa-checklist.md`
- Preview deployment validation before merge
- UAT per `docs/qa/uat-checklist.md` for release-bound work

## Escalation

Stop and ask (or document in the PR) when:

- The prompt conflicts with existing architecture or standards.
- A new dependency seems necessary but was not requested.
- Fixing the issue requires broad refactors or breaking changes.
- Requirements are ambiguous for user-facing or accessibility-critical behavior.

## Related Documentation

- [Guarded prompt template](./guarded-prompt-template.md)
- [PR review template](./pr-review-template.md)
- [Repository standards](../engineering/repository-standards.md)
- [Manual QA checklist](../qa/manual-qa-checklist.md)
