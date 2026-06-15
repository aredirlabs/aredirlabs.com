# QA Engineering Framework

| Field | Value |
|-------|-------|
| **Name** | QA Engineering Framework |
| **Status** | Promoted Standard |
| **Category** | QA Standard |
| **Version** | 1.0 |
| **Owner** | Aredir Labs |
| **Origin Projects** | AlignFit, Aredir Labs |
| **Origin Artifacts** | `docs/qa/manual-qa-checklist.md`, `docs/qa/release-checklist.md`, `docs/qa/uat-checklist.md`, `docs/bugs/bug-triage-process.md`, `docs/bugs/bug-report-template.md`, `docs/engineering/deployment-workflow.md`, AREDIR-WORKSPACE-004 (project notes / UAT), AREDIR-WORKSPACE-005 (Vercel production deployment), AlignFit UAT testing cycle |
| **Linked Projects** | Aredir Labs, AlignFit |
| **Reusability** | High |
| **Last Reviewed** | 2026-06-12 |
| **Next Review Due** | 2026-09-12 |

## Purpose

Quality assurance at Aredir Labs is an **engineering discipline** embedded throughout delivery — not a final gate performed only before release.

Verification, investigation, and validation must produce **repeatable confidence** that software behaves correctly across environments, that fixes address root causes, and that production deployments are safe to sign off.

### Why QA is not a release-only activity

Defects and regressions are cheapest to fix when caught early. Treating QA as a post-implementation checkbox leads to:

| Failure mode | Impact |
|--------------|--------|
| **Insufficient verification** | Changes merge with lint/build green but broken user flows |
| **Hidden regressions** | Unrelated areas break because scope of testing was too narrow |
| **Incomplete fixes** | Symptoms patched; root cause remains and reappears |
| **Environment drift** | Preview passes but production fails due to config, data, or secrets mismatch |
| **Deployment assumptions** | Deploy succeeds in CI but application is unhealthy in production |
| **False completion claims** | Issues closed or releases marked ready without evidence |

This framework unifies practices from AlignFit UAT cycles, deployment verification, bug investigation, release validation, and regression review into a **reusable company standard**. Project-specific test cases remain in product repositories; this document defines **how** Aredir Labs verifies software.

### Applicability

Required reference for QA, release, and production validation across:

- **AlignFit**
- **ClassForge**
- **LeagueOS**
- **Aredir Labs** (aredirlabs.com and workspace)
- **Future Aredir Labs products**

Operational checklists live under `docs/qa/` and `docs/bugs/` in each repo. This document is the **canonical promoted standard** in the [Knowledge Base](../KNOWLEDGE_BASE_INDEX.md).

---

## QA Engineering Lifecycle

Standard lifecycle for quality work from discovery through production:

```
Discovery
    ↓
Reproduction
    ↓
Isolation
    ↓
Root Cause Analysis
    ↓
Implementation Verification
    ↓
Regression Review
    ↓
Release Validation
    ↓
Production Verification
```

### Discovery

| | |
|---|---|
| **Purpose** | Identify what needs verification — feature, defect, release, or environment change |
| **Expected outputs** | Clear scope (routes, flows, data boundaries); severity if defect-related; linked issue or work item |
| **Quality requirements** | Duplicate search performed; severity assigned for bugs; acceptance criteria documented before fix work begins |

### Reproduction

| | |
|---|---|
| **Purpose** | Prove the issue or change is observable under controlled conditions |
| **Expected outputs** | Documented steps, environment, build/commit, expected vs. actual behavior |
| **Quality requirements** | Reproduction on preview or named environment — not "works on my machine" without evidence; bug reports follow [bug report template](../../bugs/bug-report-template.md) |

### Isolation

| | |
|---|---|
| **Purpose** | Narrow the failure to a component, layer, or change set |
| **Expected outputs** | Scope statement: affected routes, users, data states, or integrations |
| **Quality requirements** | Unrelated areas explicitly excluded from initial investigation; no fix attempted before scope is understood |

