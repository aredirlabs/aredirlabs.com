# AI Governance

**Status:** Company Standard  
**Owner:** Aredir Labs  
**Domain:** AI  
**Last reviewed:** 2026-06-25  
**Next review due:** 2026-09-12

## Purpose

This document is the **canonical AI engineering playbook** for Aredir Labs. It consolidates human + AI collaboration rules, workspace-first development expectations, and the AI implementation workflow that connects promoted patterns into a single operating model.

Individual pattern details remain in promoted Knowledge Base assets. This document defines how they work together.

---

## Human + AI collaboration

AI is a **collaborator within governed engineering workflows** — not an autonomous implementer or decision-maker.

| Role | Human / application | AI / LLM |
|------|---------------------|----------|
| **Facts and data** | Application computes from authoritative sources | Does not invent |
| **Assessments and recommendations** | Application owns policy and deterministic logic | Does not create decisions |
| **Narrative and explanation** | Application validates output against contract | LLM explains prescribed content |
| **Implementation** | Engineers and agents follow standards | Agents execute scoped work with verification |
| **Review** | Humans approve PRs, UAT, and production releases | Agents produce auditable completion reports |

Multi-advisor scenarios use the [Human + AI Advisor Workspace Pattern](../ai-patterns/HUMAN_AI_ADVISOR_WORKSPACE_PATTERN.md) — shared workspace as system of record.

---

## Workspace-first development

Organize AI features around **workspace surfaces**, not chat-first interaction.

| Principle | Detail |
|-----------|--------|
| **Persistent knowledge** | Facts, assessments, and recommendations exist as workspace objects with provenance |
| **Chat as mechanism** | Conversation supports workspace actions — it is not the system of record |
| **Timeline visibility** | Users see chronological intelligence events, not ephemeral chat history |
| **Advisor isolation** | Each advisor's contributions are scoped; conflicts are visible, not hidden |

**Canonical pattern:** [Workspace-First AI Experience Pattern](../architecture-patterns/WORKSPACE_FIRST_AI_EXPERIENCE_PATTERN.md)

---

## Prompt standards

### Required prompt prefix

