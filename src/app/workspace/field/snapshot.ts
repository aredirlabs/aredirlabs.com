/**
 * EXPERIMENTAL PROTOTYPE — Aredir Operating Field snapshot.
 *
 * Reads real authenticated Workspace state and shapes it for the experimental
 * field. Read-only: this module performs no writes and defines no lifecycle
 * behaviour. Continuation and attention are produced by the canonical pure
 * contract functions in `workspace-operational.ts` so the prototype cannot
 * drift from the documented eligibility rules.
 */

import { asc } from "drizzle-orm";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import {
  workspaceEngineeringWork,
  workspaceEngineeringWorkDefects,
  workspaceEngineeringWorkHistory,
  workspaceEngineeringWorkRepositoryReferences,
  workspaceProjectFocusSelection,
  workspaceProjectMilestones,
  workspaceProjects,
} from "@/lib/db/schema";
import type {
  FieldAttention,
  FieldContinuation,
  FieldEvidence,
  FieldHistoryEvent,
  FieldKnowledge,
  FieldSnapshot,
  FieldWork,
} from "@/lib/prototype/operating-field";
import type { EngineeringWorkReferenceStatus, EngineeringWorkState } from "@/lib/workspace/engineering-work";
import { getRelatedKnowledgeForEngineeringWork } from "@/lib/workspace/related-knowledge";
import {
  ATTENTION_DISPLAY_LIMIT,
  isContinuationCandidate,
  projectContinuation,
  type ContinuationSource,
} from "@/lib/workspace/workspace-operational";

const iso = (value: Date | null) => (value ? value.toISOString() : null);
const hasText = (value: string | null | undefined) => Boolean(value?.trim());

const OPERATING_PROJECT_STATUSES = ["active", "testing"];
const OPERATING_WORK_STATES = ["active", "in_review"];

const DEFECT_CONTEXT_FIELDS = [
  "observedBehavior",
  "expectedBehavior",
  "reproductionSteps",
  "environment",
  "evidence",
  "nextInvestigation",
  "validationTarget",
] as const;

