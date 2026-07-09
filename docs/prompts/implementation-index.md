# Implementation Index

Ordered prompts for building aredirlabs.com.

| ID | Prompt | Status | Depends on |
|----|--------|--------|------------|
| 001A | [Foundation, standards & workflow](./prompt-001A-foundation.md) | Complete | — |
| 001B | [Branding, site shell & company website](./prompt-001B-branding-site.md) | Complete | 001A |
| 001C | [Techno-mythic design system & desktop-first site](./prompt-001C-design-system-uplift.md) | Complete | 001B |
| 001D+ | _(future prompts)_ | Planned | 001C |

## Site (public)

| ID | Work item | Status | Deliverables |
|----|-----------|--------|--------------|
| SITE-ENGINEERING-001 | Public engineering experience redesign | Complete | [`/engineering`](../../src/app/(public)/engineering/page.tsx), [Public engineering experience](../architecture/public-engineering-experience.md), [Information architecture](../product/information-architecture.md), `public/images/engineering-ship.png` |
| SITE-ENGINEERING-002 | Hero artwork environmental integration | Complete | [`engineering-hero-ship.tsx`](../../src/components/engineering/engineering-hero-ship.tsx), [`engineering-hero-backdrop.tsx`](../../src/components/engineering/engineering-hero-backdrop.tsx) |
| SITE-ENGINEERING-003 | Protect engineering methodology routes | Complete | Redirect `/engineering-operating-system` and `/docs/company/*` → `/engineering`; public-safe CTAs/cards; [Public engineering experience](../architecture/public-engineering-experience.md) |

## Knowledge Base (company)

