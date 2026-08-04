import Link from "next/link";
import { FileQuestion } from "lucide-react";

export default function EngineeringWorkNotFound() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center p-8">
      <div className="max-w-md text-center">
        <FileQuestion className="mx-auto size-8 text-muted-foreground" />
        <h1 className="mt-4 text-xl font-semibold tracking-tight">Engineering Work not found</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">This work item does not exist in the selected project.</p>
        <Link href="/workspace/projects" className="mt-6 inline-flex font-mono text-xs uppercase tracking-[0.1em] text-primary underline-offset-4 hover:underline">Project registry</Link>
      </div>
    </div>
  );
}
