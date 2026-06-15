import {
  KNOWLEDGE_ASSET_ADOPTION_LABELS,
  KNOWLEDGE_ASSET_ADOPTION_SYMBOLS,
  KNOWLEDGE_ASSET_PROJECT_CODES,
  KNOWLEDGE_ASSET_PROJECT_LABELS,
} from "@/lib/knowledge-assets/labels";
import type { KnowledgeAsset } from "@/lib/knowledge-assets/types";
import { KNOWLEDGE_ASSET_PROJECTS } from "@/lib/knowledge-assets/types";

type KnowledgeAssetAdoptionMatrixProps = {
  assets: KnowledgeAsset[];
  compact?: boolean;
};

export function KnowledgeAssetAdoptionMatrix({
  assets,
  compact = false,
}: KnowledgeAssetAdoptionMatrixProps) {
  return (
    <section className="rounded-lg border border-border bg-card p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-heading text-base font-semibold">
            Adoption Matrix
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Per-project adoption status from KB-012 readiness review, validated
            in KB-013.
          </p>
        </div>
        <dl className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-muted-foreground">
          {Object.entries(KNOWLEDGE_ASSET_ADOPTION_SYMBOLS).map(
            ([mode, symbol]) => (
              <div key={mode} className="flex items-center gap-1.5">
                <dt className="inline-flex size-5 items-center justify-center rounded border border-border bg-background font-semibold text-foreground">
                  {symbol}
                </dt>
                <dd>{KNOWLEDGE_ASSET_ADOPTION_LABELS[mode as keyof typeof KNOWLEDGE_ASSET_ADOPTION_LABELS]}</dd>
              </div>
            ),
          )}
        </dl>
      </div>

      <div className="mt-6 overflow-x-auto rounded-md border border-border">
        <table
          className={
            compact
              ? "w-full min-w-[480px] text-left text-sm"
              : "w-full min-w-[720px] text-left text-sm"
          }
        >
          <thead>
            <tr className="border-b border-border bg-muted/50 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
              <th className="px-4 py-3 font-medium">Asset</th>
              {KNOWLEDGE_ASSET_PROJECTS.map((project) => (
                <th
                  key={project}
                  className="px-3 py-3 text-center font-medium"
                  title={KNOWLEDGE_ASSET_PROJECT_LABELS[project]}
                >
                  {KNOWLEDGE_ASSET_PROJECT_CODES[project]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr
                key={asset.id}
                className="border-b border-border last:border-0"
              >
                <td className="px-4 py-3 font-medium">{asset.title}</td>
                {KNOWLEDGE_ASSET_PROJECTS.map((project) => {
                  const mode = asset.adoption[project];
                  const symbol = KNOWLEDGE_ASSET_ADOPTION_SYMBOLS[mode];
                  const label = KNOWLEDGE_ASSET_ADOPTION_LABELS[mode];

                  return (
                    <td
                      key={project}
                      className="px-3 py-3 text-center font-mono text-sm"
                      title={`${KNOWLEDGE_ASSET_PROJECT_LABELS[project]}: ${label}`}
                    >
                      <span aria-label={`${label} in ${KNOWLEDGE_ASSET_PROJECT_LABELS[project]}`}>
                        {symbol}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
