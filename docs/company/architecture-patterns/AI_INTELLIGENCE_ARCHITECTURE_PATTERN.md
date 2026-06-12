# AI Intelligence Architecture Pattern

| Field | Value |
|-------|-------|
| **Name** | AI Intelligence Architecture Pattern |
| **Status** | Promoted Standard |
| **Category** | Architecture Pattern |
| **Version** | 1.0 |
| **Owner** | Aredir Labs |
| **Origin Projects** | AlignFit |
| **Origin Artifacts** | COACH-ARCH-001, COACH-INTEL-001, COACH-INTEL-002, COACH-INTEL-003 |
| **Linked Projects** | AlignFit, ClassForge, LeagueOS, Aredir Labs |
| **Reusability** | High |
| **Last Reviewed** | 2026-06-12 |
| **Next Review Due** | 2026-09-12 |

## Purpose

Provide a reusable architecture for AI systems that require:

- Reliable recommendations
- Deterministic decision making
- Reduced hallucination risk
- Lower token usage
- Explainable outputs

This pattern separates **what the system knows and decides** (application) from **how the system communicates** (language model). Products that need coaching, guidance, advisory, or decision-support features should consider this topology before embedding all intelligence in a single LLM call.

---

## Problem

Asking one LLM prompt to **gather facts**, **analyze**, **prioritize**, **recommend**, and **explain** in a single pass often produces:

| Failure mode | Why it happens |
|--------------|----------------|
| **Inconsistent recommendations** | The model re-interprets rules and priorities on every run |
| **Hallucinated facts** | The model invents user state, metrics, or constraints not in context |
| **Untestable behavior** | Business logic is buried in natural language with no stable contract |
| **High token cost** | Large unstructured prompts repeat rules, examples, and reasoning each call |
| **Opaque decisions** | Stakeholders cannot see why a recommendation was chosen |
| **Regression risk** | Prompt tweaks fix one scenario and break another |

These issues appeared repeatedly during AlignFit coach evolution: monolithic “do everything” prompts were fast to prototype but hard to validate, expensive to run, and unreliable under real user data.

---

## Solution

**Separate responsibilities between the application and the model.**

- The **application** owns data access, business rules, scoring, ranking, and structured outputs.
- The **LLM** owns natural-language synthesis: tone, clarity, and user-facing narrative—within a strict response contract.

The model should not be the system of record for facts, assessments, or final recommendations.

---

## Architecture

```
User Data
    ↓
Context Builder
    ↓
Facts Layer
    ↓
Assessment Layer
    ↓
Insights Layer
    ↓
Recommendation Layer
    ↓
Response Contract
    ↓
Narrative Layer
    ↓
User
```

### Layer responsibilities

| Layer | Owner | Responsibility |
|-------|--------|----------------|
| **User Data** | Application | Authoritative inputs: profile, history, preferences, constraints, telemetry |
| **Context Builder** | Application | Selects, normalizes, and bounds what enters the pipeline (time windows, caps, privacy filters) |
| **Facts Layer** | Application | Deterministic statements derived from data (“completed 3 sessions this week”, “protein target not met”) |
| **Assessment Layer** | Application | Rule- or score-based evaluations against policies (“recovery load: elevated”, “adherence: partial”) |
| **Insights Layer** | Application | Derived observations linking facts and assessments (“volume increased while sleep declined”) |
| **Recommendation Layer** | Application | Ranked, explainable actions with IDs, priorities, and rationale fields—not prose |
| **Response Contract** | Application | Schema the narrative must honor; forbidden inventing new facts or recommendations |
| **Narrative Layer** | LLM | User-facing copy that reflects the contract only |

Data flows **downstream only** for decision logic. The narrative layer receives a **closed world**: everything it may mention must already exist in the contract payload.

---

## Ownership

| Concern | Owner |
|---------|--------|
| Facts | Application |
| Assessments | Application |
| Insights | Application |
| Recommendations | Application |
| Narrative | LLM |

### Context Builder

Runs in the application. Responsibilities:

- Pull only data required for the current interaction
- Apply redaction, aggregation, and staleness rules
- Produce a bounded context object consumed by downstream layers
- Keep token-bound payloads predictable for optional LLM calls

### Facts Layer

Runs in the application. Responsibilities:

- Compute verifiable statements from source data
- Use explicit types and enums where possible
- Never delegate fact discovery to the LLM

### Assessment Layer

Runs in the application. Responsibilities:

- Encode product policy (thresholds, weights, eligibility)
- Output stable assessment codes and scores
- Remain unit-testable without an API call to a model

### Insights Layer

Runs in the application. Responsibilities:

- Combine facts and assessments into higher-level observations
- Support explainability (“because X and Y”)
- Stay deterministic or seeded; avoid model-generated “insights”

### Recommendation Layer

Runs in the application. Responsibilities:

