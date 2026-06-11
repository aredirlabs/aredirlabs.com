export const WORKSPACE_PROJECT_PROMPT_STATUSES = [
  "drafted",
  "run",
  "verified",
  "needs_followup",
  "superseded",
] as const;

export type WorkspaceProjectPromptStatus =
  (typeof WORKSPACE_PROJECT_PROMPT_STATUSES)[number];

export const WORKSPACE_PROJECT_PROMPT_STATUS_LABELS: Record<
  WorkspaceProjectPromptStatus,
  string
> = {
  drafted: "Drafted",
  run: "Run",
  verified: "Verified",
  needs_followup: "Needs follow-up",
  superseded: "Superseded",
};

export const WORKSPACE_PROJECT_PROMPT_STATUS_BADGE_CLASSNAMES: Record<
  WorkspaceProjectPromptStatus,
  string
> = {
  drafted: "border-border bg-muted/50 text-muted-foreground",
  run: "border-sky-500/20 bg-sky-500/10 text-sky-700 dark:text-sky-300",
  verified:
    "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  needs_followup:
    "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  superseded:
    "border-stone-500/20 bg-stone-500/10 text-stone-700 dark:text-stone-300",
};

export function isWorkspaceProjectPromptStatus(
  value: string,
): value is WorkspaceProjectPromptStatus {
  return WORKSPACE_PROJECT_PROMPT_STATUSES.includes(
    value as WorkspaceProjectPromptStatus,
  );
}

export function getWorkspaceProjectPromptStatusLabel(
  status: WorkspaceProjectPromptStatus,
) {
  return WORKSPACE_PROJECT_PROMPT_STATUS_LABELS[status];
}

export function getWorkspaceProjectPromptStatusBadgeClassName(
  status: WorkspaceProjectPromptStatus,
) {
  return WORKSPACE_PROJECT_PROMPT_STATUS_BADGE_CLASSNAMES[status];
}
