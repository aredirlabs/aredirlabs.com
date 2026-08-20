import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, FileQuestion, ShieldCheck } from "lucide-react";

import { Eyebrow } from "@/components/eyebrow";
import { EngineeringWorkMetadata } from "@/components/workspace/engineering-work-badges";
import {
  AddRepositoryReferenceForm,
  MaintainRepositoryReferenceForm,
} from "@/components/workspace/repository-evidence-forms";
import { formatTimestamp } from "@/lib/workspace/format-date";
import {
  getProjectEngineeringWorkById,
  getProjectEngineeringWorkRepositoryReferenceRevisions,
  getProjectEngineeringWorkRepositoryReferences,
} from "@/lib/workspace/queries";
import {
  ENGINEERING_WORK_REFERENCE_AUTHORITY_LABELS,
  ENGINEERING_WORK_REFERENCE_STATUS_LABELS,
} from "@/lib/workspace/engineering-work";

export const dynamic = "force-dynamic";

type EngineeringWorkEvidencePageProps = {
  params: Promise<{ slug: string; workId: string }>;
};

const EVIDENCE_CAPABLE_STATES = ["proposed", "active", "in_review", "completed"] as const;

function navigableUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : null;
  } catch {
    return null;
  }
}

function StatusPill({ status }: { status: string }) {
  return (
    <span className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-primary">
      {ENGINEERING_WORK_REFERENCE_STATUS_LABELS[status as keyof typeof ENGINEERING_WORK_REFERENCE_STATUS_LABELS]}
    </span>
  );
}

function snapshotText(snapshot: Record<string, unknown>, key: string) {
  const value = snapshot[key];
  return typeof value === "string" ? value : null;
}