### Root Cause Analysis

| | |
|---|---|
| **Purpose** | Identify why the failure occurred, not only where symptoms appear |
| **Expected outputs** | Root cause summary in issue or decision log; distinction between symptom and cause |
| **Quality requirements** | Cause documented before closure for Medium+ severity; hotfixes note interim vs. permanent fix |

### Implementation Verification

| | |
|---|---|
| **Purpose** | Confirm the fix or feature meets acceptance criteria |
| **Expected outputs** | Preview (or production for hotfix) validation; automated checks run; evidence attached |
| **Quality requirements** | Original reproduction steps pass; applicable lint/build/DB gates per [Coding Agent Operating Standard](../engineering-standards/CODING_AGENT_OPERATING_STANDARD.md) |

### Regression Review

| | |
|---|---|
| **Purpose** | Ensure the change did not break adjacent or critical paths |
| **Expected outputs** | Smoke paths checked; regression notes in PR or issue |
| **Quality requirements** | Scope-dependent regression per [manual QA checklist](../../qa/manual-qa-checklist.md); no new Blocker/High defects introduced |

### Release Validation

| | |
|---|---|
| **Purpose** | Confirm the release candidate is ready to merge and deploy |
| **Expected outputs** | Completed release and UAT checklists where applicable; open Blocker/High issues resolved or explicitly deferred |
| **Quality requirements** | [Release checklist](../../qa/release-checklist.md) for production-bound merges; [UAT checklist](../../qa/uat-checklist.md) for milestone releases |

### Production Verification

