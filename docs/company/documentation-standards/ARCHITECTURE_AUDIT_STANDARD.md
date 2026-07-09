# Architecture Audit Standard

| Field | Value |
|-------|-------|
| **Name** | Architecture Audit Standard |
| **Status** | Promoted Standard |
| **Category** | Documentation Standard |
| **Version** | 1.0 |
| **Owner** | Aredir Labs |
| **Origin Projects** | AlignFit, Aredir Labs |
| **Origin Artifacts** | COACH-ARCH-001, COACH-INTEL-001, COACH-INTEL-002, COACH-INTEL-003, AREDIR-KB-001 through AREDIR-KB-005, AlignFit coach architecture evolution, `docs/architecture/` template reviews, workspace foundation audits (AREDIR-WORKSPACE-001 through AREDIR-WORKSPACE-006) |
| **Linked Projects** | AlignFit, Aredir Labs |
| **Reusability** | High |
| **Last Reviewed** | 2026-06-12 |
| **Next Review Due** | 2026-09-12 |

## Purpose

Architecture audits create **understanding before modification**. They are required when systems grow complex, when multiple teams or agents touch the same surfaces, or before major refactors, promotions, and release milestones.

Repeated audit work across AlignFit Coach intelligence and Aredir Labs template evolution directly produced promoted assets including the AI Intelligence Architecture Pattern, Context Builder Pattern, and Response Contract Pattern. This standard formalizes the **methodology** — not a single project report.

### Common failure modes without audits

| Failure mode | Impact |
|--------------|--------|
| **Architectural drift** | Implementation diverges from intended design without detection |
| **Duplicated ownership** | Multiple components claim the same responsibility |
| **Hidden dependencies** | Undocumented coupling causes surprise failures on change |
| **Unclear source of truth** | Competing data stores or caches with no canonical owner |
| **Disconnected systems** | Integrations exist in code but not in mental model or docs |
| **Implementation before understanding** | Agents or engineers change code without mapping current state |
| **Accumulating technical debt** | Shortcuts compound because no one pauses to assess the whole |

**Goal:** Produce evidence-based understanding that informs safe change, Knowledge Base promotions, and implementation planning.

### When to run an architecture audit

- Before major feature work or platform migrations
- After a milestone (UAT, production release) when drift is suspected
- When promoting project artifacts to Knowledge Base assets
- When onboarding a new product or inherited codebase
- When incidents reveal ownership or data-flow ambiguity

---

## Architecture Audit Lifecycle

```
Scope
    ↓
Current State Analysis
    ↓
Ownership Analysis
    ↓
Source of Truth Analysis
    ↓
Data Flow Review
    ↓
Dependency Review
    ↓
Risk Assessment
    ↓
Architectural Drift Assessment
    ↓
Recommendations
    ↓
Implementation Planning
```

### Scope

| | |
|---|---|
| **Purpose** | Bound the audit — what is in, what is out, and why |
| **Expected outputs** | Audit charter: product/repo, surfaces, time box, stakeholders, success criteria |
| **Quality requirements** | Explicit exclusions documented; no unbounded "audit everything" without priority |

### Current State Analysis

