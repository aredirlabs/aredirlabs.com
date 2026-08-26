import { AuthenticatedThemeProvider } from "@/components/authenticated-theme-provider";
import { AuthenticatedShell } from "@/components/workspace/authenticated-shell";

/**
 * Workspace layout.
 *
 * Direct-entry theme initialization is handled by the pathname-aware root
 * beforeInteractive initializer. AuthenticatedThemeProvider handles client
 * transitions with a layout effect. This layout does NOT contain
 * an inline script element — React server components do not execute scripts
 * on client-side navigation.
 */
export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthenticatedThemeProvider>
      <AuthenticatedShell>{children}</AuthenticatedShell>
    </AuthenticatedThemeProvider>
  );
}