- Rank and filter candidate actions
- Attach structured rationale (codes, linked fact IDs, priority)
- Enforce safety and business constraints before any user-facing text

### Response Contract

Defined by the application. Responsibilities:

- Specify allowed narrative inputs (recommendation IDs, fact summaries, tone hints)
- Forbid the model from adding recommendations, metrics, or medical claims not in payload
- Enable validation: parse or lint model output against contract

### Narrative Layer

Runs via LLM. Responsibilities:

- Turn structured recommendations into clear, empathetic prose
- Adapt tone and reading level
- Must not alter decision outcomes

---

## Benefits

| Benefit | Mechanism |
|---------|-----------|
| **Deterministic outputs** | Recommendations and assessments computed in code with fixed rules |
| **Lower token usage** | Model receives compact structured payload, not full raw history + policy essay |
| **Improved testing** | Facts, assessments, and recommendations unit-tested; narrative tested against contract |
| **Reduced hallucinations** | Closed-world contract; model cannot invent user state or new actions |
| **Reusable architecture** | Same layers map to fitness, learning, sports, and generic decision support |
| **Explainable recommendations** | Structured rationale travels with each recommendation before narrative |

---

## Example Applications

| Product | Domain | Application of pattern |
|---------|--------|-------------------------|
| **AlignFit** | Fitness coaching | Facts from workouts/nutrition/recovery; app ranks coaching actions; LLM delivers daily coach message |
| **ClassForge** | Learning guidance | Facts from progress and assignments; app selects learning interventions; LLM explains next steps |
| **LeagueOS** | Team advisor | Facts from schedules, performance, roster rules; app proposes lineup or strategy options; LLM summarizes for coaches |
| **Future products** | Decision-support systems | Any domain needing ranked advice with audit trail and policy enforcement |

Implementation details remain in each product repository. This document defines **topology and ownership** only.

---

## Implementation guidelines

### Do

- Version assessment and recommendation rules explicitly
- Log structured layers (facts, assessments, recommendations) for debugging and QA
- Keep narrative prompts short: role, tone, contract, and “do not invent” guardrails
- Validate narrative output against the response contract where feasible
- Design layers so each can be mocked independently in tests

### Do not

- Ask the LLM to fetch or infer user facts not provided in the contract
- Encode business policy only in prompt prose
- Merge assessment and narrative into one undifferentiated call for production-critical paths
- Treat model-generated “recommendations” as authoritative without application ranking

---

## Lessons learned (AlignFit coach evolution)

These learnings are **architectural**, extracted from AlignFit coach work (COACH-ARCH-001, COACH-INTEL-001 through COACH-INTEL-003). They are not implementation instructions.

1. **Monolithic prompts do not scale.** Early coach flows that combined analysis and advice in one call were difficult to regression-test and behaved differently under edge-case user data.

2. **Facts must be computed, not described.** When the model was asked to “look at the user’s week,” it sometimes confabulated adherence or load. Moving fact extraction to the application stabilized downstream behavior.

3. **Recommendations need IDs.** Structured recommendation objects (with stable identifiers) allow UI, analytics, and narrative to reference the same action. Prose-only recommendations cannot be tracked or A/B tested reliably.

4. **Explainability is a first-class output.** Storing rationale on recommendations (linked assessments and facts) improved QA and user trust more than longer prompts asking the model to “explain your reasoning.”

5. **The narrative layer is still valuable.** Users want human-readable coaching, not JSON. The LLM remains the right tool for tone and clarity once decisions are fixed.

6. **Token budget follows architecture.** Separating layers reduced repeated policy text in every call; the model received a small contract instead of re-deriving the entire rule set.

7. **Policy changes belong in code.** When product owners adjusted coaching priorities, application-layer rules updated predictably. Prompt-only policy changes caused unintended narrative drift.

8. **Test the decision path without the model.** Teams shipped confidence faster when facts, assessments, and recommendations had automated tests independent of LLM availability or latency.

---

## Related

- [Knowledge Base Index](../KNOWLEDGE_BASE_INDEX.md)
- [Promotion Process](../PROMOTION_PROCESS.md)
- [Context Builder Pattern](../ai-patterns/CONTEXT_BUILDER_PATTERN.md)
- [Response Contract Pattern](../ai-patterns/RESPONSE_CONTRACT_PATTERN.md)
- [Architecture Audit Standard](../documentation-standards/ARCHITECTURE_AUDIT_STANDARD.md)
- [Feature Delivery Standard](../playbooks/FEATURE_DELIVERY_STANDARD.md)
- [Coding Agent Operating Standard](../engineering-standards/CODING_AGENT_OPERATING_STANDARD.md)
- [QA Engineering Framework](../qa-standards/QA_ENGINEERING_FRAMEWORK.md)
- [Future product standards](../../architecture/future-product-standards.md)
