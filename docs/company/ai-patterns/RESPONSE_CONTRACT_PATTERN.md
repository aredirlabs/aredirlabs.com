# Response Contract Pattern

| Field | Value |
|-------|-------|
| **Name** | Response Contract Pattern |
| **Status** | Promoted Standard |
| **Category** | AI Pattern |
| **Version** | 1.0 |
| **Owner** | Aredir Labs |
| **Origin Projects** | AlignFit |
| **Origin Artifacts** | COACH-ARCH-001, COACH-INTEL-001, COACH-INTEL-002, COACH-INTEL-003 |
| **Linked Projects** | AlignFit |
| **Reusability** | High |
| **Last Reviewed** | 2026-06-12 |
| **Next Review Due** | 2026-09-12 |

## Purpose

AI systems require an explicit ownership boundary between **application intelligence** and **model narrative**.

The [Context Builder Pattern](./CONTEXT_BUILDER_PATTERN.md) defines **what enters the system**. The Response Contract Pattern defines **what the model is allowed to do with the information it receives** — and what it must never invent.

**Goal:** Reliable, explainable AI systems that remain deterministic, testable, auditable, and reusable while minimizing hallucinations and recommendation drift.

### Why the boundary matters

When a single prompt allows the model to determine facts, create assessments, prioritize risks, generate recommendations, and explain outcomes, the system loses engineering control:

| Failure mode | Result |
|--------------|--------|
| **Hallucinated recommendations** | Model proposes actions not supported by user data or policy |
| **Inconsistent outputs** | Same inputs produce different conclusions run-to-run |
| **Difficult testing** | Decisions live in natural language with no stable schema |
| **Hidden decision making** | Stakeholders see prose but cannot audit logic |
| **Excessive prompt complexity** | Rules, examples, and reasoning duplicated in every call |

AlignFit Coach evolution demonstrated that narrative quality improves when the model **explains** application-owned decisions — not when it **creates** them.

---

## Anti-Pattern

### Context → LLM → Everything

```
Context
    ↓
   LLM
    ↓
Facts
Assessments
Recommendations
Narrative
```

In this anti-pattern, structured or semi-structured context enters a prompt and the model is asked to derive intelligence and user-facing output in one pass.

| Consequence | Why |
|-------------|-----|
| **Inconsistent conclusions** | Model re-interprets context and policy each invocation |
| **Ownership ambiguity** | Unclear whether a statement is computed, inferred, or invented |
| **Validation difficulties** | No contract to assert against; only subjective prose review |
| **Recommendation drift** | Prompt tweaks change decisions, not just wording |

The model becomes judge, jury, and narrator. Application layers cannot enforce business rules or provide audit trails.

---

## Promoted Pattern

```
Context
    ↓
Facts
    ↓
Assessments
    ↓
Insights
    ↓
Recommendations
    ↓
Response Contract
    ↓
Narrative
```

### Stage responsibilities

| Stage | Owner | Responsibility |
|-------|--------|----------------|
| **Context** | Application | Bounded input from [Context Builder Pattern](./CONTEXT_BUILDER_PATTERN.md) |
| **Facts** | Application | Deterministic statements derived from context |
| **Assessments** | Application | Policy evaluations, scores, and status codes |
| **Insights** | Application | Observations linking facts and assessments |
| **Recommendations** | Application | Ranked actions with IDs, priority, and structured rationale |
| **Response Contract** | Application | Closed-world payload + rules governing narrative |
| **Narrative** | LLM | User-facing explanation within contract bounds |

The **Response Contract** is the handoff artifact: everything the narrative may reference must appear in the contract. The model receives the contract — not permission to extend it.

---

## Ownership Model

| Application owns | Model owns |
|------------------|------------|
| Facts | Explanation |
| Assessments | Education |
| Insights | Communication |
| Recommendations | Tone |
| Prioritization | Personalization (expression, not substance) |

### The model must not

- **Invent facts** — no metrics, events, or states absent from the contract
- **Invent recommendations** — no new actions, priorities, or IDs not in the payload
- **Override assessments** — no re-scoring, re-labeling, or contradicting application evaluations
- **Redefine priorities** — order and emphasis follow contract fields, not model judgment

### The model must

- **Explain decisions** — translate structured intelligence into clear, empathetic prose
- **Honor unknowns** — acknowledge gaps explicitly when `unknowns` are present; never fill them silently
- **Stay within the closed world** — every claim traceable to contract content

**Principle:** The model explains decisions; it does not create them.

---

## Response Contract Structure

Generalized schema for the handoff to the narrative layer. Products extend with domain-specific fields under each section — not parallel top-level inventiveness.

