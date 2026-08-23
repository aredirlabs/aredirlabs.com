"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";
import {
  PUBLIC_THEME_STORAGE_KEY,
  resolvePublicTheme,
} from "@/lib/theme-preference";

function subscribeToTheme(onStoreChange: () => void) {
  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getThemeSnapshot() {
  return document.documentElement.classList.contains("dark");
}

function getServerThemeSnapshot() {
  return false;
}

function subscribeToMounted(onStoreChange: () => void) {
  onStoreChange();
  return () => {};
}

function getMountedSnapshot() {
  return true;
}

function getServerMountedSnapshot() {
  return false;
}

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
  try {
    window.localStorage.setItem(
      PUBLIC_THEME_STORAGE_KEY,
      dark ? "dark" : "light",
    );
  } catch {
    // Storage can be unavailable; the live selection still applies.
  }
}

function readPublicPreference() {
  try {
    return window.localStorage.getItem(PUBLIC_THEME_STORAGE_KEY);
  } catch {
    return null;
  }
}

function systemPrefersDark() {
  try {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  } catch {
    return false;
  }
}

export function ThemeToggle() {
  const isDark = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );
  const mounted = useSyncExternalStore(
    subscribeToMounted,
    getMountedSnapshot,
    getServerMountedSnapshot,
  );

  useEffect(() => {
    const theme = resolvePublicTheme(
      readPublicPreference(),
      systemPrefersDark(),
    );
    applyTheme(theme === "dark");
  }, []);

  function toggleTheme() {
    applyTheme(!document.documentElement.classList.contains("dark"));
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="text-muted-foreground hover:text-foreground"
    >
      {mounted ? (
        isDark ? <Sun className="size-4" /> : <Moon className="size-4" />
      ) : (
        <span className="size-4" aria-hidden />
      )}
    </Button>
  );
}
