"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { and, eq } from "drizzle-orm";

import { auth } from "@/lib/auth";
import { getDb, getSql } from "@/lib/db";
import {
  workspaceProjectDocuments,
  workspaceProjectMilestones,
  workspaceProjectNotes,
  workspaceProjectPrompts,
  workspaceProjects,
  workspaceEngineeringWork,
} from "@/lib/db/schema";
import {
  isEngineeringWorkState,
  isEngineeringWorkType,
  isEngineeringWorkWorkflow,
  type EngineeringWorkState,
  type EngineeringWorkType,
  type EngineeringWorkWorkflow,
} from "@/lib/workspace/engineering-work";
import { isWorkspaceProjectDocumentCategory } from "@/lib/workspace/document-categories";
import { isWorkspaceMilestoneStatus } from "@/lib/workspace/milestone-status";
import { isWorkspaceProjectNoteType } from "@/lib/workspace/note-types";
import { isWorkspaceProjectPromptStatus } from "@/lib/workspace/prompt-status";
import { isWorkspaceProjectPromptType } from "@/lib/workspace/prompt-types";

export type CreateEngineeringWorkState = {
  error?: string;
  workId?: string;
};

export type UpdateEngineeringWorkState = {
  error?: string;
  fieldErrors?: Partial<Record<"title" | "type" | "workflow" | "state" | "summary" | "currentNextAction", string>>;
  success?: boolean;
};

type DefectContextFields = {
  observedBehavior: string;
  expectedBehavior: string;
  reproductionSteps: string;
  environment: string;
  evidence: string;
  nextInvestigation: string;
  validationTarget: string;
};

function getDefectContextFields(formData: FormData): DefectContextFields | null {
  const fields = {
    observedBehavior: formData.get("observed_behavior"),
    expectedBehavior: formData.get("expected_behavior"),
    reproductionSteps: formData.get("reproduction_steps"),
    environment: formData.get("environment"),
    evidence: formData.get("evidence"),
    nextInvestigation: formData.get("next_investigation"),
    validationTarget: formData.get("validation_target"),
  };

  if (Object.values(fields).some(
    (value) => typeof value !== "string" || !value.trim() || value.trim().length > 4000,
  )) {
    return null;
  }

  return Object.fromEntries(
    Object.entries(fields).map(([key, value]) => [key, (value as string).trim()]),
  ) as DefectContextFields;
}

