import type {
  KnowledgeAsset,
  KnowledgeAssetAdoption,
  KnowledgeAssetFilters,
  ReviewUrgency,
} from "./types";

const CANONICAL_REPO_URL =
  "https://github.com/aredirlabs/aredirlabs-com/blob/main/docs/company";

export const KNOWLEDGE_ASSET_SOURCE_NOTICE =
  "Knowledge Base markdown documents remain canonical. The registry is a governance view.";

const DUE_SOON_DAYS = 30;

const registryAssets: KnowledgeAsset[] = [
  {
    id: "ai-intelligence-architecture-pattern",
    title: "AI Intelligence Architecture Pattern",
    category: "architecture_pattern",
    status: "promoted_standard",
    version: "1.1",
    owner: "Aredir Labs",
    linkedProjects: ["AlignFit", "Aredir Labs"],
    originProject: "AlignFit",
    originArtifacts:
      "COACH-ARCH-001, COACH-INTEL-001, COACH-INTEL-002, COACH-INTEL-003, PROMOTION_CANDIDATE_REVIEW_2026_Q2",
    lastReviewed: "2026-06-15",
    nextReviewDue: "2026-09-12",
    path: "architecture-patterns/AI_INTELLIGENCE_ARCHITECTURE_PATTERN.md",
    reusability: "high",
    adoption: {
      alignfit: "adopted",
      classforge: "planned",
      leagueos: "planned",
      aredir_labs: "referenced",
    },
  },
  {
    id: "workspace-first-ai-experience-pattern",
    title: "Workspace-First AI Experience Pattern",
    category: "architecture_pattern",
    status: "promoted_standard",
    version: "1.0",
    owner: "Aredir Labs",
    linkedProjects: ["AlignFit", "ClassForge", "LeagueOS", "Aredir Labs"],
    originProject: "AlignFit",
    originArtifacts:
      "COACH-UX-001, COACH_EXPERIENCE_ARCHITECTURE, PROMOTION_CANDIDATE_REVIEW_2026_Q2",
    lastReviewed: "2026-06-15",
    nextReviewDue: "2026-09-12",
    path: "architecture-patterns/WORKSPACE_FIRST_AI_EXPERIENCE_PATTERN.md",
    reusability: "high",
    adoption: {
      alignfit: "adopted",
      classforge: "planned",
      leagueos: "planned",
      aredir_labs: "referenced",
    },
  },
  {
    id: "aredir-ux-001-workspace-experience-architecture",
    title: "Workspace Experience Architecture",
    category: "architecture_pattern",
    status: "promoted_standard",
    version: "1.1",
    owner: "Aredir Labs",
    linkedProjects: ["AlignFit", "ClassForge", "LeagueOS", "Aredir Labs"],
    originProject: "AlignFit",
    originArtifacts:
      "COACH-UX-001, COACH_EXPERIENCE_ARCHITECTURE, AlignFit workspace evolution",
    lastReviewed: "2026-06-25",
    nextReviewDue: "2026-09-12",
    path: "architecture-patterns/AREDIR_UX_001_WORKSPACE_EXPERIENCE_ARCHITECTURE.md",
    reusability: "high",
    adoption: {
      alignfit: "referenced",
      classforge: "planned",
      leagueos: "planned",
      aredir_labs: "referenced",
    },
  },
  {
    id: "coding-agent-operating-standard",
    title: "Coding Agent Operating Standard",
    category: "engineering_standard",
    status: "promoted_standard",
    version: "1.0",
    owner: "Aredir Labs",
    linkedProjects: ["Aredir Labs", "AlignFit", "ClassForge", "LeagueOS"],
    originProject: "Aredir Labs, AlignFit, ClassForge, LeagueOS",
    originArtifacts:
      "prompt-001A-foundation, docs/agent/coding-agent-operating-standard.md, docs/engineering/repository-standards.md, AREDIR-WORKSPACE-001 through AREDIR-WORKSPACE-006",
    lastReviewed: "2026-06-12",
    nextReviewDue: "2026-09-12",
    path: "engineering-standards/CODING_AGENT_OPERATING_STANDARD.md",
    reusability: "high",
    adoption: {
      alignfit: "adopted",
      classforge: "adopted",
      leagueos: "adopted",
      aredir_labs: "adopted",
    },
  },
  {
    id: "qa-engineering-framework",
    title: "QA Engineering Framework",
    category: "qa_standard",
    status: "promoted_standard",
    version: "1.0",
    owner: "Aredir Labs",
    linkedProjects: ["Aredir Labs", "AlignFit"],
    originProject: "AlignFit, Aredir Labs",
    originArtifacts:
      "docs/qa/manual-qa-checklist.md, docs/qa/release-checklist.md, docs/qa/uat-checklist.md, docs/bugs/bug-triage-process.md, docs/bugs/bug-report-template.md, docs/engineering/deployment-workflow.md, AREDIR-WORKSPACE-004, AREDIR-WORKSPACE-005, AlignFit UAT testing cycle",
    lastReviewed: "2026-06-12",
    nextReviewDue: "2026-09-12",
    path: "qa-standards/QA_ENGINEERING_FRAMEWORK.md",
    reusability: "high",
    adoption: {
      alignfit: "adopted",
      classforge: "referenced",
      leagueos: "referenced",
      aredir_labs: "adopted",
    },
  },
  {
    id: "root-cause-analysis-framework",
    title: "Root Cause Analysis Framework",
    category: "qa_standard",
    status: "promoted_standard",
    version: "1.0",
    owner: "Aredir Labs",
    linkedProjects: ["Aredir Labs", "AlignFit"],
    originProject: "AlignFit, Aredir Labs",
    originArtifacts:
      "docs/bugs/bug-triage-process.md, docs/bugs/bug-report-template.md, QA Engineering Framework bug investigation section, AlignFit UAT regression investigations, AREDIR-WORKSPACE-005, Architecture Audit Standard risk and drift assessment, AREDIR-KB-008 review findings",
    lastReviewed: "2026-06-12",
    nextReviewDue: "2026-09-12",
    path: "qa-standards/ROOT_CAUSE_ANALYSIS_FRAMEWORK.md",
    reusability: "high",
    adoption: {
      alignfit: "referenced",
      classforge: "referenced",
      leagueos: "referenced",
      aredir_labs: "adopted",
    },
  },
  {
    id: "context-builder-pattern",
    title: "Context Builder Pattern",
    category: "ai_pattern",
    status: "promoted_standard",
    version: "1.0",
    owner: "Aredir Labs",
    linkedProjects: ["AlignFit"],
    originProject: "AlignFit",
    originArtifacts:
      "COACH-ARCH-001, COACH-INTEL-001, COACH-INTEL-002, COACH-INTEL-003",
    lastReviewed: "2026-06-12",
    nextReviewDue: "2026-09-12",
    path: "ai-patterns/CONTEXT_BUILDER_PATTERN.md",
    reusability: "high",
    adoption: {
      alignfit: "adopted",
      classforge: "planned",
      leagueos: "planned",
      aredir_labs: "referenced",
    },
  },
  {
    id: "response-contract-pattern",
    title: "Response Contract Pattern",
    category: "ai_pattern",
    status: "promoted_standard",
    version: "1.0",
    owner: "Aredir Labs",
    linkedProjects: ["AlignFit"],
    originProject: "AlignFit",
    originArtifacts:
      "COACH-ARCH-001, COACH-INTEL-001, COACH-INTEL-002, COACH-INTEL-003",
    lastReviewed: "2026-06-12",
    nextReviewDue: "2026-09-12",
    path: "ai-patterns/RESPONSE_CONTRACT_PATTERN.md",
    reusability: "high",
    adoption: {
      alignfit: "adopted",
      classforge: "planned",
      leagueos: "planned",
      aredir_labs: "referenced",
    },
  },
  {
    id: "ai-evaluation-framework",
    title: "AI Evaluation Framework",
    category: "ai_pattern",
    status: "promoted_standard",
    version: "1.0",
    owner: "Aredir Labs",
    linkedProjects: ["AlignFit", "Aredir Labs"],
    originProject: "AlignFit, Aredir Labs",
    originArtifacts:
      "COACH-ARCH-001, COACH-INTEL-001, COACH-INTEL-002, COACH-INTEL-003",
    lastReviewed: "2026-06-12",
    nextReviewDue: "2026-09-12",
    path: "ai-patterns/AI_EVALUATION_FRAMEWORK.md",
    reusability: "high",
    adoption: {
      alignfit: "referenced",
      classforge: "planned",
      leagueos: "planned",
      aredir_labs: "referenced",
    },
  },
  {
    id: "human-ai-advisor-workspace-pattern",
    title: "Human + AI Advisor Workspace Pattern",
    category: "ai_pattern",
    status: "promoted_standard",
    version: "1.0",
    owner: "Aredir Labs",
    linkedProjects: ["AlignFit", "ClassForge", "LeagueOS", "Aredir Labs"],
    originProject: "AlignFit",
    originArtifacts:
      "COACH-UX-001, Coach Architecture Discussions, PROMOTION_CANDIDATE_REVIEW_2026_Q2",
    lastReviewed: "2026-06-15",
    nextReviewDue: "2026-09-12",
    path: "ai-patterns/HUMAN_AI_ADVISOR_WORKSPACE_PATTERN.md",
    reusability: "high",
    adoption: {
      alignfit: "adopted",
      classforge: "planned",
      leagueos: "planned",
      aredir_labs: "referenced",
    },
  },
  {
    id: "evidence-aware-ai-advisor-pattern",
    title: "Evidence-Aware AI Advisor Pattern",
    category: "ai_pattern",
    status: "promoted_standard",
    version: "1.0",
    owner: "Aredir Labs",
    linkedProjects: ["AlignFit", "ClassForge", "LeagueOS", "Aredir Labs"],
    originProject: "AlignFit",
    originArtifacts:
      "COACH-INTEL-001, COACH-INTEL-002, COACH-INTEL-003, intelligence interpretation evolution, PROMOTION_CANDIDATE_REVIEW_2026_Q2",
    lastReviewed: "2026-07-06",
    nextReviewDue: "2026-10-06",
    path: "ai-patterns/EVIDENCE_AWARE_AI_ADVISOR_PATTERN.md",
    reusability: "high",
    adoption: {
      alignfit: "referenced",
      classforge: "planned",
      leagueos: "planned",
      aredir_labs: "referenced",
    },
  },
  {
    id: "architecture-audit-standard",
    title: "Architecture Audit Standard",
    category: "documentation_standard",
    status: "promoted_standard",
    version: "1.0",
    owner: "Aredir Labs",
    linkedProjects: ["AlignFit", "Aredir Labs"],
    originProject: "AlignFit, Aredir Labs",
    originArtifacts:
      "COACH-ARCH-001, COACH-INTEL-001, COACH-INTEL-002, COACH-INTEL-003, AREDIR-KB-001 through AREDIR-KB-005, AlignFit coach architecture evolution, docs/architecture/ template reviews, workspace foundation audits (AREDIR-WORKSPACE-001 through AREDIR-WORKSPACE-006)",
    lastReviewed: "2026-06-12",
    nextReviewDue: "2026-09-12",
    path: "documentation-standards/ARCHITECTURE_AUDIT_STANDARD.md",
    reusability: "high",
    adoption: {
      alignfit: "referenced",
      classforge: "not_referenced",
      leagueos: "not_referenced",
      aredir_labs: "referenced",
    },
  },
  {
    id: "documentation-maintenance-standard",
    title: "Documentation Maintenance Standard",
    category: "documentation_standard",
    status: "promoted_standard",
    version: "1.0",
    owner: "Aredir Labs",
    linkedProjects: ["Aredir Labs", "AlignFit"],
    originProject: "AlignFit, Aredir Labs",
    originArtifacts:
      "AREDIR-KB-008, AREDIR-KB-008A, README / future-product-standards.md discoverability gaps, stale recommendation findings, Promotion Process documentation hierarchy",
    lastReviewed: "2026-06-12",
    nextReviewDue: "2026-09-12",
    path: "documentation-standards/DOCUMENTATION_MAINTENANCE_STANDARD.md",
    reusability: "high",
    adoption: {
      alignfit: "referenced",
      classforge: "referenced",
      leagueos: "referenced",
      aredir_labs: "adopted",
    },
  },
  {
    id: "feature-delivery-standard",
    title: "Feature Delivery Standard",
    category: "playbook",
    status: "promoted_standard",
    version: "1.0",
    owner: "Aredir Labs",
    linkedProjects: ["Aredir Labs", "AlignFit"],
    originProject: "AlignFit, Aredir Labs",
    originArtifacts:
      "prompt-001A through prompt-001C, AREDIR-WORKSPACE-001 through AREDIR-WORKSPACE-006, AlignFit UAT delivery cycles, docs/engineering/deployment-workflow.md, docs/prompts/implementation-index.md, AREDIR-KB-001 through AREDIR-KB-008",
    lastReviewed: "2026-06-12",
    nextReviewDue: "2026-09-12",
    path: "playbooks/FEATURE_DELIVERY_STANDARD.md",
    reusability: "high",
    adoption: {
      alignfit: "referenced",
      classforge: "planned",
      leagueos: "planned",
      aredir_labs: "referenced",
    },
  },
];

