"use client";

import { useActionState, useEffect, useRef } from "react";

import {
  createProjectNote,
  type CreateProjectNoteState,
} from "@/app/workspace/projects/[slug]/actions";
import { Button } from "@/components/ui/button";
import {
  WORKSPACE_PROJECT_NOTE_TYPE_LABELS,
  WORKSPACE_PROJECT_NOTE_TYPES,
} from "@/lib/workspace/note-types";

const initialState: CreateProjectNoteState = {};

const inputClassName =
  "mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";

type CreateProjectNoteFormProps = {
  projectSlug: string;
};

export function CreateProjectNoteForm({
  projectSlug,
}: CreateProjectNoteFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState(
    createProjectNote.bind(null, projectSlug),
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <form ref={formRef} action={formAction} className="mt-6 space-y-4 border-t border-border pt-6">
      <h3 className="font-heading text-sm font-semibold">Add note</h3>

      <div>
        <label
          htmlFor="note-type"
          className="block text-sm font-medium text-foreground"
        >
          Type
        </label>
        <select
          id="note-type"
          name="type"
          required
          defaultValue="note"
          className={inputClassName}
        >
          {WORKSPACE_PROJECT_NOTE_TYPES.map((type) => (
            <option key={type} value={type}>
              {WORKSPACE_PROJECT_NOTE_TYPE_LABELS[type]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="note-title"
          className="block text-sm font-medium text-foreground"
        >
          Title
        </label>
        <input
          id="note-title"
          name="title"
          type="text"
          required
          maxLength={200}
          placeholder="Short summary"
          className={inputClassName}
        />
      </div>

      <div>
        <label
          htmlFor="note-body"
          className="block text-sm font-medium text-foreground"
        >
          Body
        </label>
        <textarea
          id="note-body"
          name="body"
          required
          rows={4}
          placeholder="Context, decision, or status update"
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
          Note added.
        </div>
      ) : null}

      <Button type="submit" disabled={pending}>
        {pending ? "Saving…" : "Add note"}
      </Button>
    </form>
  );
}
