"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";

import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { workspaceProjectNotes, workspaceProjects } from "@/lib/db/schema";
import { isWorkspaceProjectNoteType } from "@/lib/workspace/note-types";

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
