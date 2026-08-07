import { and, asc, desc, eq, ilike, inArray, or, sql, type SQL } from "drizzle-orm";

import { getDb } from "@/lib/db";
import {
  workspaceProjectDocuments,
  workspaceProjectMilestones,
  workspaceProjectPrompts,
  workspaceProjects,
  workspaceEngineeringWork,
  workspaceEngineeringWorkDefects,
  workspaceEngineeringWorkRepositoryReferences,
} from "@/lib/db/schema";
import {
  WORKSPACE_PROJECT_DOCUMENT_CATEGORIES,
  WORKSPACE_PROJECT_DOCUMENT_CATEGORY_LABELS,
  type WorkspaceProjectDocumentCategory,
} from "@/lib/workspace/document-categories";
import {
  WORKSPACE_PROJECT_PROMPT_STATUSES,
  type WorkspaceProjectPromptStatus,
} from "@/lib/workspace/prompt-status";
import {
  WORKSPACE_PROJECT_PROMPT_TYPES,
  type WorkspaceProjectPromptType,
} from "@/lib/workspace/prompt-types";
import {
  ATTENTION_DISPLAY_LIMIT,
  CONTINUATION_DISPLAY_LIMIT,
  projectionFromEligibleSources,
  type ContinuationSource,
  type WorkspaceAttentionItem,
  type WorkspaceAttentionProjection,
  type WorkspaceContinuationProjection,
} from "@/lib/workspace/workspace-operational";

export type OperatingSnapshot = {
  activeCount: number;
  testingCount: number;
  pausedPlanningCount: number;
  nextMilestone: {
    id: string;
    title: string;
    targetDate: Date | null;
    projectName: string;
    projectSlug: string;
  } | null;
  blockedMilestones: Array<{
    id: string;
    title: string;
    projectName: string;
    projectSlug: string;
  }>;
};

export type DailyOperatingExperience = {
  continuation: WorkspaceContinuationProjection;
  attention: WorkspaceAttentionProjection;
  activeProjects: Array<{
    id: string;
    name: string;
    slug: string;
    currentFocus: string | null;
    nextStep: string | null;
  }>;
};

const operatingProject = inArray(workspaceProjects.status, ["active", "testing"]);
const eligibleWorkState = inArray(workspaceEngineeringWork.state, ["active", "in_review"]);
const hasNoCondition = sql<boolean>`btrim(coalesce(${workspaceEngineeringWork.condition}, '')) = ''`;
const hasRequiredWorkText = sql<boolean>`
  btrim(${workspaceEngineeringWork.title}) <> ''
  AND btrim(${workspaceEngineeringWork.summary}) <> ''
  AND btrim(${workspaceEngineeringWork.currentNextAction}) <> ''
  AND btrim(${workspaceProjects.slug}) <> ''
`;
const hasCompleteDefectContext = sql<boolean>`
  ${workspaceEngineeringWork.workflow} <> 'defect'
  OR (
    ${workspaceEngineeringWorkDefects.engineeringWorkId} IS NOT NULL
    AND btrim(${workspaceEngineeringWorkDefects.observedBehavior}) <> ''
    AND btrim(${workspaceEngineeringWorkDefects.expectedBehavior}) <> ''
    AND btrim(${workspaceEngineeringWorkDefects.reproductionSteps}) <> ''
    AND btrim(${workspaceEngineeringWorkDefects.environment}) <> ''
    AND btrim(${workspaceEngineeringWorkDefects.evidence}) <> ''
    AND btrim(${workspaceEngineeringWorkDefects.nextInvestigation}) <> ''
    AND btrim(${workspaceEngineeringWorkDefects.validationTarget}) <> ''
  )
`;

/**
 * Produces a bounded shared projection. `updatedAt` only stabilizes the order
 * of already-eligible peers; it never establishes eligibility or a winner.
 */
