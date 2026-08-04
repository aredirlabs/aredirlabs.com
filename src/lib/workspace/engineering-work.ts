export const ENGINEERING_WORK_TYPES = [
  "feature",
  "task",
  "bug",
  "research",
  "architecture",
  "verification",
  "documentation",
  "maintenance",
  "release",
] as const;

export type EngineeringWorkType = (typeof ENGINEERING_WORK_TYPES)[number];

export const ENGINEERING_WORK_TYPE_LABELS: Record<EngineeringWorkType, string> = {
  feature: "Feature",
  task: "Task",
  bug: "Bug",
  research: "Research",
  architecture: "Architecture",
  verification: "Verification",
  documentation: "Documentation",
  maintenance: "Maintenance",
  release: "Release",
};

export const ENGINEERING_WORK_WORKFLOWS = [
  "delivery",
  "defect",
  "discovery",
  "research",
  "architecture",
  "maintenance",
  "verification",
  "documentation",
  "promotion",
  "release",
] as const;

export type EngineeringWorkWorkflow =
  (typeof ENGINEERING_WORK_WORKFLOWS)[number];

export const ENGINEERING_WORK_WORKFLOW_LABELS: Record<
  EngineeringWorkWorkflow,
  string
> = {
  delivery: "Delivery",
  defect: "Defect",
  discovery: "Discovery",
  research: "Research",
  architecture: "Architecture",
  maintenance: "Maintenance",
  verification: "Verification",
  documentation: "Documentation",
  promotion: "Promotion",
  release: "Release",
};

export const ENGINEERING_WORK_STATES = [
  "proposed",
  "active",
  "in_review",
  "completed",
  "closed",
  "cancelled",
  "superseded",
] as const;

export type EngineeringWorkState = (typeof ENGINEERING_WORK_STATES)[number];

export const ENGINEERING_WORK_STATE_LABELS: Record<EngineeringWorkState, string> = {
  proposed: "Proposed",
  active: "Active",
  in_review: "In Review",
  completed: "Completed",
  closed: "Closed",
  cancelled: "Cancelled",
  superseded: "Superseded",
};

export const ENGINEERING_WORK_REFERENCE_AUTHORITY_LABELS = {
  repository_authoritative: "Repository authoritative",
  external_read_only: "External read-only",
  workspace_derived: "Workspace derived",
} as const;

export const ENGINEERING_WORK_REFERENCE_STATUS_LABELS = {
  expected: "Expected",
  verified: "Verified",
  stale: "Stale",
  missing: "Missing",
} as const;
