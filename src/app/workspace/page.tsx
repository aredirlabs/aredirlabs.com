import Link from "next/link";
import { getDb } from "@/lib/db";
import { workspaceProjects } from "@/lib/db/schema";
import { Eyebrow } from "@/components/eyebrow";
import {
  ProjectStageBadge,
  ProjectStatusBadge,
} from "@/components/workspace/project-status-badge";
import { WorkspaceOperatingSnapshot } from "@/components/workspace/workspace-operating-snapshot";
import { getOperatingSnapshot } from "@/lib/workspace/queries";
import { AlertTriangle, FolderOpen } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function WorkspaceDashboard() {
  let projects: Array<typeof workspaceProjects.$inferSelect> = [];
  let error: string | null = null;
  let snapshotError: string | null = null;
  let snapshot: Awaited<ReturnType<typeof getOperatingSnapshot>> | null = null;

  try {
    const db = getDb();
    projects = await db.select().from(workspaceProjects);
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load projects";
  }

  if (!error) {
    try {
      snapshot = await getOperatingSnapshot();
    } catch (e) {
      snapshotError =
        e instanceof Error ? e.message : "Failed to load operating snapshot";
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <Eyebrow>Internal Workspace</Eyebrow>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          Dashboard
        </h1>
      </div>

      {error ? (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="size-5 text-destructive" />
            <div>
              <h2 className="font-semibold text-destructive">
                Database unavailable
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Could not load workspace data. Check that your database is
                running and DATABASE_URL is configured correctly.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <WorkspaceOperatingSnapshot
            snapshot={
              snapshot ?? {
                activeCount: 0,
                testingCount: 0,
                pausedPlanningCount: 0,
                nextMilestone: null,
                blockedMilestones: [],
              }
            }
            error={snapshotError}
          />

          {projects.length === 0 ? (
            <div className="rounded-lg border border-border bg-card p-12 text-center">
              <FolderOpen className="mx-auto size-8 text-muted-foreground" />
              <h2 className="mt-4 font-semibold">No projects found</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Run{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                  npm run db:seed
                </code>{" "}
                to populate the workspace.
              </p>
            </div>
          ) : (
            <>
              <p className="mb-6 text-sm text-muted-foreground">
                {projects.length} registered{" "}
                {projects.length === 1 ? "project" : "projects"}
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/workspace/projects/${project.slug}`}
                    className="rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-accent/30"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <ProjectStatusBadge status={project.status} />
                      <ProjectStageBadge stage={project.stage} />
                    </div>
                    <h2 className="mt-2 font-heading text-lg font-semibold">
                      {project.name}
                    </h2>
                    {project.currentFocus ? (
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        {project.currentFocus}
                      </p>
                    ) : project.description ? (
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        {project.description}
                      </p>
                    ) : null}
                  </Link>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
