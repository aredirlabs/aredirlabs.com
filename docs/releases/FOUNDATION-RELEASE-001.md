# FOUNDATION-RELEASE-001 — Aredir Engineering Foundation v1.0

| Field | Value |
| --- | --- |
| **Release** | FOUNDATION-RELEASE-001 |
| **Version** | Foundation v1.0 |
| **Status** | Released |
| **Authority** | Aredir Labs |
| **Classification** | Company Architectural Baseline |
| **Date** | 2026-08-02 |
| **Document type** | Architectural release record |
| **Writable repository** | `aredirlabs-com` |

## Normative status

This document is the **historical release record** for Aredir Engineering Foundation Version 1.0.

It is **not** an implementation guide, discovery package, promotion process, or redesign of existing methodology. It records the completed architectural baseline and the transition from foundation construction to product validation.

No authority changes are introduced by this release record.

---

## 1. Executive Summary

**Aredir Foundation Version 1.0** is the first internally consistent engineering methodology baseline for Aredir Labs.

The release establishes **architectural stability**: a coherent set of company authorities for framework identity, capability ownership, operating model, inheritance/bootstrap packaging, capability distribution, mission orientation, documentation governance, promotion, and knowledge indexing.

It does **not** claim feature completeness, product delivery completeness, automation readiness, or Operations Platform implementation. Foundation v1.0 freezes the architectural baseline from which future methodology evolves through operational use and governed promotion.

---

## 2. Release Scope

Major architectural areas included in Foundation v1.0:

| Area | Role in the baseline | Primary authorities |
| --- | --- | --- |
| **Engineering Framework (AEF)** | Framework identity and boundary for company engineering methodology | [AEF-000](../company/framework/AEF_000_AREDIR_ENGINEERING_FRAMEWORK_DISCOVERY.md), [AEF-001](../company/framework/AEF_001_FRAMEWORK_CAPABILITY_CONTRACTS.md) |
| **Capability Model** | Organizational competencies (EOS-002) distinct from AEF methodological subsystems (C1–C10) | [Engineering Capability Model](../company/ENGINEERING_CAPABILITY_MODEL.md), AEF-001 |
| **Engineering Operating System** | Company operating model, principles, and delivery lifecycle | [ENGINEERING_OPERATING_SYSTEM.md](../company/ENGINEERING_OPERATING_SYSTEM.md) |
| **Bootstrap Architecture** | Packaging and inheritance distribution without methodology ownership transfer | [AEF-002](../company/framework/AEF_002_BOOTSTRAP_EXTRACTION_BOUNDARY.md), Bootstrap SYNC / VERSION_MATRIX / ADOPTION_GUIDE |
| **Capability Distribution** | Cross-repository representation and ownership boundaries; reference hub | [Capability Distribution Architecture](../company/framework/CAPABILITY_DISTRIBUTION_ARCHITECTURE.md) |
| **Mission Architecture** | Engineering Mission as orientation artifact (contract, template, registry) | [Mission Contract](../missions/ENGINEERING-MISSION-CONTRACT.md), [Template](../missions/ENGINEERING-MISSION-TEMPLATE.md), [Registry](../missions/ENGINEERING-MISSION-REGISTRY.md) |
| **Documentation Governance** | Documentation ownership tiers, naming, status, and cross-linking | [Documentation Governance](../company/governance/DOCUMENTATION_GOVERNANCE.md) |
| **Promotion** | Governed return of reusable knowledge to the company Knowledge Base | [Promotion Process](../company/PROMOTION_PROCESS.md) |
| **Knowledge Architecture** | Knowledge Base indexing and promoted-asset navigation | [Knowledge Base Index](../company/KNOWLEDGE_BASE_INDEX.md), Knowledge Governance |

Supporting structural contracts already in the company corpus remain part of the operable baseline: [Project Inheritance Model](../company/PROJECT_INHERITANCE_MODEL.md), [Engineering Blueprint Specification](../company/ENGINEERING_BLUEPRINT_SPECIFICATION.md), [Reference Repository Specification](../company/REFERENCE_REPOSITORY_SPECIFICATION.md).

Quality Systems (`aredir-quality-systems`) remains a **sibling authority** for AQSF/AVF — integrated by reference and boundary rules, not absorbed into this Foundation inventory as an AEF capability.

---

## 3. Architectural Milestones

Completed work recorded in this release (evidence-backed only):

