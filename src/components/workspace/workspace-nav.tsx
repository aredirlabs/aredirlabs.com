"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";

import { BrandMark } from "@/components/brand-mark";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

const navItems = [
  { href: "/workspace", label: "Dashboard", icon: LayoutDashboard },
  { href: "/workspace/projects", label: "Projects", icon: FolderKanban },
  { href: "/workspace/docs", label: "Docs", icon: FileText },
  { href: "/workspace/settings", label: "Settings", icon: Settings },
] as const;

export function WorkspaceNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className="flex w-56 flex-col border-r border-grid-line bg-card/40">
      <div className="flex h-16 items-center gap-2.5 border-b border-grid-line px-4">
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
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4" aria-label="Workspace">
        {navItems.map((item) => {
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
                "flex items-center gap-3 rounded-md px-3 py-2 font-mono text-xs uppercase tracking-[0.1em] transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isActive
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground",
              )}
            >
              <Icon className="size-3.5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-grid-line p-3">
        <button
          type="button"
          onClick={async () => {
            await authClient.signOut();
            router.push("/sign-in");
          }}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <LogOut className="size-3.5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
