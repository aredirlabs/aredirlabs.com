import Link from "next/link";
import { Plus } from "lucide-react";

import { EmptyState } from "@/components/ui/empty-state";
import { FailureState } from "@/components/ui/failure-state";
import { Surface } from "@/components/ui/surface";
import { ProjectEngineeringWorkRow } from "@/components/workspace/project-engineering-work-row";
import type { workspaceEngineeringWork } from "@/lib/db/schema";
import { groupEngineeringWorkByLifecycle } from "@/lib/workspace/project-engineering-work-projection";

type EngineeringWork = typeof workspaceEngineeringWork.$inferSelect;

type ProjectEngineeringWorkInventoryProps = {
  projectSlug: string;
  projectName: string;
  workItems: EngineeringWork[];
  workItemsError: string | null;
  focusedWorkIds?: Set<string>;
};

export function ProjectEngineeringWorkInventory({
  projectSlug,
  projectName,
  workItems,
  workItemsError,
  focusedWorkIds = new Set(),
}: ProjectEngineeringWorkInventoryProps) {
  const groups = groupEngineeringWorkByLifecycle(workItems);
  const newHref = `/workspace/projects/${projectSlug}/engineering-work/new`;

  return (
    <Surface as="section">
      <div className="flex min-w-0 flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="font-heading text-lg font-semibold">
            Complete inventory
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Every Engineering Work record owned by {projectName}. Grouping is
            the Work record&apos;s own lifecycle state. Order within a group is
            by Work identifier and is not ranking.
          </p>
        </div>
        <Link
          href={newHref}
          className="inline-flex items-center gap-1.5 rounded-[var(--radius-control)] border border-border px-3 py-1.5 text-sm font-medium hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Plus className="size-3.5" />
          New Engineering Work
        </Link>
      </div>

      {workItemsError ? (
        <FailureState
          title="Could not load Engineering Work"
          description="Project identity loaded, but the Engineering Work collection could not be retrieved. Return to the Project and retry."
          failureClass="unknown"
          className="mt-4"
          action={
            <Link
              href={`/workspace/projects/${projectSlug}`}
              className="text-sm font-medium underline-offset-4 hover:underline"
            >
              Return to Project
            </Link>
          }
        />
      ) : workItems.length === 0 ? (
        <EmptyState
          title="No Engineering Work in this Project."
          description="This Project owns no Engineering Work records yet. This is an empty collection, not a retrieval failure."
          className="mt-4"
          action={
            <Link
              href={newHref}
              className="text-sm font-medium underline-offset-4 hover:underline"
            >
              Create Engineering Work
            </Link>
          }
        />
      ) : (
        <>
          <p className="mt-4 text-sm text-muted-foreground" role="status">
            {workItems.length} Engineering Work{" "}
            {workItems.length === 1 ? "record" : "records"} owned by this Project.
          </p>
          <div className="mt-4 space-y-6">
            {groups.map((group) => (
              <div key={group.state}>
                <h3 className="font-mono text-[var(--type-state)] uppercase tracking-[0.1em] text-muted-foreground">
                  {group.label}
                  <span className="ms-2 font-normal text-muted-foreground/80">
                    {group.items.length}
                  </span>
                </h3>
                <ul
                  className="mt-2 divide-y divide-border overflow-hidden rounded-[var(--radius-inset)] border border-border"
                  aria-label={`${group.label} Engineering Work`}
                >
                  {group.items.map((work) => (
                    <li key={work.id}>
                      <ProjectEngineeringWorkRow
                        projectSlug={projectSlug}
                        work={work}
                        focused={focusedWorkIds.has(work.id)}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </>
      )}
    </Surface>
  );
}