const projectFilterLabels: Record<string, string> = {
  alignfit: "AlignFit",
  classforge: "ClassForge",
  leagueos: "LeagueOS",
  aredir_labs: "Aredir Labs",
};

export function getKnowledgeAssetSourceUrl(path: string) {
  return `${CANONICAL_REPO_URL}/${path}`;
}

export function getKnowledgeAssetCanonicalPath(path: string) {
  return `docs/company/${path}`;
}

export function getAllKnowledgeAssets() {
  return registryAssets;
}

export function getKnowledgeAssetById(id: string) {
  return registryAssets.find((asset) => asset.id === id) ?? null;
}

export function filterKnowledgeAssets(filters: KnowledgeAssetFilters) {
  const category = filters.category?.trim() ?? "";
  const status = filters.status?.trim() ?? "";
  const project = filters.project?.trim() ?? "";

  return registryAssets.filter((asset) => {
    if (category && asset.category !== category) {
      return false;
    }

    if (status && asset.status !== status) {
      return false;
    }

    if (project) {
      const projectLabel = projectFilterLabels[project];
      if (!projectLabel || !asset.linkedProjects.includes(projectLabel)) {
        return false;
      }
    }

    return true;
  });
}

export function getReviewUrgency(
  nextReviewDue: string,
  referenceDate = new Date(),
): ReviewUrgency {
  const due = new Date(`${nextReviewDue}T00:00:00.000Z`);
  const today = new Date(
    Date.UTC(
      referenceDate.getUTCFullYear(),
      referenceDate.getUTCMonth(),
      referenceDate.getUTCDate(),
    ),
  );
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const daysUntil = (due.getTime() - today.getTime()) / millisecondsPerDay;

  if (daysUntil < 0) {
    return "overdue";
  }

  if (daysUntil <= DUE_SOON_DAYS) {
    return "due_soon";
  }

  return "upcoming";
}

export function groupAssetsByReviewUrgency(
  assets: KnowledgeAsset[],
  referenceDate = new Date(),
) {
  const groups: Record<ReviewUrgency, KnowledgeAsset[]> = {
    overdue: [],
    due_soon: [],
    upcoming: [],
  };

  for (const asset of assets) {
    const urgency = getReviewUrgency(asset.nextReviewDue, referenceDate);
    groups[urgency].push(asset);
  }

  return groups;
}

export function formatKnowledgeAssetDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00.000Z`));
}

export type { KnowledgeAsset, KnowledgeAssetAdoption };
