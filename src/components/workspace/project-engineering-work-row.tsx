import type { workspaceEngineeringWork } from "@/lib/db/schema";
import {
  EngineeringWorkStateBadge,
  EngineeringWorkTypeBadge,
  EngineeringWorkWorkflowBadge,
} from "@/components/workspace/engineering-work-badges";
import { OperationalFocusMarker } from "@/components/workspace/operational-focus-marker";
import { OperationalRow } from "@/components/ui/structured-row";
import { projectEngineeringWorkDetailHref } from "@/lib/workspace/project-engineering-work-projection";

export type ProjectEngineeringWorkRowItem = Pick<
  typeof workspaceEngineeringWork.$inferSelect,
  "id" | "title" | "type" | "workflow" | "state" | "currentNextAction"
>;

type ProjectEngineeringWorkRowProps = {
  projectSlug: string;
  work: ProjectEngineeringWorkRowItem;
  focused?: boolean;
};

export function ProjectEngineeringWorkRow({
  projectSlug,
  work,
  focused = false,
}: ProjectEngineeringWorkRowProps) {
  return (
    <OperationalRow
      href={projectEngineeringWorkDetailHref(projectSlug, work.id)}
      primary={work.title}
      state={<EngineeringWorkStateBadge state={work.state} />}
      secondary={
        work.currentNextAction?.trim()
          ? work.currentNextAction
          : "No current next action recorded."
      }
      metadata={
        <>
          <EngineeringWorkTypeBadge type={work.type} />
          <EngineeringWorkWorkflowBadge workflow={work.workflow} />
          {focused ? <OperationalFocusMarker /> : null}
        </>
      }
    />
  );
}
