import { WorkspaceNav } from "@/components/workspace/workspace-nav";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[100dvh]">
      <WorkspaceNav />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
