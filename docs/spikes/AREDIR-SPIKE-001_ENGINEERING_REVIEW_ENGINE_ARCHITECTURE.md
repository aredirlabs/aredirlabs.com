# AREDIR-SPIKE-001 — Engineering Review Engine Architecture

## Status

Draft architectural spike

## Purpose

This document captures the architectural vision for an Engineering Review Engine that evaluates software work against the engineering standards adopted by Aredir Labs projects.

The purpose of the Review Engine is to answer one question:

> Does this implementation satisfy the engineering standards adopted by this project?

This document describes the architecture at a conceptual level only. It does not prescribe implementation details, tool choices, workflow automation, or vendor-specific review mechanisms.

---

## Scope

This spike defines:

1. The architectural role of an Engineering Review Engine.
2. The relationship between standards, project adoption, and review execution.
3. A layered review model that can support multiple reviewer types.
4. The review lifecycle, findings model, and severity model.
5. Future integration opportunities and long-range architectural direction.

This spike does not implement the engine, create CI integrations, add IDE plugins, or define runtime behavior.

---

## Core Vision

The Engineering Review Engine is an engineering reviewer.

It is not:

- a coding assistant
- an autonomous developer
- a replacement for engineering judgment
- a tool that invents standards in real time

It exists to evaluate implementation work against adopted engineering standards and produce explainable, evidence-based review findings.

The engine should support a project’s obligation to verify that shipped or proposed work aligns with the standards the project has explicitly adopted.

---

## Guiding Principles

### Standards First

Reviews evaluate work against adopted engineering standards rather than subjective preference or informal opinion.

### Evidence Before Opinion

Every finding should be traceable to:

- the adopted standard
- the relevant rule
- supporting evidence
- the affected files or artifacts
- the rationale for the finding

Unsupported recommendations should not appear as review conclusions.

### Explainable Reviews

Every finding should be understandable by the engineer receiving it.

The engineer should be able to determine:

- why the finding was raised
- which standard applies
- how severity was assigned
- what evidence supports the finding

### Human Authority

The review process does not replace human decision-making.

Engineers remain responsible for accepting, rejecting, or overriding findings. The Review Engine contributes analysis; it does not autonomously block delivery decisions.

### Technology Independence

The Review Engine architecture should be independent of any single implementation technology.

It should be capable of supporting:

- an AI reviewer
- a deterministic rule engine
- CI validation
- IDE-based review assistance
- human review
- a hybrid review model

The architecture should remain stable even as the review implementation changes.

---

## Proposed Architecture

The Review Engine should be organized as a layered system that separates standards, adoption, review execution, and reporting.

```text
Engineering Standards
        │
        ▼
Project Adoption
        │
        ▼
Engineering Review Engine
        │
        ▼
Review Providers
    • AI
    • Rule Engine
    • CI
    • IDE
    • Human Review
        │
        ▼
Review Report
```

### Architectural Layers

#### 1. Engineering Standards

This layer contains the reusable standards owned by Aredir Labs and made available for project adoption.

#### 2. Project Adoption

This layer translates company standards into the standards a specific project has chosen to apply. It determines which standards are active for the project and which local implementation choices are relevant.

#### 3. Engineering Review Engine

This is the coordination layer. It identifies the applicable standards, routes work to the appropriate review provider, and assembles the resulting findings into a coherent review outcome.

#### 4. Review Providers

Review providers are interchangeable implementations of the review function. They may vary in capability, determinism, and context awareness.

#### 5. Review Report

The output layer presents findings in a structured and explainable format so engineers can review and act on them.

---

## Review Domains

The Review Engine should support multiple review domains, with a design that allows new domains to be added over time.

### Proposed domains

- UI
- Architecture
- Documentation
- Accessibility
- Performance Perception
- Security
- Testing
- Governance
- Consistency
- Workflow
- Release Readiness

### Architectural expectation

Review domains should be extensible. New categories can be introduced as standards evolve without requiring a redesign of the overall engine.

---

## Review Lifecycle

A possible lifecycle for the review process is:

```text
Implementation
    ↓
Engineer Requests Review
    ↓
Applicable Standards Identified
    ↓
Review Executed
    ↓
Findings Generated
    ↓
Engineer Decision
    ↓
Verification
    ↓
Pull Request
```

### Lifecycle notes

