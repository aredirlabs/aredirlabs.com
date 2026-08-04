import Link from "next/link";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowLeft, ExternalLink, FileQuestion } from "lucide-react";

import { Eyebrow } from "@/components/eyebrow";
import {
  EngineeringWorkMetadata,
} from "@/components/workspace/engineering-work-badges";
import { formatTimestamp } from "@/lib/workspace/format-date";
import {
  getEngineeringWorkRepositoryReferences,
  getProjectEngineeringWorkById,
} from "@/lib/workspace/queries";
import {
  ENGINEERING_WORK_REFERENCE_AUTHORITY_LABELS,
  ENGINEERING_WORK_REFERENCE_STATUS_LABELS,
} from "@/lib/workspace/engineering-work";

export const dynamic = "force-dynamic";

type EngineeringWorkDetailPageProps = {
  params: Promise<{ slug: string; workId: string }>;
};

function DetailField({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div>
      <dt className="font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 text-sm">{value}</dd>
    </div>
  );
}

function navigableUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : null;
  } catch {
    return null;
  }
}

export default async function EngineeringWorkDetailPage({
  params,
}: EngineeringWorkDetailPageProps) {
  const { slug, workId } = await params;

  if (!slug?.trim() || !workId?.trim()) {
    notFound();
  }

  let work: Awaited<ReturnType<typeof getProjectEngineeringWorkById>> | null = null;
  let references: Awaited<ReturnType<typeof getEngineeringWorkRepositoryReferences>> = [];
  let error: string | null = null;

  try {
    work = await getProjectEngineeringWorkById(slug, workId);
    if (work) {
      references = await getEngineeringWorkRepositoryReferences(work.id);
    }
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load Engineering Work";
  }

  if (error) {
    return (
      <div className="p-8">
        <Link href={`/workspace/projects/${slug}`} className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-3.5" />
          Project detail
        </Link>
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="size-5 text-destructive" />
            <div>
              <h1 className="font-semibold text-destructive">Could not load Engineering Work</h1>
              <p className="mt-1 text-sm text-muted-foreground">Check that the database is reachable and the Engineering Work migration has been applied.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!work) {
    notFound();
  }

  return (
    <div className="p-8">
      <Link href={`/workspace/projects/${work.projectSlug}`} className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <ArrowLeft className="size-3.5" />
        {work.projectName}
      </Link>

      <div className="mb-8">
        <Eyebrow>Engineering Work</Eyebrow>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">{work.title}</h1>
        <div className="mt-3">
          <EngineeringWorkMetadata
            type={work.type}
            workflow={work.workflow}
            state={work.state}
          />
        </div>
      </div>

      <div className="space-y-4">
        <section className="rounded-lg border border-border bg-card p-6">
          <h2 className="font-heading text-base font-semibold">Summary</h2>
          <p className="mt-3 text-sm leading-7 text-foreground/90">{work.summary}</p>
        </section>

        <section className="rounded-lg border border-border bg-card p-6">
          <h2 className="font-heading text-base font-semibold">Current next action</h2>
          <p className="mt-3 text-sm leading-7 text-foreground/90">{work.currentNextAction}</p>
        </section>

        {work.currentOutcome ? (
          <section className="rounded-lg border border-border bg-card p-6">
            <h2 className="font-heading text-base font-semibold">Current outcome</h2>
            <p className="mt-3 text-sm leading-7 text-foreground/90">{work.currentOutcome}</p>
          </section>
        ) : null}

        {work.condition ? (
          <section className="rounded-lg border border-border bg-card p-6">
            <h2 className="font-heading text-base font-semibold">Condition</h2>
            <p className="mt-3 text-sm font-medium">{work.condition}</p>
            {work.conditionRationale ? <p className="mt-2 text-sm leading-7 text-muted-foreground">{work.conditionRationale}</p> : null}
          </section>
        ) : null}

        <section className="rounded-lg border border-border bg-card p-6">
          <h2 className="font-heading text-base font-semibold">Related repository artifacts</h2>
          <p className="mt-1 text-sm text-muted-foreground">Read-only references. Artifact bodies remain authoritative in their source repositories.</p>
          {references.length === 0 ? (
            <div className="mt-4 rounded-md border border-dashed border-border bg-muted/20 p-6 text-center">
              <FileQuestion className="mx-auto size-5 text-muted-foreground" />
              <p className="mt-3 text-sm font-medium">No repository references recorded.</p>
              <p className="mt-1 text-sm text-muted-foreground">This initial representation does not infer or copy repository artifacts.</p>
            </div>
          ) : (
            <ul className="mt-4 space-y-3">
              {references.map((reference) => {
                const sourceUrl = navigableUrl(reference.sourceLocation);
                return (
                  <li key={reference.id} className="rounded-md border border-border bg-background/60 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-medium">{reference.artifactClass}</p>
                      <span className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-muted-foreground">{ENGINEERING_WORK_REFERENCE_STATUS_LABELS[reference.referenceStatus]}</span>
                    </div>
                    <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                      <DetailField label="Repository" value={reference.repository} />
                      <DetailField label="Authority" value={ENGINEERING_WORK_REFERENCE_AUTHORITY_LABELS[reference.authority]} />
                      <DetailField label="Identifier" value={reference.artifactIdentifier ?? "—"} />
                      <DetailField label="Branch" value={reference.branch ?? "—"} />
                      <DetailField label="Commit" value={reference.commitHash ?? "—"} />
                      <DetailField label="Last reviewed" value={reference.lastReviewedAt ? formatTimestamp(reference.lastReviewedAt) : "—"} />
                    </dl>
                    <div className="mt-4">
                      <p className="font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">Source location</p>
                      {sourceUrl ? <Link href={sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex break-all text-sm text-primary underline-offset-4 hover:underline"><span>{reference.sourceLocation}</span><ExternalLink className="ml-1 mt-0.5 size-3.5 shrink-0" /></Link> : <p className="mt-1 break-all text-sm text-muted-foreground">{reference.sourceLocation}</p>}
                    </div>
                    {reference.note ? <p className="mt-4 text-sm text-muted-foreground">{reference.note}</p> : null}
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section className="rounded-lg border border-border bg-card p-6">
          <h2 className="font-heading text-base font-semibold">Record details</h2>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            <DetailField label="Priority" value={work.priority ?? "—"} />
            <DetailField label="Created" value={formatTimestamp(work.createdAt)} />
            <DetailField label="Updated" value={formatTimestamp(work.updatedAt)} />
          </dl>
        </section>
      </div>
    </div>
  );
}