```yaml
facts:
assessments:
insights:
recommendations:
unknowns:
narrative_guidance:
```

### Section purposes

| Section | Purpose |
|---------|---------|
| **facts** | Verifiable statements the narrative may cite ("completed 3 sessions this week"). Stable codes or IDs preferred over free text. |
| **assessments** | Application evaluations against policy ("recovery_load: elevated", "adherence: partial"). Narrative explains; does not recompute. |
| **insights** | Derived observations linking facts and assessments ("volume rose while sleep declined"). Optional but structured. |
| **recommendations** | Ranked actions with IDs, titles, priority, and rationale references. Narrative may reorder phrasing, not substance or membership. |
| **unknowns** | Explicit gaps ("sleep data unavailable for last 2 days"). Model must not infer missing values. |
| **narrative_guidance** | Tone, audience, length, forbidden topics, and formatting hints — not business logic. |

### Contract metadata (recommended)

Include version and interaction metadata alongside sections:

| Field | Purpose |
|-------|---------|
| `contractVersion` | Schema evolution and compatibility |
| `interactionType` | Which narrative template and validation rules apply |
| `generatedAt` | Audit timestamp |
| `locale` | Language and regional formatting expectations |

### Closed-world rule

If it is not in the contract, it **does not exist** for narrative purposes. Prompts must state this explicitly.

---

## Narrative Layer Responsibilities

### Belongs in narrative

| Responsibility | Description |
|------------------|-------------|
| **Explanation** | Why recommendations apply given cited facts and assessments |
| **Coaching** | Supportive framing around prescribed actions |
| **Education** | Teach concepts without adding new prescriptions |
| **Personalization** | Reading level, empathy, motivation — not new facts or actions |
| **Motivational framing** | Encourage adherence to contract recommendations |

### Does not belong in narrative

| Excluded concern | Owner |
|------------------|--------|
| **Risk scoring** | Application (assessments) |
| **Recommendation generation** | Application (recommendations) |
| **Business logic** | Application (all intelligence layers) |
| **Prioritization** | Application (recommendation ranking) |
| **Policy enforcement** | Application (assessments and filtering) |
| **Data gap inference** | Forbidden — use `unknowns` instead |

Narrative prompts should be **short**: role, closed-world rule, tone from `narrative_guidance`, and serialized contract — not restated policy essays.

---

## Validation Framework

Response contracts must be validated like API payloads. Reference the [QA Engineering Framework](../qa-standards/QA_ENGINEERING_FRAMEWORK.md) for testing layers and release discipline.

### Recommendation consistency

| Check | Expectation |
|-------|-------------|
| Membership | Every recommendation in narrative maps to a contract ID |
| No additions | Narrative does not introduce actions absent from `recommendations` |
| Priority respect | Emphasis aligns with contract priority fields |
| Regression fixtures | Golden contracts produce acceptable narrative samples in UAT |

### Ownership verification

| Check | Expectation |
|-------|-------------|
| Fact citations | Stated metrics and events exist under `facts` |
| Assessment alignment | Narrative does not contradict `assessments` |
| Insight scope | Observations in prose trace to `insights` or derivable fact+assessment pairs |

Automated linting (keyword/ID extraction, schema validation) where feasible; manual review for tone and clarity.

### Unknown handling

| Check | Expectation |
|-------|-------------|
| Explicit gaps | When `unknowns` populated, narrative acknowledges limits |
| No gap-fill | Model does not invent values for unknown domains |
| Safe degradation | Copy templates for partial-data scenarios tested |

### Deterministic inputs

| Check | Expectation |
|-------|-------------|
| Contract from app layers | Same context + rules → same contract (before narrative) |
| Narrative non-authoritative | User-visible text may vary; decisions do not |
| Replay testing | Store contract snapshots for QA replay without re-running LLM |

### Output reliability

| Check | Expectation |
|-------|-------------|
| Schema validation | Contract conforms to versioned schema before LLM call |
| Post-generation checks | Optional: parse narrative for forbidden patterns or orphan references |
| Failure modes | Invalid contract blocks LLM call (fail closed) |
| Audit log | Contract + interaction ID retained for support and compliance review |

### Recommended test layers

| Layer | Response contract focus |
|-------|-------------------------|
| **Unit** | Schema validation, required sections, unknowns policy |
| **Integration** | Full pipeline produces contract from context through recommendations |
| **Manual / UAT** | Narrative quality, tone, and adherence on representative contracts |

---

## Example Applications

Generalized examples — no product-specific schemas or routes.

### AlignFit — Fitness coaching

Application computes facts (weekly adherence), assessments (recovery load), and ranked recommendations (rest day, macro adjustment). Response contract packages them with `unknowns` if sleep sync failed. Narrative delivers daily coach message explaining **prescribed** actions — not newly invented workouts.

