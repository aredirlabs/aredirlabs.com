"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { getSql } from "@/lib/db";
import {
  isEngineeringWorkType,
  isEngineeringWorkWorkflow,
  type EngineeringWorkType,
  type EngineeringWorkWorkflow,
} from "@/lib/workspace/engineering-work";
import {
  createEngineeringWorkWithHistory,
  persistEngineeringWorkCompletionAndHistory,
  persistEngineeringWorkTransitionAndHistory,
  persistOperationalUpdateAndHistory,
  persistProposedCorrectionAndHistory,
  type EngineeringWorkDefectContextInput,
  type EngineeringWorkSqlExecutor,
} from "@/lib/workspace/engineering-work-history-persistence";
import {
  authenticatedHumanEngineeringWorkActor,
  engineeringWorkDecisionProvenance,
} from "@/lib/workspace/engineering-work-provenance";

export type CreateEngineeringWorkState = { error?: string; workId?: string };

export type EngineeringWorkMutationState = {
  error?: string;
  fieldErrors?: Partial<Record<
    | "title"
    | "type"
    | "summary"
    | "currentNextAction"
    | "currentOutcome"
    | "verifiedOutcome"
    | "finalDisposition"
    | "outcomeVerification"
    | "condition"
    | "conditionRationale"
    | "rationale"
    | "decisionBasis"
    | "defectContext",
    string
  >>;
  success?: boolean;
};

function sqlExecutor() {
  return getSql() as unknown as EngineeringWorkSqlExecutor;
}

function textValue(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function optionalText(formData: FormData, name: string, maxLength: number) {
  const value = textValue(formData, name);
  if (value.length > maxLength) return { value: null, tooLong: true };
  return { value: value || null, tooLong: false };
}

function formVersion(formData: FormData) {
  const value = textValue(formData, "version");
  const version = Number(value);
  return Number.isInteger(version) && version > 0 ? version : null;
}

const DEFECT_FIELD_NAMES = [
  ["observedBehavior", "observed_behavior"],
  ["expectedBehavior", "expected_behavior"],
  ["reproductionSteps", "reproduction_steps"],
  ["environment", "environment"],
  ["evidence", "evidence"],
  ["nextInvestigation", "next_investigation"],
  ["validationTarget", "validation_target"],
] as const;

function defectContextFromForm(
  formData: FormData,
): EngineeringWorkDefectContextInput | null | "invalid" {
  const values = Object.fromEntries(
    DEFECT_FIELD_NAMES.map(([property, name]) => [property, textValue(formData, name)]),
  ) as EngineeringWorkDefectContextInput;
  const supplied = Object.values(values).filter(Boolean).length;
  if (supplied === 0) return null;
  if (
    supplied !== DEFECT_FIELD_NAMES.length ||
    Object.values(values).some((value) => value.length > 4_000)
  ) {
    return "invalid";
  }
  return values;
}

function staleMutationError() {
  return "This Engineering Work changed after the form was loaded or no longer supports this action. Refresh and review the current record before trying again.";
}

function revalidateEngineeringWork(projectSlug: string, workId: string) {
  revalidatePath("/workspace");
  revalidatePath(`/workspace/projects/${projectSlug}`);
  revalidatePath(`/workspace/projects/${projectSlug}/engineering-work`);
  revalidatePath(`/workspace/projects/${projectSlug}/engineering-work/${workId}`);
  revalidatePath(`/workspace/projects/${projectSlug}/engineering-work/${workId}/edit`);
  revalidatePath(`/workspace/projects/${projectSlug}/engineering-work/${workId}/complete`);
}

export async function createEngineeringWork(
  projectSlug: string,
  _previous: CreateEngineeringWorkState,
  formData: FormData,
): Promise<CreateEngineeringWorkState> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return { error: "You must be signed in to create Engineering Work." };

  const title = textValue(formData, "title");
  const type = textValue(formData, "type");
  const workflow = textValue(formData, "workflow");
  const objective = textValue(formData, "summary");
  const currentNextAction = textValue(formData, "current_next_action");
  const defectContext = defectContextFromForm(formData);

  if (!title || title.length > 200) return { error: "Title is required and must be 200 characters or fewer." };
  if (!isEngineeringWorkType(type)) return { error: "Select a valid Engineering Work type." };
  if (!isEngineeringWorkWorkflow(workflow)) return { error: "Select a valid Engineering Work workflow." };
  if (!objective || objective.length > 4_000) return { error: "Objective is required and must be 4,000 characters or fewer." };
  if (!currentNextAction || currentNextAction.length > 2_000) return { error: "Recommended next action is required and must be 2,000 characters or fewer." };
  if (defectContext === "invalid" || (workflow === "defect" && !defectContext)) {
    return { error: "Every Defect context field is required and must be 4,000 characters or fewer." };
  }
  if (workflow !== "defect" && defectContext) return { error: "Defect Context is valid only for the Defect workflow." };

  const workId = `eng_work_${crypto.randomUUID()}`;
  try {
    const result = await createEngineeringWorkWithHistory(sqlExecutor(), {
      engineeringWorkId: workId,
      historyEventId: `eng_work_history_${crypto.randomUUID()}`,
      defectRevisionId: workflow === "defect" ? `eng_work_defect_revision_${crypto.randomUUID()}` : null,
      projectSlug,
      title,
      type: type as EngineeringWorkType,
      workflow: workflow as EngineeringWorkWorkflow,
      objective,
      currentNextAction,
      actionActor: authenticatedHumanEngineeringWorkActor(session),
      defectContext: defectContext || null,
    });
    if (!result.ok) return { error: "Project not found." };
    revalidateEngineeringWork(projectSlug, workId);
    return { workId };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Failed to create Engineering Work." };
  }
}

