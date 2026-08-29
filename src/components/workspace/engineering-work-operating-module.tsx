"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  EngineeringWorkTypeBadge,
  EngineeringWorkWorkflowBadge,
  EngineeringWorkStateBadge,
} from "@/components/workspace/engineering-work-badges";
import { EngineeringWorkActivitySurface } from "@/components/workspace/engineering-work-activity-surface";
import { OperationalFocusMarker } from "@/components/workspace/operational-focus-marker";
import { StateLabel } from "@/components/ui/state-label";
import type {
  EngineeringWorkType,
  EngineeringWorkWorkflow,
  EngineeringWorkState,
} from "@/lib/workspace/engineering-work";
import type { RelatedKnowledgeItem } from "@/lib/workspace/related-knowledge";
import type { DefectContext } from "@/lib/workspace/defect-context";

import { InspectorPanel } from "./engineering-work-inspector";

type WorkRecord = {
  id: string;
  projectId: string;
  title: string;
  summary: string;
  type: EngineeringWorkType;
  workflow: EngineeringWorkWorkflow;
  state: EngineeringWorkState;
  currentNextAction: string | null;
  currentOutcome: string | null;
  priority: string | null;
  condition: string | null;
  conditionRationale: string | null;
  finalDisposition: string | null;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  projectName: string;
  projectSlug: string;
};

type Reference = {
  id: string;
  engineeringWorkId: string;
  repository: string;
  sourceLocation: string;
  artifactClass: string;
  authority: string;
  artifactIdentifier: string | null;
  branch: string | null;
  commitHash: string | null;
  referenceStatus: "expected" | "verified" | "stale" | "missing";
  lastReviewedAt: Date | null;
  note: string | null;
};

type FocusContext = {
  focusVersion: number;
  projectStatus: string;
  workState: string;
  isFocused: boolean;
  canAddToFocus: boolean;
  canRemoveFromFocus: boolean;
} | null;

type HistoryEvent = {
  id: string;
  kind: string;
  actionType: string;
  priorState: string | null;
  resultingState: string | null;
  previousNextAction: string | null;
  resultingNextAction: string | null;
  previousOutcome: string | null;
  resultingOutcome: string | null;
  previousCondition: string | null;
  resultingCondition: string | null;
  previousFinalDisposition: string | null;
  resultingFinalDisposition: string | null;
  decision: string | null;
  rationale: string | null;
  decisionBasis: { summary?: unknown };
  actionActorType: string | null;
  actionActorIdentifier: string | null;
  actionActorDisplayName: string | null;
  decisionActorType: string | null;
  decisionActorIdentifier: string | null;
  decisionActorDisplayName: string | null;
  decisionRole: string | null;
  authorityType: string | null;
  occurredAt: Date;
};

type EngineeringWorkOperatingModuleProps = {
  work: WorkRecord;
  references: Reference[];
  relatedKnowledge: RelatedKnowledgeItem[];
  defectContext: DefectContext | null;
  history: HistoryEvent[];
  focusContext: FocusContext;
};

function isHistoricalState(state: EngineeringWorkState) {
  return ["completed", "closed", "cancelled", "superseded"].includes(state);
}

