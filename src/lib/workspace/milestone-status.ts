export const WORKSPACE_MILESTONE_STATUSES = [
  "planned",
  "active",
  "blocked",
  "completed",
  "deferred",
] as const;

export type WorkspaceMilestoneStatus =
  (typeof WORKSPACE_MILESTONE_STATUSES)[number];

export const WORKSPACE_MILESTONE_STATUS_LABELS: Record<
  WorkspaceMilestoneStatus,
  string
> = {
  planned: "Planned",
  active: "Active",
  blocked: "Blocked",
  completed: "Completed",
  deferred: "Deferred",
};

export const WORKSPACE_MILESTONE_STATUS_GROUPS: WorkspaceMilestoneStatus[][] = [
  ["active"],
  ["planned"],
  ["blocked"],
  ["completed", "deferred"],
];

export const WORKSPACE_MILESTONE_GROUP_LABELS: Record<string, string> = {
  active: "Active",
  planned: "Planned",
  blocked: "Blocked",
  "completed,deferred": "Completed / Deferred",
};

export function isWorkspaceMilestoneStatus(
  value: string,
): value is WorkspaceMilestoneStatus {
  return WORKSPACE_MILESTONE_STATUSES.includes(
    value as WorkspaceMilestoneStatus,
  );
}
