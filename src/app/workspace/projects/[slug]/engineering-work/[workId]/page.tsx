import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CircleCheck, CirclePlay, ExternalLink, Pencil } from "lucide-react";

import { Disclosure } from "@/components/ui/disclosure";
import { EmptyState } from "@/components/ui/empty-state";
import { FailureState } from "@/components/ui/failure-state";
import { MetadataField, MetadataGroup } from "@/components/ui/metadata-field";
import { Surface } from "@/components/ui/surface";
import { Timeline, TimelineEntry } from "@/components/ui/timeline";
import { Eyebrow } from "@/components/eyebrow";
import {
  EngineeringWorkMetadata,
} from "@/components/workspace/engineering-work-badges";
import { EngineeringWorkOperationalFocusControl } from "@/components/workspace/engineering-work-operational-focus-control";
import { formatTimestamp } from "@/lib/workspace/format-date";
import {
  getEngineeringWorkFocusContext,
  getProjectEngineeringWorkById,
  getProjectEngineeringWorkHistory,
  getProjectEngineeringWorkRepositoryReferences,
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
    <Timeline
      label="Lifecycle history"
      description="Append-only operational and decision history. Action and decision actors remain distinct."
    >
      {events.length === 0 ? (
        <li className="rounded-[var(--radius-inset)] border border-border bg-surface-inset p-[var(--space-inset-y)] px-[var(--space-inset-x)] text-[var(--type-narrative)] text-muted-foreground">
          No post-migration lifecycle history has been recorded.
        </li>
      ) : (
        events.map((event) => {
          const basis = typeof event.decisionBasis.summary === "string" ? event.decisionBasis.summary : null;
          const nextActionChanged = event.previousNextAction !== event.resultingNextAction;
          const outcomeChanged = event.previousOutcome !== event.resultingOutcome;
          return (
            <TimelineEntry
              key={event.id}
              action={event.actionType.replaceAll("_", " ")}
              timestamp={formatTimestamp(event.occurredAt)}
              transition={
                event.priorState || event.resultingState
                  ? `${event.priorState ?? "—"} → ${event.resultingState ?? "—"}`
                  : undefined
              }
              decision={event.decision}
              decisionBasis={basis}
              rationale={event.rationale}
              nextActionTransition={
                nextActionChanged
                  ? `${event.previousNextAction ?? "—"} → ${event.resultingNextAction ?? "—"}`
                  : undefined
              }
              outcomeTransition={
                outcomeChanged
                  ? `${event.previousOutcome ?? "—"} → ${event.resultingOutcome ?? "—"}`
                  : undefined
              }
              finalDisposition={event.resultingFinalDisposition}
              actor={event.actionActorDisplayName ?? event.actionActorIdentifier}
              decisionActor={event.decisionActorDisplayName ?? event.decisionActorIdentifier ?? "No decision actor"}
              metadata={
                <>
                  <div>
                    <dt className="font-mono text-[var(--type-metadata)] uppercase tracking-[0.1em] text-muted-foreground">
                      Decision role
                    </dt>
                    <dd className="mt-1">{event.decisionRole ?? "—"}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[var(--type-metadata)] uppercase tracking-[0.1em] text-muted-foreground">
                      Authority
                    </dt>
                    <dd className="mt-1">{event.authorityType ?? "—"}</dd>
                  </div>
                </>
              }
            />
          );
        })
      )}
    </Timeline>
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
  let references: Awaited<ReturnType<typeof getProjectEngineeringWorkRepositoryReferences>> = [];
  let relatedKnowledge: Awaited<ReturnType<typeof getRelatedKnowledgeForEngineeringWork>> = [];
  let defectContext: Awaited<ReturnType<typeof getProjectDefectContext>> = null;
  let history: Awaited<ReturnType<typeof getProjectEngineeringWorkHistory>> = [];
  let focusContext: Awaited<ReturnType<typeof getEngineeringWorkFocusContext>> = null;
  let error: string | null = null;

  try {
    work = await getProjectEngineeringWorkById(slug, workId);
    if (work) {
      [references, relatedKnowledge, defectContext, history, focusContext] = await Promise.all([
        getProjectEngineeringWorkRepositoryReferences(work.projectSlug, work.id),
        getRelatedKnowledgeForEngineeringWork(work),
        work.workflow === "defect"
          ? getProjectDefectContext(work.projectSlug, work.id)
          : Promise.resolve(null),
        getProjectEngineeringWorkHistory(work.projectSlug, work.id),
        getEngineeringWorkFocusContext(work.projectSlug, work.id),
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
        <FailureState
          title="Could not load Engineering Work"
          description="An unexpected error occurred while loading this Engineering Work. Please try again or contact support if the issue persists."
          failureClass="unknown"
        />
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
                  {work.state === "proposed" ? <Link
                    href={`/workspace/projects/${work.projectSlug}/engineering-work/${work.id}/activate`}
                    className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-md border border-primary/30 bg-background px-4 py-2.5 text-sm font-medium text-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:self-auto"
                  ><CirclePlay className="size-3.5" />Review &amp; Activate</Link> : null}
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

              <Surface className="mt-6 px-5 sm:px-6">
                <section aria-labelledby="behavior-heading" className="py-6">
                  <h3 id="behavior-heading" className="text-base font-semibold">Behavior</h3>
                  <MetadataGroup className="mt-5">
                    <MetadataField label="Observed Behavior" value={defectContext.observedBehavior} />
                    <MetadataField label="Expected Behavior" value={defectContext.expectedBehavior} />
                  </MetadataGroup>
                </section>

                <section aria-labelledby="reproduction-heading" className="border-t border-border py-6">
                  <h3 id="reproduction-heading" className="text-base font-semibold">Reproduction context</h3>
                  <MetadataGroup className="mt-5" columns={2}>
                    <MetadataField label="Reproduction Steps" value={defectContext.reproductionSteps} />
                    <MetadataField label="Environment" value={defectContext.environment} />
                  </MetadataGroup>
                </section>

                <section aria-labelledby="evidence-heading" className="border-t border-border py-6">
                  <h3 id="evidence-heading" className="text-base font-semibold">Evidence and validation</h3>
                  <MetadataGroup className="mt-5" columns={2}>
                    <div className="sm:col-span-2">
                      <MetadataField label="Evidence" value={defectContext.evidence} />
                    </div>
                    <MetadataField label="Validation Target" value={defectContext.validationTarget} />
                    <div className="rounded-[var(--radius-inset)] border-l-2 border-role-actionable bg-role-actionable-bg px-4 py-3">
                      <MetadataField label="Next Investigation" value={defectContext.nextInvestigation} />
                    </div>
                  </MetadataGroup>
                </section>
              </Surface>
            </section>

            {work.currentOutcome || work.condition || work.finalDisposition ? (
              <section aria-labelledby="assessment-heading" className="border-t border-border pt-8">
                <h2 id="assessment-heading" className="text-lg font-semibold">Current assessment</h2>
                <MetadataGroup className="mt-5">
                  {work.currentOutcome ? <MetadataField label="Current Outcome" value={work.currentOutcome} /> : null}
                  {work.condition ? (
                    <MetadataField
                      label="Condition"
                      value={<><span className="font-medium">{work.condition}</span>{work.conditionRationale ? <span className="mt-2 block leading-relaxed text-muted-foreground">{work.conditionRationale}</span> : null}</>}
                    />
                  ) : null}
                  {work.finalDisposition ? <MetadataField label="Final Disposition" value={work.finalDisposition} /> : null}
                </MetadataGroup>
              </section>
            ) : null}

            <section aria-labelledby="related-knowledge-heading" className="border-t border-border pt-8">
              <h2 id="related-knowledge-heading" className="sr-only">Related knowledge</h2>
              <Disclosure
                summary="Related knowledge"
                description={`Supporting architecture, discovery, and validation context · ${relatedKnowledge.length} ${relatedKnowledge.length === 1 ? "item" : "items"}`}
                count={
                  <span className="font-mono text-[var(--type-identifier)] text-muted-foreground">
                    {relatedKnowledge.length}
                  </span>
                }
              >
                {relatedKnowledge.length === 0 ? (
                  <EmptyState
                    title="No related knowledge has been connected yet."
                    description="Add or verify supporting architecture, discovery, or validation context before advancing this work."
                  />
                ) : (
                  <ul className="divide-y divide-border border-y border-border">
                    {relatedKnowledge.map((item) => (
                      <li key={item.id} className="py-5">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="max-w-3xl">
                            <p className="font-medium">{item.title}</p>
                            <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.description}</p>
                          </div>
                          <span className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-primary">{item.knowledgeClass}</span>
                        </div>
                        <MetadataGroup className="mt-4">
                          <MetadataField label="Project" value={item.projectContext} />
                          <MetadataField label="Authority" value={item.authorityLocation} />
                          <MetadataField label="Last reviewed / updated" value={item.lastReviewed} />
                        </MetadataGroup>
                        <Link href={`${item.href}?fromWork=${encodeURIComponent(work.id)}&project=${encodeURIComponent(work.projectSlug)}`} className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                          Open {item.knowledgeClass.toLowerCase()}
                          <ExternalLink className="size-3.5" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </Disclosure>
            </section>

            <section aria-labelledby="repository-evidence-heading" className="border-t border-border pt-8">
              <h2 id="repository-evidence-heading" className="sr-only">Repository evidence</h2>
              <Disclosure
                summary="Repository evidence"
                description={`Read-only references; source repositories remain authoritative · ${references.length} ${references.length === 1 ? "reference" : "references"}`}
                count={
                  <span className="font-mono text-[var(--type-identifier)] text-muted-foreground">
                    {references.length}
                  </span>
                }
              >
                {references.length === 0 ? (
                  <EmptyState
                    title="No repository evidence is linked yet."
                    description="Repository evidence will appear after validated implementation artifacts are linked. Repository contents remain authoritative."
                  />
                ) : (
                  <ul className="divide-y divide-border border-y border-border">
                    {references.map((reference) => {
                      const sourceUrl = navigableUrl(reference.sourceLocation);
                      return (
                        <li key={reference.id} className="py-5">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <p className="font-medium">{reference.artifactClass}</p>
                            <span className="font-mono text-[var(--type-identifier)] uppercase tracking-[0.1em] text-muted-foreground">{ENGINEERING_WORK_REFERENCE_STATUS_LABELS[reference.referenceStatus]}</span>
                          </div>
                          <MetadataGroup className="mt-4">
                            <MetadataField label="Repository" value={reference.repository} />
                            <MetadataField label="Authority" value={ENGINEERING_WORK_REFERENCE_AUTHORITY_LABELS[reference.authority]} />
                            <MetadataField label="Identifier" value={reference.artifactIdentifier ?? "—"} variant="identifier" />
                            <MetadataField label="Branch" value={reference.branch ?? "—"} />
                            <MetadataField label="Commit" value={reference.commitHash ?? "—"} variant="identifier" />
                            <MetadataField label="Last reviewed" value={reference.lastReviewedAt ? formatTimestamp(reference.lastReviewedAt) : "—"} />
                          </MetadataGroup>
                          <div className="mt-4">
                            <p className="font-mono text-[var(--type-identifier)] uppercase tracking-[0.1em] text-muted-foreground">Source location</p>
                            {sourceUrl ? <Link href={sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex break-all text-sm text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><span>{reference.sourceLocation}</span><ExternalLink className="ml-1 mt-0.5 size-3.5 shrink-0" /></Link> : <p className="mt-1 break-all text-sm text-muted-foreground">{reference.sourceLocation}</p>}
                          </div>
                          {reference.note ? <p className="mt-4 text-sm text-muted-foreground">{reference.note}</p> : null}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </Disclosure>
              <div className="mt-4 text-right">
                <Link
                  href={`/workspace/projects/${work.projectSlug}/engineering-work/${work.id}/evidence`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Pencil className="size-3.5" />
                  Manage repository evidence
                </Link>
              </div>
            </section>

            {focusContext ? (
              <EngineeringWorkOperationalFocusControl
                projectSlug={work.projectSlug}
                workId={work.id}
                workState={work.state}
                focusVersion={focusContext.focusVersion}
                projectStatus={focusContext.projectStatus}
                isFocused={focusContext.isFocused}
              />
            ) : null}

            <EngineeringWorkHistory events={history} />

            <section aria-labelledby="record-reference-heading" className="border-t border-border pb-2 pt-8">
              <h2 id="record-reference-heading" className="sr-only">Reference metadata</h2>
              <Disclosure
                summary="Reference metadata"
                className="text-muted-foreground"
              >
                <MetadataGroup columns={4} className="border-l border-border pl-4">
                  <MetadataField label="Record ID" value={<span className="break-all font-mono text-[var(--type-identifier)]">{work.id}</span>} variant="identifier" />
                  <MetadataField label="Created" value={formatTimestamp(work.createdAt)} />
                  <MetadataField label="Updated" value={formatTimestamp(work.updatedAt)} />
                  <MetadataField label="Priority" value={work.priority ?? "—"} />
                </MetadataGroup>
              </Disclosure>
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
          {work.state === "proposed" ? <Link href={`/workspace/projects/${work.projectSlug}/engineering-work/${work.id}/activate`} className="inline-flex items-center gap-2 rounded-md border border-primary/30 px-3 py-2 text-sm font-medium text-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><CirclePlay className="size-3.5" />Review &amp; Activate</Link> : null}
          {["active", "in_review"].includes(work.state) ? <Link href={`/workspace/projects/${work.projectSlug}/engineering-work/${work.id}/complete`} className="inline-flex items-center gap-2 rounded-md border border-primary/30 px-3 py-2 text-sm font-medium text-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><CircleCheck className="size-3.5" />Complete</Link> : null}
        </div>
      </div>

      <div className="space-y-4">
        <Surface variant="primary">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
            <div>
              <p className="font-mono text-[var(--type-state)] font-medium uppercase tracking-[0.14em] text-role-actionable">
                Engineering objective
              </p>
              <p className="mt-3 text-base leading-7 text-foreground/90">{work.summary}</p>
            </div>
            <div className="rounded-[var(--radius-inset)] border border-border bg-surface-inset p-4 lg:min-w-64">
              <p className="font-mono text-[var(--type-state)] uppercase tracking-[0.1em] text-muted-foreground">
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
          <div className="mt-6 rounded-[var(--radius-inset)] border border-role-actionable-border bg-role-actionable-bg p-4">
            <p className="font-mono text-[var(--type-state)] font-medium uppercase tracking-[0.1em] text-role-actionable">
              Recommended next action
            </p>
            <p className="mt-2 text-base font-semibold leading-7 text-foreground">{work.currentNextAction ?? "No current next action recorded."}</p>
          </div>
        </Surface>

        {work.workflow === "defect" && defectContext ? (
          <Surface>
            <div><h2 className="font-heading text-base font-semibold">Defect investigation</h2><p className="mt-1 text-sm text-muted-foreground">Structured investigation context for this Defect Engineering Work.</p></div>
            <MetadataGroup className="mt-5">
              <MetadataField label="Observed Behavior" value={defectContext.observedBehavior} />
              <MetadataField label="Expected Behavior" value={defectContext.expectedBehavior} />
              <MetadataField label="Reproduction Steps" value={defectContext.reproductionSteps} />
              <MetadataField label="Environment" value={defectContext.environment} />
              <MetadataField label="Evidence" value={defectContext.evidence} />
              <MetadataField label="Next Investigation" value={defectContext.nextInvestigation} />
              <MetadataField label="Validation Target" value={defectContext.validationTarget} />
            </MetadataGroup>
          </Surface>
        ) : null}

        {work.currentOutcome ? (
          <Surface>
            <h2 className="font-heading text-base font-semibold">Current outcome</h2>
            <p className="mt-3 text-sm leading-7 text-foreground/90">{work.currentOutcome}</p>
          </Surface>
        ) : null}

        {work.finalDisposition ? (
          <Surface>
            <h2 className="font-heading text-base font-semibold">Final disposition</h2>
            <p className="mt-3 text-sm leading-7 text-foreground/90">{work.finalDisposition}</p>
          </Surface>
        ) : null}

        {work.condition ? (
          <Surface>
            <h2 className="font-heading text-base font-semibold">Condition</h2>
            <p className="mt-3 text-sm font-medium">{work.condition}</p>
            {work.conditionRationale ? <p className="mt-2 text-sm leading-7 text-muted-foreground">{work.conditionRationale}</p> : null}
          </Surface>
        ) : null}

        <Surface>
          <div>
            <h2 className="font-heading text-base font-semibold">Related knowledge</h2>
            <p className="mt-1 text-sm text-muted-foreground">Read-only context deliberately connected to this Engineering Work. Repository evidence remains separate below.</p>
          </div>
          {relatedKnowledge.length === 0 ? (
            <EmptyState
              title="No related knowledge has been connected yet."
              description="Add or verify supporting architecture, discovery, or validation context before advancing this work."
              className="mt-4"
            />
          ) : (
            <ul className="mt-4 space-y-3">
              {relatedKnowledge.map((item) => (
                <li key={item.id} className="rounded-[var(--radius-inset)] border border-border bg-surface-inset p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.description}</p>
                    </div>
                    <span className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-primary">{item.knowledgeClass}</span>
                  </div>
                  <MetadataGroup className="mt-4">
                    <MetadataField label="Project" value={item.projectContext} />
                    <MetadataField label="Authority" value={item.authorityLocation} />
                    <MetadataField label="Last reviewed / updated" value={item.lastReviewed} />
                  </MetadataGroup>
                  <Link href={`${item.href}?fromWork=${encodeURIComponent(work.id)}&project=${encodeURIComponent(work.projectSlug)}`} className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    Open {item.knowledgeClass.toLowerCase()}
                    <ExternalLink className="size-3.5" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Surface>

        <Surface>
          <h2 className="font-heading text-base font-semibold">Related repository artifacts</h2>
          <p className="mt-1 text-sm text-muted-foreground">Read-only references. Artifact bodies remain authoritative in their source repositories.</p>
          {references.length === 0 ? (
            <EmptyState
              title="No repository evidence is linked yet."
              description="Repository evidence will appear here after validated implementation artifacts are linked to this Engineering Work. Repository contents remain authoritative."
              className="mt-4"
            />
          ) : (
            <ul className="mt-4 space-y-3">
              {references.map((reference) => {
                const sourceUrl = navigableUrl(reference.sourceLocation);
                return (
                  <li key={reference.id} className="rounded-[var(--radius-inset)] border border-border bg-surface-inset p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-medium">{reference.artifactClass}</p>
                      <span className="font-mono text-[var(--type-identifier)] uppercase tracking-[0.1em] text-muted-foreground">{ENGINEERING_WORK_REFERENCE_STATUS_LABELS[reference.referenceStatus]}</span>
                    </div>
                    <MetadataGroup className="mt-4">
                      <MetadataField label="Repository" value={reference.repository} />
                      <MetadataField label="Authority" value={ENGINEERING_WORK_REFERENCE_AUTHORITY_LABELS[reference.authority]} />
                      <MetadataField label="Identifier" value={reference.artifactIdentifier ?? "—"} variant="identifier" />
                      <MetadataField label="Branch" value={reference.branch ?? "—"} />
                      <MetadataField label="Commit" value={reference.commitHash ?? "—"} variant="identifier" />
                      <MetadataField label="Last reviewed" value={reference.lastReviewedAt ? formatTimestamp(reference.lastReviewedAt) : "—"} />
                    </MetadataGroup>
                    <div className="mt-4">
                      <p className="font-mono text-[var(--type-identifier)] uppercase tracking-[0.1em] text-muted-foreground">Source location</p>
                      {sourceUrl ? <Link href={sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex break-all text-sm text-primary underline-offset-4 hover:underline"><span>{reference.sourceLocation}</span><ExternalLink className="ml-1 mt-0.5 size-3.5 shrink-0" /></Link> : <p className="mt-1 break-all text-sm text-muted-foreground">{reference.sourceLocation}</p>}
                    </div>
                    {reference.note ? <p className="mt-4 text-sm text-muted-foreground">{reference.note}</p> : null}
                  </li>
                );
              })}
            </ul>
          )}
          <div className="mt-4 text-right">
            <Link
              href={`/workspace/projects/${work.projectSlug}/engineering-work/${work.id}/evidence`}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Pencil className="size-3.5" />
              Manage repository evidence
            </Link>
          </div>
        </Surface>

        {focusContext ? (
          <EngineeringWorkOperationalFocusControl
            projectSlug={work.projectSlug}
            workId={work.id}
            workState={work.state}
            focusVersion={focusContext.focusVersion}
            projectStatus={focusContext.projectStatus}
            isFocused={focusContext.isFocused}
          />
        ) : null}

        <EngineeringWorkHistory events={history} />

        <Surface className="bg-surface-inset">
          <h2 className="font-heading text-base font-semibold">Record details</h2>
          <p className="mt-1 text-sm text-muted-foreground">Supporting metadata for this Engineering Work record.</p>
          <MetadataGroup className="mt-4">
            <MetadataField label="Priority" value={work.priority ?? "—"} />
            <MetadataField label="Created" value={formatTimestamp(work.createdAt)} />
            <MetadataField label="Updated" value={formatTimestamp(work.updatedAt)} />
          </MetadataGroup>
        </Surface>
      </div>
    </div>
  );
}
