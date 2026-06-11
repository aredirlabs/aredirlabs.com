import Link from "next/link";
import { AlertTriangle, FileSearch } from "lucide-react";

import { Eyebrow } from "@/components/eyebrow";
import { DocumentCategoryBadge } from "@/components/workspace/document-category-badge";
import { formatDate } from "@/lib/workspace/format-date";
import { searchWorkspaceDocuments } from "@/lib/workspace/queries";

export const dynamic = "force-dynamic";

type WorkspaceDocsPageProps = {
  searchParams: Promise<{ q?: string }>;
};

function previewContent(content: string, maxLength = 180) {
  const normalized = content.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength).trimEnd()}...`;
}

export default async function WorkspaceDocsPage({
  searchParams,
}: WorkspaceDocsPageProps) {
  const { q } = await searchParams;
  const query = typeof q === "string" ? q.trim() : "";
  let documents: Awaited<ReturnType<typeof searchWorkspaceDocuments>> = [];
  let error: string | null = null;

  try {
    documents = await searchWorkspaceDocuments(query);
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load documents";
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <Eyebrow>Internal Documentation</Eyebrow>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">Docs</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Search project architecture, decisions, QA findings, prompts,
          research, releases, and references.
        </p>
      </div>

      <form className="mb-6 flex max-w-2xl flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="document-search">
          Search documents
        </label>
        <input
          id="document-search"
          name="q"
          type="search"
          defaultValue={query}
          placeholder="Search by title or category"
          className="min-h-9 flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          type="submit"
          className="inline-flex min-h-9 items-center justify-center rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
        >
          Search
        </button>
      </form>

      {error ? (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-destructive" />
            <div>
              <p className="text-sm font-medium text-destructive">
                Could not load documents
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Check that the database is reachable and the documents table has
                been pushed.
              </p>
            </div>
          </div>
        </div>
      ) : documents.length === 0 ? (
        <div className="rounded-md border border-dashed border-border bg-muted/20 p-8 text-center">
          <FileSearch className="mx-auto size-6 text-muted-foreground" />
          <p className="mt-3 text-sm font-medium">
            {query ? "No matching documents" : "No documents yet"}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {query
              ? "Try a different title or category search."
              : "Create the first project document from a project detail page."}
          </p>
        </div>
      ) : (
        <ul className="grid gap-4 lg:grid-cols-2">
          {documents.map((document) => (
            <li
              key={document.id}
              className="rounded-lg border border-border bg-card p-5 transition-colors hover:bg-accent/40"
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
              <h2 className="mt-3 font-heading text-base font-semibold">
                <Link
                  href={`/workspace/projects/${document.projectSlug}/documents/${document.slug}`}
                  className="underline-offset-4 hover:underline"
                >
                  {document.title}
                </Link>
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {document.projectName}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                {previewContent(document.content)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
