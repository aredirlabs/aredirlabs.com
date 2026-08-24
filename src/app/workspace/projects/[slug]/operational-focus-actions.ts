"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { getDb, getSql } from "@/lib/db";
import { workspaceProjects } from "@/lib/db/schema";
import type { EngineeringWorkSqlExecutor } from "@/lib/workspace/engineering-work-history-persistence";
import { authenticatedHumanEngineeringWorkActor } from "@/lib/workspace/engineering-work-provenance";
import {
  getProjectFocusEvents,
  type ProjectFocusEventRecord,
} from "@/lib/workspace/queries";
import {
  persistOperationalFocusClear,
  persistOperationalFocusReplace,
  persistOperationalFocusSelectionAdd,
  persistOperationalFocusSelectionRemove,
} from "@/lib/workspace/operational-focus-persistence";
import { PROJECT_FOCUS_HISTORY_PAGE_LIMIT } from "@/components/workspace/project-focus-history-timeline";
import { eq } from "drizzle-orm";

export type OperationalFocusMutationState = {
  error?: string;
  success?: boolean;
};

function sqlExecutor() {
  return getSql() as unknown as EngineeringWorkSqlExecutor;
}

function focusVersionFromForm(formData: FormData) {
  const value = formData.get("focusVersion");
  const parsed = typeof value === "string" ? Number(value) : NaN;
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : null;
}

function revalidateOperationalFocus(projectSlug: string, workId?: string) {
  revalidatePath("/workspace");
  revalidatePath(`/workspace/projects/${projectSlug}`);
  revalidatePath(`/workspace/projects/${projectSlug}/engineering-work`);
  if (workId) {
    revalidatePath(`/workspace/projects/${projectSlug}/engineering-work/${workId}`);
  }
}

function humanFocusAuthority(session: {
  user: { id: string; name?: string | null };
}) {
  const actor = authenticatedHumanEngineeringWorkActor(session);
  return {
    actionActor: actor,
    decisionActor: actor,
    authority: {
      type: "human_owner" as const,
      context: "Authenticated shared Workspace operational focus selection.",
    },
  };
}

export async function replaceProjectOperationalFocus(
  projectSlug: string,
  _previous: OperationalFocusMutationState,
  formData: FormData,
): Promise<OperationalFocusMutationState> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return { error: "You must be signed in to change operational focus." };
  }

  const focusVersion = focusVersionFromForm(formData);
  if (focusVersion == null) {
    return { error: staleFocusError() };
  }

  const targetRaw = textValue(formData, "targetWorkIds");
  if (!formData.has("targetWorkIds")) {
    return { error: "Replace requires a target focus membership set." };
  }

  const targetWorkIds = targetRaw
    ? targetRaw.split(",").map((id) => id.trim()).filter(Boolean)
    : [];

  const batchId = `focus_batch_${crypto.randomUUID()}`;
  const provenance = humanFocusAuthority(session);

  try {
    const result = await persistOperationalFocusReplace(sqlExecutor(), {
      projectSlug,
      expectedFocusVersion: focusVersion,
      batchId,
      targetWorkIds,
      addItems: targetWorkIds.map((engineeringWorkId) => ({
        engineeringWorkId,
        focusEventId: `focus_event_${crypto.randomUUID()}`,
        selectionId: `focus_selection_${crypto.randomUUID()}`,
      })),
      ...provenance,
    });

    if (!result.ok) {
      return { error: staleFocusError() };
    }

    revalidateOperationalFocus(projectSlug);
    return { success: true };
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "Failed to replace operational focus.",
    };
  }
}