export async function correctProposedEngineeringWork(
  projectSlug: string,
  workId: string,
  _previous: EngineeringWorkMutationState,
  formData: FormData,
): Promise<EngineeringWorkMutationState> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return { error: "You must be signed in to correct proposed Engineering Work." };

  const version = formVersion(formData);
  const title = textValue(formData, "title");
  const type = textValue(formData, "type");
  const objective = textValue(formData, "summary");
  const currentNextAction = textValue(formData, "current_next_action");
  const rationale = textValue(formData, "rationale");
  const basis = optionalText(formData, "decision_basis", 4_000);
  const defectContext = defectContextFromForm(formData);
  const fieldErrors: EngineeringWorkMutationState["fieldErrors"] = {};

  if (!version) return { error: staleMutationError() };
  if (!title || title.length > 200) fieldErrors.title = "Title is required and must be 200 characters or fewer.";
  if (!isEngineeringWorkType(type)) fieldErrors.type = "Select a valid Engineering Work type.";
  if (!objective || objective.length > 4_000) fieldErrors.summary = "Objective is required and must be 4,000 characters or fewer.";
  if (!currentNextAction || currentNextAction.length > 2_000) fieldErrors.currentNextAction = "Recommended next action is required and must be 2,000 characters or fewer.";
  if (!rationale || rationale.length > 4_000) fieldErrors.rationale = "Correction rationale is required and must be 4,000 characters or fewer.";
  if (basis.tooLong) fieldErrors.decisionBasis = "Decision basis must be 4,000 characters or fewer.";
  if (defectContext === "invalid") fieldErrors.defectContext = "Every supplied Defect Context field is required and must be 4,000 characters or fewer.";
  if (Object.keys(fieldErrors).length) return { error: "Correct the highlighted fields and try again.", fieldErrors };

  const actor = authenticatedHumanEngineeringWorkActor(session);
  try {
    const result = await persistProposedCorrectionAndHistory(sqlExecutor(), {
      engineeringWorkId: workId,
      projectSlug,
      expectedVersion: version,
      title,
      type: type as EngineeringWorkType,
      objective,
      currentNextAction,
      defectContext: defectContext === "invalid" ? null : defectContext,
      historyEventId: `eng_work_history_${crypto.randomUUID()}`,
      defectRevisionId: defectContext ? `eng_work_defect_revision_${crypto.randomUUID()}` : null,
      provenance: engineeringWorkDecisionProvenance({
        actionActor: actor,
        decisionActor: actor,
        decisionRole: "execution",
        decision: "Correct proposed Engineering Work.",
        rationale,
        decisionBasis: basis.value ? { summary: basis.value } : undefined,
      }),
    });
    if (!result.ok) return { error: staleMutationError() };
    revalidateEngineeringWork(projectSlug, workId);
    return { success: true };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Failed to correct proposed Engineering Work." };
  }
}