| ID | Work item | Status | Deliverables |
|----|-----------|--------|--------------|
| AREDIR-KB-001 | Knowledge Base foundation and first architecture asset | Complete | [Knowledge Base Index](../company/KNOWLEDGE_BASE_INDEX.md), [Promotion Process](../company/PROMOTION_PROCESS.md), [AI Intelligence Architecture Pattern](../company/architecture-patterns/AI_INTELLIGENCE_ARCHITECTURE_PATTERN.md) |
| AREDIR-KB-002 | Promote Coding Agent Operating Standard | Complete | [Coding Agent Operating Standard](../company/engineering-standards/CODING_AGENT_OPERATING_STANDARD.md), [Knowledge Base Index](../company/KNOWLEDGE_BASE_INDEX.md) (Engineering Standards) |
| AREDIR-KB-003 | Promote QA Engineering Framework | Complete | [QA Engineering Framework](../company/qa-standards/QA_ENGINEERING_FRAMEWORK.md), [Knowledge Base Index](../company/KNOWLEDGE_BASE_INDEX.md) (QA Standards), [Promotion Process](../company/PROMOTION_PROCESS.md) (asset status states) |
| AREDIR-KB-004 | Promote Context Builder Pattern | Complete | [Context Builder Pattern](../company/ai-patterns/CONTEXT_BUILDER_PATTERN.md), [Knowledge Base Index](../company/KNOWLEDGE_BASE_INDEX.md) (AI Patterns) |
| AREDIR-KB-005 | Promote Response Contract Pattern | Complete | [Response Contract Pattern](../company/ai-patterns/RESPONSE_CONTRACT_PATTERN.md), [Knowledge Base Index](../company/KNOWLEDGE_BASE_INDEX.md) (AI Patterns) |
| AREDIR-KB-003A | Knowledge governance update | Complete | [Promotion Process](../company/PROMOTION_PROCESS.md) (Knowledge Asset Governance), [Knowledge Base Index](../company/KNOWLEDGE_BASE_INDEX.md) (Governance), promoted asset metadata normalization |
| AREDIR-KB-006 | Promote Architecture Audit Standard | Complete | [Architecture Audit Standard](../company/documentation-standards/ARCHITECTURE_AUDIT_STANDARD.md), [Knowledge Base Index](../company/KNOWLEDGE_BASE_INDEX.md) (Documentation Standards) |
| AREDIR-KB-007 | Promote Feature Delivery Standard | Complete | [Feature Delivery Standard](../company/playbooks/FEATURE_DELIVERY_STANDARD.md), [Knowledge Base Index](../company/KNOWLEDGE_BASE_INDEX.md) (Playbooks) |
| AREDIR-KB-008 | Knowledge Base review and adoption audit | Complete | [KB Review 2026 Q2](../company/reviews/KB_REVIEW_2026_Q2.md), [Knowledge Base Roadmap](../company/KNOWLEDGE_BASE_ROADMAP.md), registry readiness assessment |
| AREDIR-KB-008A | Knowledge Base hygiene cleanup | Complete | README and `future-product-standards.md` KB links, stale recommendation cleanup, cross-link pass |
| AREDIR-KB-009 | Promote Documentation Maintenance Standard | Complete | [Documentation Maintenance Standard](../company/documentation-standards/DOCUMENTATION_MAINTENANCE_STANDARD.md), [Knowledge Base Index](../company/KNOWLEDGE_BASE_INDEX.md) (Documentation Standards) |
| AREDIR-KB-010 | Promote Root Cause Analysis Framework | Complete | [Root Cause Analysis Framework](../company/qa-standards/ROOT_CAUSE_ANALYSIS_FRAMEWORK.md), [Knowledge Base Index](../company/KNOWLEDGE_BASE_INDEX.md) (QA Standards) |
| AREDIR-KB-011 | Promote AI Evaluation Framework | Complete | [AI Evaluation Framework](../company/ai-patterns/AI_EVALUATION_FRAMEWORK.md), [Knowledge Base Index](../company/KNOWLEDGE_BASE_INDEX.md) (AI Patterns) |
| AREDIR-KB-012 | Knowledge Asset Registry readiness review | Complete | [Knowledge Asset Registry Readiness Review](../company/reviews/KNOWLEDGE_ASSET_REGISTRY_READINESS_REVIEW.md), [Knowledge Asset Registry Roadmap](../company/KNOWLEDGE_ASSET_REGISTRY_ROADMAP.md) — **Conditionally Ready** for WORKSPACE-008; prerequisites in AREDIR-KB-013 |
| AREDIR-KB-013 | Registry prerequisite cleanup | Complete | [KB 013 Registry Prerequisite Cleanup](../company/reviews/KB_013_REGISTRY_PREREQUISITE_CLEANUP.md), [Knowledge Base Roadmap](../company/KNOWLEDGE_BASE_ROADMAP.md) — adoption validation, metadata cleanup, **Ready** for WORKSPACE-008 |
| AREDIR-KB-014 | Promote Workspace-First AI Experience Pattern | Complete | [Workspace-First AI Experience Pattern](../company/architecture-patterns/WORKSPACE_FIRST_AI_EXPERIENCE_PATTERN.md), [Knowledge Base Index](../company/KNOWLEDGE_BASE_INDEX.md) (Architecture Patterns) |
| AREDIR-KB-015 | Promote Human + AI Advisor Workspace Pattern | Complete | [Human + AI Advisor Workspace Pattern](../company/ai-patterns/HUMAN_AI_ADVISOR_WORKSPACE_PATTERN.md), [Knowledge Base Index](../company/KNOWLEDGE_BASE_INDEX.md) (AI Patterns), [AI Intelligence Architecture Pattern](../company/architecture-patterns/AI_INTELLIGENCE_ARCHITECTURE_PATTERN.md) v1.1 (Application-Owned Intelligence Pipeline merge) |
| GOVERNANCE-001 | Engineering governance framework establishment | Complete | [Governance Index](../company/GOVERNANCE_INDEX.md), [Governance Framework](../company/governance/) (8 domain docs), [GOVERNANCE-001 Review](../company/reviews/GOVERNANCE_001_FRAMEWORK_ESTABLISHMENT.md) |
| EOS-001 | Engineering operating system establishment | Complete | [Engineering Operating System](../company/ENGINEERING_OPERATING_SYSTEM.md), [Governance Maturity Model](../company/governance/GOVERNANCE_MATURITY_MODEL.md), [Knowledge Artifact Taxonomy](../company/knowledge/KNOWLEDGE_ARTIFACT_TAXONOMY.md), [EOS-001 Review](../company/reviews/EOS_001_OPERATING_SYSTEM_ESTABLISHMENT.md) |
| EOS-002 | Engineering capability model establishment | Complete | [Engineering Capability Model](../company/ENGINEERING_CAPABILITY_MODEL.md), [EOS-002 Review](../company/reviews/EOS_002_CAPABILITY_MODEL.md) |
| EOS-003 | Project inheritance model establishment | Complete | [Project Inheritance Model](../company/PROJECT_INHERITANCE_MODEL.md), [EOS-003 Review](../company/reviews/EOS_003_PROJECT_INHERITANCE.md) |
| EOS-004 | Engineering blueprint specification establishment | Complete | [Engineering Blueprint Specification](../company/ENGINEERING_BLUEPRINT_SPECIFICATION.md), [EOS-004 Review](../company/reviews/EOS_004_ENGINEERING_BLUEPRINT.md) |
| IMPLEMENTATION-001 | Engineering reference repository specification | Complete | [Reference Repository Specification](../company/REFERENCE_REPOSITORY_SPECIFICATION.md), [IMPLEMENTATION-001 Review](../company/reviews/IMPLEMENTATION_001_REFERENCE_REPOSITORY.md) |
| AREDIR-KB-017 | Promote Workspace Experience Architecture | Complete | [Workspace Experience Architecture](../company/architecture-patterns/AREDIR_UX_001_WORKSPACE_EXPERIENCE_ARCHITECTURE.md), [Knowledge Base Index](../company/KNOWLEDGE_BASE_INDEX.md) (Architecture Patterns), [AREDIR-UX-001 Review](../company/reviews/AREDIR_UX_001_EXPERIENCE_ARCHITECTURE_ESTABLISHMENT.md) |
| AREDIR-KB-018 | Promote Evidence-Aware AI Advisor Pattern | Complete | [Evidence-Aware AI Advisor Pattern](../company/ai-patterns/EVIDENCE_AWARE_AI_ADVISOR_PATTERN.md), [Knowledge Base Index](../company/KNOWLEDGE_BASE_INDEX.md) (AI Patterns), [KB 018 Review](../company/reviews/KB_018_EVIDENCE_AWARE_AI_ADVISOR_PATTERN.md) |
| AREDIR-KB-019 | Promote Evidence Lifecycle Pattern | Complete | [Evidence Lifecycle Pattern](../company/knowledge-patterns/EVIDENCE_LIFECYCLE_PATTERN.md), [Knowledge Base Index](../company/KNOWLEDGE_BASE_INDEX.md) (Knowledge Patterns), [KB 019 Review](../company/reviews/KB_019_EVIDENCE_LIFECYCLE_PATTERN.md) |

