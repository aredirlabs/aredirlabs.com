# Context Builder Pattern

| Field | Value |
|-------|-------|
| **Name** | Context Builder Pattern |
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

AI systems should **never operate directly on raw application data**. Raw database rows, API payloads, and event streams contain noise, PII, stale fields, and domain detail the model neither needs nor can reliably interpret.

The Context Builder Pattern defines how the **application** transforms raw data into **bounded, deterministic, explainable context** before any assessment, recommendation, or narrative generation occurs.

**Goal:** Create context that downstream AI layers can consume safely — with predictable size, stable shape, and explicit provenance.

### Common failure modes without a context builder

| Failure mode | Why it happens |
|--------------|----------------|
| **Excessive context** | Entire user history dumped into prompts; token cost and latency grow without improving quality |
| **Irrelevant context** | Model receives data unrelated to the current interaction; attention dilutes |
| **Inconsistent recommendations** | Unbounded inputs change run-to-run even when user state is unchanged |
| **Token waste** | Redundant fields, verbose serialization, and repeated policy text inflate every call |
| **Hidden assumptions** | Implicit filtering or aggregation buried in prompts instead of application code |
| **Hallucinations from incomplete context** | Model fills gaps when required facts were never selected or normalized |

These failures appeared during AlignFit Coach evolution when prompts consumed loosely structured user data. Moving context construction into the application stabilized downstream facts, assessments, and recommendations.

---

## Problem Statement

### Anti-pattern: Database → Prompt → Model

```
Database
    ↓
Prompt
    ↓
Model
```

In this anti-pattern, application code serializes raw or near-raw data into a prompt and asks the model to interpret, prioritize, and decide.

| Consequence | Impact |
|-------------|--------|
| **Poor reliability** | Model interprets ambiguous fields differently each run |
| **Inconsistent outputs** | Same user state produces different coaching or advice |
| **Expensive prompts** | Every call re-sends full history and implicit rules as prose |
| **Difficult testing** | No stable context object to assert against; behavior lives in prompt wording |

The model becomes an unbounded ETL pipeline, policy engine, and narrator simultaneously — violating separation of concerns defined in the [AI Intelligence Architecture Pattern](../architecture-patterns/AI_INTELLIGENCE_ARCHITECTURE_PATTERN.md).

### Correct placement

The Context Builder sits **between raw data and all decision layers**. It is the first application-owned stage that produces AI-ready input.

---

## Context Builder Architecture

Full pipeline showing where context construction fits:

```
Raw Data
    ↓
Data Selection
    ↓
Normalization
    ↓
Prioritization
    ↓
Context Builder
    ↓
Facts Layer
    ↓
Assessment Layer
    ↓
Insights Layer
    ↓
Recommendations
    ↓
Narrative
```

Stages through **Context Builder** are this pattern's scope. Stages from **Facts Layer** onward are defined in the AI Intelligence Architecture Pattern.

### Stage responsibilities

| Stage | Owner | Responsibility |
|-------|--------|----------------|
| **Raw Data** | Application (source systems) | Authoritative stores: database, APIs, telemetry, user preferences |
| **Data Selection** | Application | Choose which records, time windows, and entities apply to this interaction |
| **Normalization** | Application | Map source shapes to canonical types; resolve units, time zones, enums |
| **Prioritization** | Application | Rank and cap what fits within scope and token budget; drop or summarize low-value data |
| **Context Builder** | Application | Assemble the bounded **context object** — structured, versioned, explainable |
| **Facts Layer** | Application | Derive deterministic statements from context (downstream of builder output) |
| **Assessment Layer** | Application | Evaluate context against policies and thresholds |
| **Insights Layer** | Application | Link facts and assessments into observations |
| **Recommendations** | Application | Rank actions with IDs and structured rationale |
| **Narrative** | LLM | User-facing explanation within response contract |

The Context Builder output is the **contractual input** to facts and all downstream application layers. It is not the final prompt to the model.

---

## Ownership Model

| Application owns | LLM owns |
|------------------|----------|
| Data collection | Explanation |
| Data selection | Education |
| Normalization | Communication |
| Prioritization | Personalization (tone, reading level — not facts) |
| Context construction | |

### Hard boundaries

- **The model should not determine facts.** Facts are computed from builder output in application code.
- **The model should not invent context.** Every entity the narrative may reference must exist in the delivered context or downstream structured layers.
- **The model should not select raw data.** Selection, caps, and privacy filters are application responsibilities.

Personalization means adapting **how** information is communicated — not **what** is true or **which** recommendations apply.

---

## Core Principles

### Relevance Over Completeness

Include what matters for **this** interaction. Exclude what does not.

- Scope context to the current user goal, session, or feature surface
- Prefer summarized aggregates over raw event lists when detail is not decision-critical
- Document exclusion rules so omissions are intentional, not accidental

### Deterministic Inputs

