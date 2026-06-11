"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

type WorkspaceAccessNavProps = {
  isAuthenticated: boolean;
};

const actionClassName =
  "font-mono text-xs uppercase tracking-[0.1em]";

export function WorkspaceAccessNav({
  isAuthenticated,
}: WorkspaceAccessNavProps) {
  const router = useRouter();

  async function handleSignOut() {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  }

  if (!isAuthenticated) {
    return (
      <Button
        asChild
        size="sm"
        variant="outline"
        className={actionClassName}
      >
        <Link href="/sign-in">Sign In</Link>
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-0.5">
      <Button
        asChild
        size="sm"
        variant="outline"
        className={actionClassName}
      >
        <Link href="/workspace">Workspace</Link>
      </Button>
      <details className="relative hidden sm:block">
        <summary className="flex size-7 cursor-pointer list-none items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
          <UserRound className="size-3.5" />
          <span className="sr-only">Account menu</span>
        </summary>
        <div className="absolute right-0 z-50 mt-1 min-w-36 rounded-md border border-border bg-background p-1 shadow-md">
          <Link
            href="/workspace"
            className="block rounded-md px-3 py-2 font-mono text-xs uppercase tracking-[0.1em] text-foreground transition-colors hover:bg-muted"
          >
            Workspace
          </Link>
          <button
            type="button"
            onClick={handleSignOut}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <LogOut className="size-3.5" />
            Sign Out
          </button>
        </div>
      </details>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={handleSignOut}
        aria-label="Sign out"
        className="text-muted-foreground hover:text-foreground sm:hidden"
      >
        <LogOut className="size-3.5" />
      </Button>
    </div>
  );
}
