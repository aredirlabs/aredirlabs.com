import { Eyebrow } from "@/components/eyebrow";

export default function WorkspaceSettingsPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <Eyebrow>Configuration</Eyebrow>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">Settings</h1>
      </div>

      <div className="space-y-6">
        <section className="rounded-lg border border-border bg-card p-6">
          <h2 className="font-heading text-base font-semibold">Profile</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Account settings will be available in a future update.
          </p>
        </section>

        <section className="rounded-lg border border-border bg-card p-6">
          <h2 className="font-heading text-base font-semibold">Workspace</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Workspace preferences will be available in a future update.
          </p>
        </section>
      </div>
    </div>
  );
}