Identical authoritative inputs should produce **identical context objects**.

- Same user state + same interaction type + same builder version → same structured output
- Non-determinism belongs only in narrative generation, not in context assembly
- Enables unit tests, regression fixtures, and QA replay

### Bounded Context

Limit scope intentionally.

- Define max items, time windows, field sets, and token budgets per interaction type
- Fail gracefully when data exceeds bounds (summarize, truncate with audit trail, or defer)
- Prevent unbounded prompt growth as user history grows

### Context Is a Product

Treat context construction as **application logic** — not prompt engineering.

- Version the context schema
- Code review context builder changes like business logic
- Log context snapshots (redacted) for debugging and QA

### Explicit Ownership

Separate application decisions from model narrative.

- Context builder produces structured data with provenance
- Downstream layers consume context; narrative consumes only the response contract
- Never ask the model to "figure out" what data matters

---

## Context Builder Lifecycle

Operational lifecycle for constructing and delivering context:

```
Collect
    ↓
Filter
    ↓
Normalize
    ↓
Prioritize
    ↓
Structure
    ↓
Validate
    ↓
Deliver
```

### Collect

| | |
|---|---|
| **Purpose** | Gather raw inputs from authoritative sources for the interaction |
| **Outputs** | Raw records, events, profile fields, configuration relevant to scope |
| **Quality requirements** | Reads from source of truth only; no model-generated data; respect auth and tenancy boundaries |

### Filter

| | |
|---|---|
| **Purpose** | Remove irrelevant, stale, or prohibited data before transformation |
| **Outputs** | Filtered subset aligned to interaction type and privacy policy |
| **Quality requirements** | PII redaction applied; stale data excluded or flagged; time window enforced |

### Normalize

| | |
|---|---|
| **Purpose** | Convert filtered data into canonical shapes the builder and downstream layers expect |
| **Outputs** | Typed fields, consistent units, resolved enums, unified timestamps |
| **Quality requirements** | Missing optional fields explicit (null / absent policy documented); no ambiguous string encodings |

### Prioritize

| | |
|---|---|
| **Purpose** | Rank and cap content to fit decision needs and token budget |
| **Outputs** | Ordered, capped collections; summaries where detail was dropped |
| **Quality requirements** | Priority rules documented; high-signal data retained; truncation auditable |

### Structure

| | |
|---|---|
| **Purpose** | Assemble the bounded context object with schema version and metadata |
| **Outputs** | Context object: `{ version, interactionType, userRef, window, entities, summaries, ... }` |
| **Quality requirements** | Schema documented; stable field names; provenance for derived summaries |

### Validate

| | |
|---|---|
| **Purpose** | Confirm context meets quality gates before downstream layers run |
| **Outputs** | Validation result; errors or warnings; optional QA snapshot |
| **Quality requirements** | Required fields present; bounds respected; invalid context blocks pipeline (fail closed) |

### Deliver

| | |
|---|---|
| **Purpose** | Hand context to Facts Layer and subsequent application stages |
| **Outputs** | Immutable context snapshot for the interaction (or versioned copy for audit) |
| **Quality requirements** | Downstream layers consume context only — they do not re-fetch unbounded raw data |

---

## Validation Framework

Context builders must be validated like any critical application component. Reference the [QA Engineering Framework](../qa-standards/QA_ENGINEERING_FRAMEWORK.md) for lifecycle and testing pyramid guidance.

### Deterministic output

| Check | Expectation |
|-------|-------------|
| Fixture replay | Given fixed raw inputs, context output matches golden snapshot |
| Builder version | Schema version bump when output shape changes |
| Idempotency | Re-running builder on unchanged inputs produces identical output |

### Expected field coverage

| Check | Expectation |
|-------|-------------|
| Required fields | All mandatory fields present for each interaction type |
| Interaction matrix | Document which fields apply per surface (daily coach, onboarding, alert, etc.) |
| Provenance | Summarized fields trace to source selection rules |

### Missing data handling

| Check | Expectation |
|-------|-------------|
| Explicit absence | Missing optional data represented explicitly — not omitted silently |
| Degraded mode | Document behavior when critical data unavailable (skip feature, safe defaults, user message) |
| No model gap-fill | Downstream layers must not ask LLM to infer missing authoritative data |

### Edge cases

| Check | Expectation |
|-------|-------------|
| New user / empty history | Context valid with empty collections; downstream handles gracefully |
| Boundary dates | Time window edges (week start, timezone) tested |
| Overflow | Behavior when raw data exceeds caps — summarize, truncate, or reject with logging |
| Privacy | Redaction rules verified; no prohibited fields in output |

### Token efficiency

| Check | Expectation |
|-------|-------------|
| Budget per interaction | Max serialized size documented and tested |
| Summarization quality | Summaries preserve decision-critical signal |
| Regression | Token count tracked when builder logic changes |

### Recommended test layers