| | |
|---|---|
| **Purpose** | Document what exists today — not what should exist |
| **Expected outputs** | Component inventory, integration map, workflow summary (see [Current State Analysis Framework](#current-state-analysis-framework)) |
| **Quality requirements** | Evidence-based (code, config, runtime paths); assumptions labeled |

### Ownership Analysis

| | |
|---|---|
| **Purpose** | Clarify who owns data, decisions, presentation, and persistence |
| **Expected outputs** | Ownership matrix by component and concern (see [Ownership Analysis Framework](#ownership-analysis-framework)) |
| **Quality requirements** | Ambiguous ownership flagged as findings — not silently assigned |

### Source of Truth Analysis

| | |
|---|---|
| **Purpose** | Identify canonical data sources and duplication risks |
| **Expected outputs** | Source-of-truth register; conflict and sync-risk list (see [Source of Truth Analysis](#source-of-truth-analysis)) |
| **Quality requirements** | Every persisted entity type has named canonical owner or explicit "unknown" finding |

### Data Flow Review

| | |
|---|---|
| **Purpose** | Trace how data moves through the system |
| **Expected outputs** | Flow diagrams or tables for critical paths (see [Data Flow Review](#data-flow-review)) |
| **Quality requirements** | Boundaries, contracts, and failure points identified |

### Dependency Review

| | |
|---|---|
| **Purpose** | Map internal and external dependencies and their risk |
| **Expected outputs** | Dependency inventory with criticality (see [Dependency Review](#dependency-review)) |
| **Quality requirements** | External providers, databases, and infra explicitly listed |

### Risk Assessment

| | |
|---|---|
| **Purpose** | Prioritize architectural risks by impact and likelihood |
| **Expected outputs** | Ranked risk register with severity and affected surfaces |
| **Quality requirements** | Risks tied to evidence from prior stages — not generic worry lists |

### Architectural Drift Assessment

| | |
|---|---|
| **Purpose** | Compare implementation to intended architecture and standards |
| **Expected outputs** | Drift findings with examples (see [Architectural Drift Assessment](#architectural-drift-assessment)) |
| **Quality requirements** | Reference promoted KB assets where applicable as intended baseline |

### Recommendations

| | |
|---|---|
| **Purpose** | Translate findings into actionable guidance |
| **Expected outputs** | Categorized recommendations (see [Recommendation Framework](#recommendation-framework)) |
| **Quality requirements** | Each recommendation links to finding IDs; no orphan suggestions |

### Implementation Planning

| | |
|---|---|
| **Purpose** | Sequence work without committing to unscoped rewrites |
| **Expected outputs** | Proposed next steps, Engineering Work Package candidates, promotion candidates |
| **Quality requirements** | Aligns with [Coding Agent Operating Standard](../engineering-standards/CODING_AGENT_OPERATING_STANDARD.md) — incremental, verifiable steps; work packages are required; implementation briefs are optional |

---

## Current State Analysis Framework

Understand **reality** before proposing changes.

### Identify

| Area | What to capture |
|------|-----------------|
| **Existing components** | Apps, services, modules, major UI surfaces, background jobs |
| **Responsibilities** | Stated purpose of each component; primary user or system consumer |
| **Integrations** | APIs, webhooks, CMS, auth, third-party SDKs |
| **Data stores** | Databases, caches, file stores, client state, session stores |
| **Workflows** | End-to-end paths (onboarding, core loop, admin, release) |
| **User-facing behavior** | What users see and do — mapped to routes or features |

### Methods

- Read `docs/architecture/`, `docs/product/`, and README first
- Inspect routes, API handlers, schema, and env configuration
- Trace one critical user journey in code
- Compare documentation claims to observed behavior — note gaps

### Outputs

- **Component catalog** — name, type, location, one-line responsibility
- **Integration list** — direction (inbound/outbound), protocol, owner
- **Workflow sketches** — numbered steps with component touchpoints
- **Doc vs. code gaps** — explicit list of mismatches

---

## Ownership Analysis Framework

For each significant component or layer, answer ownership questions.

### Ownership domains

| Domain | Question |
|--------|----------|
| **Application** | Which code module owns business rules and orchestration? |
| **Database** | Which store is authoritative for each entity? |
| **Service** | Which external or internal service owns a capability? |
| **Model** | What does the LLM own vs. the application? (see AI patterns) |
| **User** | What state lives client-side vs. server-side? |

### Core questions

- **Who owns the data?** — write authority, read replicas, caches
- **Who owns decisions?** — scoring, eligibility, recommendations
- **Who owns presentation?** — UI vs. API vs. narrative layer
- **Who owns persistence?** — migrations, seeds, retention

### Expected outputs

| Output | Content |
|--------|---------|
| **Ownership matrix** | Rows: components/layers; columns: data, decisions, presentation, persistence |
| **Ambiguity register** | Areas with shared or unclear ownership |
| **AI boundary check** | For AI features: map against [AI Intelligence Architecture Pattern](../architecture-patterns/AI_INTELLIGENCE_ARCHITECTURE_PATTERN.md) |

---

## Source of Truth Analysis

Prevent multiple competing truths.

### Identify

| Concern | Audit action |
|---------|--------------|
| **Canonical data sources** | One authoritative store per entity type |
| **Duplicate representations** | Same fact in DB, cache, client, prompt context |
| **Conflicting ownership** | Two writers for the same field or record |
| **Synchronization risks** | Stale reads, race conditions, eventual consistency gaps |

### Expected outputs

- **Source-of-truth register** — entity → canonical store → read paths
- **Duplication map** — where copies exist and why
- **Conflict list** — scenarios where truths can disagree
- **Remediation hints** — consolidate, designate canonical, or document sync rules

---

## Data Flow Review

Evaluate how data moves through the system.

```
Input
    ↓
Transformation
    ↓
Storage
    ↓
Retrieval
    ↓
Presentation
```

### At each stage document

| Stage | Review focus |
|-------|--------------|
| **Input** | Sources, validation, auth boundaries |
| **Transformation** | Business logic location; AI context builder vs. raw passthrough |
| **Storage** | Schema, migrations, PII handling |
| **Retrieval** | Query patterns, caching, N+1 or over-fetch risks |
| **Presentation** | UI, API response, LLM narrative — contract boundaries |

### Boundaries and contracts

- API request/response shapes
- Response contracts for AI narrative ([Response Contract Pattern](../ai-patterns/RESPONSE_CONTRACT_PATTERN.md))
- Event payloads and webhook schemas

### Failure points

- Unhandled partial data
- Missing error propagation
- Silent fallback that invents data
- Environment-specific behavior (dev vs. prod)

---

## Dependency Review

### Internal dependencies

| Type | Examples |
|------|----------|
| Modules | Shared libs, cross-feature imports |
| Data | Foreign keys, shared tables, cross-project seeds |
| Auth | Session, middleware, role checks |
| UI | Shared components, design system |

### External dependencies

| Type | Examples |
|------|----------|
| Databases | Neon Postgres, Sanity |
| APIs | Payment, email, fitness/learning data providers |
| Providers | LLM APIs, hosting (Vercel) |
| Frameworks | Next.js, Drizzle, Better Auth |
| Infrastructure | DNS, CDN, secrets management |

### Purpose

Identify **operational and architectural risk**: single points of failure, vendor lock-in, undeclared env requirements, version skew.

### Expected outputs

- Dependency graph or table with **criticality** (critical / important / incidental)
- External deps with owner and failover posture
- Undocumented or implicit dependencies flagged as findings

---

## Architectural Drift Assessment

Determine whether implementation still matches intended architecture and promoted standards.

### Drift signals

| Signal | Example |
|--------|---------|
| **Duplicated logic** | Same rule in prompt and application code |
| **Bypassed abstractions** | Direct DB access skipping service layer |
| **Competing workflows** | Two paths to the same user outcome |
| **Inconsistent ownership** | Model generates facts in one feature, app owns them in another |
| **Unplanned complexity** | Parallel implementations of the same pattern |

### Compare against

- Project `docs/architecture/` and decision logs
- Promoted [Knowledge Base](../KNOWLEDGE_BASE_INDEX.md) assets for the domain (AI, QA, engineering)
- Original audit artifacts or milestone intent

### Expected outputs

- **Drift register** — finding, location, intended design, actual behavior, severity
- **Standards alignment** — Adopt / Extend / Deviate per [Promotion Process](../PROMOTION_PROCESS.md#project-adoption-model)
- **Promotion candidates** — reusable patterns worth extracting to `docs/company/`

AlignFit Coach audits identified monolithic LLM prompts and unclear fact ownership — drift that led directly to AI pattern promotions.

---

## Recommendation Framework

Categorize every recommendation with clear criteria.

### Preserve

| | |
|---|---|
| **Meaning** | Architecture is healthy; maintain current approach |
| **Criteria** | Matches intent; low risk; tests/docs adequate; aligns with KB standards |
| **Output** | Brief confirmation; optional minor doc updates |

### Refactor

| | |
|---|---|
| **Meaning** | Improve existing design without changing fundamental topology |
| **Criteria** | Localized debt; clear owner; incremental path; verifiable steps |
| **Output** | Scoped refactor proposal with before/after and verification plan |

### Consolidate

| | |
|---|---|
| **Meaning** | Reduce duplication — merge parallel implementations or sources of truth |
| **Criteria** | Duplicate logic or data identified; consolidation reduces risk or cost |
| **Output** | Target components to merge; migration or deprecation steps |

### Redesign

| | |
|---|---|
| **Meaning** | Fundamental architecture issue — topology or ownership must change |
| **Criteria** | Drift or risk cannot be refactored incrementally; wrong pattern for domain |
| **Output** | Proposed target architecture; phased migration; explicit out-of-scope for "big bang" |

### Defer

| | |
|---|---|
| **Meaning** | Valid finding but not worth current investment |
| **Criteria** | Low impact; workaround acceptable; higher priorities exist |
| **Output** | Deferred item with revisit trigger (milestone, scale threshold, incident class) |

---

## Deliverables of an Audit

Every completed audit should produce a durable record (project `docs/`, workspace notes, or plan doc).

### Required sections

| Section | Content |
|---------|---------|
| **Executive Summary** | Scope, top findings, recommendation summary (1 page or less) |
| **Current State** | Component catalog, workflows, key diagrams |
| **Findings** | Numbered, evidence-linked observations |
| **Risks** | Ranked register with severity |
| **Recommendations** | Categorized per [Recommendation Framework](#recommendation-framework) |
| **Proposed Next Steps** | Sequenced Engineering Work Packages, owners, verification expectations |

### Supporting Knowledge Base promotion

Audits feed the [Promotion Process](../PROMOTION_PROCESS.md):

- Findings that prove **reusable** patterns → **Candidate** assets
- Generalized write-ups in `docs/company/<category>/` → promotion PR
- Origin artifacts in audit deliverables → `origin_artifacts` metadata on promoted assets

Document audit ID or path in promotion work items (e.g. AREDIR-KB-00N) for traceability.

---

## Relationship to Existing Standards

### Where architecture audits fit

```
Architecture Audit          ← understand system (this standard)
        ↓
Engineering Finding         ← evidence-linked observation
        ↓
Engineering Work Package    ← required implementation specification
        ↓
Implementation Brief        ← optional (only when work package alone is insufficient)
        ↓
Coding Agent Operating      ← implement with guardrails
        ↓
QA Engineering Framework    ← verify outcomes
        ↓
Knowledge Base Promotion    ← extract reusable IP
```

| Standard | Relationship |
|----------|--------------|
| [Coding Agent Operating Standard](../engineering-standards/CODING_AGENT_OPERATING_STANDARD.md) | Audits precede agent work; **Audit** stage in agent workflow maps to scope and current-state analysis; Engineering Work Packages are the required implementation artifact; implementation briefs are optional |
| [Feature Delivery Standard](../playbooks/FEATURE_DELIVERY_STANDARD.md) | Defines Work Package vs Implementation Brief; work package is authoritative |
| [QA Engineering Framework](../qa-standards/QA_ENGINEERING_FRAMEWORK.md) | Audit findings inform test gaps; verification plans reference QA lifecycle; production audits trigger release-readiness review |
| [AI Intelligence Architecture Pattern](../architecture-patterns/AI_INTELLIGENCE_ARCHITECTURE_PATTERN.md) | Baseline for AI topology audits; drift assessment checks layer ownership |
| [Context Builder Pattern](../ai-patterns/CONTEXT_BUILDER_PATTERN.md) | Audit data-selection and bounded-context implementation |
| [Response Contract Pattern](../ai-patterns/RESPONSE_CONTRACT_PATTERN.md) | Audit closed-world narrative boundaries and contract validation |

Architecture audits **do not replace** QA or implementation standards — they ensure those standards apply to an understood system.

---

## Future Documentation Standard Candidates

Likely future promotions — **not created in this work item**:

| Candidate | Notes |
|-----------|-------|
| [Feature Delivery Standard](../playbooks/FEATURE_DELIVERY_STANDARD.md) | Promoted — end-to-end delivery from audit through release |
| [Documentation Maintenance Standard](./DOCUMENTATION_MAINTENANCE_STANDARD.md) | Promoted — doc sync and drift prevention |
| **Decision Record Standard** | Lightweight ADR format across projects |
| **Knowledge Capture Standard** | Project artifact → candidate asset workflow |
| **Release Documentation Standard** | Required docs per release type |

**Recommended next work item:** AREDIR-WORKSPACE-008 — **Knowledge Asset Registry** (Governance Registry scope; per [Knowledge Asset Registry Roadmap](../KNOWLEDGE_ASSET_REGISTRY_ROADMAP.md)).

---

## Related

- [Knowledge Base Index](../KNOWLEDGE_BASE_INDEX.md)
- [Promotion Process](../PROMOTION_PROCESS.md)
- [Documentation Maintenance Standard](./DOCUMENTATION_MAINTENANCE_STANDARD.md)
- [Feature Delivery Standard](../playbooks/FEATURE_DELIVERY_STANDARD.md)
- [AI Intelligence Architecture Pattern](../architecture-patterns/AI_INTELLIGENCE_ARCHITECTURE_PATTERN.md)
- [QA Engineering Framework](../qa-standards/QA_ENGINEERING_FRAMEWORK.md)
