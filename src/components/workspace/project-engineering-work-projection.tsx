import Link from "next/link";
import { Plus } from "lucide-react";

import { EmptyState } from "@/components/ui/empty-state";
import { FailureState } from "@/components/ui/failure-state";
import { Surface } from "@/components/ui/surface";
import { ProjectEngineeringWorkRow } from "@/components/workspace/project-engineering-work-row";
import type { workspaceEngineeringWork } from "@/lib/db/schema";
import {
  projectBoundedEngineeringWork,
  projectEngineeringWorkInventoryHref,
} from "@/lib/workspace/project-engineering-work-projection";

type EngineeringWork = typeof workspaceEngineeringWork.$inferSelect;

type ProjectEngineeringWorkProjectionSectionProps = {
  projectSlug: string;
  workItems: EngineeringWork[];
  workItemsError: string | null;
  focusedWorkIds?: Set<string>;
};

export function ProjectEngineeringWorkProjectionSection({
  projectSlug,
  workItems,
  workItemsError,
  focusedWorkIds = new Set(),
}: ProjectEngineeringWorkProjectionSectionProps) {
  const inventoryHref = projectEngineeringWorkInventoryHref(projectSlug);
  const projection = projectBoundedEngineeringWork(workItems);

  return (
    <Surface as="section">
      <div className="flex min-w-0 flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="font-heading text-lg font-semibold">Engineering Work</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Bounded Project projection. Presentation order is by Work identifier
            and is not focus, continuation, attention, priority, or importance.
          </p>
        </div>
        <Link
          href={`${inventoryHref}/new`}
          className="inline-flex items-center gap-1.5 rounded-[var(--radius-control)] border border-border px-3 py-1.5 text-sm font-medium hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Plus className="size-3.5" />
          New Engineering Work
        </Link>
      </div>

      {workItemsError ? (
        <>
          <FailureState
            title="Could not load Engineering Work"
            description="Project details loaded, but Engineering Work could not be retrieved. The complete inventory remains the recovery path once retrieval succeeds."
            failureClass="unknown"
            className="mt-4"
            action={
              <Link
                href={inventoryHref}
                className="text-sm font-medium underline-offset-4 hover:underline"
              >
                Open Engineering Work inventory
              </Link>
            }
          />
        </>
      ) : (
        <>
          <p className="mt-4 text-sm text-muted-foreground" role="status">
            {projection.total === 0
              ? "0 Engineering Work records in this Project."
              : projection.omitted > 0
                ? `Showing ${projection.items.length} of ${projection.total} Engineering Work records (bound ${projection.bound}).`
                : `${projection.total} Engineering Work ${projection.total === 1 ? "record" : "records"} in this Project.`}
          </p>

          {projection.total === 0 ? (
            <EmptyState
              title="No Engineering Work yet."
              description="This Project has no Engineering Work records. Absence is distinct from a retrieval failure."
              className="mt-4"
              action={
                <Link
                  href={inventoryHref}
                  className="text-sm font-medium underline-offset-4 hover:underline"
                >
                  View Engineering Work inventory
                </Link>
              }
            />
          ) : (
            <ul
              className="mt-4 divide-y divide-border overflow-hidden rounded-[var(--radius-inset)] border border-border"
              aria-label="Bounded Engineering Work projection"
            >
              {projection.items.map((work) => (
                <li key={work.id}>
                  <ProjectEngineeringWorkRow
                    projectSlug={projectSlug}
                    work={work}
                    focused={focusedWorkIds.has(work.id)}
                  />
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      <p className="mt-4">
        <Link
          href={inventoryHref}
          className="text-sm font-medium underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          View all Project Engineering Work
        </Link>
      </p>
    </Surface>
  );
}
