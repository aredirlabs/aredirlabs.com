"use client";

import { useActionState, useEffect, useRef } from "react";

import {
  createProjectDocument,
  type CreateProjectDocumentState,
} from "@/app/workspace/projects/[slug]/actions";
import { Button } from "@/components/ui/button";
import {
  WORKSPACE_PROJECT_DOCUMENT_CATEGORIES,
  WORKSPACE_PROJECT_DOCUMENT_CATEGORY_LABELS,
} from "@/lib/workspace/document-categories";

const initialState: CreateProjectDocumentState = {};

const inputClassName =
  "mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";

type CreateProjectDocumentFormProps = {
  projectSlug: string;
};

export function CreateProjectDocumentForm({
  projectSlug,
}: CreateProjectDocumentFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState(
    createProjectDocument.bind(null, projectSlug),
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
      <h3 className="font-heading text-sm font-semibold">Add document</h3>

      <div>
        <label
          htmlFor="document-category"
          className="block text-sm font-medium text-foreground"
        >
          Category
        </label>
        <select
          id="document-category"
          name="category"
          required
          defaultValue="architecture"
          className={inputClassName}
        >
          {WORKSPACE_PROJECT_DOCUMENT_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {WORKSPACE_PROJECT_DOCUMENT_CATEGORY_LABELS[category]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="document-title"
          className="block text-sm font-medium text-foreground"
        >
          Title
        </label>
        <input
          id="document-title"
          name="title"
          type="text"
          required
          maxLength={200}
          placeholder="Short document title"
          className={inputClassName}
        />
      </div>

      <div>
        <label
          htmlFor="document-content"
          className="block text-sm font-medium text-foreground"
        >
          Content
        </label>
        <textarea
          id="document-content"
          name="content"
          required
          rows={7}
          placeholder="Architecture notes, decisions, QA findings, prompts, research, or references"
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
          Document added.
        </div>
      ) : null}

      <Button type="submit" disabled={pending}>
        {pending ? "Saving..." : "Add document"}
      </Button>
    </form>
  );
}
