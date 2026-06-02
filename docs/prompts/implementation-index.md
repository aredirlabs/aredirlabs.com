# Implementation Index

Ordered prompts for building aredirlabs.com.

| ID | Prompt | Status | Depends on |
|----|--------|--------|------------|
| 001A | [Foundation, standards & workflow](./prompt-001A-foundation.md) | Complete | — |
| 001B | [Branding, site shell & company website](./prompt-001B-branding-site.md) | Complete | 001A |
| 001C+ | _(future prompts)_ | Planned | 001B |

## Rules

1. **001A** must be committed before feature prompts.
2. Every implementation prompt must include the [coding agent operating standard](../agent/coding-agent-operating-standard.md) prefix.
3. Use [guarded prompt template](../agent/guarded-prompt-template.md) for new prompts.
4. Update this index when adding prompts.

## Verification baseline

```bash
npm run lint
npm run build
```

Plus manual QA when user-facing behavior changes.

## Related

- [Coding agent operating standard](../agent/coding-agent-operating-standard.md)
- [Site brief](../product/site-brief.md)
