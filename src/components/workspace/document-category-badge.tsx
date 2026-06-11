import {
  getWorkspaceProjectDocumentCategoryBadgeClassName,
  getWorkspaceProjectDocumentCategoryLabel,
  type WorkspaceProjectDocumentCategory,
} from "@/lib/workspace/document-categories";
import { cn } from "@/lib/utils";

type DocumentCategoryBadgeProps = {
  category: WorkspaceProjectDocumentCategory;
};

export function DocumentCategoryBadge({
  category,
}: DocumentCategoryBadgeProps) {
  return (
    <span
      className={cn(
        "rounded-full border px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.1em]",
        getWorkspaceProjectDocumentCategoryBadgeClassName(category),
      )}
    >
      {getWorkspaceProjectDocumentCategoryLabel(category)}
    </span>
  );
}