export async function operateEngineeringWork(
  projectSlug: string,
  workId: string,
  _previous: EngineeringWorkMutationState,
  formData: FormData,
): Promise<EngineeringWorkMutationState> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return { error: "You must be signed in to operate Engineering Work." };

  const version = formVersion(formData);
  const expectedState = textValue(formData, "expected_state");
  const currentNextAction = textValue(formData, "current_next_action");
  const outcome = optionalText(formData, "current_outcome", 4_000);
  const condition = optionalText(formData, "condition", 500);
  const conditionRationale = optionalText(formData, "condition_rationale", 4_000);
  const rationale = textValue(formData, "rationale");
  const basis = optionalText(formData, "decision_basis", 4_000);
  const defectContext = defectContextFromForm(formData);
  const fieldErrors: EngineeringWorkMutationState["fieldErrors"] = {};

  if (!version || !["active", "in_review"].includes(expectedState)) return { error: staleMutationError() };
  if (!currentNextAction || currentNextAction.length > 2_000) fieldErrors.currentNextAction = "Current Next Action is required and must be 2,000 characters or fewer.";
  if (outcome.tooLong) fieldErrors.currentOutcome = "Outcome must be 4,000 characters or fewer.";
  if (condition.tooLong) fieldErrors.condition = "Condition must be 500 characters or fewer.";
  if (conditionRationale.tooLong) fieldErrors.conditionRationale = "Condition Rationale must be 4,000 characters or fewer.";
  if (condition.value && !conditionRationale.value) fieldErrors.conditionRationale = "Condition Rationale is required when a Condition is recorded.";
  if (!rationale || rationale.length > 4_000) fieldErrors.rationale = "Update rationale is required and must be 4,000 characters or fewer.";
  if (basis.tooLong) fieldErrors.decisionBasis = "Decision basis must be 4,000 characters or fewer.";
  if (defectContext === "invalid") fieldErrors.defectContext = "Every supplied Defect Context field is required and must be 4,000 characters or fewer.";
  if (Object.keys(fieldErrors).length) return { error: "Correct the highlighted fields and try again.", fieldErrors };

  const actor = authenticatedHumanEngineeringWorkActor(session);
  try {
    const result = await persistOperationalUpdateAndHistory(sqlExecutor(), {
      engineeringWorkId: workId,
      projectSlug,
      expectedVersion: version,
      expectedState: expectedState as "active" | "in_review",
      currentNextAction,
      currentOutcome: outcome.value,
      condition: condition.value,
      conditionRationale: condition.value ? conditionRationale.value : null,
      defectContext: defectContext === "invalid" ? null : defectContext,
      historyEventId: `eng_work_history_${crypto.randomUUID()}`,
      defectRevisionId: defectContext ? `eng_work_defect_revision_${crypto.randomUUID()}` : null,
      provenance: engineeringWorkDecisionProvenance({
        actionActor: actor,
        decisionActor: actor,
        decisionRole: "execution",
        decision: "Update Engineering Work operation.",
        rationale,
        decisionBasis: basis.value ? { summary: basis.value } : undefined,
      }),
    });
    if (!result.ok) return { error: staleMutationError() };
    revalidateEngineeringWork(projectSlug, workId);
    return { success: true };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Failed to operate Engineering Work." };
  }
}

export async function completeEngineeringWork(
  projectSlug: string,
  workId: string,
  _previous: EngineeringWorkMutationState,
  formData: FormData,
): Promise<EngineeringWorkMutationState> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return { error: "You must be signed in to complete Engineering Work." };

  const version = formVersion(formData);
  const expectedState = textValue(formData, "expected_state");
  const verifiedOutcome = textValue(formData, "verified_outcome");
  const finalDisposition = textValue(formData, "final_disposition");
  const rationale = textValue(formData, "rationale");
  const decisionBasis = textValue(formData, "decision_basis");
  const outcomeVerified = textValue(formData, "outcome_verified") === "verified";
  const fieldErrors: EngineeringWorkMutationState["fieldErrors"] = {};

  if (!version || !["active", "in_review"].includes(expectedState)) {
    return { error: staleMutationError() };
  }
  if (!verifiedOutcome || verifiedOutcome.length > 4_000) {
    fieldErrors.verifiedOutcome = "Verified Outcome is required and must be 4,000 characters or fewer.";
  }
  if (!outcomeVerified) {
    fieldErrors.outcomeVerification = "Confirm that the stated Outcome has been verified.";
  }
  if (!finalDisposition || finalDisposition.length > 4_000) {
    fieldErrors.finalDisposition = "Final disposition is required and must be 4,000 characters or fewer.";
  }
  if (!rationale || rationale.length > 4_000) {
    fieldErrors.rationale = "Completion rationale is required and must be 4,000 characters or fewer.";
  }
  if (!decisionBasis || decisionBasis.length > 4_000) {
    fieldErrors.decisionBasis = "Decision basis is required and must be 4,000 characters or fewer.";
  }
  if (Object.keys(fieldErrors).length) {
    return { error: "Correct the highlighted fields and try again.", fieldErrors };
  }

  // These roles are deliberately constructed independently even though the
  // current UI authenticates the same human for action and decision.
  const actionActor = authenticatedHumanEngineeringWorkActor(session);
  const decisionActor = authenticatedHumanEngineeringWorkActor(session);

  try {
    const historyEventId = `eng_work_history_${crypto.randomUUID()}`;
    const result = await persistEngineeringWorkCompletionAndHistory(sqlExecutor(), {
      engineeringWorkId: workId,
      projectSlug,
      expectedVersion: version,
      expectedState: expectedState as "active" | "in_review",
      verifiedOutcome,
      finalDisposition,
      historyEventId,
      focusInvalidationEventId: `focus_event_${crypto.randomUUID()}`,
      focusInvalidationBatchId: `focus_batch_${crypto.randomUUID()}`,
      provenance: engineeringWorkDecisionProvenance({
        actionActor,
        decisionActor,
        decisionRole: "authorization",
        authority: {
          type: "human_owner",
          context: "Authenticated Engineering Work completion decision.",
        },
        decision: "Authorize completion with the stated verified Outcome.",
        rationale,
        decisionBasis: { summary: decisionBasis },
      }),
    });
    if (!result.ok) return { error: staleMutationError() };
    revalidateEngineeringWork(projectSlug, workId);
    return { success: true };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Failed to complete Engineering Work." };
  }
}

