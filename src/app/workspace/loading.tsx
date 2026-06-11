import { Loader2 } from "lucide-react";

export default function WorkspaceLoading() {
  return (
    <div className="flex min-h-[60dvh] items-center justify-center">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="size-5 animate-spin" />
        <span className="font-mono text-xs uppercase tracking-[0.1em]">
          Loading…
        </span>
      </div>
    </div>
  );
}
