import Link from "next/link";
import { getDb } from "@/lib/db";
import { workspaceProjects } from "@/lib/db/schema";
import { Eyebrow } from "@/components/eyebrow";
import {
  ProjectStageBadge,
  ProjectStatusBadge,
} from "@/components/workspace/project-status-badge";
import { formatDate } from "@/lib/workspace/format-date";
import { AlertTriangle, FolderOpen } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function WorkspaceProjectsPage() {
  let projects: Array<typeof workspaceProjects.$inferSelect> = [];
  let error: string | null = null;

  try {
    const db = getDb();
    projects = await db.select().from(workspaceProjects);
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load projects";
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <Eyebrow>Project Registry</Eyebrow>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          Projects
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
                Could not load project registry. Check that your database is
                running and DATABASE_URL is configured correctly.
              </p>
            </div>
          </div>
        </div>
      ) : projects.length === 0 ? (
        <div className="rounded-lg border border-border bg-card p-12 text-center">
          <FolderOpen className="mx-auto size-8 text-muted-foreground" />
          <h2 className="mt-4 font-semibold">No projects found</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Run{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              npm run db:seed
            </code>{" "}
            to populate the registry.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[960px] text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Stage</th>
                <th className="px-4 py-3 font-medium">Current focus</th>
                <th className="px-4 py-3 font-medium">Next step</th>
                <th className="px-4 py-3 font-medium">Target</th>
                <th className="px-4 py-3 font-medium">Repo</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr
                  key={project.id}
                  className="border-b border-border last:border-0"
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/workspace/projects/${project.slug}`}
                      className="font-medium hover:text-primary hover:underline"
                    >
                      {project.name}
                    </Link>
                    {project.category ? (
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {project.category}
                      </p>
                    ) : null}
                  </td>
                  <td className="px-4 py-3">
                    <ProjectStatusBadge status={project.status} />
                  </td>
                  <td className="px-4 py-3">
                    <ProjectStageBadge stage={project.stage} />
                  </td>
                  <td className="max-w-[220px] px-4 py-3 text-muted-foreground">
                    <span className="line-clamp-2">
                      {project.currentFocus ?? "—"}
                    </span>
                  </td>
                  <td className="max-w-[220px] px-4 py-3 text-muted-foreground">
                    <span className="line-clamp-2">
                      {project.nextStep ?? "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {formatDate(project.targetDate)}
                  </td>
                  <td className="px-4 py-3">
                    {project.repoUrl ? (
                      <Link
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline-offset-4 hover:underline"
                      >
                        {new URL(project.repoUrl).hostname}
                      </Link>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
