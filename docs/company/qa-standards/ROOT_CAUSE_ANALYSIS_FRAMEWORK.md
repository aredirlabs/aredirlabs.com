# Root Cause Analysis Framework

| Field | Value |
|-------|-------|
| **Name** | Root Cause Analysis Framework |
| **Status** | Promoted Standard |
| **Category** | QA Standard |
| **Version** | 1.0 |
| **Owner** | Aredir Labs |
| **Origin Projects** | AlignFit, Aredir Labs |
| **Origin Artifacts** | `docs/bugs/bug-triage-process.md`, `docs/bugs/bug-report-template.md`, [QA Engineering Framework](./QA_ENGINEERING_FRAMEWORK.md) bug investigation section, AlignFit UAT regression investigations, AREDIR-WORKSPACE-005 (Vercel production deployment troubleshooting), [Architecture Audit Standard](../documentation-standards/ARCHITECTURE_AUDIT_STANDARD.md) risk and drift assessment, AREDIR-KB-008 review findings |
| **Linked Projects** | Aredir Labs, AlignFit |
| **Reusability** | High |
| **Last Reviewed** | 2026-06-12 |
| **Next Review Due** | 2026-09-12 |

## Purpose

Root cause analysis (RCA) ensures issues are resolved at their **true source** — not by treating symptoms, closing tickets early, or applying fixes that fail under the same conditions.

The [QA Engineering Framework](./QA_ENGINEERING_FRAMEWORK.md) defines bug investigation and verification at a high level. This framework **deepens investigation methodology** for defects, regressions, incidents, deployment failures, performance problems, integration failures, and architectural issues surfaced during audits.

**Goal:** Repeatable understanding and permanent resolution with evidence-based conclusions and captured lessons.

### Common failure modes without RCA discipline

| Failure mode | Impact |
|--------------|--------|
| **Fixing symptoms** | Same class of failure returns under different surface symptoms |
| **Incomplete remediation** | Partial fix leaves edge cases or related paths broken |
| **Recurring incidents** | Production or UAT sees repeat Blocker/High issues |
| **Incorrect assumptions** | Fix based on guesswork; wastes cycles and erodes trust |
| **Premature closure** | Issue closed before reproduction or verification |
| **Shallow investigation** | “Fixed in PR” with no documented cause |
| **Blame-focused analysis** | Process and system gaps ignored; lessons not reusable |

### When to apply full RCA

| Trigger | Minimum depth |
|---------|----------------|
| **Blocker / High** defect or incident | Full lifecycle |
| **Production incident** | Full lifecycle + production verification |
| **Regression after release** | Full lifecycle + deployment context |
| **Repeated Medium** issues (same area) | Full RCA; consider architecture audit |
| **Low / one-off** | Lightweight path per QA Framework bug investigation |

---

## Root Cause Analysis Lifecycle

```
Issue Report
    ↓
Evidence Collection
    ↓
Reproduction
    ↓
Scope Assessment
    ↓
Root Cause Identification
    ↓
Remediation Planning
    ↓
Verification
    ↓
Regression Review
    ↓
Knowledge Capture
    ↓
Closure
```

### Issue Report

| | |
|---|---|
| **Purpose** | Capture the problem with enough structure to begin investigation |
| **Outputs** | GitHub issue or incident record per [bug report template](../../bugs/bug-report-template.md); severity assigned |
| **Quality requirements** | Summary, environment, steps, expected vs actual; duplicates searched |

### Evidence Collection

