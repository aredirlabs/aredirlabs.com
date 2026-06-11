"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";

import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { workspaceProjectMilestones, workspaceProjectNotes, workspaceProjects } from "@/lib/db/schema";
import { isWorkspaceMilestoneStatus } from "@/lib/workspace/milestone-status";
import { isWorkspaceProjectNoteType } from "@/lib/workspace/note-types";

export type CreateProjectMilestoneState = {
  error?: string;
  success?: boolean;
};

export async function createProjectMilestone(
  projectSlug: string,
  _prevState: CreateProjectMilestoneState,
  formData: FormData,
): Promise<CreateProjectMilestoneState> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { error: "You must be signed in to add milestones." };
  }

  const title = formData.get("title");
  const description = formData.get("description");
  const status = formData.get("status");
  const targetDateRaw = formData.get("target_date");
  const sortOrderRaw = formData.get("sort_order");

  if (typeof title !== "string" || !title.trim()) {
    return { error: "Title is required." };
  }

  if (typeof status !== "string" || !isWorkspaceMilestoneStatus(status)) {
    return { error: "Select a valid milestone status." };
  }

  let targetDate: Date | null = null;
  if (typeof targetDateRaw === "string" && targetDateRaw.trim()) {
    const parsed = new Date(`${targetDateRaw}T00:00:00.000Z`);
    if (Number.isNaN(parsed.getTime())) {
      return { error: "Target date is invalid." };
    }
    targetDate = parsed;
  }

  let sortOrder = 0;
  if (typeof sortOrderRaw === "string" && sortOrderRaw.trim()) {
    const parsed = Number.parseInt(sortOrderRaw, 10);
    if (Number.isNaN(parsed) || parsed < 0) {
      return { error: "Sort order must be a non-negative number." };
    }
    sortOrder = parsed;
  }

  const descriptionValue =
    typeof description === "string" && description.trim()
      ? description.trim()
      : null;

  try {
    const db = getDb();
    const [project] = await db
      .select({ id: workspaceProjects.id })
      .from(workspaceProjects)
      .where(eq(workspaceProjects.slug, projectSlug))
      .limit(1);

    if (!project) {
      return { error: "Project not found." };
    }

    await db.insert(workspaceProjectMilestones).values({
      id: `ms_${crypto.randomUUID()}`,
      projectId: project.id,
      title: title.trim(),
      description: descriptionValue,
      status,
      targetDate,
      sortOrder,
    });

    revalidatePath(`/workspace/projects/${projectSlug}`);
    return { success: true };
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Failed to create milestone.",
    };
  }
}

export type CreateProjectNoteState = {
  error?: string;
  success?: boolean;
};

export async function createProjectNote(
  projectSlug: string,
  _prevState: CreateProjectNoteState,
  formData: FormData,
): Promise<CreateProjectNoteState> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { error: "You must be signed in to add notes." };
  }

  const type = formData.get("type");
  const title = formData.get("title");
  const body = formData.get("body");

  if (typeof type !== "string" || !isWorkspaceProjectNoteType(type)) {
    return { error: "Select a valid note type." };
  }

  if (typeof title !== "string" || !title.trim()) {
    return { error: "Title is required." };
  }

  if (typeof body !== "string" || !body.trim()) {
    return { error: "Body is required." };
  }

  try {
    const db = getDb();
    const [project] = await db
      .select({ id: workspaceProjects.id })
      .from(workspaceProjects)
      .where(eq(workspaceProjects.slug, projectSlug))
      .limit(1);

    if (!project) {
      return { error: "Project not found." };
    }

    await db.insert(workspaceProjectNotes).values({
      id: `note_${crypto.randomUUID()}`,
      projectId: project.id,
      type,
      title: title.trim(),
      body: body.trim(),
    });

    revalidatePath(`/workspace/projects/${projectSlug}`);
    return { success: true };
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Failed to create note.",
    };
  }
}