function textValue(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function staleFocusError() {
  return "Operational focus changed after this form was loaded. Refresh and try again.";
}

export async function loadProjectFocusHistoryPage(
  projectSlug: string,
  offset: number,
): Promise<{ total: number; events: ProjectFocusEventRecord[]; error?: string }> {
  if (!Number.isInteger(offset) || offset < 0) {
    return { total: 0, events: [], error: "Invalid focus history offset." };
  }

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return { total: 0, events: [], error: "You must be signed in to view focus history." };
  }

  try {
    const db = getDb();
    const projectRows = await db
      .select({ id: workspaceProjects.id })
      .from(workspaceProjects)
      .where(eq(workspaceProjects.slug, projectSlug))
      .limit(1);
    const project = projectRows[0];
    if (!project) {
      return { total: 0, events: [], error: "Project not found." };
    }

    const page = await getProjectFocusEvents(project.id, {
      limit: PROJECT_FOCUS_HISTORY_PAGE_LIMIT,
      offset,
    });
    return { total: page.total, events: page.events };
  } catch (error) {
    return {
      total: 0,
      events: [],
      error:
        error instanceof Error ? error.message : "Failed to load focus selection history.",
    };
  }
}

export async function addEngineeringWorkToOperationalFocus(
  projectSlug: string,
  workId: string,
  _previous: OperationalFocusMutationState,
  formData: FormData,
): Promise<OperationalFocusMutationState> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return { error: "You must be signed in to change operational focus." };
  }

  const focusVersion = focusVersionFromForm(formData);
  if (focusVersion == null) {
    return { error: staleFocusError() };
  }

  const provenance = humanFocusAuthority(session);
  try {
    const result = await persistOperationalFocusSelectionAdd(sqlExecutor(), {
      projectSlug,
      engineeringWorkId: workId,
      expectedFocusVersion: focusVersion,
      focusEventId: `focus_event_${crypto.randomUUID()}`,
      selectionId: `focus_selection_${crypto.randomUUID()}`,
      batchId: `focus_batch_${crypto.randomUUID()}`,
      ...provenance,
    });

    if (!result.ok) {
      if (result.reason === "not_found_or_stale") {
        return {
          error:
            "This Engineering Work is not eligible for operational focus, or the Project focus state is stale.",
        };
      }
      return { error: staleFocusError() };
    }

    revalidateOperationalFocus(projectSlug, workId);
    return { success: true };
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to add Engineering Work to operational focus.",
    };
  }
}

export async function removeEngineeringWorkFromOperationalFocus(
  projectSlug: string,
  workId: string,
  _previous: OperationalFocusMutationState,
  formData: FormData,
): Promise<OperationalFocusMutationState> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return { error: "You must be signed in to change operational focus." };
  }

  const focusVersion = focusVersionFromForm(formData);
  if (focusVersion == null) {
    return { error: staleFocusError() };
  }

  const provenance = humanFocusAuthority(session);
  try {
    const result = await persistOperationalFocusSelectionRemove(sqlExecutor(), {
      projectSlug,
      engineeringWorkId: workId,
      expectedFocusVersion: focusVersion,
      focusEventId: `focus_event_${crypto.randomUUID()}`,
      selectionId: `focus_selection_unused_${crypto.randomUUID()}`,
      batchId: `focus_batch_${crypto.randomUUID()}`,
      ...provenance,
    });

    if (!result.ok) {
      if (result.reason === "not_selected") {
        return { error: "This Engineering Work is not in the Project operational focus set." };
      }
      return { error: staleFocusError() };
    }

    revalidateOperationalFocus(projectSlug, workId);
    return { success: true };
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to remove Engineering Work from operational focus.",
    };
  }
}

export async function clearProjectOperationalFocus(
  projectSlug: string,
  _previous: OperationalFocusMutationState,
  formData: FormData,
): Promise<OperationalFocusMutationState> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return { error: "You must be signed in to change operational focus." };
  }

  const focusVersion = focusVersionFromForm(formData);
  if (focusVersion == null) {
    return { error: staleFocusError() };
  }

  const provenance = humanFocusAuthority(session);
  try {
    const result = await persistOperationalFocusClear(sqlExecutor(), {
      projectSlug,
      expectedFocusVersion: focusVersion,
      batchId: `focus_batch_${crypto.randomUUID()}`,
      ...provenance,
    });

    if (!result.ok) {
      return { error: staleFocusError() };
    }

    revalidateOperationalFocus(projectSlug);
    return { success: true };
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "Failed to clear operational focus.",
    };
  }
}
