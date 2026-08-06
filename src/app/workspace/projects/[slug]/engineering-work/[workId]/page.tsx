import Link from "next/link";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowLeft, ExternalLink, FileQuestion, Pencil } from "lucide-react";

import { Eyebrow } from "@/components/eyebrow";
import {
  EngineeringWorkMetadata,
} from "@/components/workspace/engineering-work-badges";
import { formatTimestamp } from "@/lib/workspace/format-date";
import {
  getEngineeringWorkRepositoryReferences,
  getProjectEngineeringWorkById,
} from "@/lib/workspace/queries";
import { getRelatedKnowledgeForEngineeringWork } from "@/lib/workspace/related-knowledge";
import { getProjectDefectContext } from "@/lib/workspace/defect-context";
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
  let relatedKnowledge: Awaited<ReturnType<typeof getRelatedKnowledgeForEngineeringWork>> = [];
  let defectContext: Awaited<ReturnType<typeof getProjectDefectContext>> = null;
  let error: string | null = null;

  try {
    work = await getProjectEngineeringWorkById(slug, workId);
    if (work) {
      [references, relatedKnowledge, defectContext] = await Promise.all([
        getEngineeringWorkRepositoryReferences(work.id),
        getRelatedKnowledgeForEngineeringWork(work),
        work.workflow === "defect"
          ? getProjectDefectContext(work.projectSlug, work.id)
          : Promise.resolve(null),
      ]);
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
        Back to project · {work.projectName}
      </Link>

      <div className="mb-8">
        <Eyebrow>Engineering Work</Eyebrow>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-semibold tracking-tight">{work.title}</h1>
          <Link href={`/workspace/projects/${work.projectSlug}/engineering-work/${work.id}/edit`} className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><Pencil className="size-3.5" />Edit Engineering Work</Link>
        </div>
      </div>

      <div className="space-y-4">
        <section className="rounded-lg border border-primary/25 bg-card p-6 shadow-sm">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
            <div>
              <p className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.14em] text-primary">
                Engineering objective
              </p>
              <p className="mt-3 text-base leading-7 text-foreground/90">{work.summary}</p>
            </div>
            <div className="rounded-md border border-border bg-background/60 p-4 lg:min-w-64">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-muted-foreground">
                Current position
              </p>
              <div className="mt-3">
                <EngineeringWorkMetadata
                  type={work.type}
                  workflow={work.workflow}
                  state={work.state}
                />
              </div>
            </div>
          </div>
          <div className="mt-6 rounded-md border border-primary/15 bg-primary/5 p-4">
            <p className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.1em] text-primary">
              Recommended next action
            </p>
            <p className="mt-2 text-base font-semibold leading-7 text-foreground">{work.currentNextAction}</p>
          </div>
        </section>

        {work.workflow === "defect" && defectContext ? (
          <section className="rounded-lg border border-border bg-card p-6">
            <div><h2 className="font-heading text-base font-semibold">Defect investigation</h2><p className="mt-1 text-sm text-muted-foreground">Structured investigation context for this Defect Engineering Work.</p></div>
            <dl className="mt-5 grid gap-5 sm:grid-cols-2">
              <DetailField label="Observed Behavior" value={defectContext.observedBehavior} />
              <DetailField label="Expected Behavior" value={defectContext.expectedBehavior} />
              <DetailField label="Reproduction Steps" value={defectContext.reproductionSteps} />
              <DetailField label="Environment" value={defectContext.environment} />
              <DetailField label="Evidence" value={defectContext.evidence} />
              <DetailField label="Next Investigation" value={defectContext.nextInvestigation} />
              <DetailField label="Validation Target" value={defectContext.validationTarget} />
            </dl>
          </section>
        ) : null}

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
          <div>
            <h2 className="font-heading text-base font-semibold">Related knowledge</h2>
            <p className="mt-1 text-sm text-muted-foreground">Read-only context deliberately connected to this Engineering Work. Repository evidence remains separate below.</p>
          </div>
          {relatedKnowledge.length === 0 ? (
            <div className="mt-4 rounded-md border border-dashed border-border bg-muted/20 p-6 text-center">
              <FileQuestion className="mx-auto size-5 text-muted-foreground" />
              <p className="mt-3 text-sm font-medium">No related knowledge has been connected yet.</p>
              <p className="mt-1 text-sm text-muted-foreground">Add or verify supporting architecture, discovery, or validation context before advancing this work.</p>
            </div>
          ) : (
            <ul className="mt-4 space-y-3">
              {relatedKnowledge.map((item) => (
                <li key={item.id} className="rounded-md border border-border bg-background/60 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.description}</p>
                    </div>
                    <span className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-primary">{item.knowledgeClass}</span>
                  </div>
                  <dl className="mt-4 grid gap-4 sm:grid-cols-3">
                    <DetailField label="Project" value={item.projectContext} />
                    <DetailField label="Authority" value={item.authorityLocation} />
                    <DetailField label="Last reviewed / updated" value={item.lastReviewed} />
                  </dl>
                  <Link href={`${item.href}?fromWork=${encodeURIComponent(work.id)}&project=${encodeURIComponent(work.projectSlug)}`} className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    Open {item.knowledgeClass.toLowerCase()}
                    <ExternalLink className="size-3.5" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-lg border border-border bg-card p-6">
          <h2 className="font-heading text-base font-semibold">Related repository artifacts</h2>
          <p className="mt-1 text-sm text-muted-foreground">Read-only references. Artifact bodies remain authoritative in their source repositories.</p>
          {references.length === 0 ? (
            <div className="mt-4 rounded-md border border-dashed border-border bg-muted/20 p-6 text-center">
              <FileQuestion className="mx-auto size-5 text-muted-foreground" />
              <p className="mt-3 text-sm font-medium">No repository evidence is linked yet.</p>
              <p className="mt-1 text-sm text-muted-foreground">This initial representation does not infer or copy repository artifacts.</p>
              <p className="mt-3 text-sm text-muted-foreground">Repository evidence will appear here after validated implementation artifacts are linked to this Engineering Work. Repository contents remain authoritative.</p>
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

        <section className="rounded-lg border border-border bg-muted/20 p-6">
          <h2 className="font-heading text-base font-semibold">Record details</h2>
          <p className="mt-1 text-sm text-muted-foreground">Supporting metadata for this Engineering Work record.</p>
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