| | |
|---|---|
| **Purpose** | Gather facts before interpreting |
| **Outputs** | Evidence bundle (see [Evidence Collection Framework](#evidence-collection-framework)) |
| **Quality requirements** | No root-cause hypothesis treated as fact until evidence supports it |

### Reproduction

| | |
|---|---|
| **Purpose** | Prove the issue is observable under defined conditions |
| **Outputs** | Confirmed reproduction steps or documented non-reproducibility with rationale |
| **Quality requirements** | [Reproduction standards](#reproduction-standards) met before cause identification |

### Scope Assessment

| | |
|---|---|
| **Purpose** | Bound blast radius and prioritize response |
| **Outputs** | Scope statement and impact assessment |
| **Quality requirements** | Users, systems, workflows, severity, frequency, and business impact documented |

### Root Cause Identification

| | |
|---|---|
| **Purpose** | Find the underlying failure — not the visible symptom |
| **Outputs** | Root cause statement with causal chain; linked evidence |
| **Quality requirements** | Cause documented in issue/notes; Blocker/High require cause before merge (except documented hotfix + follow-up) |

### Remediation Planning

| | |
|---|---|
| **Purpose** | Plan corrective and preventive actions |
| **Outputs** | Remediation plan by category (see [Remediation Planning](#remediation-planning)) |
| **Quality requirements** | Corrective action defined; preventive/monitoring considered for Blocker/High |

### Verification

| | |
|---|---|
| **Purpose** | Confirm fix resolves original failure |
| **Outputs** | Preview or production validation; original steps pass |
| **Quality requirements** | Per [QA Engineering Framework](./QA_ENGINEERING_FRAMEWORK.md) verification gates |

### Regression Review

| | |
|---|---|
| **Purpose** | Ensure fix did not break adjacent behavior |
| **Outputs** | Regression notes; smoke paths checked |
| **Quality requirements** | No new Blocker/High; deployment verified if release-bound |

### Knowledge Capture

| | |
|---|---|
| **Purpose** | Convert investigation into durable company learning |
| **Outputs** | Knowledge capture decision (see [Knowledge Capture](#knowledge-capture)) |
| **Quality requirements** | Explicit outcome — not assumed “nothing to capture” |

### Closure

| | |
|---|---|
| **Purpose** | Close with audit trail |
| **Outputs** | Issue closed with PR link; cause summary; deploy version if production |
| **Quality requirements** | [known-issues.md](../../bugs/known-issues.md) updated; RCA summary in issue comment |

Aligns with [bug triage process](../../bugs/bug-triage-process.md) and extends the QA Framework bug investigation path.

---

## Evidence Collection Framework

Conclusions must be **evidence-based**.

| Evidence type | When to collect | Notes |
|---------------|-----------------|-------|
| **Logs** | Errors, 500s, auth failures, background jobs | Redact secrets; note timestamp and environment |
| **Screenshots / recordings** | UI, layout, interaction bugs | Attach to issue |
| **Reproduction steps** | All defects | Minimal numbered path |
| **Environment details** | Local / Preview / Production | URL, build/commit SHA, browser, OS |
| **Metrics** | Performance, latency, error rates | Before/after when available |
| **Error messages** | Client and server | Stack traces, API response bodies (sanitized) |
| **Configuration** | Deployment, env drift | Env vars names (not values), feature flags |
| **Data state** | Data-dependent bugs | Anonymized samples; source-of-truth pointer |
| **Timeline** | Incidents, regressions | First seen, last known good, deploy correlation |

**Rule:** If it is not in the evidence bundle, it cannot be asserted as fact in the root cause statement.

---

## Reproduction Standards

Prevent investigation based on assumptions.

| Expectation | Requirement |
|-------------|-------------|
| **Reproducibility** | Triage owner confirms repro or documents intermittent behavior with frequency |
| **Environment validation** | Same environment class as report (don’t close Preview-only bugs without Preview repro) |
| **Input conditions** | User role, data state, feature flags, and inputs explicit |
| **Timing conditions** | Race conditions, cron, session expiry — note time-dependent steps |
| **Dependency conditions** | External APIs, DB state, third-party services identified |

Non-reproducible issues: document attempts, environments tried, and decision to defer, monitor, or close with monitoring added.

---

## Scope Assessment

Determine who and what is affected before fixing.

| Dimension | Questions |
|-----------|-------------|
| **Affected users** | All users, subset, single tenant, internal only? |
| **Affected systems** | App, database, auth, integration, CDN, LLM provider? |
| **Affected workflows** | Onboarding, core loop, admin, release pipeline? |
| **Severity** | Blocker / High / Medium / Low per triage definitions |
| **Frequency** | Always, intermittent, single occurrence? |
| **Business impact** | Revenue, UAT blocker, data integrity, reputation? |

### Expected outputs

**Scope statement** — one paragraph: what fails, for whom, under what conditions.

**Impact assessment** — severity, release impact, escalation need (rollback, hotfix, scheduled fix).

---

## Root Cause Identification

**Symptoms are not root causes.**

| Symptom (not root cause) | Example root cause |
|--------------------------|-------------------|
| “Page shows 500” | Unhandled null in API handler when optional field absent |
| “Coach recommendation wrong” | Assessment rule inverted in application layer |
| “Deploy failed” | Migration not idempotent on prod seed state |
| “Slow dashboard” | N+1 query after schema change |
| “Intermittent auth logout” | Session cookie domain mismatch on preview URL |

### Techniques

| Technique | Application |
|-----------|-------------|
| **Causal chains** | Ask “why” repeatedly until process or code failure is reachable and fixable |
| **Ownership analysis** | Which layer owns the failure — app, DB, model, integration? (see [Architecture Audit Standard](../documentation-standards/ARCHITECTURE_AUDIT_STANDARD.md)) |
| **Source-of-truth analysis** | Did wrong data enter from duplicate store, stale cache, or model invention? |
| **Dependency tracing** | Follow request path through services, APIs, and env config |
| **Change correlation** | Map to deploy, migration, prompt, or config change timeline |
| **Drift comparison** | Implementation vs intended architecture or promoted standard |

### Root cause statement format

```
Root cause: [one sentence]
Contributing factors: [optional list]
Evidence: [links to logs, PR, commits, issue comments]
Symptom (for record): [what user saw]
```

---

## Remediation Planning

Plan beyond the immediate patch.

### Corrective

Fix the current issue — minimal change per [Coding Agent Operating Standard](../engineering-standards/CODING_AGENT_OPERATING_STANDARD.md).

| Output | Content |
|--------|---------|
| Fix approach | What changes, where, acceptance criteria |
| PR / deploy plan | Branch, preview validation, hotfix path if Blocker |

### Preventive

Reduce recurrence risk.

| Examples | |
|----------|---|
| Unit/integration test for defect class | |
| Guard or validation at system boundary | |
| Architecture or pattern alignment | |
| Remove duplicate source of truth | |

### Monitoring

Improve visibility for recurrence or related failures.

| Examples | |
|----------|---|
| Log line or metric for failure mode | |
| Alert on error rate threshold | |
| known-issues entry until verified in prod | |

### Documentation

Improve understanding for future investigators.

| Examples | |
|----------|---|
| Update architecture or runbook | |
| Decision log for non-obvious fix | |
| Cross-link to KB asset if pattern reused |

### Expected outputs

**Remediation plan** — short table: Corrective (required), Preventive, Monitoring, Documentation (as applicable).

---

## Verification and Regression Review

Reference [QA Engineering Framework](./QA_ENGINEERING_FRAMEWORK.md) for full gates.

| Phase | Expectation |
|-------|-------------|
| **Fix validation** | Original reproduction steps pass on preview (or prod for hotfix) |
| **Regression assessment** | Adjacent smoke paths; same defect class in related modules |
| **Deployment verification** | Migration/seed checks if DB touched; release checklist if production-bound |
| **Production confirmation** | Post-deploy smoke for production incidents; deploy SHA recorded |

Do not close Blocker/High until verification evidence is attached to the issue.

---

## Knowledge Capture

Investigations feed the [Knowledge Base](../KNOWLEDGE_BASE_INDEX.md) and [Documentation Maintenance Standard](../documentation-standards/DOCUMENTATION_MAINTENANCE_STANDARD.md).

| Outcome | When | Action |
|---------|------|--------|
| **No KB impact** | One-off fix; no reusable pattern | Record in issue; optional note in project docs |
| **Existing asset update** | Clarifies QA, architecture, or doc standard | PR updates canonical or operational doc |
| **Candidate asset** | Repeatable pattern not yet generalized | Draft in project or `docs/company/`; promotion when ready |
| **New promoted asset** | Proven reusable IP | [Promotion Process](../PROMOTION_PROCESS.md) |

RCA on architectural or AI-boundary failures may trigger [Architecture Audit Standard](../documentation-standards/ARCHITECTURE_AUDIT_STANDARD.md) follow-up or AI pattern review.

AlignFit UAT regressions and deployment troubleshooting on aredirlabs.com exemplify investigations that produced reusable KB assets (AI patterns, QA framework, audit standard).

---

## Common RCA Failure Modes

Anti-patterns to reject in review.

| Failure mode | Description |
|--------------|-------------|
| **Assuming first explanation is correct** | Fix without validating causal chain |
| **Closing without reproduction** | “Cannot reproduce” without documented attempts |
| **Fixing symptoms only** | UI workaround without underlying data/logic fix |
| **Blaming individuals** | RCA targets process, systems, and gaps — not people |
| **Ignoring environment differences** | Local fix without Preview/Production validation |
| **Skipping regression review** | Fix verified in isolation only |
| **Conclusions without evidence** | Root cause stated with no logs, repro, or code pointer |
| **Premature hotfix without follow-up** | Blocker patched without documented permanent fix issue |
| **No knowledge capture** | Repeat failures because lessons stay in chat |

---

## Relationship to Existing Assets

### Where RCA fits in the operating model

```
Issue / Incident
    ↓
Root Cause Analysis Framework (this standard)
    ↓
Remediation → Verification (QA Engineering Framework)
    ↓
Knowledge Capture (Documentation Maintenance + Promotion)
    ↓
Feature Delivery / Architecture Audit (when systemic)
```

| Asset | Relationship |
|-------|--------------|
| [QA Engineering Framework](./QA_ENGINEERING_FRAMEWORK.md) | Defines verification, release, production gates; bug investigation summary — RCA deepens investigation |
| [Architecture Audit Standard](../documentation-standards/ARCHITECTURE_AUDIT_STANDARD.md) | Systemic or repeat failures may require audit; RCA uses ownership and source-of-truth techniques |
| [Coding Agent Operating Standard](../engineering-standards/CODING_AGENT_OPERATING_STANDARD.md) | Corrective fixes follow minimal diff and honest verification reporting |
| [Documentation Maintenance Standard](../documentation-standards/DOCUMENTATION_MAINTENANCE_STANDARD.md) | RCA documentation updates and drift remediation |
| [Feature Delivery Standard](../playbooks/FEATURE_DELIVERY_STANDARD.md) | Defects discovered during delivery use RCA; knowledge capture stage aligns |

Together, **QA Engineering Framework** and **Root Cause Analysis Framework** define how quality is validated, how failures are investigated, and how lessons are captured across Aredir Labs products.

---

## Future QA Candidates

Likely future promotions — **not created in this work item**:

| Candidate | Notes |
|-----------|-------|
| **AI Evaluation Framework** | Regression and quality measurement for AI features |
| **Playwright Validation Standard** | E2E conventions and CI integration |
| **Release Readiness Standard** | Standalone release gate doc |
| **Production Verification Playbook** | On-call oriented post-deploy runbook |

**Recommended next work item:** AREDIR-WORKSPACE-008 — **Knowledge Asset Registry** (Governance Registry scope; per [Knowledge Asset Registry Roadmap](../KNOWLEDGE_ASSET_REGISTRY_ROADMAP.md)).

---

## Related

- [Knowledge Base Index](../KNOWLEDGE_BASE_INDEX.md)
- [Promotion Process](../PROMOTION_PROCESS.md)
- [QA Engineering Framework](./QA_ENGINEERING_FRAMEWORK.md)
- [Bug triage process](../../bugs/bug-triage-process.md)
- [Architecture Audit Standard](../documentation-standards/ARCHITECTURE_AUDIT_STANDARD.md)
- [Documentation Maintenance Standard](../documentation-standards/DOCUMENTATION_MAINTENANCE_STANDARD.md)
- [Feature Delivery Standard](../playbooks/FEATURE_DELIVERY_STANDARD.md)