- Implementation: work is created or modified.
- Engineer Requests Review: the engineer asks for assessment against applicable standards.
- Applicable Standards Identified: the engine determines which adopted standards apply to the work.
- Review Executed: one or more providers examine the work and generate findings.
- Findings Generated: findings are captured with evidence and rationale.
- Engineer Decision: the engineer accepts, rejects, or overrides findings.
- Verification: the outcome is checked through follow-up review or re-execution.
- Pull Request: the reviewed change is prepared for delivery with a documented review trail.

---

## Findings Model

The Review Engine should use a standard findings model for all review domains.

Each finding should include:

- ID
- Standard
- Rule
- Severity
- Confidence
- Evidence
- Files
- Explanation
- Recommendation

### Model intent

This model ensures that findings are structured, comparable, and traceable across review types. It also creates a common basis for future dashboards, regression analysis, and historical review comparison.

### Implementation note

The Review Engine should primarily generate engineering findings rather than bugs. Its role is to evaluate work against adopted engineering standards and identify quality improvements, standards-alignment opportunities, and experience refinements. Defect tracking remains a separate pathway when broken behavior is confirmed.

---

## Severity Model

The Review Engine should use a severity scheme that communicates both impact and review urgency.

| Severity | Intended use |
|---|---|
| Critical | A direct violation of a standard with high delivery, quality, or governance impact. |
| Major | A significant issue that materially weakens compliance, clarity, or trust. |
| Minor | A meaningful issue that should be addressed but does not pose immediate release risk. |
| Informational | A noteworthy observation that improves quality or clarity without constituting a major concern. |
| Observation | A low-strength comment or context note that may be useful but is not necessarily actionable. |

### Severity guidance

Severity should reflect the seriousness of the issue relative to the relevant standard and the consequences of leaving it unresolved.

---

## Confidence

Review confidence should communicate the reviewer’s confidence in the finding, not the reviewer’s certainty that the engineer is wrong.

This is important because a finding may be strong while still remaining open to interpretation, context, or incomplete evidence.

Confidence should help distinguish between:

- a clear, well-supported issue
- a plausible concern that needs human judgment
- an observation that is useful but not strongly substantiated

---

## Relationship to Existing Standards

The Review Engine should consume standards through the existing Aredir Labs model:

```text
Engineering Standards
    ↓
Project Adoption
    ↓
Applicable Standards
```

This means the engine does not hardcode project-specific rules in its architecture. Instead, it relies on:

- company-owned standards
- project-level adoption decisions
- the current review context

This keeps the architecture aligned with the way Aredir Labs already treats standards as reusable, maintained assets rather than local, duplicated guidance.

---

## Future Integrations

The Review Engine should be designed so that review capability can be surfaced in multiple environments over time.

Potential future surfaces include:

- VS Code
- GitHub Pull Requests
- CI/CD pipelines
- ChatGPT-based review assistance
- Claude-based review assistance
- Codex-based review assistance
- other IDEs and authoring environments

These are architectural directions for future exposure and collaboration, not implementation commitments.

---

## Future AQSF Relationship

Aredir Labs can validate this concept internally first.

If the model proves valuable in real engineering workflows, it may later be generalized into a broader, project-agnostic Engineering Review Framework for AQSF.

This spike does not propose immediate promotion. It records the concept as a candidate architecture that may mature over time.

---

## Future Possibilities

The following opportunities are relevant for later evolution:

- Composite review reports
- Workspace-specific audits
- Trend analysis
- Regression detection
- Standard compliance history
- Project quality dashboards
- Review scoring
- Human override history
- Review explainability
- Standard evolution tracking

These ideas should be treated as future opportunities rather than immediate requirements.

---

## Constraints

This spike intentionally does not:

- implement the engine
- modify tooling
- create CI integrations
- create IDE plugins
- write code
- recommend specific AI vendors

This document is an architectural spike for review and alignment only.

---

## Deliverables

This spike provides:

1. A new architecture document for the Engineering Review Engine.
2. An architecture overview describing the layered structure.
3. A review lifecycle model.
4. A proposed set of review domains.
5. A findings model for structured review output.
6. A severity model for review prioritization.
7. A view of future opportunities and integrations.
8. A description of how the engine connects to Aredir Labs standards and project adoption.
9. A forward-looking note on AQSF promotion potential.
