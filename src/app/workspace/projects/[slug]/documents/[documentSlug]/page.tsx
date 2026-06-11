import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Eyebrow } from "@/components/eyebrow";
import { DocumentCategoryBadge } from "@/components/workspace/document-category-badge";
import { formatTimestamp } from "@/lib/workspace/format-date";
import { getProjectDocumentBySlugs } from "@/lib/workspace/queries";

export const dynamic = "force-dynamic";

type ProjectDocumentDetailPageProps = {
  params: Promise<{ slug: string; documentSlug: string }>;
};

function DocumentContent({ content }: { content: string }) {
  const blocks = content
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <div className="space-y-4 text-sm leading-7 text-foreground/90">
      {blocks.map((block, index) => (
        <p key={index} className="whitespace-pre-line">
          {block}
        </p>
      ))}
    </div>
  );
}

export default async function ProjectDocumentDetailPage({
  params,
}: ProjectDocumentDetailPageProps) {
  const { slug, documentSlug } = await params;

  if (!slug?.trim() || !documentSlug?.trim()) {
    notFound();
  }

  const document = await getProjectDocumentBySlugs(slug, documentSlug);

  if (!document) {
    notFound();
  }

  return (
    <div className="p-8">
      <Link
        href={`/workspace/projects/${document.projectSlug}`}
        className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        {document.projectName}
      </Link>

      <article className="max-w-3xl rounded-lg border border-border bg-card p-6">
        <Eyebrow>Project Document</Eyebrow>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight">
            {document.title}
          </h1>
          <DocumentCategoryBadge category={document.category} />
        </div>
        <p className="mt-2 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
          Updated {formatTimestamp(document.updatedAt)}
        </p>

        <div className="mt-8 border-t border-border pt-6">
          <DocumentContent content={document.content} />
        </div>
      </article>
    </div>
  );
}
