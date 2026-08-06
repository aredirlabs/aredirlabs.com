import { and, eq } from "drizzle-orm";

import { getDb } from "@/lib/db";
import {
  workspaceEngineeringWork,
  workspaceEngineeringWorkDefects,
  workspaceProjects,
} from "@/lib/db/schema";

export type DefectContext = typeof workspaceEngineeringWorkDefects.$inferSelect;

export type DefectContextInput = {
  observedBehavior: string;
  expectedBehavior: string;
  reproductionSteps: string;
  environment: string;
  evidence: string;
  nextInvestigation: string;
};

function normalizedDefectContext(input: DefectContextInput): DefectContextInput {
  return {
    observedBehavior: input.observedBehavior.trim(),
    expectedBehavior: input.expectedBehavior.trim(),
    reproductionSteps: input.reproductionSteps.trim(),
    environment: input.environment.trim(),
    evidence: input.evidence.trim(),
    nextInvestigation: input.nextInvestigation.trim(),
  };
}

export function isCompleteDefectContext(input: DefectContextInput) {
  return Object.values(normalizedDefectContext(input)).every(Boolean);
}

/**
 * Reads Defect context through the canonical Engineering Work and its project.
 * A context ID alone is never treated as project authority.
 */
export async function getProjectDefectContext(
  projectSlug: string,
  engineeringWorkId: string,
): Promise<DefectContext | null> {
  const db = getDb();
  const rows = await db
    .select({
      engineeringWorkId: workspaceEngineeringWorkDefects.engineeringWorkId,
      observedBehavior: workspaceEngineeringWorkDefects.observedBehavior,
      expectedBehavior: workspaceEngineeringWorkDefects.expectedBehavior,
      reproductionSteps: workspaceEngineeringWorkDefects.reproductionSteps,
      environment: workspaceEngineeringWorkDefects.environment,
      evidence: workspaceEngineeringWorkDefects.evidence,
      nextInvestigation: workspaceEngineeringWorkDefects.nextInvestigation,
      createdAt: workspaceEngineeringWorkDefects.createdAt,
      updatedAt: workspaceEngineeringWorkDefects.updatedAt,
    })
    .from(workspaceEngineeringWorkDefects)
    .innerJoin(
      workspaceEngineeringWork,
      eq(
        workspaceEngineeringWorkDefects.engineeringWorkId,
        workspaceEngineeringWork.id,
      ),
    )
    .innerJoin(
      workspaceProjects,
      eq(workspaceEngineeringWork.projectId, workspaceProjects.id),
    )
    .where(
      and(
        eq(workspaceProjects.slug, projectSlug),
        eq(workspaceEngineeringWork.id, engineeringWorkId),
        eq(workspaceEngineeringWork.workflow, "defect"),
      ),
    )
    .limit(1);

  return rows[0] ?? null;
}

/**
 * Creates context only for an existing, project-scoped Defect work record.
 * The later Defect intake package must compose this with parent creation in one
 * transaction; this helper intentionally does not create parent records.
 */
export async function createProjectDefectContext(
  projectSlug: string,
  engineeringWorkId: string,
  input: DefectContextInput,
): Promise<DefectContext | null> {
  if (!isCompleteDefectContext(input)) {
    throw new Error("Every Defect context field is required.");
  }

  const db = getDb();
  const [work] = await db
    .select({ id: workspaceEngineeringWork.id })
    .from(workspaceEngineeringWork)
    .innerJoin(
      workspaceProjects,
      eq(workspaceEngineeringWork.projectId, workspaceProjects.id),
    )
    .where(
      and(
        eq(workspaceProjects.slug, projectSlug),
        eq(workspaceEngineeringWork.id, engineeringWorkId),
        eq(workspaceEngineeringWork.workflow, "defect"),
      ),
    )
    .limit(1);

  if (!work) return null;

  const [context] = await db
    .insert(workspaceEngineeringWorkDefects)
    .values({ engineeringWorkId: work.id, ...normalizedDefectContext(input) })
    .returning();

  return context;
}

/** Updates context only after resolving parent work through the project scope. */
export async function updateProjectDefectContext(
  projectSlug: string,
  engineeringWorkId: string,
  input: DefectContextInput,
): Promise<DefectContext | null> {
  if (!isCompleteDefectContext(input)) {
    throw new Error("Every Defect context field is required.");
  }

  const db = getDb();
  const [work] = await db
    .select({ id: workspaceEngineeringWork.id })
    .from(workspaceEngineeringWork)
    .innerJoin(
      workspaceProjects,
      eq(workspaceEngineeringWork.projectId, workspaceProjects.id),
    )
    .where(
      and(
        eq(workspaceProjects.slug, projectSlug),
        eq(workspaceEngineeringWork.id, engineeringWorkId),
        eq(workspaceEngineeringWork.workflow, "defect"),
      ),
    )
    .limit(1);

  if (!work) return null;

  const [context] = await db
    .update(workspaceEngineeringWorkDefects)
    .set({ ...normalizedDefectContext(input), updatedAt: new Date() })
    .where(
      eq(workspaceEngineeringWorkDefects.engineeringWorkId, work.id),
    )
    .returning();

  return context ?? null;
}
