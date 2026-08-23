"use client";

import {
  createContext,
  useContext,
  useLayoutEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import {
  AUTHENTICATED_THEME_STORAGE_KEY,
  PUBLIC_THEME_STORAGE_KEY,
  resolveAuthenticatedTheme,
  resolvePublicTheme,
  type Theme,
} from "@/lib/theme-preference";

const ThemeContext = createContext<Theme>("dark");

export function useAuthenticatedTheme() {
  return useContext(ThemeContext);
}

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

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

function readPreference(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
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

function persistAuthPreference(theme: Theme) {
  try {
    window.localStorage.setItem(AUTHENTICATED_THEME_STORAGE_KEY, theme);
  } catch {
    // localStorage unavailable — preference is session-only
  }
}

/**
 * AuthenticatedThemeProvider manages the dark theme as the default for
 * authenticated routes.
 *
 * Initial document loads are handled before hydration by the pathname-aware
 * root initializer. This layout effect handles client transitions before the
 * browser paints the newly committed environment.
 *
 * Uses a SEPARATE localStorage key ("aredir-auth-theme") from the
 * public site ("aredir-theme") to prevent authenticated navigation
 * from overwriting public theme preference.
 */
export function AuthenticatedThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  useLayoutEffect(() => {
    applyTheme(
      resolveAuthenticatedTheme(
        readPreference(AUTHENTICATED_THEME_STORAGE_KEY),
      ),
    );

    // Restore the independently governed public theme on unmount.
    return () => {
      applyTheme(
        resolvePublicTheme(
          readPreference(PUBLIC_THEME_STORAGE_KEY),
          systemPrefersDark(),
        ),
      );
    };
  }, []);

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

/**
 * Toggle theme for the authenticated environment.
 * Writes to the auth-specific storage key.
 */
export function toggleAuthenticatedTheme() {
  const isDark = document.documentElement.classList.contains("dark");
  const theme = isDark ? "light" : "dark";
  applyTheme(theme);
  persistAuthPreference(theme);
}