## Workspace (internal)

| ID | Prompt | Status | Depends on |
|----|--------|--------|------------|
| [001](../plan/docs/AREDIR-WORKSPACE-001-VERIFICATION.md) | Workspace foundation — auth, protected routes, dashboard, project registry | Complete | 001C |
| [002A](../plan/docs/NEON-ENVIRONMENT-VERIFICATION.md) | Neon environment finalization — dev/prod split, Drizzle, seed baseline | Complete | 001 |
| [003](../plan/docs/AREDIR-WORKSPACE-003-PROJECT-DETAILS.md) | Project detail pages — registry-backed internal product views | Complete | 002A |
| [004](../plan/docs/AREDIR-WORKSPACE-004-PROJECT-NOTES.md) | Project notes and decision log — lightweight project memory | Complete | 003 |
| [005](../plan/docs/VERCEL-PRODUCTION-DEPLOYMENT.md) | Vercel production setup — safe prod DB scripts and deployment checklist | Complete | 004 |
| [006](../plan/docs/AREDIR-WORKSPACE-006-PROJECT-STATUS-MILESTONES.md) | Project status and milestones — lightweight operational visibility | Complete | 005 |
| [007A](../plan/docs/AREDIR-WORKSPACE-007A-DOCUMENTATION-HUB.md) | Documentation hub — project document registry in workspace | Complete | 006 |
| [007B](../plan/docs/AREDIR-WORKSPACE-007B-PROMPT-LIBRARY.md) | Prompt library — project prompt history vs company assets | Complete | 007A |
| [008](../../docs/workspace/WORKSPACE_008_KNOWLEDGE_ASSET_REGISTRY.md) | Knowledge Asset Registry — governance view of promoted assets | Complete | 007B |

Verification docs live under `plan/docs/`.

## Rules

1. **001A** must be committed before feature prompts.
2. Every implementation prompt must include the [coding agent operating standard](../agent/coding-agent-operating-standard.md) prefix.
3. Use [guarded prompt template](../agent/guarded-prompt-template.md) for new prompts.
4. Update this index when adding prompts.

## Verification baseline

```bash
npm run lint
npm run build
npm run db:push
npm run db:seed
```

Plus manual QA when user-facing behavior changes. Workspace milestones also verify idempotent seeding (`npm run db:seed` twice).

## Related

