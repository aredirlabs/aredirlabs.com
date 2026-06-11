"use client";

import { useActionState, useEffect, useRef } from "react";

import {
  createProjectPrompt,
  type CreateProjectPromptState,
} from "@/app/workspace/projects/[slug]/actions";
import { Button } from "@/components/ui/button";
import {
  WORKSPACE_PROJECT_PROMPT_STATUS_LABELS,
  WORKSPACE_PROJECT_PROMPT_STATUSES,
} from "@/lib/workspace/prompt-status";
import {
  WORKSPACE_PROJECT_PROMPT_TYPE_LABELS,
  WORKSPACE_PROJECT_PROMPT_TYPES,
} from "@/lib/workspace/prompt-types";

const initialState: CreateProjectPromptState = {};

const inputClassName =
  "mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";

type CreateProjectPromptFormProps = {
  projectSlug: string;
};

export function CreateProjectPromptForm({
  projectSlug,
}: CreateProjectPromptFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState(
    createProjectPrompt.bind(null, projectSlug),
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
      <h3 className="font-heading text-sm font-semibold">Add prompt</h3>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="prompt-type"
            className="block text-sm font-medium text-foreground"
          >
            Type
          </label>
          <select
            id="prompt-type"
            name="prompt_type"
            required
            defaultValue="implementation"
            className={inputClassName}
          >
            {WORKSPACE_PROJECT_PROMPT_TYPES.map((type) => (
              <option key={type} value={type}>
                {WORKSPACE_PROJECT_PROMPT_TYPE_LABELS[type]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="prompt-status"
            className="block text-sm font-medium text-foreground"
          >
            Status
          </label>
          <select
            id="prompt-status"
            name="status"
            required
            defaultValue="drafted"
            className={inputClassName}
          >
            {WORKSPACE_PROJECT_PROMPT_STATUSES.map((status) => (
              <option key={status} value={status}>
                {WORKSPACE_PROJECT_PROMPT_STATUS_LABELS[status]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="prompt-title"
          className="block text-sm font-medium text-foreground"
        >
          Title
        </label>
        <input
          id="prompt-title"
          name="title"
          type="text"
          required
          maxLength={200}
          placeholder="Short prompt title"
          className={inputClassName}
        />
      </div>

      <div>
        <label
          htmlFor="prompt-body"
          className="block text-sm font-medium text-foreground"
        >
          Prompt body
        </label>
        <textarea
          id="prompt-body"
          name="prompt_body"
          required
          rows={5}
          placeholder="Implementation prompt, audit instructions, QA request, or research question"
          className={inputClassName}
        />
      </div>

      <div>
        <label
          htmlFor="prompt-result-summary"
          className="block text-sm font-medium text-foreground"
        >
          Result summary
        </label>
        <textarea
          id="prompt-result-summary"
          name="result_summary"
          rows={3}
          placeholder="Short summary of what happened"
          className={inputClassName}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label
            htmlFor="prompt-files-changed"
            className="block text-sm font-medium text-foreground"
          >
            Files changed
          </label>
          <textarea
            id="prompt-files-changed"
            name="files_changed"
            rows={4}
            placeholder="Files, folders, or areas touched"
            className={inputClassName}
          />
        </div>
        <div>
          <label
            htmlFor="prompt-verification"
            className="block text-sm font-medium text-foreground"
          >
            Verification
          </label>
          <textarea
            id="prompt-verification"
            name="verification"
            rows={4}
            placeholder="Checks run or manual QA notes"
            className={inputClassName}
          />
        </div>
        <div>
          <label
            htmlFor="prompt-follow-ups"
            className="block text-sm font-medium text-foreground"
          >
            Follow-ups
          </label>
          <textarea
            id="prompt-follow-ups"
            name="follow_ups"
            rows={4}
            placeholder="Known next steps"
            className={inputClassName}
          />
        </div>
      </div>

      {state.error ? (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.error}
        </div>
      ) : null}

      {state.success ? (
        <div className="rounded-md border border-border bg-muted/50 px-3 py-2 text-sm text-muted-foreground">
          Prompt added.
        </div>
      ) : null}

      <Button type="submit" disabled={pending}>
        {pending ? "Saving..." : "Add prompt"}
      </Button>
    </form>
  );
}
