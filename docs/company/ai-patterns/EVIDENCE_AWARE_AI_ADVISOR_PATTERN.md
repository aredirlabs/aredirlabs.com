# Evidence-Aware AI Advisor Pattern

| Field | Value |
|-------|-------|
| **Name** | Evidence-Aware AI Advisor Pattern |
| **Status** | Promoted Standard |
| **Category** | AI Pattern |
| **Version** | 1.0 |
| **Owner** | Aredir Labs |
| **Origin Projects** | AlignFit |
| **Origin Artifacts** | COACH-INTEL-001, COACH-INTEL-002, COACH-INTEL-003, intelligence interpretation evolution, PROMOTION_CANDIDATE_REVIEW_2026_Q2 |
| **Linked Projects** | AlignFit, ClassForge, LeagueOS, Aredir Labs |
| **Reusability** | High |
| **Last Reviewed** | 2026-07-06 |
| **Next Review Due** | 2026-10-06 |

## Purpose

Define how AI systems should responsibly interpret, communicate, and evolve knowledge without becoming the authority themselves.

The AI's role is to help humans make better-informed decisions through transparent reasoning, evidence synthesis, and clear communication of uncertainty.

---

## Core Principle

Separate:

```
Reality
    ↓
Representation
    ↓
Interpretation
    ↓
Human Decision
```

An AI advisor should never collapse these responsibilities into a single opaque system.

---

## Section 1 — Problem Statement

AI advisors fail trust when they behave like oracles instead of interpreters.

### Common failures

| Failure | Effect |
|---------|--------|
| **Conclusions without evidence** | Users cannot verify or challenge recommendations |
| **Overstated certainty** | Low-confidence inferences appear as facts |
| **Hidden uncertainty** | Users act on assumptions they never saw |
| **Silent recommendation changes** | Prior guidance disappears without explanation |
| **Apparent authority** | The system speaks with finality instead of exposing reasoning |

### Why trust erodes

Users need to understand **what the system knows**, **what it inferred**, and **what remains unknown**. When an AI advisor hides those boundaries, users cannot calibrate their own judgment. They may over-rely on flawed guidance or dismiss useful guidance because the system once contradicted itself without explanation.

Trust is not restored by sounding more confident. It is restored by making reasoning inspectable.

---

## Section 2 — Canonical Architecture

The evidence-aware advisor follows a four-layer model:

```
Reality

↓

Model

↓

Interpreter

↓

Human Decision
```

### Reality

Facts and observations — events, measurements, records, and other verifiable inputs. Reality exists independent of any system representation.

### Model

The system's current understanding of reality — structured state, summaries, scores, and derived knowledge. The model is always an approximation. It may be incomplete, outdated, or wrong.

### Interpreter

The component that explains the model to humans — synthesizing evidence, surfacing uncertainty, comparing alternatives, and translating structured knowledge into understandable guidance. The interpreter communicates; it does not own decisions.

### Human

The decision owner. Humans retain accountability for actions taken based on advisor output.

### Critical boundary

**The interpreter never becomes reality.**

Interpretation must not be mistaken for observation. Narrative must not rewrite the underlying model silently. When the model changes, the interpreter must explain that change — not pretend the world always matched the new conclusion.

---

## Section 3 — Evidence Dimensions

Evidence should be evaluated along three **independent** dimensions.

### Quality

How trustworthy is the evidence?

Quality reflects source reliability, methodology rigor, consistency with other evidence, and known limitations of the data.

### Relevance

How applicable is the evidence to the current question?

Relevant evidence may still be weak. Irrelevant evidence may still be high quality. Applicability depends on context, population, scope, and the decision at hand.

### Currency

How current is the evidence?

Currency reflects recency, whether conditions have changed since collection, and whether newer evidence supersedes older conclusions.

### Independence of dimensions

These dimensions do not imply one another:

| Statement | Why it matters |
|-----------|----------------|
| High quality does not imply current | Authoritative older evidence may be outdated |
| Recent does not imply high quality | Fresh data can be noisy or unvalidated |
| Relevant does not imply trustworthy | Applicable sources may still be weak or biased |

An evidence-aware advisor evaluates and communicates each dimension explicitly rather than collapsing them into a single confidence score without explanation.

---

## Section 4 — Knowledge Evolution

AI advisor knowledge evolves over time. Evolution is expected. Concealed evolution is not.

