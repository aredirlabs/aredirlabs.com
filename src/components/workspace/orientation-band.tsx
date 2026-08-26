"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { AuthenticatedThemeToggle } from "@/components/workspace/authenticated-theme-toggle";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import type { ShellContext } from "@/components/workspace/shell-context";

function AncestrySeparator() {
  return (
    <ChevronRight
      className="size-3 shrink-0 text-muted-foreground"
      aria-hidden="true"
    />
  );
}

function AncestryLink({
  href,
  children,
  isCurrent,
}: {
  href: string;
  children: React.ReactNode;
  isCurrent?: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={isCurrent ? "page" : undefined}
      className={cn(
        "truncate text-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        isCurrent
          ? "font-medium text-foreground"
          : "text-muted-foreground",
      )}
    >
      {children}
    </Link>
  );
}

function SignOutButton() {
  const router = useRouter();

  const signOut = async () => {
    await authClient.signOut();
    router.push("/sign-in");
  };

  return (
    <button
      type="button"
      onClick={signOut}
      className="inline-flex size-8 shrink-0 items-center justify-center rounded-md font-mono text-[0.65rem] uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
  );
}

export function OrientationBand({
  context,
  projectName,
  workTitle,
}: {
  context: ShellContext;
  projectName: string | null;
  workTitle: string | null;
}) {
  const showProject = context.altitude === "project" || context.altitude === "work";
  const showWork = context.altitude === "work";

  return (
    <header
      className="sticky top-0 z-10 flex h-12 shrink-0 items-center gap-3 border-b border-grid-line bg-card/95 px-4 backdrop-blur"
      role="banner"
    >
      <nav
        className="min-w-0 flex-1 truncate"
        aria-label="Orientation"
      >
        <ol className="flex min-w-0 items-center gap-2">
          <li>
            <AncestryLink href="/workspace" isCurrent={!showProject}>
              Workspace
            </AncestryLink>
          </li>

          {showProject && context.projectSlug && (
            <>
              <li aria-hidden="true">
                <AncestrySeparator />
              </li>
              <li>
                <AncestryLink
                  href={`/workspace/projects/${context.projectSlug}`}
                  isCurrent={!showWork}
                >
                  {projectName ?? context.projectSlug}
                </AncestryLink>
              </li>
            </>
          )}

          {showWork && context.workId && (
            <>
              <li aria-hidden="true">
                <AncestrySeparator />
              </li>
              <li>
                <span className="truncate text-sm font-medium text-foreground">
                  {workTitle ?? "Engineering Work"}
                </span>
              </li>
            </>
          )}
        </ol>
      </nav>

      <div className="flex shrink-0 items-center gap-1">
        <AuthenticatedThemeToggle />
        <SignOutButton />
      </div>
    </header>
  );
}
