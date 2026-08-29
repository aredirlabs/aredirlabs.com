"use client";

import Link from "next/link";
import type { Ref } from "react";
import {
  CircleCheck,
  CirclePlay,
  ExternalLink,
  PanelRightOpen,
  Pencil,
} from "lucide-react";

import { Surface } from "@/components/ui/surface";
import { MetadataField, MetadataGroup } from "@/components/ui/metadata-field";
import { EngineeringWorkOperationalFocusControl } from "@/components/workspace/engineering-work-operational-focus-control";
import { cn } from "@/lib/utils";
import type { RelatedKnowledgeItem } from "@/lib/workspace/related-knowledge";
import type { DefectContext } from "@/lib/workspace/defect-context";

type WorkRecord = {
  id: string;
  title: string;
  summary: string;
  workflow: string;
  state: string;
  currentNextAction: string | null;
  currentOutcome: string | null;
  finalDisposition: string | null;
  condition: string | null;
  conditionRationale: string | null;
  projectSlug: string;
};

type FocusContext = {
  focusVersion: number;
  projectStatus: string;
  workState: string;
  isFocused: boolean;
  canAddToFocus: boolean;
  canRemoveFromFocus: boolean;
} | null;

function AuthoritativeActions({ work }: { work: WorkRecord }) {
  const canOperate = ["proposed", "active", "in_review"].includes(work.state);

  if (!canOperate) return null;

  return (
    <section className="border-t border-border pt-5" aria-labelledby="available-actions-heading">
      <p
        id="available-actions-heading"
        className="font-mono text-[var(--type-state)] uppercase tracking-[0.12em] text-muted-foreground"
      >
        Available authoritative actions
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <Link
          href={`/workspace/projects/${work.projectSlug}/engineering-work/${work.id}/edit`}
          className="inline-flex items-center gap-1.5 rounded-[var(--radius-control)] bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Pencil className="size-3.5" />
          {work.state === "proposed" ? "Correct Proposal" : "Operate Engineering Work"}
        </Link>
        {work.state === "proposed" ? (
          <Link
            href={`/workspace/projects/${work.projectSlug}/engineering-work/${work.id}/activate`}
            className="inline-flex items-center gap-1.5 rounded-[var(--radius-control)] border border-primary/30 bg-background px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <CirclePlay className="size-3.5" />
            Review &amp; Activate
          </Link>
        ) : null}
        {["active", "in_review"].includes(work.state) ? (
          <Link
            href={`/workspace/projects/${work.projectSlug}/engineering-work/${work.id}/complete`}
            className="inline-flex items-center gap-1.5 rounded-[var(--radius-control)] border border-primary/30 bg-background px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <CircleCheck className="size-3.5" />
            Complete
          </Link>
        ) : null}
      </div>
    </section>
  );
}

