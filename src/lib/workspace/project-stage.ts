export const WORKSPACE_PROJECT_STAGES = [
  "concept",
  "prototype",
  "mvp",
  "uat",
  "production",
  "maintenance",
] as const;

export type WorkspaceProjectStage = (typeof WORKSPACE_PROJECT_STAGES)[number];

export const WORKSPACE_PROJECT_STAGE_LABELS: Record<
  WorkspaceProjectStage,
  string
> = {
  concept: "Concept",
  prototype: "Prototype",
  mvp: "MVP",
  uat: "UAT",
  production: "Production",
  maintenance: "Maintenance",
};

export function isWorkspaceProjectStage(
  value: string,
): value is WorkspaceProjectStage {
  return WORKSPACE_PROJECT_STAGES.includes(value as WorkspaceProjectStage);
}
