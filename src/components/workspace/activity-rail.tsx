"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  MessageSquareText,
  BookOpen,
  Settings,
} from "lucide-react";

import { BrandMark } from "@/components/brand-mark";
import { cn } from "@/lib/utils";

const navItems = [
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

export function ActivityRail() {
  const pathname = usePathname();

  return (
    <aside
      className="sticky top-0 hidden h-screen w-14 shrink-0 flex-col border-r border-grid-line bg-card/40 md:flex"
      aria-label="Global navigation"
    >
      <div className="flex h-12 shrink-0 items-center justify-center border-b border-grid-line">
        <Link
          href="/workspace"
          className="inline-flex items-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Aredir Labs workspace"
        >
          <BrandMark size="sm" />
        </Link>
      </div>

      <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto px-2 py-3">
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
              aria-label={item.label}
              title={item.label}
              className={cn(
                "flex size-10 items-center justify-center rounded-md transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isActive
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground",
              )}
            >
              <Icon className="size-4 shrink-0" />
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
