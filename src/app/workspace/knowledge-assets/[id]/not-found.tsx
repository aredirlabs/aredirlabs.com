import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function KnowledgeAssetNotFound() {
  return (
    <div className="p-8">
      <Link
        href="/workspace/knowledge-assets"
        className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        Knowledge Assets
      </Link>

      <div className="max-w-lg rounded-lg border border-border bg-card p-8">
        <h1 className="text-2xl font-semibold tracking-tight">Asset not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This knowledge asset is not in the registry. Return to the catalog to
          browse promoted assets.
        </p>
      </div>
    </div>
  );
}
