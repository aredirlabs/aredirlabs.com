import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowLeft } from "lucide-react";

import { Eyebrow } from "@/components/eyebrow";
import {
  PromptStatusBadge,
  PromptTypeBadge,
} from "@/components/workspace/prompt-badges";
import { formatTimestamp } from "@/lib/workspace/format-date";
import { getProjectPromptById } from "@/lib/workspace/queries";

export const dynamic = "force-dynamic";

type ProjectPromptDetailPageProps = {
  params: Promise<{ slug: string; promptId: string }>;
};

function TextBlock({
  title,
  content,
  emptyText = "Not captured.",
}: {
  title: string;
  content: string | null;
  emptyText?: string;
}) {
  const blocks = (content ?? "")
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <section className="border-t border-border pt-5">
      <h2 className="font-heading text-sm font-semibold">{title}</h2>
      {blocks.length > 0 ? (
        <div className="mt-3 space-y-3 text-sm leading-7 text-foreground/90">
          {blocks.map((block, index) => (
            <p key={index} className="whitespace-pre-line">
              {block}
            </p>
          ))}
        </div>
      ) : (
        <p className="mt-3 text-sm text-muted-foreground">{emptyText}</p>
      )}
    </section>
  );
}

export default async function ProjectPromptDetailPage({
  params,
}: ProjectPromptDetailPageProps) {
  const { slug, promptId } = await params;

  if (!slug?.trim() || !promptId?.trim()) {
    notFound();
  }

  let prompt: Awaited<ReturnType<typeof getProjectPromptById>> | null = null;
  let error: string | null = null;

  try {
    prompt = await getProjectPromptById(slug, promptId);
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load prompt";
  }

  if (error) {
    return (
      <div className="p-8">
        <Link
          href={`/workspace/projects/${slug}`}
          className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          Project detail
        </Link>
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="size-5 text-destructive" />
            <div>
              <h1 className="font-semibold text-destructive">
                Could not load prompt
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Check that the database is reachable and the prompt table has
                been pushed.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!prompt) {
    notFound();
  }

  return (
    <div className="p-8">
      <Link
        href={`/workspace/projects/${prompt.projectSlug}`}
        className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        {prompt.projectName}
      </Link>

      <article className="max-w-3xl rounded-lg border border-border bg-card p-6">
        <Eyebrow>Project Prompt</Eyebrow>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight">
            {prompt.title}
          </h1>
          <PromptTypeBadge type={prompt.promptType} />
          <PromptStatusBadge status={prompt.status} />
        </div>
        <p className="mt-2 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
          Updated {formatTimestamp(prompt.updatedAt)}
        </p>

        <div className="mt-8 space-y-5">
          <TextBlock title="Prompt body" content={prompt.promptBody} />
          <TextBlock title="Result summary" content={prompt.resultSummary} />
          <TextBlock title="Files changed" content={prompt.filesChanged} />
          <TextBlock title="Verification" content={prompt.verification} />
          <TextBlock title="Follow-ups" content={prompt.followUps} />
        </div>
      </article>
    </div>
  );
}