All implementation prompts must begin with the prefix defined in [Coding Agent Operating Standard — Required Prompt Prefix](../engineering-standards/CODING_AGENT_OPERATING_STANDARD.md#required-prompt-prefix).

### Prompt composition

| Prompt type | Standard |
|-------------|----------|
| Implementation | [Guarded prompt template](../../agent/guarded-prompt-template.md) |
| PR review | [PR review template](../../agent/pr-review-template.md) |
| Architecture audit | [Architecture Audit Standard](../documentation-standards/ARCHITECTURE_AUDIT_STANDARD.md) |
| Governed reusable prompts | Promote to `docs/company/prompt-library/` when criteria met |

### AI feature prompts (intelligence pipeline)

AI feature prompts must respect layer boundaries:

```
Context Builder → Facts → Assessments → Insights → Recommendations → Response Contract → Narrative
```

Each layer has a defined owner. Prompts must not collapse layers or ask the LLM to perform application-owned computation.

---

## Required verification

AI work is incomplete without verification at every layer:

| Layer | Verification |
|-------|--------------|
| Context Builder | Deterministic output; bounded inputs; unit tests |
| Facts / Assessments / Insights / Recommendations | Unit and integration tests; deterministic assertions |
| Response Contract | Schema validation; closed-world compliance checks |
| Narrative | Contract compliance; no invented facts; manual review for tone |
| End-to-end AI feature | [AI Evaluation Framework](../ai-patterns/AI_EVALUATION_FRAMEWORK.md) scenarios |
| Agent implementation | Lint, build, manual QA per [Coding Agent Operating Standard](../engineering-standards/CODING_AGENT_OPERATING_STANDARD.md) |

**No-assumption rule:** Do not report AI quality, implementation completeness, or contract compliance without evidence from tests, evaluation scenarios, or documented manual review.

---

## Evidence-based implementation

| Requirement | Detail |
|-------------|--------|
| **Read before write** | Inspect existing AI architecture, context builders, contracts, and evaluation scenarios |
| **Prove layer ownership** | Document which component owns each intelligence layer before implementation |
| **Test determinism** | Application-owned layers must produce repeatable output for fixed inputs |
| **Evaluate regressions** | Run evaluation scenarios when context, contract, or narrative prompts change |
| **Report honestly** | Completion reports distinguish verified behavior from untested assumptions |

---

## Ownership rules

### Application-owned (never delegate to LLM)

- Context assembly and input validation
- Fact computation from authoritative data sources
- Assessment logic and policy evaluation
- Insight derivation from facts and assessments
- Recommendation selection and prioritization
- Response contract structure and content

### LLM-owned (within contract bounds)

- Narrative generation that explains prescribed facts, assessments, and recommendations
- Tone, clarity, and educational framing
- User-facing prose that does not create new decisions

**Canonical architecture:** [AI Intelligence Architecture Pattern](../architecture-patterns/AI_INTELLIGENCE_ARCHITECTURE_PATTERN.md)

Supporting patterns:

- [Context Builder Pattern](../ai-patterns/CONTEXT_BUILDER_PATTERN.md)
- [Response Contract Pattern](../ai-patterns/RESPONSE_CONTRACT_PATTERN.md)

---

## No-assumption principles

Agents and engineers working on AI features must not:

- Implement intelligence layers from general training data instead of repository patterns
- Ask the LLM to compute facts, assessments, or recommendations at runtime
- Skip context builder or response contract when the feature has structured intelligence output
- Claim evaluation coverage without running defined scenarios
- Merge narrative prompt changes without regression review
- Assume chat history replaces workspace-persisted knowledge

When requirements are ambiguous, **audit first** — do not prototype architecture in production code.

---

## Architectural audit requirements

Run an architecture audit (scaled to scope) before:

- Adding new AI intelligence layers
- Changing context builder inputs or contract schemas
- Introducing a new AI provider or model for user-facing features
- Merging multi-advisor or workspace AI surfaces

**Methodology:** [Architecture Audit Standard](../documentation-standards/ARCHITECTURE_AUDIT_STANDARD.md)  
**Governance context:** [Architecture Governance](./ARCHITECTURE_GOVERNANCE.md)

Audit outputs should identify promotion candidates when patterns prove reusable.

---

## Review expectations

| Review type | When | Standard |
|-------------|------|----------|
| **Code review** | Every AI implementation PR | PR template + layer ownership check |
| **Contract review** | Response contract changes | Schema validation + evaluation scenarios |
| **Narrative review** | Prompt or model changes affecting user-facing prose | Manual spot checks + regression scenarios |
| **Evaluation review** | New AI features or major changes | [AI Evaluation Framework](../ai-patterns/AI_EVALUATION_FRAMEWORK.md) acceptance criteria |
| **Promotion review** | Reusable AI patterns identified | [Promotion Process](../PROMOTION_PROCESS.md) |

---

## Handoff expectations

When handing off AI work between agents, engineers, or sessions:

| Handoff element | Required |
|-----------------|----------|
| Scope statement | In-scope / out-of-scope boundaries |
| Architecture state | Which layers exist, which are in progress |
| Verification status | What was tested; what was not |
| Open decisions | Unresolved design choices with options |
| Context artifacts | Links to audit docs, contracts, evaluation scenarios |
| Limitations | Known gaps, manual QA still required |

Context preservation is an engineering responsibility — not optional chat history.

---

## AI implementation workflow

Standard workflow for AI feature work:

```
1. Audit        — Map current AI architecture and data ownership
2. Design       — Define layers, context builder scope, contract schema
3. Build        — Implement application-owned layers first (bottom-up)
4. Contract     — Define response contract before narrative prompts
5. Narrative    — Add LLM narrative layer within contract bounds
6. Evaluate     — Create and run evaluation scenarios
7. Workspace    — Surface intelligence in workspace UI (when user-facing)
8. Verify       — Automated + manual QA + evaluation regression
9. Document     — Update architecture docs, indexes, evaluation catalog
10. Capture     — Identify promotion candidates for reusable patterns
```

### Workflow gates

| Gate | Pass criteria |
|------|---------------|
| Design complete | Layer ownership documented; no LLM-owned decisions |
| Application layers complete | Unit tests pass; deterministic output verified |
| Contract complete | Schema validated; closed-world rules enforced |
| Narrative complete | Evaluation scenarios pass; no contract violations |
| Release ready | [QA Engineering Framework](../qa-standards/QA_ENGINEERING_FRAMEWORK.md) gates satisfied |

---

## Related promoted assets

| Asset | Role |
|-------|------|
| [AI Intelligence Architecture Pattern](../architecture-patterns/AI_INTELLIGENCE_ARCHITECTURE_PATTERN.md) | System topology and layer ownership |
| [Workspace-First AI Experience Pattern](../architecture-patterns/WORKSPACE_FIRST_AI_EXPERIENCE_PATTERN.md) | UX organization |
| [Context Builder Pattern](../ai-patterns/CONTEXT_BUILDER_PATTERN.md) | Input assembly |
| [Response Contract Pattern](../ai-patterns/RESPONSE_CONTRACT_PATTERN.md) | Output boundary |
| [AI Evaluation Framework](../ai-patterns/AI_EVALUATION_FRAMEWORK.md) | Quality validation |
| [Human + AI Advisor Workspace Pattern](../ai-patterns/HUMAN_AI_ADVISOR_WORKSPACE_PATTERN.md) | Multi-advisor collaboration |
| [Evidence-Aware AI Advisor Pattern](../ai-patterns/EVIDENCE_AWARE_AI_ADVISOR_PATTERN.md) | Evidence communication and knowledge evolution |
| [Coding Agent Operating Standard](../engineering-standards/CODING_AGENT_OPERATING_STANDARD.md) | Agent guardrails and verification |

---

## Related

- [Engineering Operating System](../ENGINEERING_OPERATING_SYSTEM.md)
- [Governance Index](../GOVERNANCE_INDEX.md)
- [Architecture Governance](./ARCHITECTURE_GOVERNANCE.md)
- [Engineering Governance](./ENGINEERING_GOVERNANCE.md)
- [Feature Delivery Standard](../playbooks/FEATURE_DELIVERY_STANDARD.md)
