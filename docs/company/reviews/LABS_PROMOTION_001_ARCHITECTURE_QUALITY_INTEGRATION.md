# LABS-PROMOTION-001 — Architecture Audit and Quality Systems Integration

| Field | Value |
|-------|-------|
| **Work package** | LABS-PROMOTION-001 |
| **Date** | 2026-07-20 |
| **Writable repository** | `aredirlabs-com` |
| **Status** | Complete (documentation integration; uncommitted) |
| **Primary evidence** | CLASSFORGE-ASSESSMENT-001; QUALITY-PROMOTION-001; Architecture Audit Standard; AQSF/AVF |

## Objective

Document the canonical relationship between Architecture Audit (Labs), AQSF/AVF (Quality Systems), and the Engineering Promotion Process without duplicating Quality Systems standards.

## Canonical flow established

```
Engineering Question
      ↓
Architecture Audit
      ↓
AQSF
      ↓
AVF
      ↓
Assessment Findings
      ↓
Promotion Candidates
      ↓
Engineering Promotion Process
      ↓
Owning Repository
```

## Documents updated

| Document | Change |
|----------|--------|
| Architecture Audit Standard | Purpose clarification; **Relationship to Quality Systems** section; flow update |
| Engineering Capability Model | External Quality Systems capability; assessment interaction diagram |
| Engineering Operating System | Lifecycle stage + assessment flow (minimal) |
| Promotion Process | Assessment outputs → candidates → promotion |
| Evidence Lifecycle Pattern | Assessment artifact recognition |
| Architecture Governance | Pointer to Quality Systems split |
| Governance Index | Assessment operating-model path |
| Knowledge Base Index | Architecture Audit blurb |
| AEF-000 / AEF-001 | Stale “AQSF not established / absorb into AEF” corrected |

## Repository ownership (non-overlapping)

| Repository | Owns |
|------------|------|
| `aredirlabs-com` | Engineering methodology, governance, Architecture Audit, promotion acceptance |
| `aredir-quality-systems` | Quality evaluation, verification, evidence, findings |
| `aredir-project-bootstrap` | Distribution / adoption packaging |
| Product repos | Implementation |

## Follow-up candidates

| ID | Target | Note |
|----|--------|------|
| LP1-BOOT-001 | Bootstrap | Optionally link Architecture Audit ↔ QS flow in adoption guidance after Labs sync |
| LP1-QS-001 | Quality Systems | Optional reverse link from AQSF README to Architecture Audit Standard (Labs path) — not done here |
| LP1-LABS-002 | Labs | Decision Record Standard (still open from CF-ASSESS-PC-005) |

## Explicit non-actions

- Did not modify Quality Systems, Bootstrap, or ClassForge
- Did not duplicate AQSF/AVF procedure bodies
- Did not add AQSF as an AEF or EOS-002 active capability
