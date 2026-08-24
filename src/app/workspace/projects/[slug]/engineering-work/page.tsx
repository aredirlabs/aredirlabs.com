import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { AlertTriangle, ArrowLeft } from "lucide-react";

import { Eyebrow } from "@/components/eyebrow";
import { ProjectEngineeringWorkInventory } from "@/components/workspace/project-engineering-work-inventory";
import {
  ProjectStageBadge,
  ProjectStatusBadge,
} from "@/components/workspace/project-status-badge";
import { getDb } from "@/lib/db";
import { workspaceProjects } from "@/lib/db/schema";
import {
  getProjectEngineeringWork,
  getProjectOperationalFocusProjection,
} from "@/lib/workspace/queries";
import { focusedWorkIdSet } from "@/lib/workspace/operational-focus";

export const dynamic = "force-dynamic";

type ProjectEngineeringWorkInventoryPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectEngineeringWorkInventoryPage({
  params,
}: ProjectEngineeringWorkInventoryPageProps) {
  const { slug } = await params;

  if (!slug?.trim()) {
    notFound();
  }

  let project: typeof workspaceProjects.$inferSelect | null = null;
  let error: string | null = null;
  let engineeringWork: Awaited<ReturnType<typeof getProjectEngineeringWork>> = [];
  let engineeringWorkError: string | null = null;
  let focusProjection = null as Awaited<
    ReturnType<typeof getProjectOperationalFocusProjection>
  > | null;

  try {
    const db = getDb();
    const rows = await db
      .select()
      .from(workspaceProjects)
      .where(eq(workspaceProjects.slug, slug))
      .limit(1);
    project = rows[0] ?? null;

    if (project) {
      try {
        engineeringWork = await getProjectEngineeringWork(project.id);
      } catch (e) {
        engineeringWorkError =
          e instanceof Error ? e.message : "Failed to load Engineering Work";
      }

      try {
        focusProjection = await getProjectOperationalFocusProjection({
          projectId: project.id,
          projectStatus: project.status,
        });
      } catch {
        focusProjection = null;
      }
    }
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load project";
  }

  if (error) {
    return (
      <div className="min-w-0 px-4 py-6 sm:p-8">
        <Link
          href="/workspace/projects"
          className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          Project registry
        </Link>
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="size-5 text-destructive" />
            <div>
              <h1 className="font-semibold text-destructive">
                Database unavailable
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Could not load this Project&apos;s Engineering Work inventory.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    notFound();
  }

  const focusedIds = focusProjection
    ? focusedWorkIdSet(focusProjection)
    : new Set<string>();

  return (
    <div className="min-w-0 px-4 py-6 sm:p-8">
      <Link
        href={`/workspace/projects/${project.slug}`}
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <ArrowLeft className="size-3.5" />
        Back to project · {project.name}
      </Link>

      <div className="mt-6 mb-8 min-w-0">
        <Eyebrow>Project Engineering Work</Eyebrow>
        <div className="mt-2 flex min-w-0 flex-wrap items-center gap-3">
          <h1 className="min-w-0 text-2xl font-semibold tracking-tight break-words">
            {project.name}
          </h1>
          <ProjectStatusBadge status={project.status} />
          <ProjectStageBadge stage={project.stage} />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Complete Project-scoped Engineering Work inventory. Opening a record
          does not change Operational Focus.
        </p>
      </div>

      <ProjectEngineeringWorkInventory
        projectSlug={project.slug}
        projectName={project.name}
        workItems={engineeringWork}
        workItemsError={engineeringWorkError}
        focusedWorkIds={focusedIds}
      />
    </div>
  );
}
