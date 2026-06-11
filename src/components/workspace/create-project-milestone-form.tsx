"use client";

import { useActionState, useEffect, useRef } from "react";

import {
  createProjectMilestone,
  type CreateProjectMilestoneState,
} from "@/app/workspace/projects/[slug]/actions";
import { Button } from "@/components/ui/button";
import {
  WORKSPACE_MILESTONE_STATUS_LABELS,
  WORKSPACE_MILESTONE_STATUSES,
} from "@/lib/workspace/milestone-status";

const initialState: CreateProjectMilestoneState = {};

const inputClassName =
  "mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";

type CreateProjectMilestoneFormProps = {
  projectSlug: string;
};

export function CreateProjectMilestoneForm({
  projectSlug,
}: CreateProjectMilestoneFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState(
    createProjectMilestone.bind(null, projectSlug),
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="mt-6 space-y-4 border-t border-border pt-6"
    >
      <h3 className="font-heading text-sm font-semibold">Add milestone</h3>

      <div>
        <label
          htmlFor="milestone-title"
          className="block text-sm font-medium text-foreground"
        >
          Title
        </label>
        <input
          id="milestone-title"
          name="title"
          type="text"
          required
          maxLength={200}
          placeholder="Milestone name"
          className={inputClassName}
        />
      </div>

      <div>
        <label
          htmlFor="milestone-description"
          className="block text-sm font-medium text-foreground"
        >
          Description
        </label>
        <textarea
          id="milestone-description"
          name="description"
          rows={3}
          placeholder="Optional context"
          className={inputClassName}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="milestone-status"
            className="block text-sm font-medium text-foreground"
          >
            Status
          </label>
          <select
            id="milestone-status"
            name="status"
            required
            defaultValue="planned"
            className={inputClassName}
          >
            {WORKSPACE_MILESTONE_STATUSES.map((status) => (
              <option key={status} value={status}>
                {WORKSPACE_MILESTONE_STATUS_LABELS[status]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="milestone-target-date"
            className="block text-sm font-medium text-foreground"
          >
            Target date
          </label>
          <input
            id="milestone-target-date"
            name="target_date"
            type="date"
            className={inputClassName}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="milestone-sort-order"
          className="block text-sm font-medium text-foreground"
        >
          Sort order{" "}
          <span className="font-normal text-muted-foreground">(optional)</span>
        </label>
        <input
          id="milestone-sort-order"
          name="sort_order"
          type="number"
          min={0}
          step={1}
          placeholder="0"
          className={inputClassName}
        />
      </div>

      {state.error ? (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.error}
        </div>
      ) : null}

      {state.success ? (
        <div className="rounded-md border border-border bg-muted/50 px-3 py-2 text-sm text-muted-foreground">
          Milestone added.
        </div>
      ) : null}

      <Button type="submit" disabled={pending}>
        {pending ? "Saving…" : "Add milestone"}
      </Button>
    </form>
  );
}
