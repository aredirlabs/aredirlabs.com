import Link from "next/link";
import { AlertTriangle, MessageSquareText } from "lucide-react";

import { Eyebrow } from "@/components/eyebrow";
import {
  PromptStatusBadge,
  PromptTypeBadge,
} from "@/components/workspace/prompt-badges";
import { formatDate } from "@/lib/workspace/format-date";
import {
  getWorkspacePromptProjects,
  searchWorkspacePrompts,
} from "@/lib/workspace/queries";
import {
  WORKSPACE_PROJECT_PROMPT_STATUS_LABELS,
  WORKSPACE_PROJECT_PROMPT_STATUSES,
} from "@/lib/workspace/prompt-status";
import {
  WORKSPACE_PROJECT_PROMPT_TYPE_LABELS,
  WORKSPACE_PROJECT_PROMPT_TYPES,
} from "@/lib/workspace/prompt-types";

export const dynamic = "force-dynamic";

type WorkspacePromptsPageProps = {
  searchParams: Promise<{
    project?: string;
    type?: string;
    status?: string;
    q?: string;
  }>;
};

export default async function WorkspacePromptsPage({
  searchParams,
}: WorkspacePromptsPageProps) {
  const filters = await searchParams;
  const project = typeof filters.project === "string" ? filters.project : "";
  const type = typeof filters.type === "string" ? filters.type : "";
  const status = typeof filters.status === "string" ? filters.status : "";
  const q = typeof filters.q === "string" ? filters.q.trim() : "";
  let prompts: Awaited<ReturnType<typeof searchWorkspacePrompts>> = [];
  let projects: Awaited<ReturnType<typeof getWorkspacePromptProjects>> = [];
  let error: string | null = null;

  try {
    const [promptRows, projectRows] = await Promise.all([
      searchWorkspacePrompts({ project, type, status, q }),
      getWorkspacePromptProjects(),
    ]);
    prompts = promptRows;
    projects = projectRows;
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load prompts";
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <Eyebrow>Prompt Library</Eyebrow>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">Prompts</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Recent implementation prompts, agent results, verification notes, and
          follow-ups across workspace projects.
        </p>
      </div>

      <form className="mb-6 grid gap-3 lg:grid-cols-[1fr_12rem_12rem_12rem_auto]">
        <label className="sr-only" htmlFor="prompt-search">
          Search prompt titles
        </label>
        <input
          id="prompt-search"
          name="q"
          type="search"
          defaultValue={q}
          placeholder="Search by title"
          className="min-h-9 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />

        <label className="sr-only" htmlFor="prompt-project-filter">
          Project
        </label>
        <select
          id="prompt-project-filter"
          name="project"
          defaultValue={project}
          className="min-h-9 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">All projects</option>
          {projects.map((projectOption) => (
            <option key={projectOption.slug} value={projectOption.slug}>
              {projectOption.name}
            </option>
          ))}
        </select>

        <label className="sr-only" htmlFor="prompt-type-filter">
          Type
        </label>
        <select
          id="prompt-type-filter"
          name="type"
          defaultValue={type}
          className="min-h-9 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">All types</option>
          {WORKSPACE_PROJECT_PROMPT_TYPES.map((promptType) => (
            <option key={promptType} value={promptType}>
              {WORKSPACE_PROJECT_PROMPT_TYPE_LABELS[promptType]}
            </option>
          ))}
        </select>

        <label className="sr-only" htmlFor="prompt-status-filter">
          Status
        </label>
        <select
          id="prompt-status-filter"
          name="status"
          defaultValue={status}
          className="min-h-9 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">All statuses</option>
          {WORKSPACE_PROJECT_PROMPT_STATUSES.map((promptStatus) => (
            <option key={promptStatus} value={promptStatus}>
              {WORKSPACE_PROJECT_PROMPT_STATUS_LABELS[promptStatus]}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="inline-flex min-h-9 items-center justify-center rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
        >
          Filter
        </button>
      </form>

      {error ? (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-destructive" />
            <div>
              <p className="text-sm font-medium text-destructive">
                Could not load prompts
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Check that the database is reachable and the prompt table has
                been pushed.
              </p>
            </div>
          </div>
        </div>
      ) : prompts.length === 0 ? (
        <div className="rounded-md border border-dashed border-border bg-muted/20 p-8 text-center">
          <MessageSquareText className="mx-auto size-6 text-muted-foreground" />
          <p className="mt-3 text-sm font-medium">
            {q || project || type || status ? "No matching prompts" : "No prompts yet"}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {q || project || type || status
              ? "Try a different project, type, status, or title search."
              : "Create the first prompt from a project detail page."}
          </p>
        </div>
      ) : (
        <ul className="grid gap-4 lg:grid-cols-2">
          {prompts.map((prompt) => (
            <li
              key={prompt.id}
              className="rounded-lg border border-border bg-card p-5 transition-colors hover:bg-accent/40"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <PromptTypeBadge type={prompt.promptType} />
                  <PromptStatusBadge status={prompt.status} />
                </div>
                <time
                  dateTime={prompt.updatedAt.toISOString()}
                  className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-muted-foreground"
                >
                  Updated {formatDate(prompt.updatedAt)}
                </time>
              </div>
              <h2 className="mt-3 font-heading text-base font-semibold">
                <Link
                  href={`/workspace/projects/${prompt.projectSlug}/prompts/${prompt.id}`}
                  className="underline-offset-4 hover:underline"
                >
                  {prompt.title}
                </Link>
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {prompt.projectName}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
