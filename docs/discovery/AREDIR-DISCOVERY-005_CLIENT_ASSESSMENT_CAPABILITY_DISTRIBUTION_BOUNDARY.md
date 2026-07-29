# AREDIR-DISCOVERY-005 — Client Assessment Capability Distribution Boundary

| Field | Value |
| --- | --- |
| **Work package** | AREDIR-DISCOVERY-005 |
| **Status** | Complete (architectural discovery) |
| **Date** | 2026-07-29 |
| **Package type** | Architectural Discovery — no implementation |
| **Writable repository** | `aredirlabs-com` only |
| **Subject** | Ownership, execution, distribution, and retention boundaries for Aredir assessment capability operating inside client repositories |
| **Prior authority** | [AREDIR-DISCOVERY-003](./AREDIR-DISCOVERY-003_ENGINEERING_OPERATIONS_ARCHITECTURE.md), [AREDIR-DISCOVERY-004](./AREDIR-DISCOVERY-004_ENGINEERING_MISSION_ARTIFACT_DEFINITION.md) |
| **Follow-on decision** | **Pending** — discovery only; no implementation authorized |

## Evidence classification used in this report

| Class | Meaning |
| --- | --- |
| **Confirmed** | Directly supported by Labs, Quality Systems, Bootstrap, or product artifacts consulted in this workspace |
| **Inferred** | Reasonable synthesis from multiple evidence points; not a single authoritative rule |
| **Proposed** | Recommended by this package as a boundary model; pending later validation |
| **Unresolved** | Material gap left open deliberately |

Do not treat design preference as **Confirmed**. This package does not authorize application implementation, bootstrap changes, Phoenix promotion, AEF edits, new capability assignment, or client-data transfer.

---

## 1. Executive Summary

### Verdict

**Assessment capability should be modeled as a layered distribution boundary**, not as a single monolithic ownership model. Aredir may own the reusable methodology and distribution package, while the client repository may host the temporary execution runtime and the client’s own evidence and deliverables. Repository location alone does not determine ownership.

### Refined hypothesis

| Hypothesis (package brief) | Result |
| --- | --- |
| Aredir assessment capability can execute inside a client repository without transferring ownership | **Accepted** |
| The reusable template repository, the temporary engagement runtime, the client record, and the client’s permanent documentation are distinct layers | **Accepted** |
| Assessment assets should not all be treated as either fully Aredir-owned or fully client-owned | **Accepted** |
| Aredir should preserve authority over methodology while allowing client-local execution and evidence generation | **Accepted with refinement** |

### Canonical one-liner

> An assessment capability may be distributed into a client repository for execution while retaining Aredir ownership of methodology, version authority, and promotion rights, and while preserving distinct client ownership of engagement evidence and permanent deliverables.

### Core decision

**The boundary is ownership-by-layer, not location-by-default.**

Aredir owns the methodology and the reusable distribution package. The client owns the engagement record and permanent client-facing deliverables. The engagement runtime may be installed or activated in the client repository temporarily, but that runtime is an execution environment for Aredir-owned assets rather than an automatic transfer of ownership.

---

## 2. Boundary Model

The intended relationship is:

```text
Aredir Methodology Authority
        ↓
Assessment Distribution Package
        ↓
Client Repository Execution
        ↓
Client Evidence and Deliverables
        ↓
Aredir Knowledge Promotion
```

### Boundary principles

1. **Authority follows ownership, not mere presence.**
   A repository location does not by itself establish ownership.

2. **Execution is distinct from ownership.**
   Aredir-owned assets may execute inside a client repository without becoming client-owned assets.

3. **Evidence and deliverables are layered.**
   Temporary runtime artifacts, client-authored evidence, and reusable methodology must be treated separately.

4. **Promotion is selective.**
   Only generalized, de-identified, and validated learning may flow back to Aredir.

5. **The client record remains client-scoped.**
   Permanent engineering documentation and engagement artifacts belong to the client’s authoritative record unless explicitly promoted under a governed process.

---

## 3. Evidence Base

