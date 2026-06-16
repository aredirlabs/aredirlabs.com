# Human + AI Advisor Workspace Pattern

| Field | Value |
|-------|-------|
| **Name** | Human + AI Advisor Workspace Pattern |
| **Status** | Promoted Standard |
| **Category** | AI Pattern |
| **Version** | 1.0 |
| **Owner** | Aredir Labs |
| **Origin Projects** | AlignFit |
| **Origin Artifacts** | COACH-UX-001, Coach Architecture Discussions, PROMOTION_CANDIDATE_REVIEW_2026_Q2 |
| **Linked Projects** | AlignFit, ClassForge, LeagueOS, Aredir Labs |
| **Reusability** | High |
| **Last Reviewed** | 2026-06-15 |
| **Next Review Due** | 2026-09-12 |

## Purpose

Define how **AI advisors**, **human advisors**, and **specialist advisors** collaborate through a shared workspace.

Advisor systems often treat AI assistance and human assistance as separate products with separate histories. This pattern establishes a **shared advisor workspace** as the system of record — where all advisor types contribute to the same durable record of facts, assessments, insights, reviews, actions, and history.

Products building multi-advisor experiences (AI coach + human coach, AI tutor + educator, AI analyst + domain specialist) should adopt this pattern to preserve continuity, enable collaboration, and reduce onboarding cost when advisors change.

---

## Problem

Many systems separate:

```
AI Assistance          Human Assistance
     ↓                        ↓
  AI chat history        Human notes / tickets
```

When advisors operate in isolated channels:

| Failure mode | Impact |
|--------------|--------|
| **Duplicated context** | Each advisor re-gathers user state; users repeat themselves |
| **Fragmented history** | AI recommendations and human guidance live in different systems |
| **Inconsistent recommendations** | Advisors lack visibility into each other's assessments and actions |
| **Poor continuity** | Replacing or adding an advisor loses institutional knowledge |
| **Reduced user trust** | Users cannot see a unified record of who said what and why |

These failures appeared during AlignFit Coach architecture discussions. Separating AI coach interactions from human coach notes produced conflicting guidance, repeated context gathering, and user confusion about which advisor's recommendations were current.

---

## Solution

Use a **shared advisor workspace**.

The workspace owns:

```
Facts
Assessments
Insights
Reviews
Actions
History
```

**Advisors contribute to the workspace.** The workspace is the system of record. The workspace does not belong to any individual advisor.

### Core principles

| Principle | Description |
|-----------|-------------|
| **Workspace is system of record** | All durable intelligence lives in the workspace — not in advisor-specific silos |
| **Advisors contribute, not own** | AI, human, and specialist advisors write to shared surfaces; none owns the record |
| **Continuity over channel** | Advisor changes do not reset user context; history persists in workspace |
| **Structured over conversational** | Contributions materialize as facts, assessments, insights, reviews, and actions — not only chat prose |

---

## Architecture

```
Shared Record
├─ Facts
├─ Assessments
├─ Insights
├─ Reviews
├─ Actions
└─ History

Participants
├─ AI Advisor
├─ Human Advisor
├─ Specialist Advisor
└─ User
```

### Shared record responsibilities

| Record type | Purpose | Contributors |
|-------------|---------|--------------|
| **Facts** | Verifiable statements about user state | Application (computed), any advisor (validated additions) |
| **Assessments** | Policy evaluations and status codes | Application (computed), human/specialist advisors (reviewed overrides with audit) |
| **Insights** | Observations linking facts and assessments | Application (computed), advisors (annotated context) |
| **Reviews** | Periodic structured reflections | AI advisor (generated), human advisor (edited/approved) |
| **Actions** | Prescribed and tracked activities | Application (from recommendations), any advisor (assigned/modified with audit) |
| **History** | Chronological audit of contributions | All participants (append-only event log) |

### Participant responsibilities

| Participant | Role |
|-------------|------|
| **AI Advisor** | Produces assessments, insights, reviews, and recommendations via application-owned pipeline; contributes narrative and structured outputs to workspace |
| **Human Advisor** | Reviews, approves, overrides, or supplements AI outputs; adds domain judgment; assigns actions |
| **Specialist Advisor** | Contributes domain-specific assessments and insights (nutrition, injury, pedagogy, etc.) to shared record |
| **User** | Views workspace; completes actions; provides input that feeds facts and context |

### Contribution model

```
Advisor Input
    ↓
Application Validation (schema, policy, ownership rules)
    ↓
Shared Record Update
    ↓
History Event (who, what, when, provenance)
    ↓
Workspace Surfaces (per Workspace-First AI Experience Pattern)
```

