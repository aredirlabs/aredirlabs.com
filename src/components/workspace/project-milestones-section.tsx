import { AlertTriangle, Flag } from "lucide-react";

import { CreateProjectMilestoneForm } from "@/components/workspace/create-project-milestone-form";
import type { workspaceProjectMilestones } from "@/lib/db/schema";
import { formatDate } from "@/lib/workspace/format-date";
import {
  WORKSPACE_MILESTONE_STATUS_LABELS,
  type WorkspaceMilestoneStatus,
} from "@/lib/workspace/milestone-status";
import { groupMilestonesByStatus } from "@/lib/workspace/queries";

type Milestone = typeof workspaceProjectMilestones.$inferSelect;

type ProjectMilestonesSectionProps = {
  projectSlug: string;
  milestones: Milestone[];
  milestonesError: string | null;
};

function previewDescription(description: string | null, maxLength = 160) {
  if (!description) return null;
  const normalized = description.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength).trimEnd()}…`;
}

function MilestoneStatusBadge({ status }: { status: WorkspaceMilestoneStatus }) {
  return (
    <span className="rounded-full bg-muted px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.1em]">
      {WORKSPACE_MILESTONE_STATUS_LABELS[status]}
    </span>
  );
}

export function ProjectMilestonesSection({
  projectSlug,
  milestones,
  milestonesError,
}: ProjectMilestonesSectionProps) {
  const groups = groupMilestonesByStatus(milestones);

  return (
    <section className="rounded-lg border border-border bg-card p-6">
      <h2 className="font-heading text-base font-semibold">Milestones</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Key checkpoints and delivery targets for this project.
      </p>

      {milestonesError ? (
        <div className="mt-4 rounded-md border border-destructive/30 bg-destructive/10 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-destructive" />
            <div>
              <p className="text-sm font-medium text-destructive">
                Could not load milestones
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Project details loaded, but milestones failed to load. Try
                refreshing the page.
              </p>
            </div>
          </div>
        </div>
      ) : milestones.length === 0 ? (
        <div className="mt-4 rounded-md border border-dashed border-border bg-muted/20 p-6 text-center">
          <Flag className="mx-auto size-5 text-muted-foreground" />
          <p className="mt-3 text-sm font-medium">No milestones yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Add the first milestone to track delivery checkpoints.
          </p>
        </div>
      ) : (
        <div className="mt-4 space-y-6">
          {groups.map((group) => (
            <div key={group.key}>
              <h3 className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-muted-foreground">
                {group.label}
              </h3>
              <ul className="mt-2 space-y-3">
                {group.items.map((milestone) => (
                  <li
                    key={milestone.id}
                    className="rounded-md border border-border bg-background/60 p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <MilestoneStatusBadge status={milestone.status} />
                      <div className="flex flex-wrap gap-3 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-muted-foreground">
                        {milestone.targetDate ? (
                          <span>Target {formatDate(milestone.targetDate)}</span>
                        ) : null}
                        {milestone.completedAt ? (
                          <span>
                            Completed {formatDate(milestone.completedAt)}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <h4 className="mt-2 font-medium">{milestone.title}</h4>
                    {milestone.description ? (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {previewDescription(milestone.description)}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      <CreateProjectMilestoneForm projectSlug={projectSlug} />
    </section>
  );
}
