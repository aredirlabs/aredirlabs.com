"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";

const projectNavItems = [
  {
    label: "Overview",
    matches: (slug: string, pathname: string) =>
      pathname === `/workspace/projects/${slug}`,
    href: (slug: string) => `/workspace/projects/${slug}`,
  },
  {
    label: "Engineering Work",
    matches: (slug: string, pathname: string) =>
      pathname.startsWith(`/workspace/projects/${slug}/engineering-work`),
    href: (slug: string) => `/workspace/projects/${slug}/engineering-work`,
  },
] as const;

export function ProjectContextRail({
  projectSlug,
  projectName,
  status,
  stage,
}: {
  projectSlug: string;
  projectName: string | null;
  status: string | null;
  stage: string | null;
}) {
  const pathname = usePathname();

  return (
    <nav
      className="sticky top-12 hidden h-[calc(100vh-3rem)] w-56 shrink-0 flex-col border-r border-grid-line bg-card/40 lg:flex"
      aria-label="Project"
    >
      <div className="border-b border-grid-line px-4 py-4">
        <Link
          href={`/workspace/projects/${projectSlug}`}
          className="text-sm font-medium transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {projectName ?? projectSlug}
        </Link>
        {(status || stage) && (
          <div className="mt-2 flex flex-wrap gap-2">
            {status && (
              <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-muted-foreground">
                {status}
              </span>
            )}
            {stage && (
              <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-muted-foreground">
                {stage}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-2 py-3">
        <ul className="space-y-1">
          {projectNavItems.map((item) => {
            const isActive = item.matches(projectSlug, pathname);
            return (
              <li key={item.label}>
                <Link
                  href={item.href(projectSlug)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex items-center rounded-md px-3 py-2 text-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive
                      ? "bg-accent font-medium text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="shrink-0 border-t border-grid-line p-3">
        <Link
          href={`/workspace/projects/${projectSlug}/engineering-work/new`}
          className="inline-flex w-full items-center justify-center gap-1.5 rounded-md border border-border px-3 py-2 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Plus className="size-3.5" />
          New Engineering Work
        </Link>
      </div>
    </nav>
  );
}
