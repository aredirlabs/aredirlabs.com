import { StateLabel } from "@/components/ui/state-label";
import {
  WORKSPACE_PROJECT_STATUS_LABELS,
  type WorkspaceProjectStatus,
} from "@/lib/workspace/project-status";
import {
  WORKSPACE_PROJECT_STAGE_LABELS,
  type WorkspaceProjectStage,
} from "@/lib/workspace/project-stage";
import {
  getProjectStatusRole,
} from "@/lib/workspace/operational-role-mapping";

type ProjectStatusBadgeProps = {
  status: WorkspaceProjectStatus;
  className?: string;
};

export function ProjectStatusBadge({ status, className }: ProjectStatusBadgeProps) {
  const role = getProjectStatusRole(status);
  return (
    <StateLabel role={role} className={className}>
      {WORKSPACE_PROJECT_STATUS_LABELS[status]}
    </StateLabel>
  );
}

type ProjectStageBadgeProps = {
  stage: WorkspaceProjectStage;
  className?: string;
};

export function ProjectStageBadge({ stage, className }: ProjectStageBadgeProps) {
  return (
    <StateLabel role="neutral" className={className}>
      {WORKSPACE_PROJECT_STAGE_LABELS[stage]}
    </StateLabel>
  );
}