All advisor contributions pass through application validation. The [AI Intelligence Architecture Pattern](../architecture-patterns/AI_INTELLIGENCE_ARCHITECTURE_PATTERN.md) governs what AI advisors may produce. Human and specialist overrides require audit trails.

### Relationship to Workspace-First AI

The [Workspace-First AI Experience Pattern](../architecture-patterns/WORKSPACE_FIRST_AI_EXPERIENCE_PATTERN.md) defines **user-facing surfaces** (briefings, reviews, timeline, actions, chat). This pattern defines **who contributes** to those surfaces and **how contributions are recorded**.

```
[ Workspace-First AI Experience Pattern — surfaces ]
              ↑
[ Human + AI Advisor Workspace Pattern — contributors & shared record ]
              ↑
[ AI Intelligence Architecture Pattern — computation & ownership ]
```

---

## Benefits

| Benefit | Mechanism |
|---------|-----------|
| **Continuity** | New advisors inherit full workspace history; users do not restart context |
| **Advisor replacement** | Human coach changes do not lose AI-generated assessments or action history |
| **Advisor collaboration** | AI, human, and specialist advisors see the same facts, assessments, and actions |
| **Reduced onboarding cost** | Advisors onboard to a populated workspace — not empty chat threads |
| **User trust** | Unified record shows provenance: which advisor contributed what, when |

---

## Example Applications

| Product | Domain | Advisor workspace application |
|---------|--------|------------------------------|
| **AlignFit Coach** | Fitness coaching | AI coach produces daily briefings and recommendations; human coach reviews weekly assessments, overrides recovery guidance, assigns actions; nutrition specialist adds macro assessments — all in shared workspace |
| **ClassForge Learning Advisor** | Education | AI tutor generates learning insights and action items; educator reviews progress, adjusts assessments; subject specialist contributes mastery evaluations |
| **LeagueOS Team Advisor** | Sports management | AI advisor produces lineup recommendations and performance insights; head coach approves actions; medical specialist contributes availability assessments |
| **Future advisor systems** | Decision support | Any product with multiple advisor types contributing to the same user's intelligence record |

Implementation details remain in each product repository. This document defines **collaboration topology and record ownership** only.

---

## Promotion Justification

Promoted per ALIGNFIT-GOV-002 Promotion Candidate Review (PROMOTION_CANDIDATE_REVIEW_2026_Q2).

### Distinct from AI Intelligence Architecture Pattern

The [AI Intelligence Architecture Pattern](../architecture-patterns/AI_INTELLIGENCE_ARCHITECTURE_PATTERN.md) defines **how intelligence is computed** — application-owned facts, assessments, insights, and recommendations through a layered pipeline.

This pattern defines **how multiple advisors collaborate** around that intelligence — shared record ownership, contribution models, audit trails, and participant roles. The intelligence architecture does not address human advisor handoffs, specialist contributions, or multi-advisor continuity.

### Distinct from Response Contract Pattern

The [Response Contract Pattern](./RESPONSE_CONTRACT_PATTERN.md) defines the **output boundary** between application intelligence and LLM narrative — what the model may reference and what it must not invent.

This pattern defines **who contributes intelligence over time** and **where contributions persist**. The response contract governs a single narrative handoff; the advisor workspace governs ongoing multi-participant collaboration.

### Why standalone promotion

- **Reusable across products** — any multi-advisor product benefits from shared record semantics
- **Validated through real usage** — AlignFit Coach architecture discussions proved isolation failures
- **Distinct AI pattern** — focuses on human-in-the-loop collaboration design, not computation or output validation
- **Complements workspace-first experience** — surfaces need contributors; this pattern defines contributor rules

---

## Related

- [Knowledge Base Index](../KNOWLEDGE_BASE_INDEX.md)
- [Promotion Process](../PROMOTION_PROCESS.md)
- [AI Intelligence Architecture Pattern](../architecture-patterns/AI_INTELLIGENCE_ARCHITECTURE_PATTERN.md)
- [Workspace-First AI Experience Pattern](../architecture-patterns/WORKSPACE_FIRST_AI_EXPERIENCE_PATTERN.md)
- [Context Builder Pattern](./CONTEXT_BUILDER_PATTERN.md)
- [Response Contract Pattern](./RESPONSE_CONTRACT_PATTERN.md)
- [AI Evaluation Framework](./AI_EVALUATION_FRAMEWORK.md)
- [Feature Delivery Standard](../playbooks/FEATURE_DELIVERY_STANDARD.md)
