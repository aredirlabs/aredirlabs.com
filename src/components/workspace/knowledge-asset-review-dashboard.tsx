import Link from "next/link";

import {
  formatKnowledgeAssetDate,
  groupAssetsByReviewUrgency,
} from "@/lib/knowledge-assets/registry";
import type { KnowledgeAsset } from "@/lib/knowledge-assets/types";

type KnowledgeAssetReviewDashboardProps = {
  assets: KnowledgeAsset[];
};

const reviewSections = [
  {
    key: "overdue" as const,
    title: "Overdue",
    description: "Past next review due date",
    className: "border-destructive/30 bg-destructive/5",
    titleClassName: "text-destructive",
  },
  {
    key: "due_soon" as const,
    title: "Due Soon",
    description: "Review due within 30 days",
    className: "border-amber-500/30 bg-amber-500/5",
    titleClassName: "text-amber-700 dark:text-amber-300",
  },
  {
    key: "upcoming" as const,
    title: "Upcoming",
    description: "Review due later than 30 days",
    className: "border-border bg-background/60",
    titleClassName: "text-foreground",
  },
];

export function KnowledgeAssetReviewDashboard({
  assets,
}: KnowledgeAssetReviewDashboardProps) {
  const groups = groupAssetsByReviewUrgency(assets);

  return (
    <section className="rounded-lg border border-border bg-card p-6">
      <div>
        <h2 className="font-heading text-base font-semibold">Review Status</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Visibility only — based on each asset&apos;s next review due date.
        </p>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {reviewSections.map((section) => {
          const sectionAssets = groups[section.key];

          return (
            <div
              key={section.key}
              className={`rounded-md border p-4 ${section.className}`}
            >
              <div className="flex items-baseline justify-between gap-2">
                <h3
                  className={`font-mono text-xs uppercase tracking-[0.1em] ${section.titleClassName}`}
                >
                  {section.title}
                </h3>
                <span className="font-mono text-xs text-muted-foreground">
                  {sectionAssets.length}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {section.description}
              </p>

              {sectionAssets.length > 0 ? (
                <ul className="mt-4 space-y-2">
                  {sectionAssets.map((asset) => (
                    <li key={asset.id} className="text-sm">
                      <Link
                        href={`/workspace/knowledge-assets/${asset.id}`}
                        className="font-medium underline-offset-4 hover:underline"
                      >
                        {asset.title}
                      </Link>
                      <p className="mt-0.5 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-muted-foreground">
                        Due {formatKnowledgeAssetDate(asset.nextReviewDue)}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm text-muted-foreground">None</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