| Source | Use in this package |
| --- | --- |
| [AREDIR-DISCOVERY-003](./AREDIR-DISCOVERY-003_ENGINEERING_OPERATIONS_ARCHITECTURE.md) | Operational workspace model; authority remains with source repositories and governing authorities |
| [AREDIR-DISCOVERY-004](./AREDIR-DISCOVERY-004_ENGINEERING_MISSION_ARTIFACT_DEFINITION.md) | Artifact boundaries; mission, evidence, package, and promotion remain distinct |
| [AEF-000](../company/framework/AEF_000_AREDIR_ENGINEERING_FRAMEWORK_DISCOVERY.md) | Framework discovery and capability boundary context |
| [AEF-001](../company/framework/AEF_001_FRAMEWORK_CAPABILITY_CONTRACTS.md) | Capability ownership and boundary contracts |
| [AEF-002](../company/framework/AEF_002_BOOTSTRAP_EXTRACTION_BOUNDARY.md) | Bootstrap inclusion boundaries and extraction rules |
| [ENGINEERING_OPERATING_SYSTEM](../company/ENGINEERING_OPERATING_SYSTEM.md) | Governance posture for operational capability and evidence |
| [PROMOTION_PROCESS](../company/PROMOTION_PROCESS.md) | Controlled transfer of reusable knowledge |
| [DOCUMENTATION_GOVERNANCE](../company/governance/DOCUMENTATION_GOVERNANCE.md) | Documentation ownership and promotion posture |
| Phoenix assessment artifacts and project bootstrap | Referenced as external evidence where present, but not re-audited in this workspace |

### External evidence note

Where Phoenix evidence exists in another repository, this package treats it as an external authority reference rather than assuming its absence from this repository indicates non-existence.

---

## 4. Artifact Inventory and Classification

The following artifact classes are relevant to the assessment boundary.

| Artifact type | Representative examples | Ownership classification | Distribution classification | Notes |
| --- | --- | --- | --- | --- |
| Assessment standards | rubrics, methods, evaluation criteria | **Aredir-authoritative** | **Retained in Aredir Labs** or **included in bootstrap if broadly reusable** | Reusable methodology; owner remains Aredir |
| Audit instructions | runbooks, review steps, execution guidance | **Aredir-authoritative** | **Included in bootstrap if broadly reusable** | May be distributed for execution but remain Aredir-owned |
| Evidence schemas | schema definitions for findings, evidence, traceability | **Aredir-authoritative** | **Included in bootstrap if broadly reusable** | Defines structure for captured evidence |
| Finding schemas | finding record shape, severity, confidence fields | **Aredir-authoritative** | **Included in bootstrap if broadly reusable** | Enables standardized evidence and auditability |
| Finding sets | assessment findings captured during engagement | **Engagement-scoped** or **Shared/derived** | **Generated in client repository** | Findings are created during execution; may be client-scoped evidence |
| Assessment reports | executive summaries, review reports | **Generated client deliverable** or **Shared/derived** | **Generated in client repository** | Client-facing deliverables may become part of client record |
| Recommendations | remediation or improvement guidance | **Generated client deliverable** or **Shared/derived** | **Generated in client repository** | May be client-specific or generalized later |
| Implementation work packages | remediation tasks or follow-on work | **Client-authoritative** or **Engagement-scoped** | **Generated in client repository** | These are execution artifacts within the client environment |
| Validation records | closure checks, verification evidence | **Client-authoritative** or **Engagement-scoped** | **Generated in client repository** | Important for traceability and closure |
| Prompts | prompts used to drive assessment or review | **Aredir-authoritative** | **Included in bootstrap if broadly reusable** | Can be distributed, but remain Aredir-owned |
| Scripts and tooling | automation, parsers, validators, import/export helpers | **Aredir-authoritative** | **Included in bootstrap if broadly reusable** or **installed temporarily** | Tooling may be distributed but remains governed by Aredir |
| Engagement metadata | session context, client identifiers, timestamps, scope | **Client-authoritative** or **Engagement-scoped** | **Generated in client repository** | Sensitive and context-specific |
| Promoted knowledge candidates | generalized lessons, reusable patterns, templates | **Promotion candidate** | **Retained in Aredir Labs** until promoted | Knowledge transfer must be governed and de-identified |

### Ownership model summary

