export const WORKSPACE_PROJECT_DOCUMENT_CATEGORIES = [
  "architecture",
  "decision",
  "qa",
  "release",
  "prompt",
  "research",
  "reference",
] as const;

export type WorkspaceProjectDocumentCategory =
  (typeof WORKSPACE_PROJECT_DOCUMENT_CATEGORIES)[number];

export const WORKSPACE_PROJECT_DOCUMENT_CATEGORY_LABELS: Record<
  WorkspaceProjectDocumentCategory,
  string
> = {
  architecture: "Architecture",
  decision: "Decision",
  qa: "QA",
  release: "Release",
  prompt: "Prompt",
  research: "Research",
  reference: "Reference",
};

export const WORKSPACE_PROJECT_DOCUMENT_CATEGORY_BADGE_CLASSNAMES: Record<
  WorkspaceProjectDocumentCategory,
  string
> = {
  architecture: "border-cyan-500/20 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300",
  decision: "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  qa: "border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-300",
  release: "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  prompt: "border-violet-500/20 bg-violet-500/10 text-violet-700 dark:text-violet-300",
  research: "border-sky-500/20 bg-sky-500/10 text-sky-700 dark:text-sky-300",
  reference: "border-stone-500/20 bg-stone-500/10 text-stone-700 dark:text-stone-300",
};

export function isWorkspaceProjectDocumentCategory(
  value: string,
): value is WorkspaceProjectDocumentCategory {
  return WORKSPACE_PROJECT_DOCUMENT_CATEGORIES.includes(
    value as WorkspaceProjectDocumentCategory,
  );
}

export function getWorkspaceProjectDocumentCategoryLabel(
  category: WorkspaceProjectDocumentCategory,
) {
  return WORKSPACE_PROJECT_DOCUMENT_CATEGORY_LABELS[category];
}

export function getWorkspaceProjectDocumentCategoryBadgeClassName(
  category: WorkspaceProjectDocumentCategory,
) {
  return WORKSPACE_PROJECT_DOCUMENT_CATEGORY_BADGE_CLASSNAMES[category];
}
