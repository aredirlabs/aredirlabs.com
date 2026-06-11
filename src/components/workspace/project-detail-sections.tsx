type PlaceholderSectionProps = {
  title: string;
  description: string;
};

function PlaceholderSection({ title, description }: PlaceholderSectionProps) {
  return (
    <section className="rounded-lg border border-border bg-card p-6">
      <h2 className="font-heading text-base font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </section>
  );
}

export function ProjectDetailSections() {
  return (
    <div className="space-y-4">
      <PlaceholderSection
        title="Overview"
        description="High-level project summary and context will appear here."
      />
      <PlaceholderSection
        title="Current Focus"
        description="Active priorities and in-flight work will be tracked here."
      />
      <PlaceholderSection
        title="QA / Release Status"
        description="Release readiness and QA checkpoints will be summarized here."
      />
      <PlaceholderSection
        title="Metrics"
        description="Key product and engineering metrics will be displayed here."
      />
      <PlaceholderSection
        title="Links"
        description="Curated internal and external links will be organized here."
      />
    </div>
  );
}