function WorkContextHeader({
  work,
  focusContext,
}: {
  work: WorkRecord;
  focusContext: FocusContext;
}) {
  const historical = isHistoricalState(work.state);

  return (
    <div
      className={cn(
        "sticky top-0 z-20 border-b bg-surface-environment/95 backdrop-blur motion-reduce:backdrop-blur-none",
        work.condition ? "border-role-attention-border" : "border-border",
      )}
    >
      <div className="px-5 py-4 lg:px-6">
        <div className="flex items-center gap-2">
          <Link
            href={`/workspace/projects/${work.projectSlug}`}
            className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[var(--type-state)] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowLeft className="size-3" />
            {work.projectName}
          </Link>
          <span className="text-muted-foreground/40">/</span>
          <span className="font-mono text-[var(--type-state)] uppercase tracking-[0.12em] text-muted-foreground">
            Engineering Work
          </span>
        </div>

        <div className="mt-2.5 flex flex-wrap items-center gap-3">
          <h1 className="min-w-0 text-lg font-semibold tracking-tight text-foreground lg:text-xl">
            {work.title}
          </h1>
          <div className="flex shrink-0 flex-wrap items-center gap-1.5">
            <EngineeringWorkTypeBadge type={work.type} />
            <EngineeringWorkWorkflowBadge workflow={work.workflow} />
            <EngineeringWorkStateBadge state={work.state} />
          </div>
          {focusContext?.isFocused ? (
            <OperationalFocusMarker className="shrink-0" />
          ) : focusContext ? (
            <StateLabel role="neutral">Not focused</StateLabel>
          ) : null}
          {historical ? <StateLabel role="settled">Historical</StateLabel> : null}
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-2">
          <div>
            <p className="font-mono text-[var(--type-state)] uppercase tracking-[0.12em] text-muted-foreground">
              Objective
            </p>
            <p className="mt-1 text-sm leading-6 text-foreground/90">{work.summary}</p>
          </div>
          <div className="border-l-2 border-role-actionable-border pl-3">
            <p className="font-mono text-[var(--type-state)] font-medium uppercase tracking-[0.12em] text-role-actionable">
              Current next action
            </p>
            <p className="mt-1 text-sm font-semibold leading-6 text-foreground">
              {work.currentNextAction ?? "No current next action recorded."}
            </p>
          </div>
        </div>
      </div>

      {work.condition ? (
        <div className="border-t border-role-attention-border bg-role-attention-bg/40 px-5 py-3 lg:px-6">
          <p className="font-mono text-[var(--type-state)] font-medium uppercase tracking-[0.14em] text-role-attention">
            Condition
          </p>
          <p className="mt-1 text-sm font-semibold leading-6 text-foreground">{work.condition}</p>
          {work.conditionRationale ? (
            <p className="mt-1 text-sm leading-6 text-muted-foreground">{work.conditionRationale}</p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export function EngineeringWorkOperatingModule({
  work,
  references,
  relatedKnowledge,
  defectContext,
  history,
  focusContext,
}: EngineeringWorkOperatingModuleProps) {
  const [selectedSourceId, setSelectedSourceId] = useState<string | null>(
    relatedKnowledge[0]?.id ?? null,
  );
  const [mobileInspectorOpen, setMobileInspectorOpen] = useState(false);
  const inspectorTriggerRef = useRef<HTMLButtonElement>(null);

  const closeMobileInspector = useCallback(() => {
    setMobileInspectorOpen(false);
    requestAnimationFrame(() => inspectorTriggerRef.current?.focus());
  }, []);

  const selectedSource =
    relatedKnowledge.find((item) => item.id === selectedSourceId) ??
    relatedKnowledge[0] ??
    null;

  return (
    <div className="flex flex-col xl:h-full">
      <WorkContextHeader work={work} focusContext={focusContext} />

      <div className="flex flex-1 xl:min-h-0 xl:overflow-hidden">
        <main className="min-w-0 flex-1 xl:overflow-y-auto">
          <div className="p-5 lg:p-6">
            <EngineeringWorkActivitySurface
              work={work}
              relatedKnowledge={relatedKnowledge}
              selectedSourceId={selectedSource?.id ?? null}
              onSelectSource={setSelectedSourceId}
              onOpenInspector={() => setMobileInspectorOpen(true)}
              inspectorTriggerRef={inspectorTriggerRef}
              defectContext={defectContext}
              focusContext={focusContext}
            />
          </div>
        </main>

        <InspectorPanel
          work={work}
          selectedSource={selectedSource}
          references={references}
          history={history}
          mobileOpen={mobileInspectorOpen}
          onMobileClose={closeMobileInspector}
        />
      </div>
    </div>
  );
}