export async function getDailyOperatingExperience(): Promise<DailyOperatingExperience> {
  const db = getDb();
  const [continuationRows, conditionedRows, incompleteDefectRows, blockedMilestoneRows, activeProjects] = await Promise.all([
    db.select({
      totalCandidates: sql<number>`count(*) over()`,
      id: workspaceEngineeringWork.id,
      title: workspaceEngineeringWork.title,
      summary: workspaceEngineeringWork.summary,
      workflow: workspaceEngineeringWork.workflow,
      state: workspaceEngineeringWork.state,
      currentNextAction: workspaceEngineeringWork.currentNextAction,
      condition: workspaceEngineeringWork.condition,
      updatedAt: workspaceEngineeringWork.updatedAt,
      projectId: workspaceProjects.id,
      projectName: workspaceProjects.name,
      projectSlug: workspaceProjects.slug,
      projectStatus: workspaceProjects.status,
      defectNextInvestigation: workspaceEngineeringWorkDefects.nextInvestigation,
      defectValidationTarget: workspaceEngineeringWorkDefects.validationTarget,
      defectContextComplete: hasCompleteDefectContext,
    })
      .from(workspaceEngineeringWork)
      .innerJoin(workspaceProjects, eq(workspaceEngineeringWork.projectId, workspaceProjects.id))
      .leftJoin(
        workspaceEngineeringWorkDefects,
        eq(workspaceEngineeringWorkDefects.engineeringWorkId, workspaceEngineeringWork.id),
      )
      .where(and(operatingProject, eligibleWorkState, hasNoCondition, hasRequiredWorkText, hasCompleteDefectContext))
      .orderBy(desc(workspaceEngineeringWork.updatedAt), asc(workspaceEngineeringWork.id))
      .limit(CONTINUATION_DISPLAY_LIMIT),
    db.select({
      total: sql<number>`count(*) over()`,
      id: workspaceEngineeringWork.id,
      title: workspaceEngineeringWork.title,
      condition: workspaceEngineeringWork.condition,
      explanation: workspaceEngineeringWork.conditionRationale,
      projectId: workspaceProjects.id,
      projectName: workspaceProjects.name,
      projectSlug: workspaceProjects.slug,
    })
      .from(workspaceEngineeringWork)
      .innerJoin(workspaceProjects, eq(workspaceEngineeringWork.projectId, workspaceProjects.id))
      .where(
        and(
          operatingProject,
          eligibleWorkState,
          sql<boolean>`btrim(coalesce(${workspaceEngineeringWork.condition}, '')) <> ''`,
        ),
      )
      .orderBy(desc(workspaceEngineeringWork.updatedAt), asc(workspaceEngineeringWork.id))
      .limit(ATTENTION_DISPLAY_LIMIT),
    db.select({
      total: sql<number>`count(*) over()`,
      id: workspaceEngineeringWork.id,
      title: workspaceEngineeringWork.title,
      projectId: workspaceProjects.id,
      projectName: workspaceProjects.name,
      projectSlug: workspaceProjects.slug,
    })
      .from(workspaceEngineeringWork)
      .innerJoin(workspaceProjects, eq(workspaceEngineeringWork.projectId, workspaceProjects.id))
      .leftJoin(
        workspaceEngineeringWorkDefects,
        eq(workspaceEngineeringWorkDefects.engineeringWorkId, workspaceEngineeringWork.id),
      )
      .where(
        and(
          operatingProject,
          eligibleWorkState,
          eq(workspaceEngineeringWork.workflow, "defect"),
          hasNoCondition,
          sql<boolean>`NOT (${hasCompleteDefectContext})`,
        ),
      )
      .orderBy(desc(workspaceEngineeringWork.updatedAt), asc(workspaceEngineeringWork.id))
      .limit(ATTENTION_DISPLAY_LIMIT),
    db.select({
      total: sql<number>`count(*) over()`,
      id: workspaceProjectMilestones.id,
      title: workspaceProjectMilestones.title,
      description: workspaceProjectMilestones.description,
      projectId: workspaceProjects.id,
      projectName: workspaceProjects.name,
      projectSlug: workspaceProjects.slug,
    })
      .from(workspaceProjectMilestones)
      .innerJoin(workspaceProjects, eq(workspaceProjectMilestones.projectId, workspaceProjects.id))
      .where(and(operatingProject, eq(workspaceProjectMilestones.status, "blocked")))
      .orderBy(asc(workspaceProjects.id), asc(workspaceProjectMilestones.sortOrder), asc(workspaceProjectMilestones.id))
      .limit(ATTENTION_DISPLAY_LIMIT),
    db.select({ id: workspaceProjects.id, name: workspaceProjects.name, slug: workspaceProjects.slug, currentFocus: workspaceProjects.currentFocus, nextStep: workspaceProjects.nextStep })
      .from(workspaceProjects)
      .where(operatingProject)
      .orderBy(asc(workspaceProjects.name), asc(workspaceProjects.id))
      .limit(3),
  ]);

  const continuation = projectionFromEligibleSources(
    continuationRows as ContinuationSource[],
    Number(continuationRows[0]?.totalCandidates ?? 0),
  );

  const conditionedItems: WorkspaceAttentionItem[] = conditionedRows.map((row) => ({
    project: { id: row.projectId, name: row.projectName, slug: row.projectSlug },
    artifact: { kind: "engineering_work", id: row.id, title: row.title },
    condition: row.condition!.trim(),
    explanation: row.explanation?.trim() || null,
    destination: `/workspace/projects/${row.projectSlug}/engineering-work/${row.id}`,
  }));
  const incompleteDefectItems: WorkspaceAttentionItem[] = incompleteDefectRows.map((row) => ({
    project: { id: row.projectId, name: row.projectName, slug: row.projectSlug },
    artifact: { kind: "engineering_work", id: row.id, title: row.title },
    condition: "Defect context is incomplete",
    explanation: "This active Defect cannot be presented as a trustworthy continuation until its required investigation context is complete.",
    destination: `/workspace/projects/${row.projectSlug}/engineering-work/${row.id}`,
  }));
  const blockedMilestoneItems: WorkspaceAttentionItem[] = blockedMilestoneRows.map((row) => ({
    project: { id: row.projectId, name: row.projectName, slug: row.projectSlug },
    artifact: { kind: "milestone", id: row.id, title: row.title },
    condition: "Blocked milestone",
    explanation: row.description?.trim() || null,
    destination: `/workspace/projects/${row.projectSlug}`,
  }));
  const attentionItems = [...conditionedItems, ...incompleteDefectItems, ...blockedMilestoneItems];
  const attentionTotal =
    Number(conditionedRows[0]?.total ?? 0) +
    Number(incompleteDefectRows[0]?.total ?? 0) +
    Number(blockedMilestoneRows[0]?.total ?? 0);

  return {
    continuation,
    attention: {
      total: attentionTotal,
      items: attentionItems.slice(0, ATTENTION_DISPLAY_LIMIT),
    },
    activeProjects,
  };
}

