import { cn } from "@/lib/utils";
import {
  getWorkspaceProjectPromptStatusBadgeClassName,
  getWorkspaceProjectPromptStatusLabel,
  type WorkspaceProjectPromptStatus,
} from "@/lib/workspace/prompt-status";
import {
  getWorkspaceProjectPromptTypeBadgeClassName,
  getWorkspaceProjectPromptTypeLabel,
  type WorkspaceProjectPromptType,
} from "@/lib/workspace/prompt-types";

const badgeClassName =
  "inline-flex items-center rounded-md border px-2 py-1 font-mono text-[0.65rem] uppercase tracking-[0.1em]";

export function PromptTypeBadge({ type }: { type: WorkspaceProjectPromptType }) {
  return (
    <span
      className={cn(
        badgeClassName,
        getWorkspaceProjectPromptTypeBadgeClassName(type),
      )}
    >
      {getWorkspaceProjectPromptTypeLabel(type)}
    </span>
  );
}

export function PromptStatusBadge({
  status,
}: {
  status: WorkspaceProjectPromptStatus;
}) {
  return (
    <span
      className={cn(
        badgeClassName,
        getWorkspaceProjectPromptStatusBadgeClassName(status),
      )}
    >
      {getWorkspaceProjectPromptStatusLabel(status)}
    </span>
  );
}
