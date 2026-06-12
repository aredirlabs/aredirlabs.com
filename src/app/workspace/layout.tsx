import { WorkspaceNav } from "@/components/workspace/workspace-nav";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col md:h-screen md:flex-row md:overflow-hidden">
      <WorkspaceNav />
      <main className="min-w-0 flex-1 overflow-auto">{children}</main>
    </div>
  );
}
