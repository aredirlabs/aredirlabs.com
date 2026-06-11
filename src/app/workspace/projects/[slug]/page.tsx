import Link from "next/link";
import type { ReactNode } from "react";
import { desc, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowLeft, ExternalLink } from "lucide-react";

import { Eyebrow } from "@/components/eyebrow";
import { ProjectDetailSections } from "@/components/workspace/project-detail-sections";
import { ProjectNotesSection } from "@/components/workspace/project-notes-section";
import { getDb } from "@/lib/db";
import { workspaceProjectNotes, workspaceProjects } from "@/lib/db/schema";

export const dynamic = "force-dynamic";

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>;
};

function formatTimestamp(value: Date | null) {
  if (!value) return "—";

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);
}

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

export default async function WorkspaceProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;

  if (!slug?.trim()) {
    notFound();
  }

  let project: typeof workspaceProjects.$inferSelect | null = null;
  let notes: Array<typeof workspaceProjectNotes.$inferSelect> = [];
  let error: string | null = null;
  let notesError: string | null = null;

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
        notes = await db
          .select()
          .from(workspaceProjectNotes)
          .where(eq(workspaceProjectNotes.projectId, project.id))
          .orderBy(desc(workspaceProjectNotes.createdAt));
      } catch (e) {
        notesError =
          e instanceof Error ? e.message : "Failed to load project notes";
      }
    }
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load project";
  }

  if (error) {
    return (
      <div className="p-8">
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
                Could not load project details. Check that your database is
                running and DATABASE_URL is configured correctly.
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

  return (
    <div className="p-8">
      <Link
        href="/workspace/projects"
        className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        Project registry
      </Link>

      <div className="mb-8">
        <Eyebrow>Project Detail</Eyebrow>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight">
            {project.name}
          </h1>
          <span className="rounded-full bg-muted px-2.5 py-0.5 font-mono text-xs">
            {project.status}
          </span>
        </div>
        {project.category ? (
          <p className="mt-2 text-sm text-muted-foreground">{project.category}</p>
        ) : null}
      </div>

      <section className="mb-8 rounded-lg border border-border bg-card p-6">
        <h2 className="font-heading text-base font-semibold">Registry record</h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          <DetailField label="Name" value={project.name} />
          <DetailField label="Status" value={project.status} />
          <DetailField label="Category" value={project.category ?? "—"} />
          <DetailField
            label="Description"
            value={project.description ?? "—"}
          />
          <DetailField
            label="Repo URL"
            value={
              project.repoUrl ? (
                <Link
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary underline-offset-4 hover:underline"
                >
                  {project.repoUrl}
                  <ExternalLink className="size-3.5" />
                </Link>
              ) : (
                "—"
              )
            }
          />
          <DetailField
            label="Public URL"
            value={
              project.publicUrl ? (
                <Link
                  href={project.publicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary underline-offset-4 hover:underline"
                >
                  {project.publicUrl}
                  <ExternalLink className="size-3.5" />
                </Link>
              ) : (
                "—"
              )
            }
          />
          <DetailField
            label="Created"
            value={formatTimestamp(project.createdAt)}
          />
          <DetailField
            label="Updated"
            value={formatTimestamp(project.updatedAt)}
          />
        </dl>
      </section>

      <div className="mb-4">
        <ProjectNotesSection
          projectSlug={project.slug}
          notes={notes}
          notesError={notesError}
        />
      </div>

      <ProjectDetailSections />
    </div>
  );
}