export async function readFieldSnapshot(): Promise<FieldSnapshot> {
  const db = getDb();

  const [session, projectRows, workRows, defectRows, referenceRows, historyRows, focusRows, milestoneRows] =
    await Promise.all([
      auth.api.getSession({ headers: await headers() }),
      db.select().from(workspaceProjects).orderBy(asc(workspaceProjects.id)),
      db
        .select()
        .from(workspaceEngineeringWork)
        .orderBy(asc(workspaceEngineeringWork.id)),
      db.select().from(workspaceEngineeringWorkDefects),
      db
        .select()
        .from(workspaceEngineeringWorkRepositoryReferences)
        .orderBy(asc(workspaceEngineeringWorkRepositoryReferences.createdAt)),
      db
        .select()
        .from(workspaceEngineeringWorkHistory)
        .orderBy(asc(workspaceEngineeringWorkHistory.occurredAt)),
      db.select().from(workspaceProjectFocusSelection),
      db
        .select()
        .from(workspaceProjectMilestones)
        .orderBy(asc(workspaceProjectMilestones.sortOrder), asc(workspaceProjectMilestones.id)),
    ]);

  const projectById = new Map(projectRows.map((project) => [project.id, project]));
  const defectByWorkId = new Map(defectRows.map((defect) => [defect.engineeringWorkId, defect]));
  const focusedWorkIds = new Set(focusRows.map((row) => row.engineeringWorkId));

  const evidenceByWorkId = new Map<string, FieldEvidence[]>();
  for (const reference of referenceRows) {
    const bucket = evidenceByWorkId.get(reference.engineeringWorkId) ?? [];
    bucket.push({
      id: reference.id,
      repository: reference.repository,
      sourceLocation: reference.sourceLocation,
      artifactClass: reference.artifactClass,
      authority: reference.authority,
      referenceStatus: reference.referenceStatus as EngineeringWorkReferenceStatus,
      artifactIdentifier: reference.artifactIdentifier,
      note: reference.note,
      lastReviewedAt: iso(reference.lastReviewedAt),
    });
    evidenceByWorkId.set(reference.engineeringWorkId, bucket);
  }

  const historyByWorkId = new Map<string, FieldHistoryEvent[]>();
  for (const event of historyRows) {
    const bucket = historyByWorkId.get(event.engineeringWorkId) ?? [];
    bucket.push({
      id: event.id,
      kind: event.kind,
      actionType: event.actionType,
      priorState: event.priorState,
      resultingState: event.resultingState,
      previousNextAction: event.previousNextAction,
      resultingNextAction: event.resultingNextAction,
      previousOutcome: event.previousOutcome,
      resultingOutcome: event.resultingOutcome,
      previousCondition: event.previousCondition,
      resultingCondition: event.resultingCondition,
      decision: event.decision,
      rationale: event.rationale,
      actionActorType: event.actionActorType,
      actionActorIdentifier: event.actionActorIdentifier,
      decisionActorType: event.decisionActorType,
      decisionActorIdentifier: event.decisionActorIdentifier,
      decisionRole: event.decisionRole,
      authorityType: event.authorityType,
      occurredAt: event.occurredAt.toISOString(),
    });
    historyByWorkId.set(event.engineeringWorkId, bucket);
  }

  const defectContextComplete = (workId: string, workflow: string) => {
    if (workflow !== "defect") return null;
    const defect = defectByWorkId.get(workId);
    if (!defect) return false;
    return DEFECT_CONTEXT_FIELDS.every((field) => hasText(defect[field]));
  };

  const continuationSources: ContinuationSource[] = workRows.flatMap((work) => {
    const project = projectById.get(work.projectId);
    if (!project) return [];
    const defect = defectByWorkId.get(work.id);

    return [
      {
        id: work.id,
        title: work.title,
        summary: work.summary,
        workflow: work.workflow,
        state: work.state,
        currentNextAction: work.currentNextAction ?? "",
        condition: work.condition,
        updatedAt: work.updatedAt,
        projectId: project.id,
        projectName: project.name,
        projectSlug: project.slug,
        projectStatus: project.status,
        defectNextInvestigation: defect?.nextInvestigation ?? null,
        defectValidationTarget: defect?.validationTarget ?? null,
        defectContextComplete:
          defectContextComplete(work.id, work.workflow) ?? true,
      },
    ];
  });

  const continuationProjection = projectContinuation(continuationSources);
  const eligibleWorkIds = new Set(
    continuationSources.filter(isContinuationCandidate).map((source) => source.id),
  );

  const work: FieldWork[] = await Promise.all(
    workRows.map(async (row) => {
      const project = projectById.get(row.projectId);
      const knowledge: FieldKnowledge[] = project
        ? (
            await getRelatedKnowledgeForEngineeringWork({
              id: row.id,
              projectId: project.id,
              projectName: project.name,
              projectSlug: project.slug,
            })
          ).map((item) => ({
            id: item.id,
            title: item.title,
            knowledgeClass: item.knowledgeClass,
            authorityLocation: item.authorityLocation,
            href: item.href,
          }))
        : [];

      return {
        id: row.id,
        projectId: row.projectId,
        projectSlug: project?.slug ?? "",
        projectName: project?.name ?? "Unknown Project",
        title: row.title,
        summary: row.summary,
        type: row.type,
        workflow: row.workflow,
        state: row.state as EngineeringWorkState,
        currentNextAction: row.currentNextAction,
        currentOutcome: row.currentOutcome,
        condition: row.condition,
        conditionRationale: row.conditionRationale,
        finalDisposition: row.finalDisposition,
        priority: row.priority,
        version: row.version,
        createdAt: row.createdAt.toISOString(),
        updatedAt: row.updatedAt.toISOString(),
        isFocused: focusedWorkIds.has(row.id),
        continuationEligible: eligibleWorkIds.has(row.id),
        evidence: evidenceByWorkId.get(row.id) ?? [],
        history: historyByWorkId.get(row.id) ?? [],
        knowledge,
        defectContextComplete: defectContextComplete(row.id, row.workflow),
      };
    }),
  );

  const continuation: FieldContinuation = {
    mode: continuationProjection.mode,
    totalCandidates: continuationProjection.totalCandidates,
    candidates: continuationProjection.candidates.map((candidate) => ({
      workId: candidate.artifact.id,
      projectSlug: candidate.project.slug,
      projectName: candidate.project.name,
      title: candidate.artifact.title,
      nextAction: candidate.nextAction,
      purpose: candidate.purpose,
      reason: candidate.reason,
    })),
  };

  const attention = readAttention({ work, projectRows, milestoneRows });

  const projects = projectRows.map((project) => {
    const selections = focusRows.filter((row) => row.projectId === project.id);
    const operating = OPERATING_PROJECT_STATUSES.includes(project.status);
    const projectedSelections = operating
      ? selections.filter((row) => {
          const selected = work.find((item) => item.id === row.engineeringWorkId);
          return selected ? OPERATING_WORK_STATES.includes(selected.state) : false;
        })
      : [];

    return {
      id: project.id,
      slug: project.slug,
      name: project.name,
      status: project.status,
      stage: project.stage,
      category: project.category,
      description: project.description,
      targetDate: iso(project.targetDate),
      focusVersion: project.focusVersion,
      focusedWorkIds: selections.map((row) => row.engineeringWorkId),
      focusProjectionSuppressed:
        selections.length > 0 && projectedSelections.length === 0,
      milestones: milestoneRows
        .filter((milestone) => milestone.projectId === project.id)
        .map((milestone) => ({
          id: milestone.id,
          title: milestone.title,
          status: milestone.status,
          targetDate: iso(milestone.targetDate),
        })),
    };
  });

  return {
    observedAt: new Date().toISOString(),
    operator: session?.user?.name || session?.user?.email || null,
    projects,
    work,
    continuation,
    attention,
  };
}