| Classification | Meaning |
| --- | --- |
| **Aredir-authoritative** | Aredir controls the definition, versioning, and governance of the asset |
| **Client-authoritative** | The client is the authoritative owner of the artifact in the engagement record |
| **Engagement-scoped** | The artifact exists for the duration of the engagement and is not intended as a permanent Aredir asset |
| **Shared or derived** | The artifact is produced from shared inputs and may be shared, but is not a canonical source of authority |
| **Generated client deliverable** | The artifact is a deliverable that becomes part of the client’s permanent record |
| **Promotion candidate** | The artifact may qualify for later promotion to Aredir after validation and sanitization |

---

## 5. Ownership Classification by Layer

### Layer 1 — Aredir Methodology Authority

This layer is the source of truth for reusable assessment methodology.

Examples:

- standards
- audit instructions
- schemas
- reusable prompts
- tooling definitions
- promotion criteria

These remain **Aredir-authoritative** and may be distributed for execution, but they are not converted into client-owned assets merely because they are copied or installed.

### Layer 2 — Assessment Distribution Package

This layer is the packaging boundary used to bring methodology into a client engagement.

It may include:

- bootstrap-compatible assets
- installable scripts or templates
- engagement configuration
- versioned methodology references

Its role is distribution and execution, not ownership transfer.

### Layer 3 — Client Repository Execution

The client repository is the runtime location where assessment assets execute.

This layer may host:

- temporary working files
- generated findings
- provisional evidence
- local validation outputs

These artifacts are **engagement-scoped** or **generated client deliverables**, depending on whether they are intended to persist as part of the client record.

### Layer 4 — Client Evidence and Deliverables

This layer includes the client’s permanent record of assessment outcomes.

Examples:

- architecture reconstructions
- evidence registers
- findings
- recommendations
- remediation plans
- validation records
- closure reports

These are **client-authoritative** once accepted into the client’s permanent documentation set, unless they are later promoted under a governed process.

### Layer 5 — Aredir Knowledge Promotion

This layer captures reusable learning that is generalized and de-identified.

Examples:

- generalized methodology refinements
- reusable patterns
- promoted evidence templates
- known failure modes

These are **promotion candidates** and remain governed by Aredir’s promotion process rather than being automatically imported from client work.

---

## 6. Distribution Classification

| Artifact type | Distribution posture |
| --- | --- |
| Assessment standards | Retained in Aredir Labs; may be included in project bootstrap if broadly reusable |
| Audit instructions | Included in bootstrap if reusable across engagements |
| Evidence schemas | Included in bootstrap if broadly reusable |
| Finding schemas | Included in bootstrap if broadly reusable |
| Finding sets | Generated directly in the client repository |
| Assessment reports | Generated directly in the client repository |
| Recommendations | Generated directly in the client repository |
| Implementation work packages | Generated directly in the client repository |
| Validation records | Generated directly in the client repository |
| Prompts | Included in bootstrap if broadly reusable |
| Scripts and tooling | Included in bootstrap or installed temporarily for an engagement |
| Engagement metadata | Generated in the client repository and retained as client-scoped record |
| Promoted knowledge candidates | Retained only in Aredir Labs until promoted |

### Rule of thumb

- If an artifact is reusable methodology, it may belong in a bootstrap distribution package.
- If an artifact is engagement-specific evidence, it should be generated and retained in the client record.
- If an artifact is reusable learning derived from engagement work, it may become a promotion candidate after sanitization and validation.

---

## 7. Bootstrap Boundary

The bootstrap boundary should not assume that the entire assessment system is excluded from the standard template repository.

### What may belong in the standard template repository

The following may legitimately belong in the general bootstrap if they are broadly useful engineering evaluation capabilities:

- assessment standards
- audit instructions
- evidence schemas
- finding schemas
- reusable prompts
- reusable scripts and tooling
- standard review patterns

### What should not be assumed to belong in the bootstrap

The following should remain outside the general bootstrap unless validated as broadly reusable:

- client-specific engagement metadata
- client-specific findings and recommendations
- client-specific remediation plans
- client-specific implementation work packages
- engagement-specific evidence registers
- sensitive delivery artifacts tied to a named client instance

### Distinction to preserve

This package distinguishes between:

- universally useful engineering evaluation capability,
- Aredir professional-services methodology,
- client-specific engagement artifacts.