| | |
|---|---|
| **Purpose** | Confirm deployed production behaves correctly after release |
| **Expected outputs** | Post-deploy smoke and critical workflow validation; deploy version recorded |
| **Quality requirements** | See [Production Verification Framework](#production-verification-framework); rollback plan identified before deploy |

---

## Bug Investigation Framework

Reusable process for defect handling across products:

```
Issue Report
    ↓
Reproduce
    ↓
Determine Scope
    ↓
Identify Root Cause
    ↓
Implement Fix
    ↓
Verify Fix
    ↓
Regression Check
    ↓
Close
```

Aligns with [bug triage process](../../bugs/bug-triage-process.md).

### Issue Report

Collect structured evidence before triage:

| Evidence | Requirement |
|----------|-------------|
| **Summary** | One-line description of broken behavior |
| **Severity** | Blocker / High / Medium / Low per triage definitions |
| **Environment** | URL, browser, OS, Local / Preview / Production |
| **Steps to reproduce** | Numbered, minimal path to failure |
| **Expected vs. actual** | Explicit comparison |
| **Screenshots / recordings** | When visual or interaction bugs |
| **Console / network errors** | Redacted logs when applicable |
| **Regression flag** | Last known good version or date if applicable |

### Reproduce

- Triage owner confirms reproduction or documents why not reproducible
- Duplicate issues linked and closed
- Owner assigned with acceptance criteria for fix

### Determine Scope

- Identify affected users, routes, data states, and integrations
- Assess release impact (Blocker/High block release unless hotfix path defined)

### Identify Root Cause

- Document cause in issue comment or project notes — not only in PR description
- For Blocker/High: cause required before merge unless emergency hotfix with follow-up issue

### Implement Fix

- Fix on branch → PR → preview deployment
- Minimal change aligned with engineering standard; no unrelated refactors

### Verify Fix

- Fix deployed to preview (or production for hotfix)
- Original reproduction steps no longer fail
- QA verification checklist completed on issue

### Regression Check

- Related smoke paths per manual QA checklist
- Adjacent flows spot-checked for same defect class

### Close

- GitHub issue closed with link to fixing PR
- [known-issues.md](../../bugs/known-issues.md) updated if listed
- Production incidents: deploy version and date noted in issue comment

### Severity response targets

| Level | Definition | Response target |
|-------|------------|-----------------|
| **Blocker** | Production unusable, security issue, or data integrity risk | Immediate; hotfix or rollback |
| **High** | Core flow broken; affects many users | Same or next business day |
| **Medium** | Degraded experience; workaround available | Scheduled in sprint |
| **Low** | Cosmetic, rare edge case, nice-to-fix | Backlog |

---

## Testing Pyramid

Recommended testing layers. Balance **confidence** against **maintenance cost** — not every layer applies to every change.

```
                    ┌─────────────┐
                    │   Manual    │  ← human judgment, UX, UAT
                    │ Validation  │
                ┌───┴─────────────┴───┐
                │   End-to-End (E2E)  │  ← critical user journeys
            ┌───┴─────────────────────┴───┐
            │     Integration Tests       │  ← modules, APIs, DB
        ┌───┴─────────────────────────────┴───┐
        │           Unit Tests                │  ← logic, pure functions
        └─────────────────────────────────────┘
```

### Unit Tests

| | |
|---|---|
| **Purpose** | Verify isolated logic quickly and deterministically |
| **Scope** | Pure functions, validators, scoring rules, transformers, utilities |
| **Expected usage** | Application-layer facts, assessments, and recommendations (see AI Intelligence Architecture Pattern); business rules; data formatting |
| **Cost tradeoff** | Low run cost, high value for deterministic layers; avoid testing framework internals |

### Integration Tests

| | |
|---|---|
| **Purpose** | Verify components work together — API + database, auth + routes, service boundaries |
| **Scope** | API handlers, database queries, auth flows, middleware chains |
| **Expected usage** | After schema or API changes; before release when data boundaries shift |
| **Cost tradeoff** | Moderate setup (test DB, fixtures); prioritize high-risk integrations |

### End-to-End Tests

| | |
|---|---|
| **Purpose** | Validate critical user journeys through the full stack |
| **Scope** | Login, core dashboard flows, checkout-equivalent paths, primary CRUD journeys |
| **Expected usage** | Playwright or equivalent for stable, high-value paths; run in CI on PR or nightly — not for every cosmetic change |
| **Cost tradeoff** | Higher maintenance; keep suite small and focused on regressions that unit/integration tests miss |

### Manual Validation

| | |
|---|---|
| **Purpose** | Human judgment for UX, accessibility, content, visual design, and exploratory testing |
| **Scope** | Responsive layouts, keyboard navigation, stakeholder UAT, new UI patterns |
| **Expected usage** | Every user-facing PR via [manual QA checklist](../../qa/manual-qa-checklist.md); milestone releases via [UAT checklist](../../qa/uat-checklist.md) |
| **Cost tradeoff** | Essential; does not replace automation for repetitive regression — complements it |

### Balancing confidence and cost

| Change type | Minimum layers |
|-------------|----------------|
| Copy / docs only | Build + link check |
| UI component | Manual QA + lint/build |
| API / data | Integration + manual smoke |
| Auth / payments / core flow | E2E + manual + release checklist |
| AI decision layers | Unit tests on app layers + contract validation + manual narrative review |

Add automation where failures are expensive and paths are stable. Do not automate every edge case before manual exploration proves stability.

---

## Release Readiness Framework

Minimum expectations before production release. Scale rigor to release type (patch vs. milestone).

### Code Quality

| Gate | Expectation |
|------|-------------|
| **lint** | Passes on branch and CI |
| **typecheck** | Passes as part of build (or standalone if configured) |
| **build** | Production build succeeds |

### Database

| Gate | Expectation |
|------|-------------|
| **Migrations verified** | Schema changes applied in dev/preview; migration scripts reviewed |
| **Seed validation** | Seed runs successfully; idempotency verified when seed logic changed (`npm run db:seed` twice) |

### UI

| Gate | Expectation |
|------|-------------|
| **Critical workflows verified** | Changed and adjacent routes tested on preview per manual QA |
| **Responsive / a11y smoke** | Key viewports and keyboard focus checked for UI changes |
| **Regression** | Unaffected pages and CTAs still functional |

### Authentication

| Gate | Expectation |
|------|-------------|
| **Login** | Sign-in succeeds with valid credentials |
| **Logout** | Session cleared; protected routes redirect appropriately |
| **Access control** | Unauthorized users cannot reach protected resources |

### Production

| Gate | Expectation |
|------|-------------|
| **Deployment validation** | Vercel (or host) deploy succeeds; commit SHA recorded |
| **Environment verification** | Production env vars and secrets match [environment strategy](../../engineering/environment-strategy.md) |
| **Open defects** | No open Blocker/High for release scope |
| **UAT sign-off** | Stakeholder approval for milestone releases |

### Pre-merge checklist reference

Use [release checklist](../../qa/release-checklist.md) as the operational artifact. Pipeline:

```
Local → Feature Branch → PR → Preview → Manual QA → Merge → Production → Post-deploy validation
```

---

## Production Verification Framework

Post-deployment validation ensures deploy success means **application health**, not only a green build.

```
Deploy
    ↓
Smoke Test
    ↓
Critical Workflow Validation
    ↓
Monitoring Review
    ↓
Sign-Off
```

### Deploy

| | |
|---|---|
| **Purpose** | Confirm deployment completed and version is traceable |
| **Expected outputs** | Production URL loads; deployment ID and commit SHA recorded |
| **Quality requirements** | Merge triggered intended environment; no wrong-branch deploy |

### Smoke Test

| | |
|---|---|
| **Purpose** | Fast signal that core surfaces are alive |
| **Expected outputs** | Home (or app entry) returns 200; no immediate 500 on changed routes |
| **Quality requirements** | SSL/domain correct; favicon and title reasonable; spot-check runtime logs for new errors |

### Critical Workflow Validation

| | |
|---|---|
| **Purpose** | Verify production behavior for release-scoped journeys |
| **Expected outputs** | Changed routes and primary user paths exercised on production |
| **Quality requirements** | Auth flows if auth changed; metadata/OG on key pages if SEO/marketing changed |

### Monitoring Review

| | |
|---|---|
| **Purpose** | Detect errors not visible in manual smoke |
| **Expected outputs** | Analytics/monitoring receiving events (if configured); log spot-check clean |
| **Quality requirements** | Known issues list updated; team notified of release |

### Sign-Off

| | |
|---|---|
| **Purpose** | Explicit ownership that production is healthy |
| **Expected outputs** | Release recorded; rollback owner identified |
| **Quality requirements** | [Release checklist](../../qa/release-checklist.md) post-deploy section complete |

### Rollback awareness

Before every production deploy:

- Note **previous production deployment ID** in Vercel (or host equivalent)
- Identify **rollback owner** if critical issue ships
- **Blocker on production:** consider instant rollback; file Blocker issue; document incident

See [deployment workflow](../../engineering/deployment-workflow.md).

### Environment checks

| Check | Why |
|-------|-----|
| Production env vars | Prevents preview-only config shipping to prod |
| Database connection target | Prevents cross-environment data writes |
| Feature flags / toggles | Prevents half-enabled features in prod |
| Third-party keys | Prevents auth/payment failures post-deploy |

---

## Common QA Failure Modes

Anti-patterns reviewers and QA owners should reject without documented exception.

| Failure mode | Description |
|--------------|-------------|
| **Testing only the happy path** | Success case verified; error, empty, and edge states ignored |
| **Verifying implementation instead of outcomes** | "Code looks correct" without reproduction or user-visible validation |
| **Assuming deployment success** | Green deploy treated as healthy production without smoke tests |
| **Incomplete root-cause analysis** | Symptom patched; underlying cause undocumented and likely to recur |
| **Insufficient regression review** | Fix verified in isolation; adjacent flows break in production |
| **Relying solely on automation** | E2E green but UX, content, or accessibility failures missed |
| **Closing issues without evidence** | Issue closed with no preview verification or linked PR |
| **Environment mismatch** | Validated local-only when bug is preview/production specific |
| **Severity inflation/deflation** | Blockers under-prioritized or Low issues blocking release unnecessarily |
| **Skipping UAT for milestone releases** | Stakeholder-facing releases ship without business journey validation |

---

## Relationship to Other Standards

### Coding Agent Operating Standard

The [Coding Agent Operating Standard](../engineering-standards/CODING_AGENT_OPERATING_STANDARD.md) defines **how implementation work is done and reported**. This QA framework defines **how that work is verified**.

| Engineering standard | QA framework |
|---------------------|--------------|
| Verification required before completion | Lifecycle stages and release gates |
| Manual QA for UI changes | Manual validation and UAT checklists |
| DB migration/seed gates | Release readiness — database section |
| Transparent completion reports | Evidence-based issue closure |
| Production rollback awareness | Production verification framework |

Agents and engineers must satisfy **both** standards: correct implementation **and** demonstrated verification.

### AI Intelligence Architecture Pattern

The [AI Intelligence Architecture Pattern](../architecture-patterns/AI_INTELLIGENCE_ARCHITECTURE_PATTERN.md) separates application-owned decision layers from LLM-owned narrative. QA validates each layer differently:

| Layer | QA approach |
|-------|-------------|
| Facts, assessments, insights, recommendations | Unit and integration tests; deterministic assertions |
| Response contract | Schema/contract validation; forbidden invention checks |
| Narrative layer | Manual review for tone and clarity; automated checks that output honors contract |

AI features require **testing the decision path without the model** plus **validation that narrative reflects structured inputs** — not only prompt spot-checks.

---

## Operational References

Project repos implement this framework through:

| Artifact | Path |
|----------|------|
| Manual QA checklist | `docs/qa/manual-qa-checklist.md` |
| Release checklist | `docs/qa/release-checklist.md` |
| UAT checklist | `docs/qa/uat-checklist.md` |
| Bug triage process | `docs/bugs/bug-triage-process.md` |
| Bug report template | `docs/bugs/bug-report-template.md` |
| Deployment workflow | `docs/engineering/deployment-workflow.md` |
| Environment strategy | `docs/engineering/environment-strategy.md` |

---

## Future QA Asset Candidates

Likely future promotions — **not created in this work item**:

| Candidate | Notes |
|-----------|-------|
| **Playwright Validation Standard** | E2E conventions, CI integration, suite scope rules |
| [Root Cause Analysis Framework](./ROOT_CAUSE_ANALYSIS_FRAMEWORK.md) | Promoted — deep investigation beyond bug triage summary |
| **Release Readiness Standard** | Standalone gate doc if release checklist splits from framework |
| **Bug Investigation Framework** | Expanded standalone if investigation process grows |
| **Production Verification Playbook** | Incident-oriented post-deploy runbook for on-call use |

**Recommended next work item:** AREDIR-WORKSPACE-008 — **Knowledge Asset Registry** (Governance Registry scope; per [Knowledge Asset Registry Roadmap](../KNOWLEDGE_ASSET_REGISTRY_ROADMAP.md)).

---

## Related

- [Knowledge Base Index](../KNOWLEDGE_BASE_INDEX.md)
- [Promotion Process](../PROMOTION_PROCESS.md)
- [Coding Agent Operating Standard](../engineering-standards/CODING_AGENT_OPERATING_STANDARD.md)
- [AI Intelligence Architecture Pattern](../architecture-patterns/AI_INTELLIGENCE_ARCHITECTURE_PATTERN.md)
- [Context Builder Pattern](../ai-patterns/CONTEXT_BUILDER_PATTERN.md)
- [Response Contract Pattern](../ai-patterns/RESPONSE_CONTRACT_PATTERN.md)
- [Documentation Maintenance Standard](../documentation-standards/DOCUMENTATION_MAINTENANCE_STANDARD.md)
- [Root Cause Analysis Framework](./ROOT_CAUSE_ANALYSIS_FRAMEWORK.md)
- [Feature Delivery Standard](../playbooks/FEATURE_DELIVERY_STANDARD.md)
- [Architecture Audit Standard](../documentation-standards/ARCHITECTURE_AUDIT_STANDARD.md)