| Milestone | Evidence |
| --- | --- |
| **Framework reconstruction** | [AREDIR-DISCOVERY-001](../discovery/AREDIR-DISCOVERY-001_AEF_ARCHITECTURE_RECONSTRUCTION.md); AEF-000 / AEF-001 |
| **Identity reconciliation (AEF-003 identifier)** | AEF-DISCOVERY-003; [AEF-003 placeholder](../company/framework/AEF-003_DOCUMENTATION_STRUCTURE_DISCOVERY.md) restores correct identity (placeholder only — structure discovery not started) |
| **Capability contracts** | AEF-001 Company Standard |
| **Bootstrap extraction boundary** | AEF-002 Company Standard; Bootstrap packaging docs |
| **Engineering Operations discovery** | [AREDIR-DISCOVERY-003](../discovery/AREDIR-DISCOVERY-003_ENGINEERING_OPERATIONS_ARCHITECTURE.md) (architecture discovery; platform not implemented) |
| **Mission architecture** | [AREDIR-DISCOVERY-004](../discovery/AREDIR-DISCOVERY-004_ENGINEERING_MISSION_ARTIFACT_DEFINITION.md); Mission Contract / Template / Registry |
| **Assessment distribution boundary (specialized)** | [AREDIR-DISCOVERY-005](../discovery/AREDIR-DISCOVERY-005_CLIENT_ASSESSMENT_CAPABILITY_DISTRIBUTION_BOUNDARY.md) |
| **Capability Distribution discovery** | [AREDIR-DISCOVERY-006](../discovery/AREDIR-DISCOVERY-006_CAPABILITY_DISTRIBUTION_ARCHITECTURE.md) |
| **Capability Distribution classification** | [AREDIR-CLASSIFICATION-007](../discovery/AREDIR-CLASSIFICATION-007_CAPABILITY_DISTRIBUTION_AUTHORITY_CLASSIFICATION.md) |
| **Capability Distribution canonical architecture** | [CAPABILITY_DISTRIBUTION_ARCHITECTURE.md](../company/framework/CAPABILITY_DISTRIBUTION_ARCHITECTURE.md) (AREDIR-ARCHITECTURE-007) |
| **Capability Distribution documentation alignment** | [AREDIR-ALIGNMENT-008](../discovery/AREDIR-ALIGNMENT-008_CAPABILITY_DISTRIBUTION_ARCHITECTURE_INTEGRATION_REVIEW.md); [AREDIR-DOCS-008](../discovery/AREDIR-DOCS-008_CAPABILITY_DISTRIBUTION_DOCUMENTATION_ALIGNMENT.md) |

Not claimed as completed in this release: AEF-003 Documentation Structure Discovery content, Operations Platform implementation, sync automation, or assessment runtime implementation.

---

## 4. Architectural Principles Established

Principles supported by the Foundation corpus:

| Principle | Source basis |
| --- | --- |
| **One concept → one authority → many references** | DOCS-008 completion assessment; Capability Distribution reference hub |
| **Authority precedes representation** | Capability Distribution Architecture; AQSF Publishing / Ops discovery alignment |
| **Repository location does not determine ownership** | Capability Distribution Architecture; Discovery-005 / Discovery-006 |
| **Capability Distribution preserves authority** | Capability Distribution Architecture invariants; AEF-002 packaging boundary |
| **Promotion is governed** | Promotion Process; Capability Distribution feedback architecture |
| **Client evidence remains client-owned** | Discovery-005; Capability Distribution Architecture |
| **Canonical-first / products own implementation** | Engineering Operating System principles |
| **Bootstrap does not own methodology** | AEF-002; Bootstrap SYNC / ADOPTION_GUIDE |

---

## 5. Validation Status

| Stage | Status | Record |
| --- | --- | --- |
| Discovery (Capability Distribution and predecessors) | Complete | Discovery-001…006; Mission discovery packages |
| Classification (Capability Distribution authority) | Complete | CLASSIFICATION-007 |
| Canonical architecture (Capability Distribution) | Complete | CAPABILITY_DISTRIBUTION_ARCHITECTURE.md |
| Documentation alignment (reference network) | Complete | ALIGNMENT-008; DOCS-008 |
| AEF identity reconciliation | Complete | AEF-DISCOVERY-003 / AEF-003 placeholder identity |
| AEF-003 Documentation Structure Discovery | **Not started** (placeholder only) | AEF-003 |
| Product engagement validation of Foundation as a whole | **Outside this release** | Phase 2 |

**Architectural stability:** Foundation v1.0 is considered **architecturally stable** as an internally consistent methodology baseline. Stability here means coherent authorities and reference alignment — not exhaustive product validation or tooling completeness.

---

## 6. Deferred Work

Intentionally outside Foundation v1.0 completion claims:

