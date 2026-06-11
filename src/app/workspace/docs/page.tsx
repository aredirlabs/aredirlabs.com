import { Eyebrow } from "@/components/eyebrow";

export default function WorkspaceDocsPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <Eyebrow>Internal Documentation</Eyebrow>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">Docs</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Internal documentation and runbooks for Aredir Labs operations.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: "Onboarding",
            description: "Getting started with the Aredir Labs development environment and workflows.",
          },
          {
            title: "Architecture",
            description: "System architecture decisions, data models, and infrastructure overview.",
          },
          {
            title: "Operations",
            description: "Deployment, monitoring, and incident response runbooks.",
          },
        ].map((doc) => (
          <div
            key={doc.title}
            className="rounded-lg border border-border bg-card p-5 transition-colors hover:bg-accent/50"
          >
            <h2 className="font-heading text-base font-semibold">{doc.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{doc.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