export async function getOperatingSnapshot(): Promise<OperatingSnapshot> {
  const db = getDb();

  const projects = await db.select().from(workspaceProjects);

  const activeCount = projects.filter((p) => p.status === "active").length;
  const testingCount = projects.filter((p) => p.status === "testing").length;
  const pausedPlanningCount = projects.filter((p) =>
    ["paused", "planning"].includes(p.status),
  ).length;

  const upcomingRows = await db
    .select({
      id: workspaceProjectMilestones.id,
      title: workspaceProjectMilestones.title,
      targetDate: workspaceProjectMilestones.targetDate,
      projectName: workspaceProjects.name,
      projectSlug: workspaceProjects.slug,
    })
    .from(workspaceProjectMilestones)
    .innerJoin(
      workspaceProjects,
      eq(workspaceProjectMilestones.projectId, workspaceProjects.id),
    )
    .where(inArray(workspaceProjectMilestones.status, ["planned", "active"]))
    .orderBy(
      sql`${workspaceProjectMilestones.targetDate} ASC NULLS LAST`,
      asc(workspaceProjectMilestones.sortOrder),
    )
    .limit(1);

  const blockedRows = await db
    .select({
      id: workspaceProjectMilestones.id,
      title: workspaceProjectMilestones.title,
      projectName: workspaceProjects.name,
      projectSlug: workspaceProjects.slug,
    })
    .from(workspaceProjectMilestones)
    .innerJoin(
      workspaceProjects,
      eq(workspaceProjectMilestones.projectId, workspaceProjects.id),
    )
    .where(eq(workspaceProjectMilestones.status, "blocked"))
    .orderBy(asc(workspaceProjectMilestones.sortOrder));

  return {
    activeCount,
    testingCount,
    pausedPlanningCount,
    nextMilestone: upcomingRows[0] ?? null,
    blockedMilestones: blockedRows,
  };
}

