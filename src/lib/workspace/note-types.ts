export const WORKSPACE_PROJECT_NOTE_TYPES = [
  "note",
  "decision",
  "risk",
  "qa",
  "release",
] as const;

export type WorkspaceProjectNoteType =
  (typeof WORKSPACE_PROJECT_NOTE_TYPES)[number];

export const WORKSPACE_PROJECT_NOTE_TYPE_LABELS: Record<
  WorkspaceProjectNoteType,
  string
> = {
  note: "Note",
  decision: "Decision",
  risk: "Risk",
  qa: "QA",
  release: "Release",
};

export function isWorkspaceProjectNoteType(
  value: string,
): value is WorkspaceProjectNoteType {
  return WORKSPACE_PROJECT_NOTE_TYPES.includes(
    value as WorkspaceProjectNoteType,
  );
}
