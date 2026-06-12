"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  MessageSquareText,
  Settings,
  LogOut,
} from "lucide-react";

import { BrandMark } from "@/components/brand-mark";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

const navItems = [
  { href: "/workspace", label: "Dashboard", icon: LayoutDashboard },
  { href: "/workspace/projects", label: "Projects", icon: FolderKanban },
  { href: "/workspace/prompts", label: "Prompts", icon: MessageSquareText },
  { href: "/workspace/docs", label: "Docs", icon: FileText },
  { href: "/workspace/settings", label: "Settings", icon: Settings },
] as const;

export function WorkspaceNav() {
  const pathname = usePathname();
  const router = useRouter();

  const signOut = async () => {
    await authClient.signOut();
    router.push("/sign-in");
  };

  const navLinks = navItems.map((item) => {
    const isActive =
      item.href === "/workspace"
        ? pathname === "/workspace"
        : pathname.startsWith(item.href);
    const Icon = item.icon;

    return (
      <Link
        key={item.href}
        href={item.href}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "flex shrink-0 items-center gap-3 rounded-md px-3 py-2 font-mono text-xs uppercase tracking-[0.1em] transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          isActive ? "bg-accent text-foreground" : "text-muted-foreground",
        )}
      >
        <Icon className="size-3.5 shrink-0" />
        {item.label}
      </Link>
    );
  });

  return (
    <>
      <aside className="sticky top-0 hidden h-screen w-56 shrink-0 flex-col border-r border-grid-line bg-card/40 md:flex">
        <div className="flex h-16 shrink-0 items-center gap-2.5 border-b border-grid-line px-4">
          <WorkspaceBrand />
        </div>
        <nav
          className="min-h-0 flex-1 space-y-1 overflow-y-auto px-3 py-4"
          aria-label="Workspace"
        >
          {navLinks}
        </nav>
        <div className="shrink-0 border-t border-grid-line p-3">
          <SignOutButton onSignOut={signOut} />
        </div>
      </aside>

      <header className="sticky top-0 z-20 border-b border-grid-line bg-card/95 backdrop-blur md:hidden">
        <div className="flex h-16 items-center justify-between gap-3 px-4">
          <WorkspaceBrand />
          <SignOutButton onSignOut={signOut} className="w-auto shrink-0" />
        </div>
        <nav
          className="flex gap-1 overflow-x-auto px-3 pb-3"
          aria-label="Workspace"
        >
          {navLinks}
        </nav>
      </header>
    </>
  );
}

function WorkspaceBrand() {
  return (
    <Link
      href="/workspace"
      className="inline-flex min-w-0 items-center gap-2.5 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label="Aredir Labs workspace"
    >
      <BrandMark size="md" />
      <span className="truncate font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground">
        Workspace
      </span>
    </Link>
  );
}

function SignOutButton({
  className,
  label = "Sign Out",
  onSignOut,
}: {
  className?: string;
  label?: string;
  onSignOut: () => Promise<void>;
}) {
  return (
    <button
      type="button"
      onClick={onSignOut}
      className={cn(
        "flex w-full items-center gap-3 rounded-md px-3 py-2 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      <LogOut className="size-3.5 shrink-0" />
      {label}
    </button>
  );
}
