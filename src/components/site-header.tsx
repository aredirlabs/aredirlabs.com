import Link from "next/link";
import { headers } from "next/headers";

import { MainNav } from "@/components/main-nav";
import { SiteLogo } from "@/components/site-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { WorkspaceAccessNav } from "@/components/workspace-access-nav";
import { auth } from "@/lib/auth";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  className?: string;
};

export async function SiteHeader({ className }: SiteHeaderProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-grid-line bg-background/70 backdrop-blur-md",
        className,
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
        <SiteLogo />
        <nav className="flex items-center gap-1 sm:gap-2" aria-label="Main">
          <div className="hidden sm:block">
            <MainNav />
          </div>
          <ThemeToggle />
          <Button
            asChild
            size="sm"
            className="ml-1 hidden font-mono text-xs uppercase tracking-[0.1em] sm:inline-flex"
          >
            <Link href="/contact">Contact</Link>
          </Button>
          <WorkspaceAccessNav isAuthenticated={!!session} />
        </nav>
      </div>
      {/* Compact nav for small screens */}
      <div className="border-t border-grid-line px-6 py-2 sm:hidden">
        <MainNav />
      </div>
    </header>
  );
}
