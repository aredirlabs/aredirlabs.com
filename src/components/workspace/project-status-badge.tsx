import { cn } from "@/lib/utils";
import {
  WORKSPACE_PROJECT_STATUS_LABELS,
  type WorkspaceProjectStatus,
} from "@/lib/workspace/project-status";
import {
  WORKSPACE_PROJECT_STAGE_LABELS,
  type WorkspaceProjectStage,
} from "@/lib/workspace/project-stage";

const statusStyles: Record<WorkspaceProjectStatus, string> = {
  active: "border-success/30 bg-success/10 text-success",
  testing: "border-primary/30 bg-primary/10 text-primary",
  paused: "border-ember/30 bg-ember/10 text-ember",
  planning: "border-muted-foreground/30 bg-muted text-muted-foreground",
  archived: "border-border bg-muted/50 text-muted-foreground",
};

type ProjectStatusBadgeProps = {
  status: WorkspaceProjectStatus;
  className?: string;
};

export function ProjectStatusBadge({ status, className }: ProjectStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 font-mono text-xs",
        statusStyles[status],
        className,
      )}
    >
      {WORKSPACE_PROJECT_STATUS_LABELS[status]}
    </span>
  );
}

const stageStyles: Record<WorkspaceProjectStage, string> = {
  concept: "border-muted-foreground/30 bg-muted text-muted-foreground",
  prototype: "border-primary/30 bg-primary/10 text-primary",
  mvp: "border-success/30 bg-success/10 text-success",
  uat: "border-ember/30 bg-ember/10 text-ember",
  production: "border-success/30 bg-success/10 text-success",
  maintenance: "border-border bg-muted/50 text-muted-foreground",
};

type ProjectStageBadgeProps = {
  stage: WorkspaceProjectStage;
  className?: string;
};

export function ProjectStageBadge({ stage, className }: ProjectStageBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 font-mono text-xs",
        stageStyles[stage],
        className,
      )}
    >
      {WORKSPACE_PROJECT_STAGE_LABELS[stage]}
    </span>
  );
}
