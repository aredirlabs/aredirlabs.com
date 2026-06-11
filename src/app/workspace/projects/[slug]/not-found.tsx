import Link from "next/link";

import { Eyebrow } from "@/components/eyebrow";
import { Button } from "@/components/ui/button";
import { FolderOpen } from "lucide-react";

export default function WorkspaceProjectNotFound() {
  return (
    <div className="p-8">
      <div className="mx-auto max-w-lg rounded-lg border border-border bg-card p-12 text-center">
        <FolderOpen className="mx-auto size-8 text-muted-foreground" />
        <Eyebrow className="mt-4">Project Not Found</Eyebrow>
        <h1 className="mt-2 text-xl font-semibold tracking-tight">
          No project matches this slug
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The project may not exist in the registry, or the URL may be incorrect.
        </p>
        <Button asChild variant="outline" className="mt-6">
          <Link href="/workspace/projects">Back to project registry</Link>
        </Button>
      </div>
    </div>
  );
}