export async function createEngineeringWork(
  projectSlug: string,
  _prevState: CreateEngineeringWorkState,
  formData: FormData,
): Promise<CreateEngineeringWorkState> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { error: "You must be signed in to create Engineering Work." };
  }

  const title = formData.get("title");
  const type = formData.get("type");
  const workflow = formData.get("workflow");
  const summary = formData.get("summary");
  const state = formData.get("state") ?? "proposed";
  const currentNextAction = formData.get("current_next_action");

  if (typeof title !== "string" || !title.trim()) {
    return { error: "Title is required." };
  }
  if (title.trim().length > 200) {
    return { error: "Title must be 200 characters or fewer." };
  }
  if (typeof type !== "string" || !isEngineeringWorkType(type)) {
    return { error: "Select a valid Engineering Work type." };
  }
  if (
    typeof workflow !== "string" ||
    !isEngineeringWorkWorkflow(workflow)
  ) {
    return { error: "Select a valid Engineering Work workflow." };
  }
  if (typeof summary !== "string" || !summary.trim()) {
    return { error: "Objective is required." };
  }
  if (summary.trim().length > 4000) {
    return { error: "Objective must be 4,000 characters or fewer." };
  }
  if (typeof state !== "string" || !isEngineeringWorkState(state)) {
    return { error: "Select a valid lifecycle state." };
  }
  if (
    typeof currentNextAction !== "string" ||
    !currentNextAction.trim()
  ) {
    return { error: "Recommended next action is required." };
  }
  if (currentNextAction.trim().length > 2000) {
    return { error: "Recommended next action must be 2,000 characters or fewer." };
  }

  const defectContext = workflow === "defect" ? getDefectContextFields(formData) : null;
  if (workflow === "defect" && !defectContext) {
    return { error: "Every Defect context field is required and must be 4,000 characters or fewer." };
  }

  try {
    if (workflow === "defect" && defectContext) {
      const workId = `eng_work_${crypto.randomUUID()}`;
      const rows = await getSql()`
        WITH project AS (
          SELECT id FROM workspace_projects WHERE slug = ${projectSlug}
        ), work AS (
          INSERT INTO workspace_engineering_work (
            id, project_id, title, summary, type, workflow, state, current_next_action
          )
          SELECT ${workId}, project.id, ${title.trim()}, ${summary.trim()}, ${type},
            ${workflow}, ${state}, ${currentNextAction.trim()}
          FROM project
          RETURNING id
        )
        INSERT INTO workspace_engineering_work_defects (
          engineering_work_id, observed_behavior, expected_behavior,
          reproduction_steps, environment, evidence, next_investigation, validation_target
        )
        SELECT work.id, ${defectContext.observedBehavior}, ${defectContext.expectedBehavior},
          ${defectContext.reproductionSteps}, ${defectContext.environment},
          ${defectContext.evidence}, ${defectContext.nextInvestigation},
          ${defectContext.validationTarget}
        FROM work
        RETURNING engineering_work_id
      `;

      if (!rows[0]) return { error: "Project not found." };

      revalidatePath(`/workspace/projects/${projectSlug}`);
      revalidatePath(`/workspace/projects/${projectSlug}/engineering-work/${workId}`);
      return { workId };
    }

    const db = getDb();
    const [project] = await db
      .select({ id: workspaceProjects.id })
      .from(workspaceProjects)
      .where(eq(workspaceProjects.slug, projectSlug))
      .limit(1);

    if (!project) {
      return { error: "Project not found." };
    }

    const workId = `eng_work_${crypto.randomUUID()}`;
    await db.insert(workspaceEngineeringWork).values({
      id: workId,
      projectId: project.id,
      title: title.trim(),
      type,
      workflow,
      summary: summary.trim(),
      state,
      currentNextAction: currentNextAction.trim(),
    });

    revalidatePath(`/workspace/projects/${projectSlug}`);
    revalidatePath(
      `/workspace/projects/${projectSlug}/engineering-work/${workId}`,
    );
    return { workId };
  } catch (e) {
    return {
      error:
        e instanceof Error ? e.message : "Failed to create Engineering Work.",
    };
  }
}

