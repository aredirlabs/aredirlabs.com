import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";

import { Eyebrow } from "@/components/eyebrow";
import { KnowledgeAssetAdoptionMatrix } from "@/components/workspace/knowledge-asset-adoption-matrix";
import {
  KnowledgeAssetCategoryBadge,
  KnowledgeAssetStatusBadge,
} from "@/components/workspace/knowledge-asset-badges";
import {
  KNOWLEDGE_ASSET_ADOPTION_LABELS,
  KNOWLEDGE_ASSET_ADOPTION_SYMBOLS,
  KNOWLEDGE_ASSET_PROJECT_LABELS,
} from "@/lib/knowledge-assets/labels";
import {
  formatKnowledgeAssetDate,
  getKnowledgeAssetById,
  getKnowledgeAssetCanonicalPath,
  getKnowledgeAssetSourceUrl,
  KNOWLEDGE_ASSET_SOURCE_NOTICE,
} from "@/lib/knowledge-assets/registry";
import { KNOWLEDGE_ASSET_PROJECTS } from "@/lib/knowledge-assets/types";

export const dynamic = "force-dynamic";

type KnowledgeAssetDetailPageProps = {
  params: Promise<{ id: string }>;
};

function DetailField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <dt className="font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-foreground">{children}</dd>
    </div>
  );
}

export default async function KnowledgeAssetDetailPage({
  params,
}: KnowledgeAssetDetailPageProps) {
  const { id } = await params;

  if (!id?.trim()) {
    notFound();
  }

  const asset = getKnowledgeAssetById(id);

  if (!asset) {
    notFound();
  }

  const sourceUrl = getKnowledgeAssetSourceUrl(asset.path);
  const canonicalPath = getKnowledgeAssetCanonicalPath(asset.path);

  return (
    <div className="p-8">
      <Link
        href="/workspace/knowledge-assets"
        className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        Knowledge Assets
      </Link>

      <div className="max-w-4xl">
        <Eyebrow>Knowledge Asset</Eyebrow>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight">
            {asset.title}
          </h1>
          <KnowledgeAssetCategoryBadge category={asset.category} />
          <KnowledgeAssetStatusBadge status={asset.status} />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          {KNOWLEDGE_ASSET_SOURCE_NOTICE}
        </p>

        <section className="mt-8 rounded-lg border border-border bg-card p-6">
          <h2 className="font-heading text-base font-semibold">Metadata</h2>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            <DetailField label="Title">{asset.title}</DetailField>
            <DetailField label="Category">
              <KnowledgeAssetCategoryBadge category={asset.category} />
            </DetailField>
            <DetailField label="Status">
              <KnowledgeAssetStatusBadge status={asset.status} />
            </DetailField>
            <DetailField label="Version">
              <span className="font-mono text-xs">{asset.version}</span>
            </DetailField>
            <DetailField label="Owner">{asset.owner}</DetailField>
            <DetailField label="Reusability">{asset.reusability}</DetailField>
          </dl>
        </section>

        <section className="mt-6 rounded-lg border border-border bg-card p-6">
          <h2 className="font-heading text-base font-semibold">Relationships</h2>
          <dl className="mt-4 grid gap-4">
            <DetailField label="Linked Projects">
              {asset.linkedProjects.join(", ")}
            </DetailField>
            <DetailField label="Origin Project">{asset.originProject}</DetailField>
            <DetailField label="Origin Artifacts">
              <span className="whitespace-pre-line">{asset.originArtifacts}</span>
            </DetailField>
          </dl>

          <div className="mt-6 overflow-x-auto rounded-md border border-border">
            <table className="w-full min-w-[360px] text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Project</th>
                  <th className="px-4 py-3 font-medium">Adoption</th>
                </tr>
              </thead>
              <tbody>
                {KNOWLEDGE_ASSET_PROJECTS.map((project) => {
                  const mode = asset.adoption[project];
                  return (
                    <tr
                      key={project}
                      className="border-b border-border last:border-0"
                    >
                      <td className="px-4 py-3">
                        {KNOWLEDGE_ASSET_PROJECT_LABELS[project]}
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-mono text-sm">
                          {KNOWLEDGE_ASSET_ADOPTION_SYMBOLS[mode]}
                        </span>{" "}
                        {KNOWLEDGE_ASSET_ADOPTION_LABELS[mode]}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-6 rounded-lg border border-border bg-card p-6">
          <h2 className="font-heading text-base font-semibold">Governance</h2>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            <DetailField label="Last Reviewed">
              {formatKnowledgeAssetDate(asset.lastReviewed)}
            </DetailField>
            <DetailField label="Next Review Due">
              {formatKnowledgeAssetDate(asset.nextReviewDue)}
            </DetailField>
          </dl>
        </section>

        <section className="mt-6 rounded-lg border border-border bg-card p-6">
          <h2 className="font-heading text-base font-semibold">Source</h2>
          <dl className="mt-4 grid gap-4">
            <DetailField label="Canonical Document Path">
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                {canonicalPath}
              </code>
            </DetailField>
          </dl>
          <div className="mt-4">
            <Link
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
            >
              Open Source Document
              <ExternalLink className="size-3.5" />
            </Link>
          </div>
        </section>

        <div className="mt-8">
          <KnowledgeAssetAdoptionMatrix assets={[asset]} compact />
        </div>
      </div>
    </div>
  );
}
