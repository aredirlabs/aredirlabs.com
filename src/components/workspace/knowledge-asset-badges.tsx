import {
  getKnowledgeAssetCategoryLabel,
  getKnowledgeAssetStatusLabel,
} from "@/lib/knowledge-assets/labels";
import type {
  KnowledgeAssetCategory,
  KnowledgeAssetStatus,
} from "@/lib/knowledge-assets/types";
import { cn } from "@/lib/utils";

const categoryBadgeClasses: Record<KnowledgeAssetCategory, string> = {
  architecture_pattern:
    "border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300",
  engineering_standard:
    "border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-300",
  qa_standard:
    "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  ai_pattern:
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  documentation_standard:
    "border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300",
  playbook:
    "border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300",
};

const statusBadgeClasses: Record<KnowledgeAssetStatus, string> = {
  promoted_standard:
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  company_standard:
    "border-primary/30 bg-primary/10 text-primary",
  deprecated:
    "border-destructive/30 bg-destructive/10 text-destructive",
  superseded:
    "border-muted-foreground/30 bg-muted/50 text-muted-foreground",
};

type KnowledgeAssetCategoryBadgeProps = {
  category: KnowledgeAssetCategory;
};

export function KnowledgeAssetCategoryBadge({
  category,
}: KnowledgeAssetCategoryBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.1em]",
        categoryBadgeClasses[category],
      )}
    >
      {getKnowledgeAssetCategoryLabel(category)}
    </span>
  );
}

type KnowledgeAssetStatusBadgeProps = {
  status: KnowledgeAssetStatus;
};

export function KnowledgeAssetStatusBadge({
  status,
}: KnowledgeAssetStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.1em]",
        statusBadgeClasses[status],
      )}
    >
      {getKnowledgeAssetStatusLabel(status)}
    </span>
  );
}
