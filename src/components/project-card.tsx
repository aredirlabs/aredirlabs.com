import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { StatusChip } from "@/components/status-chip";
import type { Project } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  className?: string;
};

export function ProjectCard({ project, className }: ProjectCardProps) {
  const href = `/projects/${project.slug}`;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/40",
        className,
      )}
    >
      {/* machined top edge */}
      <span
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-60 transition-opacity group-hover:opacity-100"
        aria-hidden
      />
      <div className="mb-4 flex items-start justify-between gap-3">
        <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground">
          <Link
            href={href}
            className="rounded-sm outline-none after:absolute after:inset-0 after:content-[''] focus-visible:ring-2 focus-visible:ring-ring"
          >
            {project.name}
          </Link>
        </h3>
        <StatusChip status={project.status} />
      </div>
      <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>
      <span className="relative z-10 mt-6 inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.12em] text-primary">
        Learn more
        <ArrowRight
          className="size-3.5 transition-transform group-hover:translate-x-0.5"
          aria-hidden
        />
      </span>
    </article>
  );
}
