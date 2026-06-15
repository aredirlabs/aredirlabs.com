export const KNOWLEDGE_ASSET_CATEGORIES = [
  "architecture_pattern",
  "engineering_standard",
  "qa_standard",
  "ai_pattern",
  "documentation_standard",
  "playbook",
] as const;

export type KnowledgeAssetCategory = (typeof KNOWLEDGE_ASSET_CATEGORIES)[number];

export const KNOWLEDGE_ASSET_STATUSES = [
  "promoted_standard",
  "company_standard",
  "deprecated",
  "superseded",
] as const;

export type KnowledgeAssetStatus = (typeof KNOWLEDGE_ASSET_STATUSES)[number];

export const KNOWLEDGE_ASSET_REUSABILITY_LEVELS = [
  "low",
  "medium",
  "high",
] as const;

export type KnowledgeAssetReusability =
  (typeof KNOWLEDGE_ASSET_REUSABILITY_LEVELS)[number];

export const KNOWLEDGE_ASSET_PROJECTS = [
  "alignfit",
  "classforge",
  "leagueos",
  "aredir_labs",
] as const;

export type KnowledgeAssetProject = (typeof KNOWLEDGE_ASSET_PROJECTS)[number];

export const KNOWLEDGE_ASSET_ADOPTION_MODES = [
  "adopted",
  "referenced",
  "planned",
  "not_referenced",
] as const;

export type KnowledgeAssetAdoptionMode =
  (typeof KNOWLEDGE_ASSET_ADOPTION_MODES)[number];

export type KnowledgeAssetAdoption = Record<
  KnowledgeAssetProject,
  KnowledgeAssetAdoptionMode
>;

export type KnowledgeAsset = {
  id: string;
  title: string;
  category: KnowledgeAssetCategory;
  status: KnowledgeAssetStatus;
  version: string;
  owner: string;
  linkedProjects: string[];
  originProject: string;
  originArtifacts: string;
  lastReviewed: string;
  nextReviewDue: string;
  path: string;
  reusability: KnowledgeAssetReusability;
  adoption: KnowledgeAssetAdoption;
};

export type KnowledgeAssetFilters = {
  category?: string;
  status?: string;
  project?: string;
};

export type ReviewUrgency = "overdue" | "due_soon" | "upcoming";