export function EngineeringWorkActivitySurface({
  work,
  relatedKnowledge,
  selectedSourceId,
  onSelectSource,
  onOpenInspector,
  inspectorTriggerRef,
  defectContext,
  focusContext,
}: {
  work: WorkRecord;
  relatedKnowledge: RelatedKnowledgeItem[];
  selectedSourceId: string | null;
  onSelectSource: (sourceId: string) => void;
  onOpenInspector: () => void;
  inspectorTriggerRef: Ref<HTMLButtonElement>;
  defectContext: DefectContext | null;
  focusContext: FocusContext;
}) {
  const selectedSource =
    relatedKnowledge.find((item) => item.id === selectedSourceId) ??
    relatedKnowledge[0] ??
    null;
  const hasGoverningContext = relatedKnowledge.length > 0;

  return (
    <div className="mx-auto w-full max-w-5xl space-y-7">
      <section aria-labelledby="current-activity-heading">
        <p className="font-mono text-[var(--type-state)] font-medium uppercase tracking-[0.14em] text-role-actionable">
          Current activity
        </p>
        <h2 id="current-activity-heading" className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
          {hasGoverningContext ? "Examine governing context" : "Advance current Engineering Work"}
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          {hasGoverningContext
            ? "Examine the existing sources relevant to the current next action. You determine how they relate to this Engineering Work and whether the proposal needs correction or is ready for lifecycle review."
            : "Use the authoritative Work context and available actions to carry the current next action forward. No governing knowledge has been connected for examination."}
        </p>
      </section>

      {relatedKnowledge.length > 0 ? (
        <section aria-labelledby="available-sources-heading">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h3 id="available-sources-heading" className="text-base font-semibold">
                Available governing context
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Selection changes only the context being inspected. It records no review, decision, approval, or completion.
              </p>
            </div>
            <span className="font-mono text-[var(--type-metadata)] text-muted-foreground">
              {relatedKnowledge.length} {relatedKnowledge.length === 1 ? "source" : "sources"}
            </span>
          </div>

          <div className="mt-4 divide-y divide-border border-y border-border">
            {relatedKnowledge.map((item) => {
              const selected = item.id === selectedSource?.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => onSelectSource(item.id)}
                  className={cn(
                    "grid w-full gap-2 border-l-2 px-4 py-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center",
                    selected
                      ? "border-l-primary bg-primary/5"
                      : "border-l-transparent hover:bg-muted/40",
                  )}
                >
                  <span className="min-w-0">
                    <span className="block font-medium text-foreground">{item.title}</span>
                    <span className="mt-1 block text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </span>
                  </span>
                  <span className="font-mono text-[var(--type-metadata)] uppercase tracking-[0.1em] text-muted-foreground">
                    {selected ? "Selected" : "Select"}
                  </span>
                </button>
              );
            })}
          </div>

          {selectedSource ? (
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Link
                href={`${selectedSource.href}?fromWork=${encodeURIComponent(work.id)}&project=${encodeURIComponent(work.projectSlug)}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Open selected source
                <ExternalLink className="size-3.5" />
              </Link>
              <button
                ref={inspectorTriggerRef}
                type="button"
                onClick={onOpenInspector}
                className="inline-flex items-center gap-1.5 rounded-[var(--radius-control)] border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring xl:hidden"
              >
                <PanelRightOpen className="size-3.5" />
                Inspect source context
              </button>
            </div>
          ) : null}
        </section>
      ) : (
        <div className="rounded-[var(--radius-inset)] border border-dashed border-border px-4 py-3 text-sm text-muted-foreground" role="status">
          No related governing knowledge is connected to this Engineering Work.
        </div>
      )}

      {work.workflow === "defect" && defectContext ? (
        <section aria-labelledby="defect-activity-context-heading">
          <h3 id="defect-activity-context-heading" className="text-base font-semibold">
            Defect investigation context
          </h3>
          <Surface className="mt-3">
            <MetadataGroup>
              <MetadataField label="Observed behavior" value={defectContext.observedBehavior} />
              <MetadataField label="Expected behavior" value={defectContext.expectedBehavior} />
              <MetadataField label="Reproduction steps" value={defectContext.reproductionSteps} />
              <MetadataField label="Environment" value={defectContext.environment} />
              <MetadataField label="Evidence" value={defectContext.evidence} />
              <MetadataField label="Next investigation" value={defectContext.nextInvestigation} />
              <MetadataField label="Validation target" value={defectContext.validationTarget} />
            </MetadataGroup>
          </Surface>
        </section>
      ) : null}

      {work.currentOutcome || work.finalDisposition ? (
        <section className="border-t border-border pt-5" aria-labelledby="recorded-outcome-heading">
          <h3 id="recorded-outcome-heading" className="text-base font-semibold">
            Recorded outcome
          </h3>
          {work.currentOutcome ? (
            <p className="mt-2 text-sm leading-6 text-foreground/90">{work.currentOutcome}</p>
          ) : null}
          {work.finalDisposition ? (
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              <span className="font-medium text-foreground">Final disposition:</span>{" "}
              {work.finalDisposition}
            </p>
          ) : null}
        </section>
      ) : null}

      <AuthoritativeActions work={work} />

      {focusContext ? (
        <section className="border-t border-border pt-5" aria-label="Operational Focus control">
          <EngineeringWorkOperationalFocusControl
            projectSlug={work.projectSlug}
            workId={work.id}
            workState={work.state}
            focusVersion={focusContext.focusVersion}
            projectStatus={focusContext.projectStatus}
            isFocused={focusContext.isFocused}
          />
        </section>
      ) : null}
    </div>
  );
}
