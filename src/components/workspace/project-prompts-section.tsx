import Link from "next/link";
import { AlertTriangle, MessageSquareText } from "lucide-react";

import { CreateProjectPromptForm } from "@/components/workspace/create-project-prompt-form";
import {
  PromptStatusBadge,
  PromptTypeBadge,
} from "@/components/workspace/prompt-badges";
import type { workspaceProjectPrompts } from "@/lib/db/schema";
import { formatDate } from "@/lib/workspace/format-date";

type Prompt = typeof workspaceProjectPrompts.$inferSelect;

type ProjectPromptsSectionProps = {
  projectSlug: string;
  prompts: Prompt[];
  promptsError: string | null;
};

function previewText(value: string | null, maxLength = 180) {
  if (!value) return "No result summary captured yet.";
  const normalized = value.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength).trimEnd()}...`;
}

export function ProjectPromptsSection({
  projectSlug,
  prompts,
  promptsError,
}: ProjectPromptsSectionProps) {
  return (
    <section className="rounded-lg border border-border bg-card p-6">
      <h2 className="font-heading text-base font-semibold">Prompts</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Implementation prompts, agent results, verification notes, and follow-ups.
      </p>

      {promptsError ? (
        <div className="mt-4 rounded-md border border-destructive/30 bg-destructive/10 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-destructive" />
            <div>
              <p className="text-sm font-medium text-destructive">
                Could not load prompts
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Project details loaded, but prompt history failed to load. Try
                refreshing the page.
              </p>
            </div>
          </div>
        </div>
      ) : prompts.length === 0 ? (
        <div className="mt-4 rounded-md border border-dashed border-border bg-muted/20 p-6 text-center">
          <MessageSquareText className="mx-auto size-5 text-muted-foreground" />
          <p className="mt-3 text-sm font-medium">No prompts yet.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Capture the first implementation prompt or agent result for this project.
          </p>
        </div>
      ) : (
        <ul className="mt-4 space-y-3">
          {prompts.map((prompt) => (
            <li
              key={prompt.id}
              className="rounded-md border border-border bg-background/60 p-4"
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
              <h4 className="mt-2 font-medium">
                <Link
                  href={`/workspace/projects/${projectSlug}/prompts/${prompt.id}`}
                  className="underline-offset-4 hover:underline"
                >
                  {prompt.title}
                </Link>
              </h4>
              <p className="mt-1 text-sm text-muted-foreground">
                {previewText(prompt.resultSummary)}
              </p>
            </li>
          ))}
        </ul>
      )}

      <CreateProjectPromptForm projectSlug={projectSlug} />
    </section>
  );
}
