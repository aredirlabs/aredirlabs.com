import Link from "next/link";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowLeft, CircleCheck, ExternalLink, FileQuestion, Pencil } from "lucide-react";

import { Eyebrow } from "@/components/eyebrow";
import {
  EngineeringWorkMetadata,
} from "@/components/workspace/engineering-work-badges";
import { formatTimestamp } from "@/lib/workspace/format-date";
import {
  getEngineeringWorkRepositoryReferences,
  getProjectEngineeringWorkById,
  getProjectEngineeringWorkHistory,
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

function EngineeringWorkHistory({
  events,
}: {
  events: Awaited<ReturnType<typeof getProjectEngineeringWorkHistory>>;
}) {
  return (
    <section className="rounded-lg border border-border bg-card p-6">
      <h2 className="font-heading text-base font-semibold">Lifecycle history</h2>
      <p className="mt-1 text-sm text-muted-foreground">Append-only operational and decision history. Action and decision actors remain distinct.</p>
      {events.length === 0 ? <p className="mt-4 text-sm text-muted-foreground">No post-migration lifecycle history has been recorded.</p> : (
        <ol className="mt-5 space-y-4">
          {events.map((event) => {
            const basis = typeof event.decisionBasis.summary === "string" ? event.decisionBasis.summary : null;
            return (
              <li key={event.id} className="rounded-md border border-border bg-background/60 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2"><p className="font-medium">{event.actionType.replaceAll("_", " ")}</p><time className="font-mono text-xs text-muted-foreground">{formatTimestamp(event.occurredAt)}</time></div>
                {event.priorState || event.resultingState ? <p className="mt-2 text-sm text-muted-foreground">{event.priorState ?? "—"} → {event.resultingState ?? "—"}</p> : null}
                {event.decision ? <p className="mt-3 text-sm">{event.decision}</p> : null}
                {event.rationale ? <p className="mt-2 text-sm text-muted-foreground">{event.rationale}</p> : null}
                {basis ? <p className="mt-2 text-sm text-muted-foreground"><span className="font-medium text-foreground">Basis:</span> {basis}</p> : null}
                <dl className="mt-4 grid gap-3 border-t border-border pt-3 text-sm sm:grid-cols-2">
                  <DetailField label="Action actor" value={event.actionActorDisplayName ?? event.actionActorIdentifier} />
                  <DetailField label="Decision actor" value={event.decisionActorDisplayName ?? event.decisionActorIdentifier ?? "No decision actor"} />
                  <DetailField label="Decision role" value={event.decisionRole ?? "—"} />
                  <DetailField label="Authority" value={event.authorityType ?? "—"} />
                </dl>
                {event.previousNextAction !== event.resultingNextAction ? <p className="mt-3 text-sm text-muted-foreground"><span className="font-medium text-foreground">Next Action:</span> {event.previousNextAction ?? "—"} → {event.resultingNextAction ?? "—"}</p> : null}
                {event.previousOutcome !== event.resultingOutcome ? <p className="mt-2 text-sm text-muted-foreground"><span className="font-medium text-foreground">Outcome:</span> {event.previousOutcome ?? "—"} → {event.resultingOutcome ?? "—"}</p> : null}
                {event.resultingFinalDisposition ? <p className="mt-2 text-sm text-muted-foreground"><span className="font-medium text-foreground">Final disposition:</span> {event.resultingFinalDisposition}</p> : null}
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
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
  let history: Awaited<ReturnType<typeof getProjectEngineeringWorkHistory>> = [];
  let error: string | null = null;

  try {
    work = await getProjectEngineeringWorkById(slug, workId);
    if (work) {
      [references, relatedKnowledge, defectContext, history] = await Promise.all([
        getEngineeringWorkRepositoryReferences(work.id),
        getRelatedKnowledgeForEngineeringWork(work),
        work.workflow === "defect"
          ? getProjectDefectContext(work.projectSlug, work.id)
          : Promise.resolve(null),
        getProjectEngineeringWorkHistory(work.projectSlug, work.id),
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

  if (work.workflow === "defect" && defectContext) {
    const isHistoricalPosture = [
      "completed",
      "closed",
      "cancelled",
      "superseded",
    ].includes(work.state);

    return (
      <div className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <div className="mx-auto max-w-5xl">
          <Link
            href={`/workspace/projects/${work.projectSlug}`}
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowLeft className="size-3.5" />
            Back to project · {work.projectName}
          </Link>

          <header className="mt-6 border-b border-border pb-7 sm:mt-8 sm:pb-8">
            <Eyebrow>Defect Engineering Work</Eyebrow>
            <h1 className="mt-2 max-w-4xl text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
              {work.title}
            </h1>
            <div className="mt-4">
              <EngineeringWorkMetadata
                type={work.type}
                workflow={work.workflow}
                state={work.state}
              />
            </div>
            <div className="mt-6 max-w-3xl">
              <p className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Defect synopsis
              </p>
              <p className="mt-2 text-base leading-7 text-foreground/90 sm:text-lg sm:leading-8">
                {work.summary}
              </p>
            </div>
          </header>

          <main className="mt-6 space-y-10 sm:mt-8 sm:space-y-12">
            <section
              aria-labelledby="current-action-heading"
              className="overflow-hidden rounded-lg border border-primary/30 bg-primary/5 shadow-sm"
            >
              <div className="border-l-4 border-primary px-5 py-5 sm:px-6 sm:py-6">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                  <div className="max-w-3xl">
                    <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-primary">
                      Current operational next action{isHistoricalPosture ? " · historical" : ""}
                    </p>
                    <h2 id="current-action-heading" className="mt-2 text-lg font-semibold leading-7 text-foreground sm:text-xl">
                      {work.currentNextAction ?? "No current next action recorded."}
                    </h2>
                    {isHistoricalPosture ? (
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        This record is {work.state.replace("_", " ")}; the direction above is retained for verification or historical context.
                      </p>
                    ) : null}
                  </div>
                  {!isHistoricalPosture ? <Link
                    href={`/workspace/projects/${work.projectSlug}/engineering-work/${work.id}/edit`}
                    className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:self-auto"
                  >
                    <Pencil className="size-3.5" />
                    {work.state === "proposed" ? "Correct Proposal" : "Operate Engineering Work"}
                  </Link> : null}
                  {["active", "in_review"].includes(work.state) ? <Link
                    href={`/workspace/projects/${work.projectSlug}/engineering-work/${work.id}/complete`}
                    className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-md border border-primary/30 bg-background px-4 py-2.5 text-sm font-medium text-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:self-auto"
                  ><CircleCheck className="size-3.5" />Complete</Link> : null}
                </div>
              </div>
            </section>

            <section aria-labelledby="investigation-heading" className="mt-10 sm:mt-12">
              <div className="max-w-3xl">
                <p className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.14em] text-primary">
                  Supporting context
                </p>
                <h2 id="investigation-heading" className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
                  Investigation
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  What happened, how it was reproduced, and what supports the current understanding.
                </p>
              </div>

              <div className="mt-6 rounded-lg border border-border bg-card px-5 sm:px-6">
                <section aria-labelledby="behavior-heading" className="py-6">
                  <h3 id="behavior-heading" className="text-base font-semibold">Behavior</h3>
                  <dl className="mt-5 grid gap-6 md:grid-cols-2 md:gap-8">
                    <DetailField label="Observed Behavior" value={defectContext.observedBehavior} />
                    <DetailField label="Expected Behavior" value={defectContext.expectedBehavior} />
                  </dl>
                </section>

                <section aria-labelledby="reproduction-heading" className="border-t border-border py-6">
                  <h3 id="reproduction-heading" className="text-base font-semibold">Reproduction context</h3>
                  <dl className="mt-5 grid gap-6 md:grid-cols-[minmax(0,1.5fr)_minmax(14rem,0.5fr)] md:gap-8">
                    <DetailField label="Reproduction Steps" value={defectContext.reproductionSteps} />
                    <DetailField label="Environment" value={defectContext.environment} />
                  </dl>
                </section>

                <section aria-labelledby="evidence-heading" className="border-t border-border py-6">
                  <h3 id="evidence-heading" className="text-base font-semibold">Evidence and validation</h3>
                  <dl className="mt-5 grid gap-6 md:grid-cols-2 md:gap-x-8 md:gap-y-7">
                    <div className="md:col-span-2">
                      <DetailField label="Evidence" value={defectContext.evidence} />
                    </div>
                    <DetailField label="Validation Target" value={defectContext.validationTarget} />
                    <div className="rounded-md border-l-2 border-primary bg-primary/5 px-4 py-3">
                      <DetailField label="Next Investigation" value={defectContext.nextInvestigation} />
                    </div>
                  </dl>
                </section>
              </div>
            </section>

            {work.currentOutcome || work.condition || work.finalDisposition ? (
              <section aria-labelledby="assessment-heading" className="border-t border-border pt-8">
                <h2 id="assessment-heading" className="text-lg font-semibold">Current assessment</h2>
                <dl className="mt-5 grid gap-6 md:grid-cols-2 md:gap-8">
                  {work.currentOutcome ? <DetailField label="Current Outcome" value={work.currentOutcome} /> : null}
                  {work.condition ? (
                    <DetailField
                      label="Condition"
                      value={<><span className="font-medium">{work.condition}</span>{work.conditionRationale ? <span className="mt-2 block leading-6 text-muted-foreground">{work.conditionRationale}</span> : null}</>}
                    />
                  ) : null}
                  {work.finalDisposition ? <DetailField label="Final Disposition" value={work.finalDisposition} /> : null}
                </dl>
              </section>
            ) : null}

            <section aria-labelledby="related-knowledge-heading" className="border-t border-border pt-8">
              <h2 id="related-knowledge-heading" className="sr-only">Related knowledge</h2>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
                  <span>
                    <span className="block text-lg font-semibold">Related knowledge</span>
                    <span className="mt-1 block text-sm leading-6 text-muted-foreground">Supporting architecture, discovery, and validation context · {relatedKnowledge.length} {relatedKnowledge.length === 1 ? "item" : "items"}</span>
                  </span>
                  <span aria-hidden="true" className="mt-1 font-mono text-xs text-muted-foreground group-open:hidden">Show</span>
                  <span aria-hidden="true" className="mt-1 hidden font-mono text-xs text-muted-foreground group-open:inline">Hide</span>
                </summary>
                {relatedKnowledge.length === 0 ? (
                  <div className="mt-5 rounded-md border border-dashed border-border bg-muted/20 p-5 text-center">
                    <FileQuestion className="mx-auto size-5 text-muted-foreground" />
                    <p className="mt-3 text-sm font-medium">No related knowledge has been connected yet.</p>
                    <p className="mt-1 text-sm text-muted-foreground">Add or verify supporting architecture, discovery, or validation context before advancing this work.</p>
                  </div>
                ) : (
                  <ul className="mt-5 divide-y divide-border border-y border-border">
                    {relatedKnowledge.map((item) => (
                      <li key={item.id} className="py-5">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="max-w-3xl">
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
              </details>
            </section>

            <section aria-labelledby="repository-evidence-heading" className="border-t border-border pt-8">
              <h2 id="repository-evidence-heading" className="sr-only">Repository evidence</h2>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
                  <span>
                    <span className="block text-lg font-semibold">Repository evidence</span>
                    <span className="mt-1 block text-sm leading-6 text-muted-foreground">Read-only references; source repositories remain authoritative · {references.length} {references.length === 1 ? "reference" : "references"}</span>
                  </span>
                  <span aria-hidden="true" className="mt-1 font-mono text-xs text-muted-foreground group-open:hidden">Show</span>
                  <span aria-hidden="true" className="mt-1 hidden font-mono text-xs text-muted-foreground group-open:inline">Hide</span>
                </summary>
                {references.length === 0 ? (
                  <div className="mt-5 rounded-md border border-dashed border-border bg-muted/20 p-5 text-center">
                    <FileQuestion className="mx-auto size-5 text-muted-foreground" />
                    <p className="mt-3 text-sm font-medium">No repository evidence is linked yet.</p>
                    <p className="mt-1 text-sm text-muted-foreground">Repository evidence will appear after validated implementation artifacts are linked. Repository contents remain authoritative.</p>
                  </div>
                ) : (
                  <ul className="mt-5 divide-y divide-border border-y border-border">
                    {references.map((reference) => {
                      const sourceUrl = navigableUrl(reference.sourceLocation);
                      return (
                        <li key={reference.id} className="py-5">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <p className="font-medium">{reference.artifactClass}</p>
                            <span className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-muted-foreground">{ENGINEERING_WORK_REFERENCE_STATUS_LABELS[reference.referenceStatus]}</span>
                          </div>
                          <dl className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            <DetailField label="Repository" value={reference.repository} />
                            <DetailField label="Authority" value={ENGINEERING_WORK_REFERENCE_AUTHORITY_LABELS[reference.authority]} />
                            <DetailField label="Identifier" value={reference.artifactIdentifier ?? "—"} />
                            <DetailField label="Branch" value={reference.branch ?? "—"} />
                            <DetailField label="Commit" value={reference.commitHash ?? "—"} />
                            <DetailField label="Last reviewed" value={reference.lastReviewedAt ? formatTimestamp(reference.lastReviewedAt) : "—"} />
                          </dl>
                          <div className="mt-4">
                            <p className="font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">Source location</p>
                            {sourceUrl ? <Link href={sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex break-all text-sm text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><span>{reference.sourceLocation}</span><ExternalLink className="ml-1 mt-0.5 size-3.5 shrink-0" /></Link> : <p className="mt-1 break-all text-sm text-muted-foreground">{reference.sourceLocation}</p>}
                          </div>
                          {reference.note ? <p className="mt-4 text-sm text-muted-foreground">{reference.note}</p> : null}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </details>
            </section>

            <EngineeringWorkHistory events={history} />

            <section aria-labelledby="record-reference-heading" className="border-t border-border pb-2 pt-8">
              <h2 id="record-reference-heading" className="sr-only">Reference metadata</h2>
              <details className="group text-muted-foreground">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-md text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
                  Reference metadata
                  <span aria-hidden="true" className="font-mono text-xs font-normal text-muted-foreground group-open:hidden">Show</span>
                  <span aria-hidden="true" className="hidden font-mono text-xs font-normal text-muted-foreground group-open:inline">Hide</span>
                </summary>
                <dl className="mt-5 grid gap-4 border-l border-border pl-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
                  <DetailField label="Record ID" value={<span className="break-all font-mono text-xs">{work.id}</span>} />
                  <DetailField label="Created" value={formatTimestamp(work.createdAt)} />
                  <DetailField label="Updated" value={formatTimestamp(work.updatedAt)} />
                  <DetailField label="Priority" value={work.priority ?? "—"} />
                </dl>
              </details>
            </section>
          </main>
        </div>
      </div>
    );
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
          {["proposed", "active", "in_review"].includes(work.state) ? <Link href={`/workspace/projects/${work.projectSlug}/engineering-work/${work.id}/edit`} className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><Pencil className="size-3.5" />{work.state === "proposed" ? "Correct Proposal" : "Operate Engineering Work"}</Link> : null}
          {["active", "in_review"].includes(work.state) ? <Link href={`/workspace/projects/${work.projectSlug}/engineering-work/${work.id}/complete`} className="inline-flex items-center gap-2 rounded-md border border-primary/30 px-3 py-2 text-sm font-medium text-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><CircleCheck className="size-3.5" />Complete</Link> : null}
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
            <p className="mt-2 text-base font-semibold leading-7 text-foreground">{work.currentNextAction ?? "No current next action recorded."}</p>
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

        {work.finalDisposition ? (
          <section className="rounded-lg border border-border bg-card p-6">
            <h2 className="font-heading text-base font-semibold">Final disposition</h2>
            <p className="mt-3 text-sm leading-7 text-foreground/90">{work.finalDisposition}</p>
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

        <EngineeringWorkHistory events={history} />

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