| Layer | Context builder focus |
|-------|----------------------|
| **Unit** | Normalization, prioritization, caps, missing-data rules |
| **Integration** | Collect + filter from test database or fixtures |
| **Manual / QA** | Spot-check context snapshots against real user scenarios in UAT |

---

## Example Applications

Generalized use cases — no project-specific schemas or routes.

### AlignFit — Fitness coaching context

Build context for a coaching interaction from workouts, nutrition logs, recovery signals, and user goals.

- **Select:** Last 7 days of activity, current goal phase, active constraints (injuries, equipment)
- **Normalize:** Consistent units, session types, macro totals
- **Prioritize:** Recent adherence gaps and today's planned session over full historical logs
- **Deliver:** Bounded context consumed by facts ("missed 2 planned sessions"), assessments ("recovery load elevated"), and recommendations before coach narrative

### ClassForge — Student learning context

Build context for learning guidance from assignments, progress, and educator-defined standards.

- **Select:** Current unit, overdue items, recent assessment scores
- **Normalize:** Grade levels, skill tags, completion states
- **Prioritize:** Struggling objectives and next due work over full course catalog
- **Deliver:** Context feeding facts ("3 incomplete assignments in unit 4") and intervention recommendations before explanatory narrative

### LeagueOS — Team management context

Build context for team advisor flows from roster, schedule, performance, and league rules.

- **Select:** Upcoming match, eligible roster, recent results, constraint rules
- **Normalize:** Positions, availability statuses, rule enums
- **Prioritize:** Lineup-relevant players and rule conflicts over full season history
- **Deliver:** Context for facts ("key player unavailable"), assessments ("schedule density high"), and advisory recommendations before coach-facing summary

### Future products — Decision-support systems

Any product where AI assists decisions should implement a Context Builder before assessments or LLM calls:

- Define interaction types and context schemas per surface
- Keep raw data access out of narrative prompts
- Validate context deterministically before invoking models

---

## Relationship to Existing Assets

### Where the Context Builder sits

```
[ AI Intelligence Architecture Pattern — full topology ]
         User Data
              ↓
    ┌─────────────────────┐
    │  CONTEXT BUILDER    │  ← this pattern (detailed)
    │  Pattern            │
    └─────────────────────┘
              ↓
         Facts → Assessment → Insights → Recommendations
              ↓
         Response Contract → Narrative → User
```

The [AI Intelligence Architecture Pattern](../architecture-patterns/AI_INTELLIGENCE_ARCHITECTURE_PATTERN.md) defines the **full layered topology**. This pattern **deepens the first application stage**: how raw data becomes bounded context before facts are derived.

### Coding Agent Operating Standard

The [Coding Agent Operating Standard](../engineering-standards/CODING_AGENT_OPERATING_STANDARD.md) requires minimal diffs, verification before completion, and no architectural drift. When implementing context builders:

- Extend existing data access patterns; do not add model-side data gathering
- Unit-test builder logic; report verification honestly
- Document schema changes alongside code

### QA Engineering Framework

The [QA Engineering Framework](../qa-standards/QA_ENGINEERING_FRAMEWORK.md) validates AI systems layer by layer. Context builders require:

- **Unit tests** on deterministic output (primary QA surface for this pattern)
- **Integration tests** when selection spans database or API boundaries
- **Regression review** when caps or priority rules change
- **Manual UAT** for end-to-end coaching/guidance flows — not for re-testing normalization already covered by fixtures

AI narrative QA assumes context was correct; fixing bad outputs often starts with validating builder output.

---

## Future AI Asset Candidates

Likely future promotions — **not created in this work item**:

| Candidate | Notes |
|-----------|-------|
| [Response Contract Pattern](./RESPONSE_CONTRACT_PATTERN.md) | Schema and validation for narrative-layer inputs; closes the loop after recommendations |
| **Assessment Layer Pattern** | Reusable policy evaluation and scoring conventions |
| **Recommendation Ownership Pattern** | Structured ranking, IDs, and rationale for actionable outputs |
| **Provider Resolution Pattern** | Model provider selection, fallback, and cost routing |
| **AI Evaluation Framework** | Regression and quality measurement for AI features across releases |

**Promoted companion:** [Response Contract Pattern](./RESPONSE_CONTRACT_PATTERN.md) — completes the input/output boundary pair with this pattern.

---

## Related

- [Knowledge Base Index](../KNOWLEDGE_BASE_INDEX.md)
- [Promotion Process](../PROMOTION_PROCESS.md)
- [AI Intelligence Architecture Pattern](../architecture-patterns/AI_INTELLIGENCE_ARCHITECTURE_PATTERN.md)
- [Coding Agent Operating Standard](../engineering-standards/CODING_AGENT_OPERATING_STANDARD.md)
- [QA Engineering Framework](../qa-standards/QA_ENGINEERING_FRAMEWORK.md)
