import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Project, ProjectStatus } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const statusStyles: Record<ProjectStatus, string> = {
  "Active Build":
    "border-brand-accent/30 bg-brand-accent/10 text-brand-accent",
  "In Development":
    "border-border bg-muted text-muted-foreground",
  Concept: "border-border bg-muted/50 text-muted-foreground",
};

type ProjectCardProps = {
  project: Project;
  className?: string;
};

export function ProjectCard({ project, className }: ProjectCardProps) {
  const href = `/projects/${project.slug}`;

  return (
    <article
      className={cn(
        "group flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-brand-accent/40 hover:bg-card/80",
        className,
      )}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold tracking-tight text-foreground">
          <Link
            href={href}
            className="rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {project.name}
          </Link>
        </h3>
        <span
          className={cn(
            "shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium",
            statusStyles[project.status],
          )}
        >
          {project.status}
        </span>
      </div>
      <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>
      <Link
        href={href}
        className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-brand-accent outline-none transition-colors hover:text-brand-accent/80 focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
      >
        Learn more
        <ArrowRight
          className="size-4 transition-transform group-hover:translate-x-0.5"
          aria-hidden
        />
      </Link>
    </article>
  );
}
