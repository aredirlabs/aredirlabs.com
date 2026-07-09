# Aredir Labs Engineering Standards Index

## Executive Summary

Engineering standards are owned by Aredir Labs.

Projects adopt standards. They do not create parallel versions of the same guidance in order to preserve consistency, reduce drift, and make reuse practical across products.

Projects do not duplicate standards. When a standard applies, a project should adopt it directly and document any local implementation decisions separately.

Standards evolve independently from projects. A project may change its implementation, but the standard itself remains a company-level artifact that is reviewed, versioned, and maintained by Aredir Labs.

This document is the authoritative catalog of engineering standards currently maintained by Aredir Labs for use across products and future initiatives.

---

## Engineering Standards Catalog

| Standard | Version | Status | Category | Description | Current Adopters |
|---|---:|---|---|---|---|
| [UI Quality Audit Standard](../standards/AREDIR_UI_QUALITY_AUDIT_STANDARD.md) | v0.1 | Draft Standard | Quality | Reusable audit framework for UI readiness, responsiveness, trustworthiness, and release confidence. | AlignFit; this repository; future Aredir Labs products |
| [Coding Agent Operating Standard](../company/engineering-standards/CODING_AGENT_OPERATING_STANDARD.md) | v1.0 | Promoted Standard | Governance | Operating rules for implementation agents, verification discipline, and change control. | This repository; future Aredir Labs projects |
| [Architecture Governance](../company/governance/ARCHITECTURE_GOVERNANCE.md) | v1.0 | Promoted Standard | Governance | Governance model for architecture decisions, reviews, ownership, and evolution. | This repository; future Aredir Labs projects |
| [Documentation Governance](../company/governance/DOCUMENTATION_GOVERNANCE.md) | v1.0 | Promoted Standard | Governance | Governance expectations for documentation ownership, structure, maintenance, and review. | This repository; future Aredir Labs projects |
| [Architecture Audit Standard](../company/documentation-standards/ARCHITECTURE_AUDIT_STANDARD.md) | v1.0 | Promoted Standard | Documentation | Standard for architecture documentation quality, review, and maintenance. | This repository; future Aredir Labs projects |
| [Documentation Maintenance Standard](../company/documentation-standards/DOCUMENTATION_MAINTENANCE_STANDARD.md) | v1.0 | Promoted Standard | Documentation | Standard for maintaining documentation quality, currency, and discoverability. | This repository; future Aredir Labs projects |
| [QA Engineering Framework](../company/qa-standards/QA_ENGINEERING_FRAMEWORK.md) | v1.0 | Promoted Standard | Quality | Verification lifecycle, release readiness, and quality gate expectations. | This repository; future Aredir Labs projects |
| [Root Cause Analysis Framework](../company/qa-standards/ROOT_CAUSE_ANALYSIS_FRAMEWORK.md) | v1.0 | Promoted Standard | Quality | Evidence-based defect investigation and permanent resolution methodology. | This repository; future Aredir Labs projects |
| [AI Evaluation Framework](../company/ai-patterns/AI_EVALUATION_FRAMEWORK.md) | v1.0 | Promoted Standard | AI | Evaluation approach for AI systems, regression control, and validation discipline. | This repository; future Aredir Labs products |
| [Context Builder Pattern](../company/ai-patterns/CONTEXT_BUILDER_PATTERN.md) | v1.0 | Promoted Standard | AI | Deterministic context assembly before AI reasoning and response generation. | This repository |
| [Response Contract Pattern](../company/ai-patterns/RESPONSE_CONTRACT_PATTERN.md) | v1.0 | Promoted Standard | AI | Contract-based output boundaries for safer, more auditable AI responses. | This repository |
| [Human + AI Advisor Workspace Pattern](../company/ai-patterns/HUMAN_AI_ADVISOR_WORKSPACE_PATTERN.md) | v1.0 | Promoted Standard | AI | Shared workspace model for human and AI collaboration in advisory workflows. | This repository |
| [Evidence-Aware AI Advisor Pattern](../company/ai-patterns/EVIDENCE_AWARE_AI_ADVISOR_PATTERN.md) | v1.0 | Promoted Standard | AI | Transparent evidence communication, uncertainty handling, and knowledge evolution for AI advisors. | This repository |
| Workspace Design Principles | v0.1 | Promotion Candidate | Experience | Cross-product principles for workspace experience quality, clarity, and collaboration. | No formal project adopters yet |
| Representation Engine Pattern | v0.1 | Promotion Candidate | Architecture | Candidate pattern for structured representation and reasoning flows across product surfaces. | No formal project adopters yet |
| Evidence Contract | v0.1 | Promotion Candidate | AI | Candidate contract for evidence exchange, provenance, and validation expectations. | No formal project adopters yet |
| Repository Standards | v1.0 | Promoted Standard | Governance | Baseline repository hygiene, documentation placement, and contribution expectations. | This repository; future Aredir Labs repositories |

