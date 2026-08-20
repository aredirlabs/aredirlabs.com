import { and, eq } from "drizzle-orm";

import { getDb } from "@/lib/db";
import {
  workspaceEngineeringWork,
  workspaceEngineeringWorkDefects,
  workspaceProjects,
} from "@/lib/db/schema";

export type DefectContext = typeof workspaceEngineeringWorkDefects.$inferSelect;

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
      validationTarget: workspaceEngineeringWorkDefects.validationTarget,
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
