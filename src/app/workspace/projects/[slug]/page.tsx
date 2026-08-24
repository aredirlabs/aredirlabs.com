import Link from "next/link";
import type { ReactNode } from "react";
import { asc, desc, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { AlertTriangle, ExternalLink } from "lucide-react";

import { Disclosure } from "@/components/ui/disclosure";
import { Surface } from "@/components/ui/surface";
import { ProjectMilestonesSection } from "@/components/workspace/project-milestones-section";
import { ProjectDocumentsSection } from "@/components/workspace/project-documents-section";
import { ProjectPromptsSection } from "@/components/workspace/project-prompts-section";
import { ProjectEngineeringWorkProjectionSection } from "@/components/workspace/project-engineering-work-projection";
import { ProjectOperationalFocusSection } from "@/components/workspace/project-operational-focus-section";
import {
  ProjectFocusHistoryTimeline,
  PROJECT_FOCUS_HISTORY_PAGE_LIMIT,
} from "@/components/workspace/project-focus-history-timeline";
import { ProjectOperatingBrief } from "@/components/workspace/project-operating-brief";
import {
  ProjectOverviewSection,
} from "@/components/workspace/project-overview-section";
import { ProjectNotesSection } from "@/components/workspace/project-notes-section";
import { getDb } from "@/lib/db";
import {
  workspaceProjectMilestones,
  workspaceProjectDocuments,
  workspaceProjectNotes,
  workspaceProjectPrompts,
  workspaceProjects,
  workspaceEngineeringWork,
} from "@/lib/db/schema";
import { formatTimestamp } from "@/lib/workspace/format-date";
import {
  getProjectDocuments,
  getProjectEngineeringWork,
  getProjectFocusEvents,
  getProjectOperationalFocusProjection,
  getProjectPrompts,
  type ProjectFocusEventRecord,
} from "@/lib/workspace/queries";
import { focusedWorkIdSet } from "@/lib/workspace/operational-focus";

export const dynamic = "force-dynamic";

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>;
};