export async function updateEngineeringWork(
  projectSlug: string,
  workId: string,
  _prevState: UpdateEngineeringWorkState,
  formData: FormData,
): Promise<UpdateEngineeringWorkState> {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return { error: "You must be signed in to update Engineering Work." };
  }

  const title = formData.get("title");
  const type = formData.get("type");
  const workflow = formData.get("workflow");
  const summary = formData.get("summary");
  const state = formData.get("state");
  const currentNextAction = formData.get("current_next_action");
  const fieldErrors: UpdateEngineeringWorkState["fieldErrors"] = {};

  if (typeof title !== "string" || !title.trim()) fieldErrors.title = "Title is required.";
  else if (title.trim().length > 200) fieldErrors.title = "Title must be 200 characters or fewer.";
  if (typeof type !== "string" || !isEngineeringWorkType(type)) fieldErrors.type = "Select a valid Engineering Work type.";
  if (typeof workflow !== "string" || !isEngineeringWorkWorkflow(workflow)) fieldErrors.workflow = "Select a valid Engineering Work workflow.";
  if (typeof state !== "string" || !isEngineeringWorkState(state)) fieldErrors.state = "Select a valid lifecycle state.";
  if (typeof summary !== "string" || !summary.trim()) fieldErrors.summary = "Objective is required.";
  else if (summary.trim().length > 4000) fieldErrors.summary = "Objective must be 4,000 characters or fewer.";
  if (typeof currentNextAction !== "string" || !currentNextAction.trim()) fieldErrors.currentNextAction = "Recommended next action is required.";
  else if (currentNextAction.trim().length > 2000) fieldErrors.currentNextAction = "Recommended next action must be 2,000 characters or fewer.";

  if (Object.keys(fieldErrors).length > 0) {
    return { error: "Correct the highlighted fields and try again.", fieldErrors };
  }

  const normalizedTitle = title as string;
  const normalizedType = type as EngineeringWorkType;
  const normalizedWorkflow = workflow as EngineeringWorkWorkflow;
  const normalizedState = state as EngineeringWorkState;
  const normalizedSummary = summary as string;
  const normalizedCurrentNextAction = currentNextAction as string;
  const defectContext = normalizedWorkflow === "defect" ? getDefectContextFields(formData) : null;
  if (normalizedWorkflow === "defect" && !defectContext) {
    return { error: "Every Defect context field is required and must be 4,000 characters or fewer." };
  }

  try {
    if (normalizedWorkflow === "defect" && defectContext) {
      const rows = await getSql()`
        WITH updated_work AS (
          UPDATE workspace_engineering_work AS work
          SET title = ${normalizedTitle.trim()}, type = ${normalizedType},
            workflow = ${normalizedWorkflow}, state = ${normalizedState},
            summary = ${normalizedSummary.trim()},
            current_next_action = ${normalizedCurrentNextAction.trim()}, updated_at = NOW()
          WHERE work.id = ${workId}
            AND work.workflow = 'defect'
            AND work.project_id = (
              SELECT id FROM workspace_projects WHERE slug = ${projectSlug}
            )
            AND EXISTS (
              SELECT 1 FROM workspace_engineering_work_defects AS context
              WHERE context.engineering_work_id = work.id
            )
          RETURNING work.id
        ), updated_context AS (
          UPDATE workspace_engineering_work_defects AS context
          SET observed_behavior = ${defectContext.observedBehavior},
            expected_behavior = ${defectContext.expectedBehavior},
            reproduction_steps = ${defectContext.reproductionSteps},
            environment = ${defectContext.environment}, evidence = ${defectContext.evidence},
            next_investigation = ${defectContext.nextInvestigation},
            validation_target = ${defectContext.validationTarget}, updated_at = NOW()
          FROM updated_work
          WHERE context.engineering_work_id = updated_work.id
          RETURNING context.engineering_work_id
        )
        SELECT engineering_work_id FROM updated_context
      `;

      if (!rows[0]) return { error: "Defect Engineering Work was not found in this project." };

      revalidatePath("/workspace");
      revalidatePath(`/workspace/projects/${projectSlug}`);
      revalidatePath(`/workspace/projects/${projectSlug}/engineering-work/${workId}`);
      return { success: true };
    }

    const db = getDb();
    const [project] = await db
      .select({ id: workspaceProjects.id })
      .from(workspaceProjects)
      .where(eq(workspaceProjects.slug, projectSlug))
      .limit(1);

    if (!project) return { error: "Project not found." };

    const updated = await db
      .update(workspaceEngineeringWork)
      .set({
        title: normalizedTitle.trim(),
        type: normalizedType,
        workflow: normalizedWorkflow,
        state: normalizedState,
        summary: normalizedSummary.trim(),
        currentNextAction: normalizedCurrentNextAction.trim(),
        updatedAt: new Date(),
      })
      .where(and(
        eq(workspaceEngineeringWork.id, workId),
        eq(workspaceEngineeringWork.projectId, project.id),
      ))
      .returning({ id: workspaceEngineeringWork.id });

    if (!updated[0]) return { error: "Engineering Work was not found in this project." };

    revalidatePath("/workspace");
    revalidatePath(`/workspace/projects/${projectSlug}`);
    revalidatePath(`/workspace/projects/${projectSlug}/engineering-work/${workId}`);
    return { success: true };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Failed to update Engineering Work." };
  }
}

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
