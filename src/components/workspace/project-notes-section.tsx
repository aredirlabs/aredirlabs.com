import { AlertTriangle, StickyNote } from "lucide-react";

import { CreateProjectNoteForm } from "@/components/workspace/create-project-note-form";
import type { workspaceProjectNotes } from "@/lib/db/schema";
import {
  WORKSPACE_PROJECT_NOTE_TYPE_LABELS,
  type WorkspaceProjectNoteType,
} from "@/lib/workspace/note-types";

type Note = typeof workspaceProjectNotes.$inferSelect;

type ProjectNotesSectionProps = {
  projectSlug: string;
  notes: Note[];
  notesError: string | null;
};

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(value);
}

function previewBody(body: string, maxLength = 160) {
  const normalized = body.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength).trimEnd()}…`;
}

function NoteTypeBadge({ type }: { type: WorkspaceProjectNoteType }) {
  return (
    <span className="rounded-full bg-muted px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.1em]">
      {WORKSPACE_PROJECT_NOTE_TYPE_LABELS[type]}
    </span>
  );
}

export function ProjectNotesSection({
  projectSlug,
  notes,
  notesError,
}: ProjectNotesSectionProps) {
  return (
    <section className="rounded-lg border border-border bg-card p-6">
      <h2 className="font-heading text-base font-semibold">Recent Notes</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Internal notes, decisions, and project memory for this product.
      </p>

      {notesError ? (
        <div className="mt-4 rounded-md border border-destructive/30 bg-destructive/10 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-destructive" />
            <div>
              <p className="text-sm font-medium text-destructive">
                Could not load notes
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Project details loaded, but notes failed to load. Try refreshing
                the page.
              </p>
            </div>
          </div>
        </div>
      ) : notes.length === 0 ? (
        <div className="mt-4 rounded-md border border-dashed border-border bg-muted/20 p-6 text-center">
          <StickyNote className="mx-auto size-5 text-muted-foreground" />
          <p className="mt-3 text-sm font-medium">No notes yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Add the first note to start building project memory.
          </p>
        </div>
      ) : (
        <ul className="mt-4 space-y-3">
          {notes.map((note) => (
            <li
              key={note.id}
              className="rounded-md border border-border bg-background/60 p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <NoteTypeBadge type={note.type} />
                <time
                  dateTime={note.createdAt.toISOString()}
                  className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-muted-foreground"
                >
                  {formatDate(note.createdAt)}
                </time>
              </div>
              <h3 className="mt-2 font-medium">{note.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {previewBody(note.body)}
              </p>
            </li>
          ))}
        </ul>
      )}

      <CreateProjectNoteForm projectSlug={projectSlug} />
    </section>
  );
}
