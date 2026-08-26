"use server";

import { eq } from "drizzle-orm";

import { getDb } from "@/lib/db";
import {
  workspaceEngineeringWork,
  workspaceProjects,
} from "@/lib/db/schema";

export type ProjectIdentity = {
  name: string;
  status: string;
  stage: string;
} | null;

export type WorkIdentity = {
  title: string;
  state: string;
  type: string;
  workflow: string;
} | null;

export async function getProjectIdentityBySlug(
  slug: string,
): Promise<ProjectIdentity> {
  const db = getDb();
  const rows = await db
    .select({
      name: workspaceProjects.name,
      status: workspaceProjects.status,
      stage: workspaceProjects.stage,
    })
    .from(workspaceProjects)
    .where(eq(workspaceProjects.slug, slug))
    .limit(1);

  return rows[0] ?? null;
}

export async function getWorkIdentityById(
  projectSlug: string,
  workId: string,
): Promise<WorkIdentity> {
  const db = getDb();
  const rows = await db
    .select({
      title: workspaceEngineeringWork.title,
      state: workspaceEngineeringWork.state,
      type: workspaceEngineeringWork.type,
      workflow: workspaceEngineeringWork.workflow,
    })
    .from(workspaceEngineeringWork)
    .innerJoin(
      workspaceProjects,
      eq(workspaceEngineeringWork.projectId, workspaceProjects.id),
    )
    .where(
      eq(workspaceProjects.slug, projectSlug) &&
        eq(workspaceEngineeringWork.id, workId),
    )
    .limit(1);

  return rows[0] ?? null;
}