### What may evolve

The system should evolve:

- **Evidence summaries** — as new observations arrive
- **Confidence** — as support strengthens or weakens
- **Recommendations** — as models and context change
- **Educational content** — as understanding improves

### What must not happen silently

The AI should **never silently rewrite previous conclusions**.

When understanding changes, the system should:

1. **Preserve previous understanding** — retain historical reasoning, not overwrite it
2. **Explain what changed** — name the delta in conclusion or recommendation
3. **Explain why it changed** — cite new evidence, revised assumptions, or corrected errors
4. **Explain confidence changes** — show whether certainty increased, decreased, or shifted in scope

Knowledge evolution is a feature of honest systems. Undocumented evolution is a defect.

---

## Section 5 — Transparency Principles

The AI advisor should always communicate:

| Principle | Meaning |
|-----------|---------|
| **What is known** | Verified facts and well-supported observations |
| **What is inferred** | Conclusions derived from evidence through explicit reasoning |
| **What is estimated** | Quantities or predictions with stated assumptions |
| **What is unknown** | Gaps, missing data, and unresolved questions |
| **Why the recommendation exists** | Link from evidence and reasoning to guidance |
| **How confident the system is** | Calibrated confidence, not performative certainty |
| **What evidence supports it** | Traceable support with quality, relevance, and currency noted |

Transparency is not optional color commentary. It is part of the advisor's core output contract.

---

## Section 6 — Trust Architecture

Trust increases when AI advisors:

- **Admit uncertainty** — name limits instead of filling gaps with plausible prose
- **Show reasoning** — expose the path from evidence to interpretation
- **Show evidence** — make support inspectable, not implied
- **Preserve history** — keep prior reasoning accessible when conclusions evolve
- **Explain change** — document what shifted and why
- **Never manufacture precision** — avoid false specificity that implies unwarranted confidence

### Trust through transparency, not confidence

Users do not trust advisors because they sound sure. They trust advisors that help them understand **when to trust the guidance** and **when to seek additional judgment**.

An advisor that says "insufficient evidence" earns more long-term trust than one that guesses convincingly.

---

## Section 7 — Professional Boundaries

### The AI advisor may

- **Interpret** — explain what evidence suggests under stated assumptions
- **Educate** — teach concepts needed to understand the situation
- **Summarize** — condense complex evidence into usable form
- **Compare evidence** — weigh alternatives with explicit tradeoffs
- **Identify uncertainty** — surface gaps, conflicts, and weak support
- **Prepare users for better conversations** — equip humans to engage experts with context

### The AI advisor should not

- **Replace professionals** — domain experts retain authority for consequential decisions
- **Claim authority it does not possess** — no implied licensure, certification, or final judgment
- **Hide uncertainty** — no smoothing over of weak or missing evidence
- **Pretend certainty** — no rhetorical confidence where evidence is thin
- **Make unsupported guarantees** — no promises outcomes the evidence cannot support

The advisor's role is interpretive and preparatory. Decision accountability remains human.

---

## Section 8 — Historical Integrity

Historical reasoning should remain understandable.

If recommendations evolve, users should understand:

| Question | Required visibility |
|----------|---------------------|
| **What changed?** | Prior vs current conclusion or recommendation |
| **Why did it change?** | New evidence, revised model, corrected error, or scope shift |
| **When did it change?** | Timestamp or version boundary |
| **What evidence changed?** | Added, removed, or re-weighted support |

The system should **preserve historical reasoning** rather than rewriting it. Users reviewing past guidance should see what the system believed then, what it believes now, and the bridge between them.

Historical integrity supports audit, learning, and accountability — for users and for the teams operating the system.

---

## Section 9 — Explainability

Recommendations should always be explainable.

Users should be able to answer:

1. **Why was this recommendation made?**
2. **What evidence supports it?**
3. **What assumptions exist?**
4. **How certain is it?**
5. **What could change this recommendation?**

Explainability is not a post-hoc feature for power users. It is a baseline requirement for any recommendation the system presents as guidance.

If a recommendation cannot be explained along these dimensions, it should not be issued — or it should be explicitly labeled as speculative with bounded scope.

---

## Section 10 — General Applications

This pattern applies wherever an AI system advises humans based on evidence:

