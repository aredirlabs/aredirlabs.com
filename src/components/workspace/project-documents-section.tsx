import Link from "next/link";
import { AlertTriangle, FileText } from "lucide-react";

import { CreateProjectDocumentForm } from "@/components/workspace/create-project-document-form";
import { DocumentCategoryBadge } from "@/components/workspace/document-category-badge";
import type { workspaceProjectDocuments } from "@/lib/db/schema";
import { formatDate } from "@/lib/workspace/format-date";
import { groupDocumentsByCategory } from "@/lib/workspace/queries";

type Document = typeof workspaceProjectDocuments.$inferSelect;

type ProjectDocumentsSectionProps = {
  projectSlug: string;
  documents: Document[];
  documentsError: string | null;
};

function previewContent(content: string, maxLength = 180) {
  const normalized = content.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength).trimEnd()}...`;
}

export function ProjectDocumentsSection({
  projectSlug,
  documents,
  documentsError,
}: ProjectDocumentsSectionProps) {
  const groups = groupDocumentsByCategory(documents);

  return (
    <section className="rounded-lg border border-border bg-card p-6">
      <h2 className="font-heading text-base font-semibold">Documents</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Architecture records, decisions, QA notes, prompts, research, and release
        documentation.
      </p>

      {documentsError ? (
        <div className="mt-4 rounded-md border border-destructive/30 bg-destructive/10 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-destructive" />
            <div>
              <p className="text-sm font-medium text-destructive">
                Could not load documents
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Project details loaded, but documents failed to load. Try
                refreshing the page.
              </p>
            </div>
          </div>
        </div>
      ) : documents.length === 0 ? (
        <div className="mt-4 rounded-md border border-dashed border-border bg-muted/20 p-6 text-center">
          <FileText className="mx-auto size-5 text-muted-foreground" />
          <p className="mt-3 text-sm font-medium">No documents yet.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Create the first document for this project.
          </p>
        </div>
      ) : (
        <div className="mt-4 space-y-6">
          {groups.map((group) => (
            <div key={group.key}>
              <h3 className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-muted-foreground">
                {group.label}
              </h3>
              <ul className="mt-2 space-y-3">
                {group.items.map((document) => (
                  <li
                    key={document.id}
                    className="rounded-md border border-border bg-background/60 p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <DocumentCategoryBadge category={document.category} />
                      <time
                        dateTime={document.updatedAt.toISOString()}
                        className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-muted-foreground"
                      >
                        Updated {formatDate(document.updatedAt)}
                      </time>
                    </div>
                    <h4 className="mt-2 font-medium">
                      <Link
                        href={`/workspace/projects/${projectSlug}/documents/${document.slug}`}
                        className="underline-offset-4 hover:underline"
                      >
                        {document.title}
                      </Link>
                    </h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {previewContent(document.content)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      <CreateProjectDocumentForm projectSlug={projectSlug} />
    </section>
  );
}