- [Coding agent operating standard](../agent/coding-agent-operating-standard.md)
- [Site brief](../product/site-brief.md)
- [Information architecture](../product/information-architecture.md)
- [Public engineering experience](../architecture/public-engineering-experience.md)
- [Knowledge Base Index](../company/KNOWLEDGE_BASE_INDEX.md)
- [Promotion Process](../company/PROMOTION_PROCESS.md)
- [Coding Agent Operating Standard (KB)](../company/engineering-standards/CODING_AGENT_OPERATING_STANDARD.md)
- [QA Engineering Framework (KB)](../company/qa-standards/QA_ENGINEERING_FRAMEWORK.md)
- [Context Builder Pattern (KB)](../company/ai-patterns/CONTEXT_BUILDER_PATTERN.md)
- [Response Contract Pattern (KB)](../company/ai-patterns/RESPONSE_CONTRACT_PATTERN.md)
- [AI Evaluation Framework (KB)](../company/ai-patterns/AI_EVALUATION_FRAMEWORK.md)
- [AI Intelligence Architecture Pattern (KB)](../company/architecture-patterns/AI_INTELLIGENCE_ARCHITECTURE_PATTERN.md)
- [Workspace Experience Architecture (KB)](../company/architecture-patterns/AREDIR_UX_001_WORKSPACE_EXPERIENCE_ARCHITECTURE.md)
- [Workspace-First AI Experience Pattern (KB)](../company/architecture-patterns/WORKSPACE_FIRST_AI_EXPERIENCE_PATTERN.md)
- [Human + AI Advisor Workspace Pattern (KB)](../company/ai-patterns/HUMAN_AI_ADVISOR_WORKSPACE_PATTERN.md)
- [Evidence-Aware AI Advisor Pattern (KB)](../company/ai-patterns/EVIDENCE_AWARE_AI_ADVISOR_PATTERN.md)
- [Evidence Lifecycle Pattern (KB)](../company/knowledge-patterns/EVIDENCE_LIFECYCLE_PATTERN.md)
- [Architecture Audit Standard (KB)](../company/documentation-standards/ARCHITECTURE_AUDIT_STANDARD.md)
- [Documentation Maintenance Standard (KB)](../company/documentation-standards/DOCUMENTATION_MAINTENANCE_STANDARD.md)
- [Root Cause Analysis Framework (KB)](../company/qa-standards/ROOT_CAUSE_ANALYSIS_FRAMEWORK.md)
- [Feature Delivery Standard (KB)](../company/playbooks/FEATURE_DELIVERY_STANDARD.md)
- [Knowledge Base Roadmap](../company/KNOWLEDGE_BASE_ROADMAP.md)
- [KB Review 2026 Q2](../company/reviews/KB_REVIEW_2026_Q2.md)
- [Knowledge Asset Registry Readiness Review](../company/reviews/KNOWLEDGE_ASSET_REGISTRY_READINESS_REVIEW.md)
- [Knowledge Asset Registry Roadmap](../company/KNOWLEDGE_ASSET_REGISTRY_ROADMAP.md)
- [KB 013 Registry Prerequisite Cleanup](../company/reviews/KB_013_REGISTRY_PREREQUISITE_CLEANUP.md)
- [Governance Index](../company/GOVERNANCE_INDEX.md)
- [Engineering Operating System](../company/ENGINEERING_OPERATING_SYSTEM.md)
- [Engineering Capability Model](../company/ENGINEERING_CAPABILITY_MODEL.md)
- [GOVERNANCE-001 Review](../company/reviews/GOVERNANCE_001_FRAMEWORK_ESTABLISHMENT.md)
- [EOS-001 Review](../company/reviews/EOS_001_OPERATING_SYSTEM_ESTABLISHMENT.md)
- [EOS-002 Review](../company/reviews/EOS_002_CAPABILITY_MODEL.md)
- [Project Inheritance Model](../company/PROJECT_INHERITANCE_MODEL.md)
- [EOS-003 Review](../company/reviews/EOS_003_PROJECT_INHERITANCE.md)
- [Engineering Blueprint Specification](../company/ENGINEERING_BLUEPRINT_SPECIFICATION.md)
- [EOS-004 Review](../company/reviews/EOS_004_ENGINEERING_BLUEPRINT.md)
- [Reference Repository Specification](../company/REFERENCE_REPOSITORY_SPECIFICATION.md)
- [IMPLEMENTATION-001 Review](../company/reviews/IMPLEMENTATION_001_REFERENCE_REPOSITORY.md)
