import Link from "next/link";
import { AlertTriangle, BookOpen } from "lucide-react";

import { Eyebrow } from "@/components/eyebrow";
import { KnowledgeAssetAdoptionMatrix } from "@/components/workspace/knowledge-asset-adoption-matrix";
import {
  KnowledgeAssetCategoryBadge,
  KnowledgeAssetStatusBadge,
} from "@/components/workspace/knowledge-asset-badges";
import { KnowledgeAssetReviewDashboard } from "@/components/workspace/knowledge-asset-review-dashboard";
import {
  KNOWLEDGE_ASSET_CATEGORY_LABELS,
  KNOWLEDGE_ASSET_STATUS_LABELS,
} from "@/lib/knowledge-assets/labels";
import {
  filterKnowledgeAssets,
  formatKnowledgeAssetDate,
  getAllKnowledgeAssets,
  KNOWLEDGE_ASSET_SOURCE_NOTICE,
} from "@/lib/knowledge-assets/registry";
import {
  KNOWLEDGE_ASSET_CATEGORIES,
  KNOWLEDGE_ASSET_STATUSES,
} from "@/lib/knowledge-assets/types";

export const dynamic = "force-dynamic";

type KnowledgeAssetsPageProps = {
  searchParams: Promise<{
    category?: string;
    status?: string;
    project?: string;
  }>;
};

const projectFilterOptions = [
  { value: "alignfit", label: "AlignFit" },
  { value: "classforge", label: "ClassForge" },
  { value: "leagueos", label: "LeagueOS" },
  { value: "aredir_labs", label: "Aredir Labs" },
] as const;

export default async function KnowledgeAssetsPage({
  searchParams,
}: KnowledgeAssetsPageProps) {
  const filters = await searchParams;
  const category =
    typeof filters.category === "string" ? filters.category : "";
  const status = typeof filters.status === "string" ? filters.status : "";
  const project = typeof filters.project === "string" ? filters.project : "";

  const allAssets = getAllKnowledgeAssets();
  const assets = filterKnowledgeAssets({ category, status, project });
  const hasFilters = Boolean(category || status || project);

  return (
    <div className="p-8">
      <div className="mb-8">
        <Eyebrow>Knowledge Asset Registry</Eyebrow>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          Knowledge Assets
        </h1>
        <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
          Governance and discovery view for promoted Knowledge Base assets.
          {KNOWLEDGE_ASSET_SOURCE_NOTICE}
        </p>
      </div>

      <form className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]">
        <label className="sr-only" htmlFor="knowledge-asset-category-filter">
          Category
        </label>
        <select
          id="knowledge-asset-category-filter"
          name="category"
          defaultValue={category}
          className="min-h-9 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">All categories</option>
          {KNOWLEDGE_ASSET_CATEGORIES.map((categoryOption) => (
            <option key={categoryOption} value={categoryOption}>
              {KNOWLEDGE_ASSET_CATEGORY_LABELS[categoryOption]}
            </option>
          ))}
        </select>

        <label className="sr-only" htmlFor="knowledge-asset-status-filter">
          Status
        </label>
        <select
          id="knowledge-asset-status-filter"
          name="status"
          defaultValue={status}
          className="min-h-9 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">All statuses</option>
          {KNOWLEDGE_ASSET_STATUSES.map((statusOption) => (
            <option key={statusOption} value={statusOption}>
              {KNOWLEDGE_ASSET_STATUS_LABELS[statusOption]}
            </option>
          ))}
        </select>

        <label className="sr-only" htmlFor="knowledge-asset-project-filter">
          Project
        </label>
        <select
          id="knowledge-asset-project-filter"
          name="project"
          defaultValue={project}
          className="min-h-9 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">All projects</option>
          {projectFilterOptions.map((projectOption) => (
            <option key={projectOption.value} value={projectOption.value}>
              {projectOption.label}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="inline-flex min-h-9 items-center justify-center rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
        >
          Filter
        </button>
      </form>

      {assets.length === 0 ? (
        <div className="rounded-md border border-dashed border-border bg-muted/20 p-8 text-center">
          <BookOpen className="mx-auto size-6 text-muted-foreground" />
          <p className="mt-3 text-sm font-medium">No matching assets</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {hasFilters
              ? "Try a different category, status, or project filter."
              : "No promoted assets are registered yet."}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[960px] text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
                <th className="px-4 py-3 font-medium">Asset</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Version</th>
                <th className="px-4 py-3 font-medium">Owner</th>
                <th className="px-4 py-3 font-medium">Review Due</th>
                <th className="px-4 py-3 font-medium">Projects</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset) => (
                <tr
                  key={asset.id}
                  className="border-b border-border last:border-0"
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/workspace/knowledge-assets/${asset.id}`}
                      className="font-medium hover:text-primary hover:underline"
                    >
                      {asset.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <KnowledgeAssetCategoryBadge category={asset.category} />
                  </td>
                  <td className="px-4 py-3">
                    <KnowledgeAssetStatusBadge status={asset.status} />
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {asset.version}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {asset.owner}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {formatKnowledgeAssetDate(asset.nextReviewDue)}
                  </td>
                  <td className="max-w-[220px] px-4 py-3 text-muted-foreground">
                    <span className="line-clamp-2">
                      {asset.linkedProjects.join(", ")}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-8 space-y-8">
        <KnowledgeAssetReviewDashboard assets={allAssets} />
        <KnowledgeAssetAdoptionMatrix assets={allAssets} />
      </div>

      <div className="mt-8 rounded-lg border border-border bg-muted/20 p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            {KNOWLEDGE_ASSET_SOURCE_NOTICE} Updates flow through promotion PRs
            that sync registry seed data — not through this interface.
          </p>
        </div>
      </div>
    </div>
  );
}