---

## Standard Lifecycle

Discovery

↓

Project Validation

↓

Aredir Labs Standard

↓

Adoption

↓

Maintenance

↓

Future AQSF Promotion (optional)

### Lifecycle Notes

- Discovery: A standard begins as an observed need, recurring pattern, or validated practice.
- Project Validation: A project tests the practice in a real delivery context and records evidence of reuse value.
- Aredir Labs Standard: When the practice proves reusable and broadly relevant, Aredir Labs may promote it as a company standard.
- Adoption: Projects adopt the standard through lightweight adoption documents rather than duplicating it.
- Maintenance: The owning team updates the standard as usage, evidence, and operating context evolve.
- Future AQSF Promotion: If a standard shows strong cross-project value, it may later be generalized into a broader Aredir Quality Standards Framework (AQSF) asset.

---

## Versioning

Standards should use simple semantic versioning expectations:

- v1.0: Initial promoted standard or first broadly adopted baseline.
- v1.1: Minor clarification, editorial refinement, or non-breaking guidance updates.
- v2.0: Structural change, expanded scope, or materially changed expectations.

Candidate standards may use provisional versions such as v0.1 or v0.2 until they are validated and promoted.

---

## Project Adoption

Projects adopt standards through lightweight adoption documents.

An adoption document should state:

- which standards the project applies
- which implementation choices are project-specific
- whether any deviations are intentionally accepted
- the project owner or point of contact for follow-up questions

Standards remain owned by Aredir Labs. Projects adopt them; they do not own or rewrite them independently.

---

## Future AQSF Promotion

Sufficiently validated standards may later be generalized into AQSF.

Promotion into AQSF is appropriate when a standard:

- has proven reuse across more than one project or delivery context
- has stable expectations that can be explained without project-specific assumptions
- has evidence of adoption and maintenance value
- is broad enough to serve as a reusable organizational capability rather than a single-project convention

---

## Deliverables

### Files created

- [docs/engineering/ENGINEERING_STANDARDS_INDEX.md](./ENGINEERING_STANDARDS_INDEX.md)

### Standards indexed

- UI Quality Audit Standard
- Coding Agent Operating Standard
- Architecture Governance
- Documentation Governance
- Architecture Audit Standard
- Documentation Maintenance Standard
- QA Engineering Framework
- Root Cause Analysis Framework
- AI Evaluation Framework
- Context Builder Pattern
- Response Contract Pattern
- Human + AI Advisor Workspace Pattern
- Evidence-Aware AI Advisor Pattern
- Workspace Design Principles (candidate)
- Representation Engine Pattern (candidate)
- Evidence Contract (candidate)
- Repository Standards

### Promotion candidates

- Workspace Design Principles
- Representation Engine Pattern
- Evidence Contract

### Governance recommendations

- Maintain this index as the canonical navigation page for engineering standards.
- Treat the index as the entry point for project adoption and standards review.
- Review the catalog at regular intervals so promoted standards, draft standards, and candidates remain clearly distinguishable.
- Keep project-specific implementation guidance separate from Aredir Labs standards to avoid duplication.