The first two may be distributed. The third should generally remain client-scoped.

---

## 8. Client-Instance Execution Model

Aredir-owned assessment assets may execute inside a client repository while preserving:

- **methodology ownership** — Aredir retains authority over the methodology and its versioned definitions
- **version authority** — the distribution package or bootstrap source remains the authoritative version source
- **provenance** — evidence should retain references to the originating assessment asset, version, and execution context
- **upgradeability** — client-local execution remains compatible with later Aredir methodology updates through versioned distribution
- **client confidentiality** — the client repository holds engagement-specific evidence and deliverables without implying ownership transfer
- **evidence traceability** — input assumptions, workflow steps, and generated evidence should remain traceable back to Aredir methodology and the client engagement context

### Operational rule

Execution in the client repository is an **operational use** of Aredir-owned assets. It is not an ownership transfer.

---

## 9. Deliverable Boundary

The following outputs should be evaluated for inclusion in the client’s permanent record:

- architecture reconstructions
- evidence registers
- findings
- recommendations
- remediation plans
- engineering work packages
- validation and closure reports

### Proposed rule

A deliverable becomes part of the client’s permanent record when it is:

1. created in the engagement context,
2. accepted as a client-facing outcome,
3. intended to remain after the engagement closes, and
4. not solely a temporary working artifact.

By contrast, transient runtime artifacts or scratch outputs should be archived or removed after closure unless they are needed for traceability or evidence continuity.

---

## 10. Lifecycle Model

```text
Prepare
→ Install or activate assessment capability
→ Evaluate
→ Generate evidence
→ Produce deliverables
→ Perform remediation
→ Validate
→ Close or remove runtime
→ Retain client record
→ Evaluate promotion candidates
```

### Lifecycle interpretation

- **Prepare**: establish the assessment runtime and scope.
- **Install or activate**: bring Aredir-owned methodology into the client environment for execution.
- **Evaluate**: run the assessment within the engagement context.
- **Generate evidence**: capture findings and supporting evidence.
- **Produce deliverables**: create client-facing outputs and records.
- **Perform remediation**: implement changes or follow-on actions in the client environment.
- **Validate**: verify closure or improvement progress.
- **Close or remove runtime**: remove or archive temporary execution assets if appropriate.
- **Retain client record**: preserve the client’s permanent evidence and deliverables.
- **Evaluate promotion candidates**: determine whether any generalized learning should return to Aredir.

---

## 11. Feedback and Promotion Boundary

Reusable learning may flow back to Aredir without transferring:

- client source code
- confidential evidence
- proprietary implementation details
- identifying client information

### Promotion rule

Promotion should occur only after the learning is:

1. generalized beyond the specific engagement,
2. de-identified or sanitized,
3. validated as reusable methodology or pattern,
4. accepted through the governed promotion process.

Generalized methodology may return to Aredir. Client-specific facts remain client-owned and should not be transferred into Aredir’s permanent knowledge base unless explicitly authorized and sanitized.

---

## 12. Architectural Decision

### Proposed conclusion

The assessment capability should be modeled as a **layered combination** of:

- **Aredir-owned methodology authority**,
- **a distributable assessment package or bootstrap-capable capability**, and
- **client-scoped execution and record layers**.

This is the most evidence-supported structure because it preserves:

- Aredir’s methodology ownership,
- client-specific evidence ownership,
- execution flexibility in client repositories,
- and a governed promotion path for reusable learning.

### Why not a single simple model?

A single binary model (entirely Aredir-owned or entirely client-owned) would conflate:

- methodology authority,
- execution runtime,
- engagement evidence,
- permanent client deliverables,
- and reusable promotion candidates.

The layered model is therefore the better fit for the evidence and constraints provided by this discovery package.

---

## 13. Constraints and Guardrails

This document does not authorize:

- implementation of a new framework,
- changes to the bootstrap repository,
- promotion of Phoenix assets,
- creation of a new AEF capability,
- licensing or legal terms,
- copying client evidence into Aredir Labs,
- assuming that temporary presence means client ownership,
- or assuming that Aredir ownership means an asset cannot execute in a client repository.

This package provides the separation requested: different ownership, execution, distribution, and retention rules apply to each layer without collapsing them into one another.
