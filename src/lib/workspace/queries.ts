import { asc, eq, inArray, sql } from "drizzle-orm";

import { getDb } from "@/lib/db";
import {
  workspaceProjectMilestones,
  workspaceProjects,
} from "@/lib/db/schema";

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