/**
 * Attention from the three documented first-generation sources only: a recorded
 * Engineering Work condition, an operating Defect with incomplete Defect
 * Context, and a blocked milestone in an operating Project.
 */
function readAttention(input: {
  work: FieldWork[];
  projectRows: Array<typeof workspaceProjects.$inferSelect>;
  milestoneRows: Array<typeof workspaceProjectMilestones.$inferSelect>;
}): FieldAttention {
  const operatingProjectIds = new Set(
    input.projectRows
      .filter((project) => OPERATING_PROJECT_STATUSES.includes(project.status))
      .map((project) => project.id),
  );
  const projectById = new Map(input.projectRows.map((project) => [project.id, project]));

  const operatingWork = input.work.filter(
    (item) =>
      operatingProjectIds.has(item.projectId) &&
      OPERATING_WORK_STATES.includes(item.state),
  );

  const conditioned = operatingWork
    .filter((item) => hasText(item.condition))
    .map((item) => ({
      workId: item.id,
      projectSlug: item.projectSlug,
      projectName: item.projectName,
      subject: item.title,
      condition: item.condition!.trim(),
      explanation: item.conditionRationale?.trim() || null,
    }));

  const incompleteDefects = operatingWork
    .filter(
      (item) =>
        item.workflow === "defect" &&
        !hasText(item.condition) &&
        item.defectContextComplete === false,
    )
    .map((item) => ({
      workId: item.id,
      projectSlug: item.projectSlug,
      projectName: item.projectName,
      subject: item.title,
      condition: "Defect context is incomplete",
      explanation:
        "This operating Defect cannot be presented as a trustworthy continuation until its required investigation context is complete.",
    }));

  const blockedMilestones = input.milestoneRows
    .filter(
      (milestone) =>
        milestone.status === "blocked" && operatingProjectIds.has(milestone.projectId),
    )
    .map((milestone) => {
      const project = projectById.get(milestone.projectId);
      return {
        workId: null,
        projectSlug: project?.slug ?? "",
        projectName: project?.name ?? "Unknown Project",
        subject: milestone.title,
        condition: "Blocked milestone",
        explanation: milestone.description?.trim() || null,
      };
    });

  const items = [...conditioned, ...incompleteDefects, ...blockedMilestones];

  return {
    total: items.length,
    items: items.slice(0, ATTENTION_DISPLAY_LIMIT),
  };
}