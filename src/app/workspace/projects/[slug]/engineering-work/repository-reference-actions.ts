"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { getSql } from "@/lib/db";
import {
  isEngineeringWorkReferenceStatus,
  type EngineeringWorkReferenceStatus,
} from "@/lib/workspace/engineering-work";
import {
  createEngineeringWorkRepositoryReferenceWithHistory,
  maintainEngineeringWorkRepositoryReferenceWithHistory,
  type EngineeringWorkSqlExecutor,
} from "@/lib/workspace/engineering-work-history-persistence";
import {
  authenticatedHumanEngineeringWorkActor,
  engineeringWorkDecisionProvenance,
} from "@/lib/workspace/engineering-work-provenance";
import {
  isEngineeringWorkRepositoryArtifactClass,
  isReviewReferenceStatus,
  normalizeRepositoryReference,
  normalizeRepositoryReferenceUpdate,
} from "@/lib/workspace/repository-reference";

export type RepositoryReferenceMutationState = {
  error?: string;
  fieldErrors?: Partial<
    Record<
      | "repository"
      | "sourceLocation"
      | "artifactClass"
      | "artifactIdentifier"
      | "branch"
      | "commitHash"
      | "referenceStatus"
      | "note"
      | "rationale"
      | "decisionBasis",
      string
    >
  >;
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

function staleMutationError() {
  return "This Engineering Work changed after the form was loaded or no longer supports evidence maintenance. Refresh and review the current record before trying again.";
}

function revalidateEvidence(projectSlug: string, workId: string) {
  revalidatePath("/workspace");
  revalidatePath(`/workspace/projects/${projectSlug}`);
  revalidatePath(`/workspace/projects/${projectSlug}/engineering-work/${workId}`);
  revalidatePath(
    `/workspace/projects/${projectSlug}/engineering-work/${workId}/evidence`,
  );
}

export async function addRepositoryReference(
  projectSlug: string,
  workId: string,
  _previous: RepositoryReferenceMutationState,
  formData: FormData,
): Promise<RepositoryReferenceMutationState> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return { error: "You must be signed in to link repository evidence." };

  const version = formVersion(formData);
  const repository = textValue(formData, "repository");
  const sourceLocation = textValue(formData, "source_location");
  const artifactClass = textValue(formData, "artifact_class");
  const artifactIdentifier = optionalText(formData, "artifact_identifier", 500);
  const branch = optionalText(formData, "branch", 200);
  const commitHash = optionalText(formData, "commit_hash", 200);
  const note = optionalText(formData, "note", 4_000);
  const rationale = textValue(formData, "rationale");
  const decisionBasis = optionalText(formData, "decision_basis", 4_000);
  const fieldErrors: RepositoryReferenceMutationState["fieldErrors"] = {};

  if (!version) return { error: staleMutationError() };
  if (!repository || repository.length > 500) fieldErrors.repository = "Repository is required and must be 500 characters or fewer.";
  if (!sourceLocation || sourceLocation.length > 2_000) fieldErrors.sourceLocation = "Source location is required and must be 2,000 characters or fewer.";
  if (!isEngineeringWorkRepositoryArtifactClass(artifactClass)) fieldErrors.artifactClass = "Select a supported repository artifact class.";
  if (artifactIdentifier.tooLong) fieldErrors.artifactIdentifier = "Artifact identifier must be 500 characters or fewer.";
  if (branch.tooLong) fieldErrors.branch = "Branch must be 200 characters or fewer.";
  if (commitHash.tooLong) fieldErrors.commitHash = "Commit hash must be 200 characters or fewer.";
  if (note.tooLong) fieldErrors.note = "Note must be 4,000 characters or fewer.";
  if (!rationale || rationale.length > 4_000) fieldErrors.rationale = "A linking rationale is required and must be 4,000 characters or fewer.";
  if (decisionBasis.tooLong) fieldErrors.decisionBasis = "Decision basis must be 4,000 characters or fewer.";
  if (Object.keys(fieldErrors).length) return { error: "Correct the highlighted fields and try again.", fieldErrors };

  let normalized;
  try {
    normalized = normalizeRepositoryReference({
      repository,
      sourceLocation,
      artifactClass,
      artifactIdentifier: artifactIdentifier.value,
      branch: branch.value,
      commitHash: commitHash.value,
      note: note.value,
    });
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Invalid repository reference." };
  }

  const actor = authenticatedHumanEngineeringWorkActor(session);
  try {
    const result = await createEngineeringWorkRepositoryReferenceWithHistory(sqlExecutor(), {
      engineeringWorkId: workId,
      projectSlug,
      expectedVersion: version,
      repositoryReferenceId: `eng_ref_${crypto.randomUUID()}`,
      historyEventId: `eng_work_history_${crypto.randomUUID()}`,
      repositoryRevisionId: `eng_ref_revision_${crypto.randomUUID()}`,
      repository: normalized.repository,
      sourceLocation: normalized.sourceLocation,
      artifactClass: normalized.artifactClass,
      artifactIdentifier: normalized.artifactIdentifier,
      branch: normalized.branch,
      commitHash: normalized.commitHash,
      note: normalized.note,
      provenance: engineeringWorkDecisionProvenance({
        actionActor: actor,
        decisionActor: actor,
        decisionRole: "execution",
        decision: "Link repository evidence to Engineering Work.",
        rationale,
        decisionBasis: decisionBasis.value ? { summary: decisionBasis.value } : undefined,
      }),
    });
    if (!result.ok) {
      if (result.reason === "duplicate") return { error: "A reference to this repository location already exists for this Engineering Work." };
      return { error: staleMutationError() };
    }
    revalidateEvidence(projectSlug, workId);
    return { success: true };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Failed to link repository evidence." };
  }
}

