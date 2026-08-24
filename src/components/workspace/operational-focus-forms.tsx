"use client";

import { useActionState } from "react";

import {
  addEngineeringWorkToOperationalFocus,
  clearProjectOperationalFocus,
  removeEngineeringWorkFromOperationalFocus,
  type OperationalFocusMutationState,
} from "@/app/workspace/projects/[slug]/operational-focus-actions";

const initialState: OperationalFocusMutationState = {};

function FocusMutationFeedback({ state }: { state: OperationalFocusMutationState }) {
  if (state.error) {
    return (
      <p className="text-sm text-destructive" role="alert">
        {state.error}
      </p>
    );
  }
  if (state.success) {
    return (
      <p className="text-sm text-muted-foreground" role="status">
        Operational focus updated.
      </p>
    );
  }
  return null;
}

export function OperationalFocusAddForm({
  projectSlug,
  workId,
  focusVersion,
}: {
  projectSlug: string;
  workId: string;
  focusVersion: number;
}) {
  const [state, formAction, pending] = useActionState(
    addEngineeringWorkToOperationalFocus.bind(null, projectSlug, workId),
    initialState,
  );

  return (
    <form action={formAction} className="space-y-2">
      <input type="hidden" name="focusVersion" value={focusVersion} />
      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center gap-2 rounded-[var(--radius-control)] border border-primary/30 bg-background px-3 py-2 text-sm font-medium text-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
        aria-label="Add this Engineering Work to shared Project operational focus"
      >
        Add to operational focus
      </button>
      <FocusMutationFeedback state={state} />
    </form>
  );
}

export function OperationalFocusRemoveForm({
  projectSlug,
  workId,
  focusVersion,
}: {
  projectSlug: string;
  workId: string;
  focusVersion: number;
}) {
  const [state, formAction, pending] = useActionState(
    removeEngineeringWorkFromOperationalFocus.bind(null, projectSlug, workId),
    initialState,
  );

  return (
    <form action={formAction} className="space-y-2">
      <input type="hidden" name="focusVersion" value={focusVersion} />
      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center gap-2 rounded-[var(--radius-control)] border border-border px-3 py-2 text-sm font-medium hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
        aria-label="Remove this Engineering Work from shared Project operational focus"
      >
        Remove from operational focus
      </button>
      <FocusMutationFeedback state={state} />
    </form>
  );
}

export function OperationalFocusClearForm({
  projectSlug,
  focusVersion,
}: {
  projectSlug: string;
  focusVersion: number;
}) {
  const [state, formAction, pending] = useActionState(
    clearProjectOperationalFocus.bind(null, projectSlug),
    initialState,
  );

  return (
    <form action={formAction} className="space-y-2">
      <input type="hidden" name="focusVersion" value={focusVersion} />
      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center gap-2 rounded-[var(--radius-control)] border border-border px-3 py-2 text-sm font-medium hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
        aria-label="Clear all shared Project operational focus selections"
      >
        Clear focus
      </button>
      <FocusMutationFeedback state={state} />
    </form>
  );
}