export async function transitionEngineeringWork(
  projectSlug: string,
  workId: string,
  _previous: EngineeringWorkMutationState,
  formData: FormData,
): Promise<EngineeringWorkMutationState> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return { error: "You must be signed in to transition Engineering Work." };

  const version = formVersion(formData);
  const priorState = textValue(formData, "prior_state");
  const resultingState = textValue(formData, "resulting_state");
  const rationale = textValue(formData, "rationale");
  const basis = textValue(formData, "decision_basis");
  if (!version) return { error: staleMutationError() };
  if (!rationale || rationale.length > 4_000) return { error: "Transition rationale is required and must be 4,000 characters or fewer." };
  if (!basis || basis.length > 4_000) return { error: "Decision basis is required and must be 4,000 characters or fewer." };

  const allowedTransition =
    (priorState === "active" && resultingState === "in_review") ||
    (priorState === "in_review" && resultingState === "active");
  if (!allowedTransition) return { error: "Select a supported operational lifecycle transition." };
  const actor = authenticatedHumanEngineeringWorkActor(session);

  try {
    const result = await persistEngineeringWorkTransitionAndHistory(sqlExecutor(), {
      engineeringWorkId: workId,
      projectSlug,
      expectedVersion: version,
      priorState: priorState as "active" | "in_review",
      resultingState: resultingState as "active" | "in_review",
      historyEventId: `eng_work_history_${crypto.randomUUID()}`,
      provenance: engineeringWorkDecisionProvenance({
        actionActor: actor,
        decisionActor: actor,
        decisionRole: "authorization",
        decision: `Authorize ${priorState} to ${resultingState} lifecycle transition.`,
        rationale,
        decisionBasis: { summary: basis },
      }),
    });
    if (!result.ok) return { error: staleMutationError() };
    revalidateEngineeringWork(projectSlug, workId);
    return { success: true };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Failed to transition Engineering Work." };
  }
}

export async function activateProposedEngineeringWork(
  projectSlug: string,
  workId: string,
  _previous: EngineeringWorkMutationState,
  formData: FormData,
): Promise<EngineeringWorkMutationState> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return { error: "You must be signed in to activate Engineering Work." };

  const version = formVersion(formData);
  const expectedState = textValue(formData, "expected_state");
  const authorized = textValue(formData, "activation_authorized") === "authorized";
  const rationale = textValue(formData, "rationale");
  const basis = textValue(formData, "decision_basis");
  if (!version || expectedState !== "proposed") return { error: staleMutationError() };
  if (!authorized) return { error: "Explicit human authorization is required to activate this proposal." };
  if (!rationale || rationale.length > 4_000) return { error: "Activation rationale is required and must be 4,000 characters or fewer." };
  if (!basis || basis.length > 4_000) return { error: "Decision basis is required and must be 4,000 characters or fewer." };

  const actor = authenticatedHumanEngineeringWorkActor(session);
  try {
    const result = await persistEngineeringWorkTransitionAndHistory(sqlExecutor(), {
      engineeringWorkId: workId,
      projectSlug,
      expectedVersion: version,
      priorState: "proposed",
      resultingState: "active",
      historyEventId: `eng_work_history_${crypto.randomUUID()}`,
      provenance: engineeringWorkDecisionProvenance({
        actionActor: actor,
        decisionActor: actor,
        decisionRole: "authorization",
        authority: { type: "human_owner", context: "Engineering Work activation gate" },
        decision: "Authorize Proposed to Active lifecycle transition.",
        rationale,
        decisionBasis: { summary: basis },
      }),
    });
    if (!result.ok) return { error: staleMutationError() };
    revalidateEngineeringWork(projectSlug, workId);
    return { success: true };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Failed to activate Engineering Work." };
  }
}
