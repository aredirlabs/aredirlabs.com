# PROJECT-UX-002 — Phase 0: Existing Aredir Experience Discovery

| Field | Value |
|---|---|
| Status | Complete — discovery inventory |
| Scope | Aredir repository documentation, architecture, and validated work only |
| Decision | Do not define a new Operational Experience Language until this inventory is consumed |
| Date | 2026-08-06 |

## Purpose and boundary

This inventory identifies existing Aredir knowledge that already governs, demonstrates, or constrains operational experience. Its purpose is to prevent PROJECT-UX-002 from creating renamed duplicates or importing authority from a product repository or external design system.

The review examined only material present in this repository. Where an Aredir document records an external origin, that metadata was treated as provenance of the Aredir asset, not as evidence newly reviewed for this package. Claims in repository documents that depend on material outside this repository are not used as independent validation here.

Classification meanings:

| Classification | Use in later PROJECT-UX-002 work |
|---|---|
| Reuse unchanged | Cite and inherit the existing canonical principle without renaming it. |
| Promote with refinement | Preserve the principle, while raising its evidence, scope, or explicit cross-capability contract through the governed promotion path. |
| Adapt | Use only the bounded, evidenced portion; retain its limits and do not promote it as a general rule yet. |
| Superseded | Retain only as historical evidence; do not use as a normative source. |
| Not applicable | Do not include in an Operational Experience Language. |

## Governing conclusion

No new foundational Operational Experience principle is justified by this review. Aredir already has a canonical, promoted experience architecture: [Workspace Experience Architecture](../company/architecture-patterns/AREDIR_UX_001_WORKSPACE_EXPERIENCE_ARCHITECTURE.md) (AREDIR-UX-001). It is owned by the Design & Experience Framework (C10) under the authoritative [capability contracts](../company/framework/AEF_001_FRAMEWORK_CAPABILITY_CONTRACTS.md).

Any later Operational Experience Language must therefore be a named application, organization, or refinement of the existing Aredir assets below. It must not restate their substance under new terminology or become a competing source of truth.

## Canonical company and architecture inventory

