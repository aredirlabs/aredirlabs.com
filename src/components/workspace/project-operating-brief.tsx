import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, Plus } from "lucide-react";

import { Eyebrow } from "@/components/eyebrow";
import { MetadataField, MetadataGroup } from "@/components/ui/metadata-field";
import { Surface } from "@/components/ui/surface";
import {
  ProjectStageBadge,
  ProjectStatusBadge,
} from "@/components/workspace/project-status-badge";
import type { workspaceProjects } from "@/lib/db/schema";
import { formatDate } from "@/lib/workspace/format-date";
import { projectEngineeringWorkInventoryHref } from "@/lib/workspace/project-engineering-work-projection";

type Project = typeof workspaceProjects.$inferSelect;

type ProjectOperatingBriefProps = {
  project: Project;
  children?: ReactNode;
};

export function ProjectOperatingBrief({
  project,
  children,
}: ProjectOperatingBriefProps) {
  const inventoryHref = projectEngineeringWorkInventoryHref(project.slug);

  return (
    <Surface as="section">
      <Link
        href="/workspace/projects"
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <ArrowLeft className="size-3.5" />
        Project registry
      </Link>

      <div className="mt-6">
        <Eyebrow>Project</Eyebrow>
        <div className="mt-2 flex min-w-0 flex-wrap items-center gap-3">
          <h1 className="min-w-0 text-2xl font-semibold tracking-tight break-words">
            {project.name}
          </h1>
          <ProjectStatusBadge status={project.status} />
          <ProjectStageBadge stage={project.stage} />
        </div>
        {project.category ? (
          <p className="mt-2 text-sm text-muted-foreground">{project.category}</p>
        ) : null}
      </div>

      {project.targetDate ? (
        <MetadataGroup className="mt-6" columns={2}>
          <MetadataField label="Target" value={formatDate(project.targetDate)} />
        </MetadataGroup>
      ) : null}

      <nav
        aria-label="Project"
        className="mt-6 flex min-w-0 flex-wrap items-center gap-2"
      >
        <Link
          href={inventoryHref}
          className="inline-flex items-center rounded-[var(--radius-control)] border border-border px-3 py-1.5 text-sm font-medium hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Engineering Work inventory
        </Link>
        <Link
          href={`${inventoryHref}/new`}
          className="inline-flex items-center gap-1.5 rounded-[var(--radius-control)] border border-border px-3 py-1.5 text-sm font-medium hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Plus className="size-3.5" />
          New Engineering Work
        </Link>
      </nav>

      {children ? <div className="mt-6 min-w-0">{children}</div> : null}
    </Surface>
  );
}
