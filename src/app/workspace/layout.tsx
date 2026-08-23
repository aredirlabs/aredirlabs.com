import { AuthenticatedThemeProvider } from "@/components/authenticated-theme-provider";
import { WorkspaceNav } from "@/components/workspace/workspace-nav";

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
      <div className="flex min-h-screen flex-col bg-surface-environment text-foreground md:h-screen md:flex-row md:overflow-hidden">
        <WorkspaceNav />
        <main className="min-w-0 flex-1 overflow-auto">{children}</main>
      </div>
    </AuthenticatedThemeProvider>
  );
}
