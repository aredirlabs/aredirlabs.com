"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ExternalLink, Pencil, X } from "lucide-react";

import { Disclosure } from "@/components/ui/disclosure";
import { Inset } from "@/components/ui/inset";
import { MetadataField, MetadataGroup } from "@/components/ui/metadata-field";
import { formatTimestamp } from "@/lib/workspace/format-date";
import type { RelatedKnowledgeItem } from "@/lib/workspace/related-knowledge";

import {
  EvidenceSurface,
  HistorySurface,
  type Reference,
  type WorkRecord,
  type HistoryEvent,
} from "./engineering-work-surfaces";

function InspectorSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2.5">
      <h3 className="font-mono text-[var(--type-state)] uppercase tracking-[0.12em] text-muted-foreground">
        {title}
      </h3>
      {children}
    </section>
  );
}

function InspectorDivider() {
  return <div className="border-t border-border" />;
}

function InspectorContent({
  work,
  selectedSource,
  references,
  history,
}: {
  work: WorkRecord;
  selectedSource: RelatedKnowledgeItem | null;
  references: Reference[];
  history: HistoryEvent[];
}) {
  const verifiedCount = references.filter((reference) => reference.referenceStatus === "verified").length;
  const attentionCount = references.filter(
    (reference) => reference.referenceStatus === "stale" || reference.referenceStatus === "missing",
  ).length;

  return (
    <div className="space-y-5 p-4">
      {selectedSource ? (
        <>
          <InspectorSection title="Selected source">
            <div>
              <p className="font-medium text-foreground">{selectedSource.title}</p>
              <p className="mt-1 font-mono text-[var(--type-metadata)] uppercase tracking-[0.1em] text-muted-foreground">
                {selectedSource.knowledgeClass}
              </p>
            </div>
            <p className="text-sm leading-6 text-muted-foreground">{selectedSource.description}</p>
            <Link
              href={`${selectedSource.href}?fromWork=${encodeURIComponent(work.id)}&project=${encodeURIComponent(work.projectSlug)}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Open source
              <ExternalLink className="size-3.5" />
            </Link>
          </InspectorSection>

          <InspectorDivider />
          <InspectorSection title="Authority context">
            <Inset>
              <MetadataGroup>
                <MetadataField label="Authority" value={selectedSource.authorityLocation} />
                <MetadataField label="Project relationship" value={selectedSource.projectContext} />
                <MetadataField label="Last reviewed / updated" value={selectedSource.lastReviewed} />
              </MetadataGroup>
            </Inset>
            <p className="text-[var(--type-metadata)] leading-relaxed text-muted-foreground">
              Aredir has not evaluated, reconciled, approved, or synthesized this source against the Engineering Work. Interpretation remains with the human operator.
            </p>
          </InspectorSection>
        </>
      ) : null}

      <InspectorSection title="Repository evidence">
        <Inset>
          <MetadataGroup>
            <MetadataField label="Total references" value={String(references.length)} />
            <MetadataField label="Verified" value={String(verifiedCount)} />
            {attentionCount > 0 ? <MetadataField label="Needs attention" value={String(attentionCount)} /> : null}
          </MetadataGroup>
        </Inset>
        {references.length > 0 ? (
          <Disclosure
            summary="Evidence detail"
            description="Full repository references for this Engineering Work."
            count={
              <span className="font-mono text-[var(--type-identifier)] text-muted-foreground">
                {references.length}
              </span>
            }
          >
            <EvidenceSurface work={work} references={references} />
          </Disclosure>
        ) : (
          <Link
            href={`/workspace/projects/${work.projectSlug}/engineering-work/${work.id}/evidence`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Pencil className="size-3.5" />
            Manage repository evidence
          </Link>
        )}
      </InspectorSection>

      <InspectorDivider />

      <InspectorSection title="Lifecycle history">
        <Inset>
          <MetadataGroup>
            <MetadataField label="Total events" value={String(history.length)} />
            <MetadataField label="Current state" value={work.state.replace("_", " ")} />
            <MetadataField label="Record version" value={String(work.version)} />
          </MetadataGroup>
        </Inset>
        {history.length > 0 ? (
          <Disclosure
            summary="Full history"
            description="Append-only operational and decision history."
            count={
              <span className="font-mono text-[var(--type-identifier)] text-muted-foreground">
                {history.length}
              </span>
            }
          >
            <HistorySurface history={history} />
          </Disclosure>
        ) : null}
      </InspectorSection>

      <InspectorDivider />

      <InspectorSection title="Record">
        <MetadataGroup>
          <MetadataField label="Record ID" value={<span className="break-all">{work.id}</span>} variant="identifier" />
          <MetadataField label="Created" value={formatTimestamp(work.createdAt)} />
          <MetadataField label="Updated" value={formatTimestamp(work.updatedAt)} />
          <MetadataField label="Priority" value={work.priority ?? "—"} />
        </MetadataGroup>
      </InspectorSection>
    </div>
  );
}

export function InspectorPanel({
  work,
  selectedSource,
  references,
  history,
  mobileOpen,
  onMobileClose,
}: {
  work: WorkRecord;
  selectedSource: RelatedKnowledgeItem | null;
  references: Reference[];
  history: HistoryEvent[];
  mobileOpen: boolean;
  onMobileClose: () => void;
}) {
  useEffect(() => {
    if (!mobileOpen) return;

    const priorOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onMobileClose();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = priorOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen, onMobileClose]);

  const content = (
    <InspectorContent
      work={work}
      selectedSource={selectedSource}
      references={references}
      history={history}
    />
  );

  return (
    <>
      <aside
        className="hidden w-80 shrink-0 overflow-y-auto border-l border-border bg-surface-environment/50 xl:block"
        aria-label="Contextual inspector"
      >
        {content}
      </aside>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 xl:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            onClick={onMobileClose}
            aria-label="Close source context"
          />
          <section
            role="dialog"
            aria-modal="true"
            aria-label="Source context"
            className="absolute inset-y-0 right-0 flex w-[min(92vw,24rem)] flex-col overflow-hidden border-l border-border bg-card shadow-xl"
          >
            <div className="flex h-12 shrink-0 items-center justify-between border-b border-border px-4">
              <h2 className="text-sm font-semibold">Source context</h2>
              <button
                type="button"
                onClick={onMobileClose}
                className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Close source context"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto">{content}</div>
          </section>
        </div>
      ) : null}
    </>
  );
}