- **Operational Intelligence** — incident analysis, capacity planning, process optimization
- **Healthcare Education** — patient-facing education that must not substitute for clinical judgment
- **Software Quality Engineering** — defect triage, risk assessment, release readiness
- **Education** — tutoring and learning support with inspectable reasoning
- **Financial Decision Support** — portfolio interpretation, risk communication, scenario analysis
- **Research Platforms** — literature synthesis, hypothesis comparison, evidence mapping
- **Business Intelligence** — metric interpretation, trend analysis, decision briefings
- **Risk Assessment** — threat evaluation, control gaps, mitigation tradeoffs
- **Any evidence-aware AI advisor** — any domain where users need guidance they can inspect and challenge

The pattern is domain-agnostic. Implementation details vary; the transparency and boundary principles do not.

---

## Section 11 — Relationship to Existing Aredir Patterns

This pattern governs **how an AI advisor communicates knowledge** once other patterns have produced it.

### Workspace-First AI Experience Pattern

The [Workspace-First AI Experience Pattern](../architecture-patterns/WORKSPACE_FIRST_AI_EXPERIENCE_PATTERN.md) defines **where intelligence surfaces** — briefings, reviews, timelines, actions, and chat as interaction mechanisms.

This pattern defines **how evidence and reasoning appear on those surfaces** — with explicit uncertainty, traceable support, and preserved history.

### Human + AI Advisor Workspace Pattern

The [Human + AI Advisor Workspace Pattern](./HUMAN_AI_ADVISOR_WORKSPACE_PATTERN.md) defines **who contributes** to shared advisor records and **how multi-participant collaboration persists**.

This pattern defines **how each contributor's interpretations remain evidence-aware** — so AI and human advisors do not collapse observation, model state, and narrative into indistinguishable prose.

### Facts → Meaning → Recommendations

The application-owned intelligence pipeline — from raw inputs through structured facts, assessments, insights, and recommendations — is defined in the [AI Intelligence Architecture Pattern](../architecture-patterns/AI_INTELLIGENCE_ARCHITECTURE_PATTERN.md) and operationalized through the [Context Builder Pattern](./CONTEXT_BUILDER_PATTERN.md) and [Response Contract Pattern](./RESPONSE_CONTRACT_PATTERN.md).

Conceptually:

```
Facts → Meaning → Recommendations
```

**Facts** are application-owned. **Meaning** emerges through assessments and insights. **Recommendations** are application-owned actions with structured rationale.

This pattern sits **downstream of that pipeline** at the interpreter layer: it governs how meaning and recommendations are **communicated to humans** with evidence dimensions, historical integrity, and professional boundaries intact.

The [Response Contract Pattern](./RESPONSE_CONTRACT_PATTERN.md) enforces closed-world narrative boundaries. This pattern extends that discipline to **evidence communication, confidence calibration, and knowledge evolution** across time — not only within a single response.

---

## Section 12 — Closing Statement

> An AI advisor should not strive to appear intelligent.
>
> It should strive to make its reasoning understandable.
>
> Its purpose is not to replace human judgment.
>
> Its purpose is to improve human judgment through transparent interpretation of evidence.

---

## Related

- [Knowledge Base Index](../KNOWLEDGE_BASE_INDEX.md)
- [Promotion Process](../PROMOTION_PROCESS.md)
- [AI Intelligence Architecture Pattern](../architecture-patterns/AI_INTELLIGENCE_ARCHITECTURE_PATTERN.md)
- [Workspace-First AI Experience Pattern](../architecture-patterns/WORKSPACE_FIRST_AI_EXPERIENCE_PATTERN.md)
- [Human + AI Advisor Workspace Pattern](./HUMAN_AI_ADVISOR_WORKSPACE_PATTERN.md)
- [Context Builder Pattern](./CONTEXT_BUILDER_PATTERN.md)
- [Response Contract Pattern](./RESPONSE_CONTRACT_PATTERN.md)
- [AI Evaluation Framework](./AI_EVALUATION_FRAMEWORK.md)
- [Architecture Governance](../governance/ARCHITECTURE_GOVERNANCE.md)
- [AI Governance](../governance/AI_GOVERNANCE.md)

**Recommended next work item:** AREDIR-KB-016 — Knowledge Capture Standard (Documentation Standard; per [Knowledge Base Roadmap](../KNOWLEDGE_BASE_ROADMAP.md)).
