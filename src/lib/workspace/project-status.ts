export const WORKSPACE_PROJECT_STATUSES = [
  "active",
  "testing",
  "paused",
  "planning",
  "archived",
] as const;

export type WorkspaceProjectStatus =
  (typeof WORKSPACE_PROJECT_STATUSES)[number];

export const WORKSPACE_PROJECT_STATUS_LABELS: Record<
  WorkspaceProjectStatus,
  string
> = {
  active: "Active",
  testing: "Testing",
  paused: "Paused",
  planning: "Planning",
  archived: "Archived",
};

export function isWorkspaceProjectStatus(
  value: string,
): value is WorkspaceProjectStatus {
  return WORKSPACE_PROJECT_STATUSES.includes(
    value as WorkspaceProjectStatus,
  );
}