export function groupMilestonesByStatus<
  T extends { status: string; sortOrder: number },
>(milestones: T[]) {
  const groups: Array<{ key: string; label: string; items: T[] }> = [
    { key: "active", label: "Active", items: [] },
    { key: "planned", label: "Planned", items: [] },
    { key: "blocked", label: "Blocked", items: [] },
    { key: "completed-deferred", label: "Completed / Deferred", items: [] },
  ];

  const sorted = [...milestones].sort((a, b) => a.sortOrder - b.sortOrder);

  for (const milestone of sorted) {
    if (milestone.status === "active") {
      groups[0].items.push(milestone);
    } else if (milestone.status === "planned") {
      groups[1].items.push(milestone);
    } else if (milestone.status === "blocked") {
      groups[2].items.push(milestone);
    } else if (
      milestone.status === "completed" ||
      milestone.status === "deferred"
    ) {
      groups[3].items.push(milestone);
    }
  }

  return groups.filter((group) => group.items.length > 0);
}

export type WorkspaceProjectDocument =
  typeof workspaceProjectDocuments.$inferSelect;

export type WorkspaceProjectPrompt = typeof workspaceProjectPrompts.$inferSelect;

export type WorkspaceEngineeringWork =
  typeof workspaceEngineeringWork.$inferSelect;

export async function getProjectEngineeringWork(projectId: string) {
  const db = getDb();

  return db
    .select()
    .from(workspaceEngineeringWork)
    .where(eq(workspaceEngineeringWork.projectId, projectId))
    .orderBy(desc(workspaceEngineeringWork.updatedAt));
}

export async function getProjectEngineeringWorkById(
  projectSlug: string,
  engineeringWorkId: string,
) {
  const db = getDb();
  const rows = await db
    .select({
      id: workspaceEngineeringWork.id,
      projectId: workspaceEngineeringWork.projectId,
      title: workspaceEngineeringWork.title,
      summary: workspaceEngineeringWork.summary,
      type: workspaceEngineeringWork.type,
      workflow: workspaceEngineeringWork.workflow,
      state: workspaceEngineeringWork.state,
      currentNextAction: workspaceEngineeringWork.currentNextAction,
      currentOutcome: workspaceEngineeringWork.currentOutcome,
      priority: workspaceEngineeringWork.priority,
      condition: workspaceEngineeringWork.condition,
      conditionRationale: workspaceEngineeringWork.conditionRationale,
      createdAt: workspaceEngineeringWork.createdAt,
      updatedAt: workspaceEngineeringWork.updatedAt,
      projectName: workspaceProjects.name,
      projectSlug: workspaceProjects.slug,
    })
    .from(workspaceEngineeringWork)
    .innerJoin(
      workspaceProjects,
      eq(workspaceEngineeringWork.projectId, workspaceProjects.id),
    )
    .where(
      and(
        eq(workspaceProjects.slug, projectSlug),
        eq(workspaceEngineeringWork.id, engineeringWorkId),
      ),
    )
    .limit(1);

  return rows[0] ?? null;
}

export async function getEngineeringWorkRepositoryReferences(
  engineeringWorkId: string,
) {
  const db = getDb();

  return db
    .select()
    .from(workspaceEngineeringWorkRepositoryReferences)
    .where(
      eq(
        workspaceEngineeringWorkRepositoryReferences.engineeringWorkId,
        engineeringWorkId,
      ),
    )
    .orderBy(asc(workspaceEngineeringWorkRepositoryReferences.createdAt));
}

