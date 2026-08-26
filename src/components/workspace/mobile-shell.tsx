"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useCallback, useEffect } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  MessageSquareText,
  BookOpen,
  Settings,
  Menu,
  X,
  ChevronRight,
  Plus,
} from "lucide-react";

import { AuthenticatedThemeToggle } from "@/components/workspace/authenticated-theme-toggle";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import type { ShellContext } from "@/components/workspace/shell-context";

const globalNavItems = [
  { href: "/workspace", label: "Workspace", icon: LayoutDashboard },
  { href: "/workspace/projects", label: "Projects", icon: FolderKanban },
  { href: "/workspace/docs", label: "Documents", icon: FileText },
  { href: "/workspace/prompts", label: "Prompts", icon: MessageSquareText },
  {
    href: "/workspace/knowledge-assets",
    label: "Knowledge Assets",
    icon: BookOpen,
  },
  { href: "/workspace/settings", label: "Settings", icon: Settings },
] as const;

const projectNavItems = [
  {
    label: "Overview",
    href: (slug: string) => `/workspace/projects/${slug}`,
  },
  {
    label: "Engineering Work",
    href: (slug: string) => `/workspace/projects/${slug}/engineering-work`,
  },
] as const;

function Sheet({
  open,
  onClose,
  children,
  label,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  label: string;
}) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-label={label}
        className="absolute inset-x-0 bottom-0 max-h-[80vh] overflow-y-auto rounded-t-xl bg-card shadow-lg"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-grid-line bg-card/95 px-4 py-3 backdrop-blur">
          <h2 className="text-sm font-semibold">{label}</h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

export function MobileShell({
  context,
  projectName,
  workTitle,
  projectStatus,
  projectStage,
}: {
  context: ShellContext;
  projectName: string | null;
  workTitle: string | null;
  projectStatus: string | null;
  projectStage: string | null;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [globalNavOpen, setGlobalNavOpen] = useState(false);
  const [projectNavOpen, setProjectNavOpen] = useState(false);

  const showProject = context.altitude === "project" || context.altitude === "work";
  const showWork = context.altitude === "work";

  const signOut = useCallback(async () => {
    setGlobalNavOpen(false);
    await authClient.signOut();
    router.push("/sign-in");
  }, [router]);

  return (
    <>
      <header
        className="sticky top-0 z-20 border-b border-grid-line bg-card/95 backdrop-blur md:hidden"
        role="banner"
      >
        <div className="flex h-12 items-center gap-2 px-3">
          <button
            type="button"
            onClick={() => setGlobalNavOpen(true)}
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Open navigation"
          >
            <Menu className="size-4" />
          </button>

          <nav className="min-w-0 flex-1 truncate" aria-label="Orientation">
            <ol className="flex min-w-0 items-center gap-1.5">
              <li>
                <Link
                  href="/workspace"
                  aria-current={!showProject ? "page" : undefined}
                  className={cn(
                    "truncate text-xs transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    !showProject
                      ? "font-medium text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  Workspace
                </Link>
              </li>

              {showProject && context.projectSlug && (
                <>
                  <li aria-hidden="true">
                    <ChevronRight className="size-3 shrink-0 text-muted-foreground" />
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => setProjectNavOpen(true)}
                      className={cn(
                        "truncate text-xs transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        !showWork
                          ? "font-medium text-foreground"
                          : "text-muted-foreground",
                      )}
                    >
                      {projectName ?? context.projectSlug}
                    </button>
                  </li>
                </>
              )}

              {showWork && (
                <>
                  <li aria-hidden="true">
                    <ChevronRight className="size-3 shrink-0 text-muted-foreground" />
                  </li>
                  <li>
                    <span className="truncate text-xs font-medium text-foreground">
                      {workTitle ?? "Engineering Work"}
                    </span>
                  </li>
                </>
              )}
            </ol>
          </nav>

          <div className="flex shrink-0 items-center gap-0.5">
            <AuthenticatedThemeToggle />
            <button
              type="button"
              onClick={signOut}
              className="inline-flex size-8 items-center justify-center rounded-md font-mono text-[0.6rem] uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Sign out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4"
                aria-hidden="true"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" x2="9" y1="12" y2="12" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <Sheet
        open={globalNavOpen}
        onClose={() => setGlobalNavOpen(false)}
        label="Navigation"
      >
        <nav aria-label="Global navigation">
          <ul className="space-y-1">
            {globalNavItems.map((item) => {
              const isActive =
                item.href === "/workspace"
                  ? pathname === "/workspace"
                  : pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setGlobalNavOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isActive
                        ? "bg-accent font-medium text-foreground"
                        : "text-muted-foreground",
                    )}
                  >
                    <Icon className="size-4 shrink-0" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="mt-4 border-t border-border pt-4">
          <button
            type="button"
            onClick={signOut}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4 shrink-0"
              aria-hidden="true"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" x2="9" y1="12" y2="12" />
            </svg>
            Sign Out
          </button>
        </div>
      </Sheet>

      {showProject && context.projectSlug && (
        <Sheet
          open={projectNavOpen}
          onClose={() => setProjectNavOpen(false)}
          label="Project"
        >
          <div className="mb-4">
            <p className="text-sm font-medium">
              {projectName ?? context.projectSlug}
            </p>
            {(projectStatus || projectStage) && (
              <div className="mt-2 flex flex-wrap gap-2">
                {projectStatus && (
                  <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-muted-foreground">
                    {projectStatus}
                  </span>
                )}
                {projectStage && (
                  <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-muted-foreground">
                    {projectStage}
                  </span>
                )}
              </div>
            )}
          </div>
          <nav aria-label="Project navigation">
            <ul className="space-y-1">
              {projectNavItems.map((item) => {
                const href = item.href(context.projectSlug!);
                const isActive = pathname === href;
                return (
                  <li key={item.label}>
                    <Link
                      href={href}
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => setProjectNavOpen(false)}
                      className={cn(
                        "flex items-center rounded-md px-3 py-2.5 text-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
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
          </nav>
          <div className="mt-4 border-t border-border pt-4">
            <Link
              href={`/workspace/projects/${context.projectSlug}/engineering-work/new`}
              onClick={() => setProjectNavOpen(false)}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-md border border-border px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Plus className="size-3.5" />
              New Engineering Work
            </Link>
          </div>
        </Sheet>
      )}
    </>
  );
}