| Finding | Evidence in this repository | Classification | Basis and required treatment |
|---|---|---|---|
| The environment absorbs organizational complexity so users do not reconstruct it mentally. | [Product Operating Environment Philosophy — Product philosophy](../company/AREDIR-VISION-001_PRODUCT_OPERATING_ENVIRONMENT_PHILOSOPHY.md#product-philosophy) | Reuse unchanged | Foundational company vision explicitly assigns complexity to the environment, with context, relationships, and evidence available in proportion to importance. |
| Familiar work is made clearer rather than renamed or ceremonial. | [Product Operating Environment Philosophy — Product philosophy](../company/AREDIR-VISION-001_PRODUCT_OPERATING_ENVIRONMENT_PHILOSOPHY.md#product-philosophy) | Reuse unchanged | Later work must use familiar operational language where practical and must not introduce a parallel vocabulary merely to name existing concepts. |
| Purpose, current position, and next correct action orient an operational view. | [Product Operating Environment Philosophy — Product experience philosophy](../company/AREDIR-VISION-001_PRODUCT_OPERATING_ENVIRONMENT_PHILOSOPHY.md#product-experience-philosophy) | Reuse unchanged | This is already an explicit company-level experience test. The terms should be cited, not replaced. |
| A meaningful surface is a purposeful workspace, not a collection of pages. | [AREDIR-UX-001 — Philosophy](../company/architecture-patterns/AREDIR_UX_001_WORKSPACE_EXPERIENCE_ARCHITECTURE.md#philosophy) | Reuse unchanged | Promoted Architecture Pattern. It is the primary canonical experience construct for operational surfaces. |
| Workspace orientation is composed from Mission, Environment, Primary Action, Supporting Context, Navigation, and Identity. | [AREDIR-UX-001 — Workspace Experience Model](../company/architecture-patterns/AREDIR_UX_001_WORKSPACE_EXPERIENCE_ARCHITECTURE.md#workspace-experience-model) | Reuse unchanged | The six elements and their user questions already supply the experience model. Do not create a second model with synonyms. |
| Supporting information is relevant, subordinate, and progressively disclosed. | [AREDIR-UX-001 — Supporting Context](../company/architecture-patterns/AREDIR_UX_001_WORKSPACE_EXPERIENCE_ARCHITECTURE.md#supporting-context) | Reuse unchanged | Directly governs operational information hierarchy. |
| Navigation expresses the user’s journey and preserves return orientation, rather than mirroring application taxonomy. | [AREDIR-UX-001 — Navigation](../company/architecture-patterns/AREDIR_UX_001_WORKSPACE_EXPERIENCE_ARCHITECTURE.md#navigation) | Reuse unchanged | Directly governs operational navigation; later work must not define an overlapping navigation doctrine. |
| Interfaces follow intended experience; components do not dictate the composition. | [AREDIR-UX-001 — Experience Before Interface](../company/architecture-patterns/AREDIR_UX_001_WORKSPACE_EXPERIENCE_ARCHITECTURE.md#experience-before-interface) | Reuse unchanged | Canonical guardrail against component- or route-led operational design. |
| Evidence, interpretation, knowledge, decisions, and outcomes remain distinguishable and traceable. | [Evidence Lifecycle Pattern — Canonical Lifecycle](../company/knowledge-patterns/EVIDENCE_LIFECYCLE_PATTERN.md#canonical-lifecycle) | Reuse unchanged | Promoted knowledge pattern. It prevents operational views from presenting interpretations or recommendations as settled fact. |
| Canonical methodology remains authoritative; projections and distributed copies do not acquire authority. | [Capability Distribution Architecture — Architectural Principles](../company/framework/CAPABILITY_DISTRIBUTION_ARCHITECTURE.md#2-architectural-principles) | Reuse unchanged | A core boundary for any operational experience that presents repository artifacts, summaries, or indexes. |
| Reusable learning returns to Aredir only through governed promotion. | [Promotion Process — Promotion Requirements](../company/PROMOTION_PROCESS.md#promotion-requirements) and [Capability Distribution Architecture — Architectural Principles](../company/framework/CAPABILITY_DISTRIBUTION_ARCHITECTURE.md#2-architectural-principles) | Reuse unchanged | This directly enforces the requested Aredir-first authority rule. Product or external concepts cannot enter the language without promotion. |
| Design & Experience (C10) owns product-agnostic experience semantics and operational UI guidance. | [AEF-001 — C10 Design & Experience Framework](../company/framework/AEF_001_FRAMEWORK_CAPABILITY_CONTRACTS.md#c10--design--experience-framework) | Reuse unchanged | Later work must preserve this ownership boundary; it is not a new capability or separate authority. |

## Existing operational-work evidence

| Finding | Evidence in this repository | Classification | Evidence strength and bounded use |
|---|---|---|---|
| Engineering Work detail opens with objective, current position, and recommended next action; details are supporting context. | [UX-002 Engineering Work Operational Experience](../engineering/UX-002_ENGINEERING_WORK_OPERATIONAL_EXPERIENCE.md) | Adapt | Implemented and lint/build validated; the protected screen was not visually runtime-validated. Use it as a bounded operational-record pattern, not yet as a universal principle. Its orientation sequence is an application of the company vision and AREDIR-UX-001. |
| Project views prioritize the most relevant Engineering Work by lifecycle state and preserve a direct two-way Project ↔ Work path. | [UX-001 Project Operational Hierarchy](../engineering/UX-001_PROJECT_OPERATIONAL_HIERARCHY.md) | Adapt | Implemented with lint/build validation and inspected hierarchy; authenticated visual validation was unavailable. It is useful evidence for operational hierarchy, but selection order is specific to the current Engineering Work model. |
| The Workspace entry surface is a lobby: focused continuation first, blocked work as attention signal, then supporting project context. | [WORKSPACE-001 Daily Operating Experience](../engineering/WORKSPACE-001_DAILY_OPERATING_EXPERIENCE.md) | Promote with refinement | The hierarchy is implemented but explicitly requests an authenticated observation pass before refinement. Preserve the lobby/project/workbench relationship as a candidate operational pattern; do not yet generalize its particular ordering, `updatedAt` proxy, or data selection rule. |
| A workflow can require a distinct readable conversation while retaining one canonical parent record and a narrow, evidence-justified child context. | [Engineering Work 012 Workflow Context Architecture](../engineering/ENGINEERING-WORK-012_WORKFLOW_CONTEXT_ARCHITECTURE.md) | Adapt | Validated persistence architecture, not a general experience language. Use only for the principle that operational context must remain semantically readable and must not flatten distinct facts into generic prose. |
| Workflow-specific prompts must be backed by durable semantics before their experience is represented as complete. | [Defect Intake 001](../engineering/DEFECT-INTAKE-001_WORKFLOW_AWARE_DEFECT_EXPERIENCE.md) | Not applicable | The document is explicitly “Not validated” and is a persistence-gate assessment, not a reusable operational experience standard. It can constrain implementation decisions but cannot supply a validated OEL principle. |
| Delivery-oriented intake uses a typed, workflow-aware conversation while deliberately leaving unsupported workflows as placeholders. | [Engineering Work 011 Workflow-Aware Engineering Intake](../engineering/ENGINEERING-WORK-011_WORKFLOW_AWARE_ENGINEERING_INTAKE.md) | Adapt | Useful constraint: do not imply unsupported workflow behavior. It remains implementation-specific because only Delivery was implemented in the cited package. |
| A registry supplies discovery and governance visibility while canonical Markdown remains authoritative. | [WORKSPACE-008 Knowledge Asset Registry](../workspace/WORKSPACE_008_KNOWLEDGE_ASSET_REGISTRY.md) | Reuse unchanged | Completed Aredir implementation and an exact application of authority-before-representation. This should govern read-only operational indexes and source links. |
| Repository documents and records remain authoritative; future operating views may project references and status, not replace artifact bodies. | [Repository Boundary Assessment](./REPOSITORY-BOUNDARY-ASSESSMENT.md) | Reuse unchanged | Repository-local assessment aligned to the canonical Capability Distribution Architecture. Use it as implementation-facing boundary evidence, with the canonical architecture remaining normative. |

## Related sources deliberately not elevated

| Source | Classification | Reason |
|---|---|---|
| [Workspace-First AI Experience Pattern](../company/architecture-patterns/WORKSPACE_FIRST_AI_EXPERIENCE_PATTERN.md) | Not applicable | A valuable AI-surface topology, but it applies only where AI/advisor interaction is in scope. It must not become a universal requirement for operational experience. |
| [Design Governance](../company/governance/DESIGN_GOVERNANCE.md) | Adapt | It supplies operational clarity, hierarchy, information-architecture, and accessibility guidance, but it explicitly delegates canonical experience architecture to AREDIR-UX-001. Use it as supporting governance, not a parallel source of experience principles. |
| [UI Foundation Inventory](./UI-FOUNDATION-INVENTORY.md) | Adapt | It records implemented shell, navigation, responsive, and accessibility behavior. These are reusable implementation foundations, not a canonical operational experience language. |
| [Engineering Operations Architecture Discovery](./AREDIR-DISCOVERY-003_ENGINEERING_OPERATIONS_ARCHITECTURE.md) | Promote with refinement | It contains a promising repository-held discovery about operational visibility, projection, and a mission-centered narrative. However, it is a discovery artifact, labels significant material as inferred or externally stated, and does not authorize implementation. Only its internally supported constraints may be considered in a future governed promotion package. |
| Workspace Design Principles v0.1 candidate listed in [Engineering Standards Index](../engineering/ENGINEERING_STANDARDS_INDEX.md) | Superseded | The index lists it as a promotion candidate but no corresponding asset is present. Its stated subject overlaps the now-promoted AREDIR-UX-001; it cannot be treated as an independent principle source unless a source artifact and governed relationship are restored. |
| [Engineering Work 004 Runtime Validation](../engineering/ENGINEERING-WORK-004_RUNTIME_VALIDATION.md) | Superseded | The document explicitly says it is superseded by AREDIR-RUNTIME-001 evidence; it is not used. |

## Duplicate-prevention map

| Proposed concern for later work | Existing authoritative home | Required treatment |
|---|---|---|
| Operational workspace purpose, action, hierarchy, context, navigation, identity | AREDIR-UX-001 | Reuse its six-element model unchanged. |
| Cognitive load, familiar language, current position, next correct action | Product Operating Environment Philosophy | Cite the existing product philosophy. |
| Evidence visibility, uncertainty, decision traceability | Evidence Lifecycle Pattern | Preserve lifecycle distinctions; do not create a second evidence model. |
| Read-only operational indexes, source links, and repository authority | Capability Distribution Architecture; WORKSPACE-008 | Treat views as projections and link back to the canonical source. |
| Cross-product authority and promotion | EOS, Project Inheritance Model, Promotion Process | Aredir owns methodology; products implement and may submit governed promotion candidates. |
| AI or advisor workspace topology | Workspace-First AI / Human + AI Advisor patterns | Apply only where relevant; keep separate from universal workspace experience. |

## Constraints for the remainder of PROJECT-UX-002

1. Treat AREDIR-UX-001 as the canonical architectural base. A later OEL artifact may clarify operational application, but may not rename or duplicate Mission, Primary Action, Supporting Context, Navigation, or Identity.
2. Keep a visible distinction between authoritative artifacts and their operational projections. A new workspace, registry, dashboard, or summary cannot become the source of truth solely by presenting it.
3. Preserve evidence lifecycle distinctions in every principle that concerns status, recommendations, decisions, or learning.
4. Use the current operational-work packages as implementation evidence with their recorded validation limits. Do not claim full runtime usability validation where the record says an authenticated visual pass did not occur.
5. Do not use product repositories, external systems, or external design systems as authority. A concept absent from this inventory requires an Aredir-owned discovery, validation, and governed promotion before it can become canonical.
6. Before promotion, resolve the status of AREDIR-UX-001: its recorded next review date is 2026-09-12, which is after this Phase 0 inventory date; no supersession is currently recorded in this repository.

## Result

The validated Aredir starting point is already present: a purpose-led Workspace Experience Architecture, company philosophy for clarity and next action, evidence-aware knowledge lifecycle, and authority-preserving projection model. PROJECT-UX-002 should now proceed by mapping its operational scope to those assets and by promoting only genuinely missing, Aredir-validated refinements.
