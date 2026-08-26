"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

import { toggleAuthenticatedTheme } from "@/components/authenticated-theme-provider";
import { cn } from "@/lib/utils";

function subscribeToTheme(onStoreChange: () => void) {
  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getThemeSnapshot() {
  return document.documentElement.classList.contains("dark")
    ? ("dark" as const)
    : ("light" as const);
}

function getServerThemeSnapshot() {
  return "dark" as const;
}

export function AuthenticatedThemeToggle({
  className,
}: {
  className?: string;
}) {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleAuthenticatedTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "inline-flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      {isDark ? (
        <Sun className="size-4" aria-hidden="true" />
      ) : (
        <Moon className="size-4" aria-hidden="true" />
      )}
    </button>
  );
}