export async function maintainRepositoryReference(
  projectSlug: string,
  workId: string,
  _previous: RepositoryReferenceMutationState,
  formData: FormData,
): Promise<RepositoryReferenceMutationState> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return { error: "You must be signed in to maintain repository evidence." };

  const version = formVersion(formData);
  const referenceId = textValue(formData, "reference_id");
  const currentStatus = textValue(formData, "current_status");
  const artifactClass = textValue(formData, "artifact_class");
  const artifactIdentifier = optionalText(formData, "artifact_identifier", 500);
  const branch = optionalText(formData, "branch", 200);
  const commitHash = optionalText(formData, "commit_hash", 200);
  const referenceStatus = textValue(formData, "reference_status");
  const note = optionalText(formData, "note", 4_000);
  const rationale = textValue(formData, "rationale");
  const decisionBasis = optionalText(formData, "decision_basis", 4_000);
  const fieldErrors: RepositoryReferenceMutationState["fieldErrors"] = {};

  if (!version || !referenceId) return { error: staleMutationError() };
  if (!isEngineeringWorkRepositoryArtifactClass(artifactClass)) fieldErrors.artifactClass = "Select a supported repository artifact class.";
  if (!isEngineeringWorkReferenceStatus(referenceStatus)) fieldErrors.referenceStatus = "Select a valid reference status.";
  if (artifactIdentifier.tooLong) fieldErrors.artifactIdentifier = "Artifact identifier must be 500 characters or fewer.";
  if (branch.tooLong) fieldErrors.branch = "Branch must be 200 characters or fewer.";
  if (commitHash.tooLong) fieldErrors.commitHash = "Commit hash must be 200 characters or fewer.";
  if (note.tooLong) fieldErrors.note = "Note must be 4,000 characters or fewer.";
  if (!rationale || rationale.length > 4_000) fieldErrors.rationale = "An update rationale is required and must be 4,000 characters or fewer.";
  if (decisionBasis.tooLong) fieldErrors.decisionBasis = "Decision basis must be 4,000 characters or fewer.";
  const reviewStatusChanged =
    referenceStatus !== currentStatus &&
    isEngineeringWorkReferenceStatus(referenceStatus) &&
    isReviewReferenceStatus(referenceStatus);
  if (reviewStatusChanged && !decisionBasis.value) {
    fieldErrors.decisionBasis = "A review status change requires a decision basis explaining the review.";
  }
  if (Object.keys(fieldErrors).length) return { error: "Correct the highlighted fields and try again.", fieldErrors };

  let normalized;
  try {
    normalized = normalizeRepositoryReferenceUpdate({
      artifactClass,
      artifactIdentifier: artifactIdentifier.value,
      branch: branch.value,
      commitHash: commitHash.value,
      note: note.value,
    });
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Invalid repository reference." };
  }

  const actor = authenticatedHumanEngineeringWorkActor(session);
  try {
    const result = await maintainEngineeringWorkRepositoryReferenceWithHistory(sqlExecutor(), {
      engineeringWorkId: workId,
      projectSlug,
      expectedVersion: version,
      repositoryReferenceId: referenceId,
      historyEventId: `eng_work_history_${crypto.randomUUID()}`,
      repositoryRevisionId: `eng_ref_revision_${crypto.randomUUID()}`,
      artifactClass: normalized.artifactClass,
      artifactIdentifier: normalized.artifactIdentifier,
      branch: normalized.branch,
      commitHash: normalized.commitHash,
      referenceStatus: referenceStatus as EngineeringWorkReferenceStatus,
      note: normalized.note,
      decisionBasisSummary: decisionBasis.value,
      provenance: engineeringWorkDecisionProvenance({
        actionActor: actor,
        decisionActor: actor,
        decisionRole: "execution",
        decision: "Maintain repository evidence on Engineering Work.",
        rationale,
        decisionBasis: decisionBasis.value ? { summary: decisionBasis.value } : undefined,
      }),
    });
    if (!result.ok) {
      if (result.reason === "noop") return { error: "No changes were detected in this submission." };
      if (result.reason === "review_required") return { error: "A review status change requires a decision basis explaining the review." };
      return { error: staleMutationError() };
    }
    revalidateEvidence(projectSlug, workId);
    return { success: true };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Failed to maintain repository evidence." };
  }
}