### ClassForge — Learning support

Application derives facts (incomplete assignments), assessments (mastery gaps), and recommendations (review module X). Contract includes `narrative_guidance` for educator-appropriate tone. Narrative encourages the student without adding assignments or changing priority.

### LeagueOS — Team advisor

Application produces facts (availability, recent results), assessments (schedule density), and recommendations (lineup options with IDs). Contract closes the world on league rules already evaluated in application layers. Narrative summarizes options for coaches without proposing ineligible players.

### Future products — Decision-support systems

Any advisory AI should:

1. Build context ([Context Builder Pattern](./CONTEXT_BUILDER_PATTERN.md))
2. Compute intelligence in application layers ([AI Intelligence Architecture Pattern](../architecture-patterns/AI_INTELLIGENCE_ARCHITECTURE_PATTERN.md))
3. Assemble a response contract (this pattern)
4. Invoke narrative only with closed-world prompts

---

## Relationship to Existing Assets

### Where the Response Contract sits

```
[ Complete AI methodology ]

Context Builder Pattern     →  what enters the system
        ↓
AI Intelligence Architecture  →  how intelligence layers connect
  (Facts → Assessments →
   Insights → Recommendations)
        ↓
Response Contract Pattern   →  output boundary (this pattern)
        ↓
Narrative (LLM)
```

| Asset | Role |
|-------|------|
| [AI Intelligence Architecture Pattern](../architecture-patterns/AI_INTELLIGENCE_ARCHITECTURE_PATTERN.md) | Full topology; defines Response Contract as a layer |
| [Context Builder Pattern](./CONTEXT_BUILDER_PATTERN.md) | Upstream input boundary |
| **Response Contract Pattern** | Downstream output boundary before narrative |
| [Coding Agent Operating Standard](../engineering-standards/CODING_AGENT_OPERATING_STANDARD.md) | Implementation discipline; verify before claiming success |
| [QA Engineering Framework](../qa-standards/QA_ENGINEERING_FRAMEWORK.md) | Layer-specific validation; unit tests on contracts, UAT on narrative |

Together, **Context Builder**, **AI Intelligence Architecture**, and **Response Contract** define:

- How context is assembled
- How intelligence is generated
- How narrative is controlled

The [Workspace-First AI Experience Pattern](../architecture-patterns/WORKSPACE_FIRST_AI_EXPERIENCE_PATTERN.md), [Human + AI Advisor Workspace Pattern](./HUMAN_AI_ADVISOR_WORKSPACE_PATTERN.md), and [Evidence-Aware AI Advisor Pattern](./EVIDENCE_AWARE_AI_ADVISOR_PATTERN.md) extend this methodology to **how intelligence is experienced, collaboratively maintained, and communicated with evidence transparency** across advisor types.

across all Aredir Labs AI products.

---

## Future AI Asset Candidates

Likely future promotions — **not created in this work item**:

| Candidate | Notes |
|-----------|-------|
| **Assessment Layer Pattern** | Reusable policy evaluation and scoring conventions |
| **Recommendation Ownership Pattern** | IDs, ranking, rationale structure for actionable outputs |
| **Provider Resolution Pattern** | Model provider selection, fallback, and cost routing |
| **AI Evaluation Framework** | Regression and quality measurement across releases |
| **Prompt Composition Pattern** | Governed templates for narrative-layer prompts |

**Recommended next work item:** AREDIR-WORKSPACE-008 — **Knowledge Asset Registry** (Governance Registry scope; per [Knowledge Asset Registry Roadmap](../KNOWLEDGE_ASSET_REGISTRY_ROADMAP.md)).

---

## Related

- [Knowledge Base Index](../KNOWLEDGE_BASE_INDEX.md)
- [Promotion Process](../PROMOTION_PROCESS.md)
- [AI Intelligence Architecture Pattern](../architecture-patterns/AI_INTELLIGENCE_ARCHITECTURE_PATTERN.md)
- [Workspace-First AI Experience Pattern](../architecture-patterns/WORKSPACE_FIRST_AI_EXPERIENCE_PATTERN.md)
- [Human + AI Advisor Workspace Pattern](./HUMAN_AI_ADVISOR_WORKSPACE_PATTERN.md)
- [Context Builder Pattern](./CONTEXT_BUILDER_PATTERN.md)
- [AI Evaluation Framework](./AI_EVALUATION_FRAMEWORK.md)
- [Coding Agent Operating Standard](../engineering-standards/CODING_AGENT_OPERATING_STANDARD.md)
- [QA Engineering Framework](../qa-standards/QA_ENGINEERING_FRAMEWORK.md)
