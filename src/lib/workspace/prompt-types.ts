export const WORKSPACE_PROJECT_PROMPT_TYPES = [
  "implementation",
  "audit",
  "bugfix",
  "ui",
  "qa",
  "documentation",
  "deployment",
  "research",
] as const;

export type WorkspaceProjectPromptType =
  (typeof WORKSPACE_PROJECT_PROMPT_TYPES)[number];

export const WORKSPACE_PROJECT_PROMPT_TYPE_LABELS: Record<
  WorkspaceProjectPromptType,
  string
> = {
  implementation: "Implementation",
  audit: "Audit",
  bugfix: "Bugfix",
  ui: "UI",
  qa: "QA",
  documentation: "Documentation",
  deployment: "Deployment",
  research: "Research",
};

export const WORKSPACE_PROJECT_PROMPT_TYPE_BADGE_CLASSNAMES: Record<
  WorkspaceProjectPromptType,
  string
> = {
  implementation:
    "border-cyan-500/20 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300",
  audit:
    "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  bugfix: "border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-300",
  ui: "border-fuchsia-500/20 bg-fuchsia-500/10 text-fuchsia-700 dark:text-fuchsia-300",
  qa: "border-sky-500/20 bg-sky-500/10 text-sky-700 dark:text-sky-300",
  documentation:
    "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  deployment:
    "border-indigo-500/20 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300",
  research:
    "border-stone-500/20 bg-stone-500/10 text-stone-700 dark:text-stone-300",
};

export function isWorkspaceProjectPromptType(
  value: string,
): value is WorkspaceProjectPromptType {
  return WORKSPACE_PROJECT_PROMPT_TYPES.includes(
    value as WorkspaceProjectPromptType,
  );
}

export function getWorkspaceProjectPromptTypeLabel(
  type: WorkspaceProjectPromptType,
) {
  return WORKSPACE_PROJECT_PROMPT_TYPE_LABELS[type];
}

export function getWorkspaceProjectPromptTypeBadgeClassName(
  type: WorkspaceProjectPromptType,
) {
  return WORKSPACE_PROJECT_PROMPT_TYPE_BADGE_CLASSNAMES[type];
}
