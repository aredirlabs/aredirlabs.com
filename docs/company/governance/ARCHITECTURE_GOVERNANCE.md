# Architecture Governance

**Status:** Company Standard  
**Owner:** Aredir Labs  
**Domain:** Architecture  
**Last reviewed:** 2026-06-25  
**Next review due:** 2026-09-12

## Purpose

Document reusable architecture practices for Aredir Labs products: the intelligence pipeline, ownership separation, source-of-truth principles, workspace and domain ownership, reconciliation patterns, audit methodology, and promotion of successful architectural patterns.

Product-specific domain architecture (nutrition models, coach subsystems, training calendars) remains in product repositories.

---

## Intelligence pipeline

Aredir Labs AI features follow a layered pipeline with explicit ownership at each stage:

```
Context Builder
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
Narrative (LLM)
```

| Layer | Owner | Nature |
|-------|-------|--------|
| **Context Builder** | Application | Deterministic assembly of bounded inputs |
| **Facts** | Application | Verifiable statements from authoritative data |
| **Assessments** | Application | Policy evaluations and status codes |
| **Insights** | Application | Observations linking facts and assessments |
| **Recommendations** | Application | Prioritized actions and guidance |
| **Response Contract** | Application | Closed-world schema handed to narrative layer |
| **Narrative** | LLM (within contract) | Explanation, education, and communication |

**Rules:**

- Data flows downward; no layer skips upstream dependencies
- Application layers are deterministic and testable
- LLM narrative never creates facts, assessments, or recommendations
- Each layer's output is a typed, validated artifact — not free-form text

**Canonical references:**

- [AI Intelligence Architecture Pattern](../architecture-patterns/AI_INTELLIGENCE_ARCHITECTURE_PATTERN.md)
- [Context Builder Pattern](../ai-patterns/CONTEXT_BUILDER_PATTERN.md)
- [Response Contract Pattern](../ai-patterns/RESPONSE_CONTRACT_PATTERN.md)

---

## Separation of ownership

Every architectural component must have a **single owner** for each concern:

| Concern | Question |
|---------|----------|
| **Data ownership** | Who is the canonical source for this entity? |
| **Decision ownership** | Who computes assessments and recommendations? |
| **Presentation ownership** | Who renders this surface? |
| **Persistence ownership** | Who writes to storage? |
| **Integration ownership** | Who manages the external contract? |

Ambiguous ownership is an architecture finding — not something to resolve silently during implementation.

Multi-advisor products add advisor-scoped ownership per [Human + AI Advisor Workspace Pattern](../ai-patterns/HUMAN_AI_ADVISOR_WORKSPACE_PATTERN.md).

---

## Canonical source-of-truth principles

| Principle | Detail |
|-----------|--------|
| **One canonical source per entity type** | Every persisted entity has a named owner |
| **No silent duplication** | Copies must document sync strategy and conflict resolution |
| **Workspace as system of record** | For AI products, workspace objects — not chat — hold authoritative intelligence state |
| **Promoted assets as architectural baseline** | Implementation compared against KB patterns during audits |
| **Project code as implementation truth** | Docs describe code; when they diverge, fix docs or file drift finding |

During architecture audits, produce a **source-of-truth register** listing each entity type, its canonical owner, and any known duplicates or sync risks.

---

## Workspace ownership

In workspace-first products, the workspace owns:

| Artifact | Workspace role |
|----------|----------------|
| Timeline | Chronological intelligence events with provenance |
| Facts / assessments | Persisted, advisor-attributed state |
| Recommendations | Actionable items with ownership and status |
| Advisor contributions | Scoped, non-destructive additions |
| User actions | Responses to recommendations; overrides with audit trail |

Chat sessions, API responses, and temporary caches are **not** authoritative — they feed or display workspace state.

**Reference:** [Workspace-First AI Experience Pattern](../architecture-patterns/WORKSPACE_FIRST_AI_EXPERIENCE_PATTERN.md)

---

## Domain ownership

Product domains (nutrition, training, coaching, scheduling) have **domain-specific ownership** that stays in product repositories:

| Layer | Company (Aredir Labs) | Product repo |
|-------|----------------------|--------------|
| Intelligence pipeline pattern | ✓ | Implements |
| Context builder pattern | ✓ | Domain-specific builders |
| Response contract pattern | ✓ | Domain-specific schemas |
| Nutrition / macro models | | ✓ |
| Coach / advisor subsystems | | ✓ |
| Training / calendar logic | | ✓ |
| Feature-specific integrations | | ✓ |

Domain architecture docs in product repos link upward to company patterns. They document *what* the domain computes — company patterns document *how* layers connect.

---

## Reconciliation patterns

When multiple sources or advisors produce conflicting state, reconciliation must be **explicit and auditable**:

