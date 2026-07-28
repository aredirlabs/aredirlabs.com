# Engineering Findings Lifecycle

## Status

Draft engineering methodology note

## Purpose

This document distinguishes between two different outcomes of engineering verification:

- software defects, or bugs
- engineering findings, which improve quality without correcting broken functionality

The intent is to ensure that engineering review and verification capture quality improvements, architectural refinements, and experience enhancements as first-class outcomes rather than treating them as defects.

---

## Core Distinction

### Bug

A bug is a defect in software behavior.

It represents broken, incorrect, inconsistent, or unavailable functionality relative to expected behavior.

Typical characteristics include:

- broken behavior
- incorrect output or interaction
- unexpected failure
- regression from a prior expected state

### Engineering Finding

An engineering finding is an issue identified during engineering review that improves quality without correcting broken functionality.

Examples include:

- UI hierarchy improvements
- responsive refinement
- architecture alignment
- documentation consistency
- accessibility improvements
- experience refinement
- performance perception
- engineering workflow improvements

Engineering findings are not software defects.

---

## Lifecycle Comparison

### Bug Lifecycle

```text
Bug
    ↓
Broken behavior
    ↓
Root Cause
    ↓
Fix
    ↓
Regression
    ↓
Close
```

### Engineering Findings Lifecycle

```text
Engineering Standard
    ↓
Engineering Audit
    ↓
Engineering Finding
    ↓
Remediation Planning
    ↓
Engineering Work Package
    ↓
Implementation
    ↓
Verification
    ↓
Re-Audit
    ↓
Resolved
```

---

## Lifecycle Intent

### Bug lifecycle

The bug lifecycle is appropriate when the issue is a defect in system behavior. The focus is on identifying the root cause, correcting the defect, and preventing regression.

### Engineering Findings lifecycle

The engineering findings lifecycle is appropriate when the issue improves engineering quality, product experience, or standards alignment. The focus is on planning and implementing a quality improvement, then verifying that the improvement is realized through re-audit or review.

---

## Engineering Finding Categories

Engineering findings should be categorized so that review output can be organized, prioritized, and tracked consistently.

Proposed categories include:

- UI
- Architecture
- Documentation
- Accessibility
- Performance
- Governance
- Workflow
- Security
- Consistency

Future categories should remain extensible as the engineering review model matures.

---

## Relationship to Existing Standards

Engineering findings originate from engineering standards through engineering audits.

```text
Engineering Standards
    ↓
Engineering Audits
    ↓
Engineering Findings
```

This means that engineering findings are not derived from user bug reports alone. They arise from the application of standards during reviews, audits, and verification activities.

They are a distinct category of review output that complements, but does not replace, defect handling.

---

## Review Engine Relationship

The Engineering Review Engine should primarily generate engineering findings rather than bugs.

This does not mean the engine cannot surface defects. It means that its primary architectural purpose is to evaluate work against adopted engineering standards and identify quality improvements, governance gaps, experience refinements, and standards-alignment opportunities.

In this model, the Review Engine functions as an engineering review system that produces structured findings, while bug triage remains a separate defect-management pathway when broken behavior is confirmed.

---

## AQSF Considerations

Engineering findings represent a verification category that AQSF should eventually support independently of software defects.

This is important because engineering quality is not limited to correctness alone. It also includes:

- alignment with standards
- maintainability
- clarity
- experience quality
- governance maturity
- architectural coherence

Future AQSF support should therefore distinguish between:

- defect-oriented verification
- standards-oriented verification
- quality-improvement findings

---

## Summary

Engineering findings provide a formal way to record and manage engineering quality improvements discovered during review.

They should be treated as a distinct lifecycle from bugs, with their own categories, review path, and resolution model.

This allows Aredir Labs to recognize that not every engineering issue is a defect and that standards-based review can produce meaningful improvement work even when no broken functionality exists.