export type WorkspaceDocumentSearchResult = WorkspaceProjectDocument & {
  projectName: string;
  projectSlug: string;
};

export async function getProjectDocuments(projectId: string) {
  const db = getDb();

  return db
    .select()
    .from(workspaceProjectDocuments)
    .where(eq(workspaceProjectDocuments.projectId, projectId))
    .orderBy(
      asc(workspaceProjectDocuments.category),
      desc(workspaceProjectDocuments.updatedAt),
      asc(workspaceProjectDocuments.title),
    );
}

export async function getProjectPrompts(projectId: string) {
  const db = getDb();

  return db
    .select()
    .from(workspaceProjectPrompts)
    .where(eq(workspaceProjectPrompts.projectId, projectId))
    .orderBy(
      desc(workspaceProjectPrompts.updatedAt),
      asc(workspaceProjectPrompts.title),
    );
}

export async function getProjectDocumentBySlugs(
  projectSlug: string,
  documentSlug: string,
) {
  const db = getDb();
  const rows = await db
    .select({
      id: workspaceProjectDocuments.id,
      projectId: workspaceProjectDocuments.projectId,
      category: workspaceProjectDocuments.category,
      title: workspaceProjectDocuments.title,
      slug: workspaceProjectDocuments.slug,
      content: workspaceProjectDocuments.content,
      createdAt: workspaceProjectDocuments.createdAt,
      updatedAt: workspaceProjectDocuments.updatedAt,
      projectName: workspaceProjects.name,
      projectSlug: workspaceProjects.slug,
    })
    .from(workspaceProjectDocuments)
    .innerJoin(
      workspaceProjects,
      eq(workspaceProjectDocuments.projectId, workspaceProjects.id),
    )
    .where(
      and(
        eq(workspaceProjects.slug, projectSlug),
        eq(workspaceProjectDocuments.slug, documentSlug),
      ),
    )
    .limit(1);

  return rows[0] ?? null;
}

export async function getProjectPromptById(
  projectSlug: string,
  promptId: string,
) {
  const db = getDb();
  const rows = await db
    .select({
      id: workspaceProjectPrompts.id,
      projectId: workspaceProjectPrompts.projectId,
      title: workspaceProjectPrompts.title,
      promptType: workspaceProjectPrompts.promptType,
      promptBody: workspaceProjectPrompts.promptBody,
      resultSummary: workspaceProjectPrompts.resultSummary,
      filesChanged: workspaceProjectPrompts.filesChanged,
      verification: workspaceProjectPrompts.verification,
      followUps: workspaceProjectPrompts.followUps,
      status: workspaceProjectPrompts.status,
      createdAt: workspaceProjectPrompts.createdAt,
      updatedAt: workspaceProjectPrompts.updatedAt,
      projectName: workspaceProjects.name,
      projectSlug: workspaceProjects.slug,
    })
    .from(workspaceProjectPrompts)
    .innerJoin(
      workspaceProjects,
      eq(workspaceProjectPrompts.projectId, workspaceProjects.id),
    )
    .where(
      and(
        eq(workspaceProjects.slug, projectSlug),
        eq(workspaceProjectPrompts.id, promptId),
      ),
    )
    .limit(1);

  return rows[0] ?? null;
}

export async function searchWorkspaceDocuments(query: string) {
  const db = getDb();
  const normalizedQuery = query.trim();
  const matchingCategories = WORKSPACE_PROJECT_DOCUMENT_CATEGORIES.filter(
    (category) => {
      const label = WORKSPACE_PROJECT_DOCUMENT_CATEGORY_LABELS[category];
      const haystacks = [category, label].map((value) => value.toLowerCase());
      return haystacks.some((value) =>
        value.includes(normalizedQuery.toLowerCase()),
      );
    },
  );

  return db
    .select({
      id: workspaceProjectDocuments.id,
      projectId: workspaceProjectDocuments.projectId,
      category: workspaceProjectDocuments.category,
      title: workspaceProjectDocuments.title,
      slug: workspaceProjectDocuments.slug,
      content: workspaceProjectDocuments.content,
      createdAt: workspaceProjectDocuments.createdAt,
      updatedAt: workspaceProjectDocuments.updatedAt,
      projectName: workspaceProjects.name,
      projectSlug: workspaceProjects.slug,
    })
    .from(workspaceProjectDocuments)
    .innerJoin(
      workspaceProjects,
      eq(workspaceProjectDocuments.projectId, workspaceProjects.id),
    )
    .where(
      normalizedQuery
        ? or(
            ilike(workspaceProjectDocuments.title, `%${normalizedQuery}%`),
            matchingCategories.length > 0
              ? inArray(workspaceProjectDocuments.category, matchingCategories)
              : undefined,
          )
        : undefined,
    )
    .orderBy(
      asc(workspaceProjects.name),
      asc(workspaceProjectDocuments.category),
      asc(workspaceProjectDocuments.title),
    );
}