| Pattern | When | Approach |
|---------|------|----------|
| **Authoritative override** | Human advisor overrides AI recommendation | Override recorded with advisor, timestamp, rationale |
| **Latest-wins with provenance** | Time-sensitive facts update | Timeline shows history; current state is queryable |
| **Policy precedence** | Conflicting assessments | Documented precedence rules in application layer |
| **Manual reconciliation** | Unresolvable conflict | Surface to user in workspace; do not hide in chat |

A cross-product **Reconciliation Capability Framework** is deferred until a second product validates the pattern ([Knowledge Base Roadmap](../KNOWLEDGE_BASE_ROADMAP.md)). Products implement domain-specific reconciliation documented locally until promotion criteria are met.

---

## Architectural audit methodology

Architecture audits create understanding before modification.

**Canonical standard:** [Architecture Audit Standard](../documentation-standards/ARCHITECTURE_AUDIT_STANDARD.md)

### Audit lifecycle

```
Scope → Current State → Ownership → Source of Truth → Data Flow → Dependencies → Risk → Drift → Recommendations → Implementation Planning
```

### When to audit

- Before major feature work or platform migrations
- After milestones when drift is suspected
- Before promoting project artifacts to Knowledge Base
- When onboarding a new product
- When incidents reveal ownership ambiguity

### Relationship to Quality Systems

Architecture Audit determines architectural questions and recommendation categories. Evidence collection, confidence assessment, finding schemas, and comparative-option discipline are provided by Quality Systems (AQSF/AVF in `aredir-quality-systems`). Do not duplicate those procedures in Labs docs.

Canonical flow: Engineering Question → Architecture Audit → AQSF → AVF → Findings → Promotion Candidates → [Promotion Process](../PROMOTION_PROCESS.md) → Owning repository.

Details: [Architecture Audit Standard — Relationship to Quality Systems](../documentation-standards/ARCHITECTURE_AUDIT_STANDARD.md#relationship-to-quality-systems).

### Audit outputs

| Output | Feeds |
|--------|-------|
| Ownership matrix | Implementation planning |
| Source-of-truth register | Data model and integration decisions |
| Drift findings | Technical debt and alignment work |
| Assessment findings (with evidence/confidence) | Product work packages; Quality Systems finding conventions when used |
| Promotion candidates | [Knowledge Governance](./KNOWLEDGE_GOVERNANCE.md) / [Promotion Process](../PROMOTION_PROCESS.md) |
| Risk register | Prioritized remediation |

Audits do not authorize unscoped rewrites. Recommendations must align with [Coding Agent Operating Standard](../engineering-standards/CODING_AGENT_OPERATING_STANDARD.md) — incremental, verifiable steps.

---

## Promotion of successful architectural patterns

When architecture work produces reusable design:

1. **Prove** the pattern in a production-bound system
2. **Generalize** — remove product-specific schemas, routes, and UI details
3. **Document** ownership boundaries and applicability clearly
4. **Validate** through real usage (UAT, production, repeated agent runs)
5. **Submit** via [Promotion Process](../PROMOTION_PROCESS.md)
6. **Track** adoption across linked projects

Patterns that embed a single product's domain model are **not** promotion candidates. Extract the abstract pattern; leave domain specifics in the product repo.

### Recent promotion examples

| Pattern | Origin | Status |
|---------|--------|--------|
| AI Intelligence Architecture | Cross-product AI evolution | Promoted Standard v1.1 |
| Workspace-First AI Experience | Multi-product UX pattern | Promoted Standard |
| Application-Owned Intelligence Pipeline | AlignFit coach evolution | Merged into AI Intelligence Architecture v1.1 |

### Deferred candidates

| Candidate | Reason |
|-----------|--------|
| Reconciliation Capability Framework | Insufficient cross-product validation |
| Calendar Orchestration Contract | Domain-specific; revisit when second product adopts |

See [Knowledge Base Roadmap — Deferred](../KNOWLEDGE_BASE_ROADMAP.md#deferred-alignfit-gov-002).

---

## Related

- [Engineering Operating System](../ENGINEERING_OPERATING_SYSTEM.md)
- [Knowledge Artifact Taxonomy](../knowledge/KNOWLEDGE_ARTIFACT_TAXONOMY.md)
- [Governance Index](../GOVERNANCE_INDEX.md)
- [AI Governance](./AI_GOVERNANCE.md)
- [Architecture Audit Standard](../documentation-standards/ARCHITECTURE_AUDIT_STANDARD.md)
- [AI Intelligence Architecture Pattern](../architecture-patterns/AI_INTELLIGENCE_ARCHITECTURE_PATTERN.md)
- [Knowledge Governance](./KNOWLEDGE_GOVERNANCE.md)
