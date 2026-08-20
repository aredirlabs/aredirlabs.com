"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  addRepositoryReference,
  maintainRepositoryReference,
  type RepositoryReferenceMutationState,
} from "@/app/workspace/projects/[slug]/engineering-work/repository-reference-actions";
import { Button } from "@/components/ui/button";
import {
  ENGINEERING_WORK_REFERENCE_STATUSES,
  ENGINEERING_WORK_REFERENCE_STATUS_LABELS,
} from "@/lib/workspace/engineering-work";
import {
  ENGINEERING_WORK_REPOSITORY_ARTIFACT_CLASSES,
  ENGINEERING_WORK_REPOSITORY_ARTIFACT_CLASS_LABELS,
  isReviewReferenceStatus,
} from "@/lib/workspace/repository-reference";

const initialState: RepositoryReferenceMutationState = {};
const inputClassName =
  "mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";

function FieldError({ message }: { message?: string }) {
  return message ? <p className="mt-1 text-sm text-destructive">{message}</p> : null;
}

function MutationError({ state }: { state: RepositoryReferenceMutationState }) {
  return state.error ? (
    <div role="alert" className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
      {state.error}
    </div>
  ) : null;
}

function RefreshOnSuccess({ success }: { success?: boolean }) {
  const router = useRouter();
  useEffect(() => {
    if (success) router.refresh();
  }, [router, success]);
  return null;
}

export function AddRepositoryReferenceForm({
  projectSlug,
  workId,
  version,
}: {
  projectSlug: string;
  workId: string;
  version: number;
}) {
  const [state, formAction, pending] = useActionState(
    addRepositoryReference.bind(null, projectSlug, workId),
    initialState,
  );

  return (
    <form action={formAction} className="space-y-5">
      <RefreshOnSuccess success={state.success} />
      <input type="hidden" name="version" value={version} />
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="add-reference-repository" className="block text-sm font-medium text-foreground">
            Repository
          </label>
          <input id="add-reference-repository" name="repository" required maxLength={500} className={inputClassName} placeholder="Repository identifier or canonical URL" />
          <FieldError message={state.fieldErrors?.repository} />
        </div>
        <div>
          <label htmlFor="add-reference-source" className="block text-sm font-medium text-foreground">
            Source location
          </label>
          <input id="add-reference-source" name="source_location" required maxLength={2000} className={inputClassName} placeholder="Path or canonical artifact URL" />
          <FieldError message={state.fieldErrors?.sourceLocation} />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label htmlFor="add-reference-class" className="block text-sm font-medium text-foreground">
            Artifact class
          </label>
          <select id="add-reference-class" name="artifact_class" required defaultValue="" className={inputClassName}>
            <option value="" disabled>Select an artifact class</option>
            {ENGINEERING_WORK_REPOSITORY_ARTIFACT_CLASSES.map((artifactClass) => (
              <option key={artifactClass} value={artifactClass}>{ENGINEERING_WORK_REPOSITORY_ARTIFACT_CLASS_LABELS[artifactClass]}</option>
            ))}
          </select>
          <FieldError message={state.fieldErrors?.artifactClass} />
        </div>
        <div>
          <label htmlFor="add-reference-identifier" className="block text-sm font-medium text-foreground">
            Artifact identifier <span className="font-normal text-muted-foreground">(optional)</span>
          </label>
          <input id="add-reference-identifier" name="artifact_identifier" maxLength={500} className={inputClassName} />
          <FieldError message={state.fieldErrors?.artifactIdentifier} />
        </div>
        <div>
          <label htmlFor="add-reference-branch" className="block text-sm font-medium text-foreground">
            Branch <span className="font-normal text-muted-foreground">(optional)</span>
          </label>
          <input id="add-reference-branch" name="branch" maxLength={200} className={inputClassName} />
          <FieldError message={state.fieldErrors?.branch} />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="add-reference-commit" className="block text-sm font-medium text-foreground">
            Commit hash <span className="font-normal text-muted-foreground">(optional)</span>
          </label>
          <input id="add-reference-commit" name="commit_hash" maxLength={200} className={inputClassName} placeholder="Immutable anchor; precedence over branch" />
          <FieldError message={state.fieldErrors?.commitHash} />
        </div>
        <div>
          <label htmlFor="add-reference-note" className="block text-sm font-medium text-foreground">
            Note / context <span className="font-normal text-muted-foreground">(optional)</span>
          </label>
          <textarea id="add-reference-note" name="note" maxLength={4000} rows={3} className={inputClassName} />
          <FieldError message={state.fieldErrors?.note} />
        </div>
      </div>
      <div>
        <label htmlFor="add-reference-rationale" className="block text-sm font-medium text-foreground">
          Linking rationale
        </label>
        <textarea id="add-reference-rationale" name="rationale" required maxLength={4000} rows={3} className={inputClassName} />
        <FieldError message={state.fieldErrors?.rationale} />
      </div>
      <div>
        <label htmlFor="add-reference-basis" className="block text-sm font-medium text-foreground">
          Decision basis <span className="font-normal text-muted-foreground">(optional)</span>
        </label>
        <textarea id="add-reference-basis" name="decision_basis" maxLength={4000} rows={3} className={inputClassName} />
        <FieldError message={state.fieldErrors?.decisionBasis} />
      </div>
      <MutationError state={state} />
      <Button type="submit" disabled={pending}>{pending ? "Recording..." : "Link repository evidence"}</Button>
    </form>
  );
}