| Deferred topic | Notes |
| --- | --- |
| **AEF-003 Documentation Structure Discovery** | Placeholder only; Blueprint `framework/` listing and standards path normalization not performed |
| **Operations Platform implementation** | Discovery-003 accepted Ops as architectural direction; application/platform not implemented |
| **Capability evolution / new AEF capabilities** | C11 and new capability invention remain deferred |
| **Automation** | Not part of Foundation v1.0 |
| **Synchronization tooling** | AEF-002 may recommend approaches; tooling not delivered as Foundation scope |
| **Assessment runtime implementation** | Discovery-005 boundary model; runtime packaging/implementation deferred |
| **Speculative architectural expansion** | Future change via operational evidence and governed promotion |

This section records deferral only. It does not authorize or schedule implementation.

---

## 7. Transition to Phase 2

**Foundation construction for Version 1.0 is complete.**

The next phase emphasizes **validation through real products and engagements**, not further speculative foundation redesign.

Primary validation environments:

| Environment | Role in Phase 2 |
| --- | --- |
| **Phoenix** | Continue validating assessment methodology in a real engineering environment; meet engagement work obligations |
| **ClassForge** | Deliver a practical classroom product; favor usability while consuming the Foundation |
| **AlignFit** | Restore consistent engineering cadence; continue validating AEF through product development |
| **Operations Platform** | Later Phase 3 focus — smallest system to run Aredir methodology (Opportunities, Missions, Packages, Findings, Decisions, Knowledge Candidates); not a Foundation v1.0 deliverable |

Phase 2 does not reopen Foundation ownership boundaries. Product and engagement evidence may produce promotion candidates under the existing Promotion Process.

---

## 8. Version Information

| Field | Value |
| --- | --- |
| **Version** | Foundation v1.0 |
| **Status** | Released |
| **Authority** | Aredir Labs |
| **Classification** | Company Architectural Baseline |
| **Release ID** | FOUNDATION-RELEASE-001 |
| **Release date** | 2026-08-02 |

---

## 9. Future Evolution

Future improvements to Aredir engineering methodology should arise from:

1. **Operational use** in products and engagements
2. **Governed promotion** of generalized, reusable learning
3. **Targeted architecture packages** when evidence shows a real contradiction or gap

They should **not** arise from speculative architectural expansion disconnected from practice.

Capability Distribution, AEF contracts, EOS, Bootstrap packaging boundaries, Mission, Promotion, and Documentation Governance remain the authority homes defined in Foundation v1.0 unless later superseded through governed process.

---

## 10. Overall Assessment

**Foundation Version 1.0 establishes the initial architectural baseline from which future Aredir engineering methodology will evolve.**

The baseline is internally consistent, reference-aligned around Capability Distribution for cross-repository representation, and bounded so that Bootstrap packaging, Quality Systems methods, product domain ownership, and promotion procedure retain their established authorities.

Architectural construction of Foundation v1.0 is released. Product validation begins.

---

## Verification Record

| Check | Result |
| --- | --- |
| References align with current authoritative documentation | Observed |
| No authority changes introduced | Observed |
| Release reflects only completed work | Observed — AEF-003 content and Ops/tooling implementation excluded |
| No unsupported claims | Observed — feature completeness and product validation not claimed |

---

## Related

### Framework and operating model

- [AEF-000](../company/framework/AEF_000_AREDIR_ENGINEERING_FRAMEWORK_DISCOVERY.md)
- [AEF-001](../company/framework/AEF_001_FRAMEWORK_CAPABILITY_CONTRACTS.md)
- [AEF-002](../company/framework/AEF_002_BOOTSTRAP_EXTRACTION_BOUNDARY.md)
- [AEF-003 (placeholder)](../company/framework/AEF-003_DOCUMENTATION_STRUCTURE_DISCOVERY.md)
- [Capability Distribution Architecture](../company/framework/CAPABILITY_DISTRIBUTION_ARCHITECTURE.md)
- [Engineering Operating System](../company/ENGINEERING_OPERATING_SYSTEM.md)
- [Knowledge Base Index](../company/KNOWLEDGE_BASE_INDEX.md)
- [Promotion Process](../company/PROMOTION_PROCESS.md)
- [Documentation Governance](../company/governance/DOCUMENTATION_GOVERNANCE.md)

### Mission

- [Mission Contract](../missions/ENGINEERING-MISSION-CONTRACT.md)
- [Mission Template](../missions/ENGINEERING-MISSION-TEMPLATE.md)
- [Mission Registry](../missions/ENGINEERING-MISSION-REGISTRY.md)

### Discovery / classification / alignment trail

- [Discovery README](../discovery/README.md)
- [AREDIR-DOCS-008](../discovery/AREDIR-DOCS-008_CAPABILITY_DISTRIBUTION_DOCUMENTATION_ALIGNMENT.md)
