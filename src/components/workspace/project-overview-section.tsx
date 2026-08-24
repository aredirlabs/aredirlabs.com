import type { ReactNode } from "react";
import type { workspaceProjects } from "@/lib/db/schema";
import {
  ProjectStageBadge,
  ProjectStatusBadge,
} from "@/components/workspace/project-status-badge";
import { formatDate } from "@/lib/workspace/format-date";

type Project = typeof workspaceProjects.$inferSelect;

type ProjectOverviewSectionProps = {
  project: Project;
};

function DetailField({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  return (
    <div>
      <dt className="font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 text-sm">{value}</dd>
    </div>
  );
}

export function ProjectOverviewSection({ project }: ProjectOverviewSectionProps) {
  return (
    <section className="rounded-lg border border-border bg-card p-6">
      <h2 className="font-heading text-base font-semibold">Overview</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Operational status and registry metadata for this project.
      </p>

      <dl className="mt-4 grid gap-4 sm:grid-cols-2">
        <DetailField label="Status" value={<ProjectStatusBadge status={project.status} />} />
        <DetailField label="Stage" value={<ProjectStageBadge stage={project.stage} />} />
        <DetailField
          label="Legacy focus text (deprecated)"
          value={project.currentFocus ?? "—"}
        />
        <DetailField
          label="Legacy next step text (deprecated)"
          value={project.nextStep ?? "—"}
        />
        <DetailField
          label="Target date"
          value={formatDate(project.targetDate)}
        />
        <DetailField label="Category" value={project.category ?? "—"} />
        <DetailField
          label="Description"
          value={project.description ?? "—"}
        />
      </dl>
    </section>
  );
}

export function ProjectCurrentFocusSection({ project }: ProjectOverviewSectionProps) {
  return (
    <section className="rounded-lg border border-border bg-card p-6">
      <h2 className="font-heading text-base font-semibold">Legacy focus text</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Deprecated seed prose. Authoritative operational focus is structured selection
        above, not this free-text field.
      </p>
      {project.currentFocus ? (
        <p className="mt-2 text-sm">{project.currentFocus}</p>
      ) : (
        <p className="mt-2 text-sm text-muted-foreground">No legacy focus text.</p>
      )}
      {project.nextStep ? (
        <div className="mt-4 rounded-md border border-border bg-muted/20 p-4">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-muted-foreground">
            Legacy next step text
          </p>
          <p className="mt-1 text-sm">{project.nextStep}</p>
        </div>
      ) : null}
    </section>
  );
}