type SearchWorkspacePromptsFilters = {
  project?: string;
  type?: string;
  status?: string;
  q?: string;
};

export async function searchWorkspacePrompts({
  project,
  type,
  status,
  q,
}: SearchWorkspacePromptsFilters) {
  const db = getDb();
  const conditions: SQL[] = [];
  const normalizedProject = project?.trim();
  const normalizedType = type?.trim();
  const normalizedStatus = status?.trim();
  const normalizedQuery = q?.trim();

  if (normalizedProject) {
    conditions.push(eq(workspaceProjects.slug, normalizedProject));
  }

  if (
    normalizedType &&
    WORKSPACE_PROJECT_PROMPT_TYPES.includes(
      normalizedType as WorkspaceProjectPromptType,
    )
  ) {
    conditions.push(
      eq(
        workspaceProjectPrompts.promptType,
        normalizedType as WorkspaceProjectPromptType,
      ),
    );
  }

  if (
    normalizedStatus &&
    WORKSPACE_PROJECT_PROMPT_STATUSES.includes(
      normalizedStatus as WorkspaceProjectPromptStatus,
    )
  ) {
    conditions.push(
      eq(
        workspaceProjectPrompts.status,
        normalizedStatus as WorkspaceProjectPromptStatus,
      ),
    );
  }

  if (normalizedQuery) {
    conditions.push(
      ilike(workspaceProjectPrompts.title, `%${normalizedQuery}%`),
    );
  }

  return db
    .select({
      id: workspaceProjectPrompts.id,
      projectId: workspaceProjectPrompts.projectId,
      title: workspaceProjectPrompts.title,
      promptType: workspaceProjectPrompts.promptType,
      promptBody: workspaceProjectPrompts.promptBody,
      resultSummary: workspaceProjectPrompts.resultSummary,
      filesChanged: workspaceProjectPrompts.filesChanged,
      verification: workspaceProjectPrompts.verification,
      followUps: workspaceProjectPrompts.followUps,
      status: workspaceProjectPrompts.status,
      createdAt: workspaceProjectPrompts.createdAt,
      updatedAt: workspaceProjectPrompts.updatedAt,
      projectName: workspaceProjects.name,
      projectSlug: workspaceProjects.slug,
    })
    .from(workspaceProjectPrompts)
    .innerJoin(
      workspaceProjects,
      eq(workspaceProjectPrompts.projectId, workspaceProjects.id),
    )
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(
      desc(workspaceProjectPrompts.updatedAt),
      asc(workspaceProjects.name),
    );
}

export async function getWorkspacePromptProjects() {
  const db = getDb();

  return db
    .select({
      name: workspaceProjects.name,
      slug: workspaceProjects.slug,
    })
    .from(workspaceProjects)
    .orderBy(asc(workspaceProjects.name));
}

export function groupDocumentsByCategory<T extends { category: string }>(
  documents: T[],
) {
  return WORKSPACE_PROJECT_DOCUMENT_CATEGORIES.map((category) => ({
    key: category,
    label:
      WORKSPACE_PROJECT_DOCUMENT_CATEGORY_LABELS[
        category as WorkspaceProjectDocumentCategory
      ],
    items: documents.filter((document) => document.category === category),
  })).filter((group) => group.items.length > 0);
}
