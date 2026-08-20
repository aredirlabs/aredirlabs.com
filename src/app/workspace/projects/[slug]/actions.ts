"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { and, eq } from "drizzle-orm";

import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import {
  workspaceProjectDocuments,
  workspaceProjectMilestones,
  workspaceProjectNotes,
  workspaceProjectPrompts,
  workspaceProjects,
} from "@/lib/db/schema";
import { isWorkspaceProjectDocumentCategory } from "@/lib/workspace/document-categories";
import { isWorkspaceMilestoneStatus } from "@/lib/workspace/milestone-status";
import { isWorkspaceProjectNoteType } from "@/lib/workspace/note-types";
import { isWorkspaceProjectPromptStatus } from "@/lib/workspace/prompt-status";
import { isWorkspaceProjectPromptType } from "@/lib/workspace/prompt-types";

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

export type CreateProjectDocumentState = {
  error?: string;
  success?: boolean;
};

function slugifyDocumentTitle(title: string) {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function createProjectDocument(
  projectSlug: string,
  _prevState: CreateProjectDocumentState,
  formData: FormData,
): Promise<CreateProjectDocumentState> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { error: "You must be signed in to add documents." };
  }

  const category = formData.get("category");
  const title = formData.get("title");
  const content = formData.get("content");

  if (
    typeof category !== "string" ||
    !isWorkspaceProjectDocumentCategory(category)
  ) {
    return { error: "Select a valid document category." };
  }

  if (typeof title !== "string" || !title.trim()) {
    return { error: "Title is required." };
  }

  if (typeof content !== "string" || !content.trim()) {
    return { error: "Content is required." };
  }

  const slug = slugifyDocumentTitle(title);
  if (!slug) {
    return { error: "Title must include at least one letter or number." };
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

    const [existingDocument] = await db
      .select({ id: workspaceProjectDocuments.id })
      .from(workspaceProjectDocuments)
      .where(
        and(
          eq(workspaceProjectDocuments.projectId, project.id),
          eq(workspaceProjectDocuments.slug, slug),
        ),
      )
      .limit(1);

    if (existingDocument) {
      return {
        error:
          "A document with this generated slug already exists. Change the title and try again.",
      };
    }

    await db.insert(workspaceProjectDocuments).values({
      id: `doc_${crypto.randomUUID()}`,
      projectId: project.id,
      category,
      title: title.trim(),
      slug,
      content: content.trim(),
    });

    revalidatePath("/workspace/docs");
    revalidatePath(`/workspace/projects/${projectSlug}`);
    return { success: true };
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Failed to create document.",
    };
  }
}

export type CreateProjectPromptState = {
  error?: string;
  success?: boolean;
};

function optionalText(value: FormDataEntryValue | null) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

export async function createProjectPrompt(
  projectSlug: string,
  _prevState: CreateProjectPromptState,
  formData: FormData,
): Promise<CreateProjectPromptState> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { error: "You must be signed in to add prompts." };
  }

  const title = formData.get("title");
  const promptType = formData.get("prompt_type");
  const promptBody = formData.get("prompt_body");
  const resultSummary = formData.get("result_summary");
  const filesChanged = formData.get("files_changed");
  const verification = formData.get("verification");
  const followUps = formData.get("follow_ups");
  const status = formData.get("status");

  if (typeof title !== "string" || !title.trim()) {
    return { error: "Title is required." };
  }

  if (
    typeof promptType !== "string" ||
    !isWorkspaceProjectPromptType(promptType)
  ) {
    return { error: "Select a valid prompt type." };
  }

  if (typeof promptBody !== "string" || !promptBody.trim()) {
    return { error: "Prompt body is required." };
  }

  if (typeof status !== "string" || !isWorkspaceProjectPromptStatus(status)) {
    return { error: "Select a valid prompt status." };
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

    await db.insert(workspaceProjectPrompts).values({
      id: `prompt_${crypto.randomUUID()}`,
      projectId: project.id,
      title: title.trim(),
      promptType,
      promptBody: promptBody.trim(),
      resultSummary: optionalText(resultSummary),
      filesChanged: optionalText(filesChanged),
      verification: optionalText(verification),
      followUps: optionalText(followUps),
      status,
    });

    revalidatePath("/workspace/prompts");
    revalidatePath(`/workspace/projects/${projectSlug}`);
    return { success: true };
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Failed to create prompt.",
    };
  }
}