export function MaintainRepositoryReferenceForm({
  projectSlug,
  workId,
  version,
  reference,
}: {
  projectSlug: string;
  workId: string;
  version: number;
  reference: {
    id: string;
    artifactClass: string;
    artifactIdentifier: string | null;
    branch: string | null;
    commitHash: string | null;
    referenceStatus: (typeof ENGINEERING_WORK_REFERENCE_STATUSES)[number];
    note: string | null;
  };
}) {
  const [state, formAction, pending] = useActionState(
    maintainRepositoryReference.bind(null, projectSlug, workId),
    initialState,
  );
  const [referenceStatus, setReferenceStatus] = useState(reference.referenceStatus);
  const reviewBasisRequired =
    referenceStatus !== reference.referenceStatus &&
    isReviewReferenceStatus(referenceStatus);

  return (
    <form action={formAction} className="space-y-5">
      <RefreshOnSuccess success={state.success} />
      <input type="hidden" name="version" value={version} />
      <input type="hidden" name="reference_id" value={reference.id} />
      <input type="hidden" name="current_status" value={reference.referenceStatus} />
      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label htmlFor={`maintain-${reference.id}-class`} className="block text-sm font-medium text-foreground">
            Artifact class
          </label>
          <select id={`maintain-${reference.id}-class`} name="artifact_class" required defaultValue={reference.artifactClass} className={inputClassName}>
            {ENGINEERING_WORK_REPOSITORY_ARTIFACT_CLASSES.map((artifactClass) => (
              <option key={artifactClass} value={artifactClass}>{ENGINEERING_WORK_REPOSITORY_ARTIFACT_CLASS_LABELS[artifactClass]}</option>
            ))}
          </select>
          <FieldError message={state.fieldErrors?.artifactClass} />
        </div>
        <div>
          <label htmlFor={`maintain-${reference.id}-identifier`} className="block text-sm font-medium text-foreground">
            Artifact identifier <span className="font-normal text-muted-foreground">(optional)</span>
          </label>
          <input id={`maintain-${reference.id}-identifier`} name="artifact_identifier" maxLength={500} defaultValue={reference.artifactIdentifier ?? ""} className={inputClassName} />
          <FieldError message={state.fieldErrors?.artifactIdentifier} />
        </div>
        <div>
          <label htmlFor={`maintain-${reference.id}-branch`} className="block text-sm font-medium text-foreground">
            Branch <span className="font-normal text-muted-foreground">(optional)</span>
          </label>
          <input id={`maintain-${reference.id}-branch`} name="branch" maxLength={200} defaultValue={reference.branch ?? ""} className={inputClassName} />
          <FieldError message={state.fieldErrors?.branch} />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`maintain-${reference.id}-commit`} className="block text-sm font-medium text-foreground">
            Commit hash <span className="font-normal text-muted-foreground">(optional)</span>
          </label>
          <input id={`maintain-${reference.id}-commit`} name="commit_hash" maxLength={200} defaultValue={reference.commitHash ?? ""} className={inputClassName} />
          <FieldError message={state.fieldErrors?.commitHash} />
        </div>
        <div>
          <label htmlFor={`maintain-${reference.id}-status`} className="block text-sm font-medium text-foreground">
            Reference status
          </label>
          <select id={`maintain-${reference.id}-status`} name="reference_status" value={referenceStatus} onChange={(event) => setReferenceStatus(event.target.value as typeof reference.referenceStatus)} className={inputClassName}>
            {ENGINEERING_WORK_REFERENCE_STATUSES.map((status) => (
              <option key={status} value={status}>{ENGINEERING_WORK_REFERENCE_STATUS_LABELS[status]}</option>
            ))}
          </select>
          <FieldError message={state.fieldErrors?.referenceStatus} />
        </div>
      </div>
      <div>
        <label htmlFor={`maintain-${reference.id}-note`} className="block text-sm font-medium text-foreground">
          Note / context <span className="font-normal text-muted-foreground">(optional)</span>
        </label>
        <textarea id={`maintain-${reference.id}-note`} name="note" maxLength={4000} rows={3} defaultValue={reference.note ?? ""} className={inputClassName} />
        <FieldError message={state.fieldErrors?.note} />
      </div>
      <div>
        <label htmlFor={`maintain-${reference.id}-rationale`} className="block text-sm font-medium text-foreground">
          Update rationale
        </label>
        <textarea id={`maintain-${reference.id}-rationale`} name="rationale" required maxLength={4000} rows={3} className={inputClassName} />
        <FieldError message={state.fieldErrors?.rationale} />
      </div>
      {reviewBasisRequired ? (
        <div className="rounded-md border border-primary/25 bg-primary/5 p-4">
          <label htmlFor={`maintain-${reference.id}-basis`} className="block text-sm font-medium text-foreground">
            Review decision basis
          </label>
          <p className="mt-1 text-sm text-muted-foreground">
            Changing to {ENGINEERING_WORK_REFERENCE_STATUS_LABELS[referenceStatus]} records a human review and updates the server-controlled review timestamp.
          </p>
          <textarea id={`maintain-${reference.id}-basis`} name="decision_basis" required maxLength={4000} rows={3} className={inputClassName} />
          <FieldError message={state.fieldErrors?.decisionBasis} />
        </div>
      ) : null}
      <MutationError state={state} />
      <Button type="submit" disabled={pending}>{pending ? "Recording..." : "Save evidence update"}</Button>
    </form>
  );
}