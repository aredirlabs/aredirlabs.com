import type {
  KnowledgeAssetAdoptionMode,
  KnowledgeAssetCategory,
  KnowledgeAssetProject,
  KnowledgeAssetStatus,
} from "./types";

export const KNOWLEDGE_ASSET_CATEGORY_LABELS: Record<
  KnowledgeAssetCategory,
  string
> = {
  architecture_pattern: "Architecture Pattern",
  engineering_standard: "Engineering Standard",
  qa_standard: "QA Standard",
  ai_pattern: "AI Pattern",
  documentation_standard: "Documentation Standard",
  playbook: "Playbook",
};

export const KNOWLEDGE_ASSET_STATUS_LABELS: Record<
  KnowledgeAssetStatus,
  string
> = {
  promoted_standard: "Promoted Standard",
  company_standard: "Company Standard",
  deprecated: "Deprecated",
  superseded: "Superseded",
};

export const KNOWLEDGE_ASSET_PROJECT_LABELS: Record<
  KnowledgeAssetProject,
  string
> = {
  alignfit: "AlignFit",
  classforge: "ClassForge",
  leagueos: "LeagueOS",
  aredir_labs: "Aredir Labs",
};

export const KNOWLEDGE_ASSET_PROJECT_CODES: Record<
  KnowledgeAssetProject,
  string
> = {
  alignfit: "AF",
  classforge: "CF",
  leagueos: "LO",
  aredir_labs: "AL",
};

export const KNOWLEDGE_ASSET_ADOPTION_SYMBOLS: Record<
  KnowledgeAssetAdoptionMode,
  string
> = {
  adopted: "✓",
  referenced: "R",
  planned: "P",
  not_referenced: "–",
};

export const KNOWLEDGE_ASSET_ADOPTION_LABELS: Record<
  KnowledgeAssetAdoptionMode,
  string
> = {
  adopted: "Adopted",
  referenced: "Referenced",
  planned: "Planned",
  not_referenced: "Not Referenced",
};

export function getKnowledgeAssetCategoryLabel(
  category: KnowledgeAssetCategory,
) {
  return KNOWLEDGE_ASSET_CATEGORY_LABELS[category];
}

export function getKnowledgeAssetStatusLabel(status: KnowledgeAssetStatus) {
  return KNOWLEDGE_ASSET_STATUS_LABELS[status];
}