function DetailField({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <dt className="font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 text-sm break-words">{value}</dd>
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
  let milestones: Array<typeof workspaceProjectMilestones.$inferSelect> = [];
  let documents: Array<typeof workspaceProjectDocuments.$inferSelect> = [];
  let prompts: Array<typeof workspaceProjectPrompts.$inferSelect> = [];
  let engineeringWork: Array<typeof workspaceEngineeringWork.$inferSelect> = [];
  let error: string | null = null;
  let notesError: string | null = null;
  let milestonesError: string | null = null;
  let documentsError: string | null = null;
  let promptsError: string | null = null;
  let engineeringWorkError: string | null = null;
  let focusProjection = null as Awaited<
    ReturnType<typeof getProjectOperationalFocusProjection>
  > | null;
  let focusEvents: ProjectFocusEventRecord[] = [];
  let focusEventsTotal = 0;
  let focusProjectionError: string | null = null;
  let focusEventsError: string | null = null;

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

      try {
        documents = await getProjectDocuments(project.id);
      } catch (e) {
        documentsError =
          e instanceof Error ? e.message : "Failed to load documents";
      }

      try {
        prompts = await getProjectPrompts(project.id);
      } catch (e) {
        promptsError =
          e instanceof Error ? e.message : "Failed to load prompts";
      }

      try {
        engineeringWork = await getProjectEngineeringWork(project.id);
      } catch (e) {
        engineeringWorkError =
          e instanceof Error ? e.message : "Failed to load Engineering Work";
      }

      try {
        milestones = await db
          .select()
          .from(workspaceProjectMilestones)
          .where(eq(workspaceProjectMilestones.projectId, project.id))
          .orderBy(asc(workspaceProjectMilestones.sortOrder));
      } catch (e) {
        milestonesError =
          e instanceof Error ? e.message : "Failed to load milestones";
      }

      try {
        focusProjection = await getProjectOperationalFocusProjection({
          projectId: project.id,
          projectStatus: project.status,
        });
      } catch (e) {
        focusProjectionError =
          e instanceof Error ? e.message : "Failed to load operational focus";
      }

      try {
        const focusHistory = await getProjectFocusEvents(project.id, {
          limit: PROJECT_FOCUS_HISTORY_PAGE_LIMIT,
          offset: 0,
        });
        focusEvents = focusHistory.events;
        focusEventsTotal = focusHistory.total;
      } catch (e) {
        focusEventsError =
          e instanceof Error ? e.message : "Failed to load focus selection history";
      }
    }
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load project";
  }

  if (error) {
    return (
      <div className="px-4 py-6 sm:p-8">
        <Link
          href="/workspace/projects"
          className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground"
        >
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

  const focusedIds = focusProjection
    ? focusedWorkIdSet(focusProjection)
    : new Set<string>();

  return (
    <div className="min-w-0 px-4 py-6 sm:p-8">
      <div className="space-y-4">
        <ProjectOperatingBrief project={project}>
          <ProjectOperationalFocusSection
            projectSlug={project.slug}
            focusVersion={focusProjection?.focusVersion ?? 0}
            projection={
              focusProjection ?? {
                currentSelections: [],
                operationalFocus: [],
                mode: "none",
                singletonNextStep: null,
                pluralNextActions: [],
                projectionSuppressed: false,
              }
            }
            focusProjectionError={focusProjectionError}
          />
        </ProjectOperatingBrief>

        <ProjectEngineeringWorkProjectionSection
          projectSlug={project.slug}
          workItems={engineeringWork}
          workItemsError={engineeringWorkError}
          focusedWorkIds={focusedIds}
        />

        <Surface>
          <ProjectFocusHistoryTimeline
            projectSlug={project.slug}
            initialEvents={focusEvents}
            total={focusEventsTotal}
            error={focusEventsError}
          />
        </Surface>

        <Disclosure
          summary="Overview"
          description="Legacy Project text fields and remaining operational metadata."
        >
          <ProjectOverviewSection project={project} />
        </Disclosure>

        <Surface>
          <Disclosure
            summary="Registry record"
            description="Identifier, repository, public URL, and timestamps."
          >
            <dl className="mt-2 grid gap-4 sm:grid-cols-2">
              <DetailField label="Name" value={project.name} />
              <DetailField label="Slug" value={project.slug} />
              <DetailField
                label="Repo URL"
                value={
                  project.repoUrl ? (
                    <Link
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 break-all text-primary underline-offset-4 hover:underline"
                    >
                      {project.repoUrl}
                      <ExternalLink className="size-3.5 shrink-0" />
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
                      className="inline-flex items-center gap-1 break-all text-primary underline-offset-4 hover:underline"
                    >
                      {project.publicUrl}
                      <ExternalLink className="size-3.5 shrink-0" />
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
          </Disclosure>
        </Surface>

        <Disclosure
          summary="Milestones"
          description="Project-authority delivery checkpoints."
          count={milestonesError ? "Unavailable" : milestones.length}
        >
          <ProjectMilestonesSection
            projectSlug={project.slug}
            milestones={milestones}
            milestonesError={milestonesError}
          />
        </Disclosure>

        <Disclosure
          summary="Documents"
          description="Project documents remain reachable from this Project."
          count={documentsError ? "Unavailable" : documents.length}
        >
          <ProjectDocumentsSection
            projectSlug={project.slug}
            documents={documents}
            documentsError={documentsError}
          />
        </Disclosure>

        <Disclosure
          summary="Prompts"
          description="Project prompt records remain reachable from this Project."
          count={promptsError ? "Unavailable" : prompts.length}
        >
          <ProjectPromptsSection
            projectSlug={project.slug}
            prompts={prompts}
            promptsError={promptsError}
          />
        </Disclosure>

        <Disclosure
          summary="Notes"
          description="Project notes remain reachable from this Project."
          count={notesError ? "Unavailable" : notes.length}
        >
          <ProjectNotesSection
            projectSlug={project.slug}
            notes={notes}
            notesError={notesError}
          />
        </Disclosure>
      </div>
    </div>
  );
}
