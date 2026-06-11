import { and, asc, desc, eq, ilike, inArray, or, sql } from "drizzle-orm";

import { getDb } from "@/lib/db";
import {
  workspaceProjectDocuments,
  workspaceProjectMilestones,
  workspaceProjects,
} from "@/lib/db/schema";
import {
  WORKSPACE_PROJECT_DOCUMENT_CATEGORIES,
  WORKSPACE_PROJECT_DOCUMENT_CATEGORY_LABELS,
  type WorkspaceProjectDocumentCategory,
} from "@/lib/workspace/document-categories";

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

export type WorkspaceProjectDocument =
  typeof workspaceProjectDocuments.$inferSelect;

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