export default async function EngineeringWorkEvidencePage({
  params,
}: EngineeringWorkEvidencePageProps) {
  const { slug, workId } = await params;

  if (!slug?.trim() || !workId?.trim()) {
    notFound();
  }

  const work = await getProjectEngineeringWorkById(slug, workId);
  if (!work) notFound();

  const [references, revisions] = await Promise.all([
    getProjectEngineeringWorkRepositoryReferences(slug, workId),
    getProjectEngineeringWorkRepositoryReferenceRevisions(slug, workId),
  ]);

  const evidenceCapable = (EVIDENCE_CAPABLE_STATES as readonly string[]).includes(work.state);
  const revisionsByReferenceId = new Map<string, typeof revisions>();
  for (const revision of revisions) {
    const list = revisionsByReferenceId.get(revision.repositoryReferenceId) ?? [];
    list.push(revision);
    revisionsByReferenceId.set(revision.repositoryReferenceId, list);
  }

  return (
    <div className="p-8">
      <Link
        href={`/workspace/projects/${work.projectSlug}/engineering-work/${work.id}`}
        className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <ArrowLeft className="size-3.5" />
        Back to Engineering Work
      </Link>

      <header className="mb-8">
        <Eyebrow>Repository evidence</Eyebrow>
        <h1 className="mt-2 max-w-4xl text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
          {work.title}
        </h1>
        <div className="mt-4">
          <EngineeringWorkMetadata type={work.type} workflow={work.workflow} state={work.state} />
        </div>
      </header>

      {!evidenceCapable ? (
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="size-5 text-muted-foreground" />
            <div>
              <p className="font-medium">Evidence is retained read-only</p>
              <p className="mt-1 text-sm text-muted-foreground">
                This work is {work.state.replace("_", " ")}. Linked repository references are retained for verification and historical context but can no longer be added or maintained.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <section className="rounded-lg border border-border bg-card p-6" aria-labelledby="add-evidence-heading">
          <h2 id="add-evidence-heading" className="font-heading text-base font-semibold">Link new repository evidence</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Cite a repository-authoritative artifact. Repository, source location, and status are identity; branch, commit, and metadata are read-only provenance beside the authoritative artifact.
          </p>
          <div className="mt-6">
            <AddRepositoryReferenceForm
              projectSlug={work.projectSlug}
              workId={work.id}
              version={work.version}
            />
          </div>
        </section>
      )}

      <section className="mt-8" aria-labelledby="linked-evidence-heading">
        <div>
          <h2 id="linked-evidence-heading" className="font-heading text-base font-semibold">
            Linked repository evidence
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {references.length} {references.length === 1 ? "reference" : "references"} · immutable traceability below
          </p>
        </div>

        {references.length === 0 ? (
          <div className="mt-4 rounded-md border border-dashed border-border bg-muted/20 p-6 text-center">
            <FileQuestion className="mx-auto size-5 text-muted-foreground" />
            <p className="mt-3 text-sm font-medium">No repository evidence has been linked.</p>
            <p className="mt-1 text-sm text-muted-foreground">Use the form above to link the first validated implementation artifact.</p>
          </div>
        ) : (
          <ul className="mt-4 space-y-6">
            {references.map((reference) => {
              const sourceUrl = navigableUrl(reference.sourceLocation);
              const referenceRevisions = revisionsByReferenceId.get(reference.id) ?? [];
              return (
                <li key={reference.id} className="rounded-lg border border-border bg-card p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-medium">{reference.artifactClass}</p>
                    <StatusPill status={reference.referenceStatus} />
                  </div>
                  <dl className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div>
                      <dt className="font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">Repository</dt>
                      <dd className="mt-1 text-sm">{reference.repository}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">Authority</dt>
                      <dd className="mt-1 text-sm">{ENGINEERING_WORK_REFERENCE_AUTHORITY_LABELS[reference.authority]}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">Identifier</dt>
                      <dd className="mt-1 text-sm">{reference.artifactIdentifier ?? "—"}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">Branch</dt>
                      <dd className="mt-1 text-sm">{reference.branch ?? "—"}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">Commit</dt>
                      <dd className="mt-1 text-sm">{reference.commitHash ?? "—"}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">Last reviewed</dt>
                      <dd className="mt-1 text-sm">{reference.lastReviewedAt ? formatTimestamp(reference.lastReviewedAt) : "—"}</dd>
                    </div>
                  </dl>
                  <div className="mt-4">
                    <p className="font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">Source location</p>
                    {sourceUrl ? (
                      <Link href={sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex break-all text-sm text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                        <span>{reference.sourceLocation}</span>
                        <ExternalLink className="ml-1 mt-0.5 size-3.5 shrink-0" />
                      </Link>
                    ) : (
                      <p className="mt-1 break-all text-sm text-muted-foreground">{reference.sourceLocation}</p>
                    )}
                  </div>
                  {reference.note ? <p className="mt-4 text-sm text-muted-foreground">{reference.note}</p> : null}

                  {evidenceCapable ? (
                    <div className="mt-6 border-t border-border pt-6">
                      <h3 className="font-heading text-sm font-semibold">Maintain this reference</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Preserves immutable evidence; no-op updates are rejected. Changing to a review status requires a review decision basis.
                      </p>
                      <div className="mt-4">
                        <MaintainRepositoryReferenceForm
                          projectSlug={work.projectSlug}
                          workId={work.id}
                          version={work.version}
                          reference={{
                            id: reference.id,
                            artifactClass: reference.artifactClass,
                            artifactIdentifier: reference.artifactIdentifier,
                            branch: reference.branch,
                            commitHash: reference.commitHash,
                            referenceStatus: reference.referenceStatus,
                            note: reference.note,
                          }}
                        />
                      </div>
                    </div>
                  ) : null}

                  {referenceRevisions.length > 0 ? (
                    <div className="mt-6 rounded-md border border-border bg-background/60 p-4">
                      <p className="font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
                        Immutable revisions · {referenceRevisions.length}
                      </p>
                      <ol className="mt-3 space-y-3">
                        {referenceRevisions.map((revision) => (
                          <li key={revision.id} className="text-sm">
                            <p className="font-mono text-xs text-muted-foreground">History event {revision.historyEventId}</p>
                            {revision.previousReference && revision.previousReference.referenceStatus ? (
                              <p className="mt-1 text-muted-foreground">
                                <span className="font-medium text-foreground">{ENGINEERING_WORK_REFERENCE_STATUS_LABELS[revision.previousReference.referenceStatus as keyof typeof ENGINEERING_WORK_REFERENCE_STATUS_LABELS]}</span>
                                {" → "}
                                <span className="font-medium text-foreground">{ENGINEERING_WORK_REFERENCE_STATUS_LABELS[revision.resultingReference.referenceStatus as keyof typeof ENGINEERING_WORK_REFERENCE_STATUS_LABELS]}</span>
                              </p>
                            ) : (
                              <p className="mt-1 text-muted-foreground">
                                Created as{" "}
                                <span className="font-medium text-foreground">{ENGINEERING_WORK_REFERENCE_STATUS_LABELS[revision.resultingReference.referenceStatus as keyof typeof ENGINEERING_WORK_REFERENCE_STATUS_LABELS]}</span>
                              </p>
                            )}
                            {snapshotText(revision.resultingReference, "note") ? (
                              <p className="mt-1 text-muted-foreground">{snapshotText(revision.resultingReference, "note")}</p>
                            ) : null}
                          </li>
                        ))}
                      </ol>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}