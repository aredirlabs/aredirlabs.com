import Link from "next/link";
import { AlertTriangle, ArrowRight, CircleAlert } from "lucide-react";

import { Eyebrow } from "@/components/eyebrow";
import { ProjectStatusBadge } from "@/components/workspace/project-status-badge";
import { getDailyOperatingExperience } from "@/lib/workspace/queries";

export const dynamic = "force-dynamic";

export default async function WorkspacePage() {
  let experience: Awaited<ReturnType<typeof getDailyOperatingExperience>> | null = null;
  let error: string | null = null;

  try {
    experience = await getDailyOperatingExperience();
  } catch (caught) {
    error = caught instanceof Error ? caught.message : "Failed to load workspace data";
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10 sm:px-10 sm:py-14">
      <header className="mb-12 max-w-2xl">
        <Eyebrow>Workspace</Eyebrow>
        <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          Your work, in context.
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Continue the work that is already underway, then move to what needs care.
        </p>
      </header>

      {error ? (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="size-5 text-destructive" />
            <div>
              <h2 className="font-semibold text-destructive">Workspace unavailable</h2>
              <p className="mt-1 text-sm text-muted-foreground">Could not load workspace data. Check that the database is available and configured correctly.</p>
            </div>
          </div>
        </div>
      ) : experience ? (
        <div className="space-y-12">
          <section aria-labelledby="continue-heading">
            <div className="mb-4 flex items-baseline justify-between gap-4">
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground">Current focus</p>
                <h2 id="continue-heading" className="mt-1 font-heading text-xl font-semibold">Continue</h2>
              </div>
              {experience.continuation ? <span className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-muted-foreground">Engineering Work</span> : null}
            </div>

            {experience.continuation ? (
              <Link href={`/workspace/projects/${experience.continuation.projectSlug}/engineering-work/${experience.continuation.id}`} className="group block rounded-xl border border-primary/30 bg-card p-6 shadow-sm transition-colors hover:border-primary/60 hover:bg-accent/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-8">
                <p className="text-sm text-muted-foreground">{experience.continuation.projectName}</p>
                <h3 className="mt-2 font-heading text-2xl font-semibold tracking-tight">{experience.continuation.title}</h3>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">{experience.continuation.summary}</p>
                <div className="mt-6 border-l-2 border-primary/60 pl-4">
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-muted-foreground">Next action</p>
                  <p className="mt-1 font-medium">{experience.continuation.currentNextAction}</p>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">Open Engineering Work <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" /></span>
              </Link>
            ) : experience.activeProjects[0] ? (
              <Link href={`/workspace/projects/${experience.activeProjects[0].slug}`} className="group block rounded-xl border border-primary/30 bg-card p-6 transition-colors hover:border-primary/60 hover:bg-accent/20 sm:p-8">
                <p className="text-sm text-muted-foreground">Active project</p>
                <h3 className="mt-2 font-heading text-2xl font-semibold">{experience.activeProjects[0].name}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{experience.activeProjects[0].nextStep ?? experience.activeProjects[0].currentFocus ?? "Open the project to review its current work."}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">Open project <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" /></span>
              </Link>
            ) : (
              <div className="rounded-xl border border-dashed border-border bg-card/50 p-8"><p className="font-medium">No active work yet</p><p className="mt-1 text-sm text-muted-foreground">Projects will appear here when work is underway.</p></div>
            )}
          </section>

          <div className="grid gap-10 border-t border-border pt-10 lg:grid-cols-[1.1fr_0.9fr]">
            <section aria-labelledby="attention-heading">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground">Requires attention</p>
              <h2 id="attention-heading" className="mt-1 font-heading text-xl font-semibold">What needs care</h2>
              {experience.attention ? (
                <Link href={`/workspace/projects/${experience.attention.projectSlug}`} className="mt-4 flex gap-3 rounded-lg border border-border p-4 transition-colors hover:border-primary/40 hover:bg-accent/20">
                  <CircleAlert className="mt-0.5 size-4 shrink-0 text-amber-600 dark:text-amber-400" />
                  <span><span className="block font-medium">{experience.attention.title}</span><span className="mt-1 block text-sm text-muted-foreground">{experience.attention.projectName}{experience.attention.detail ? ` · ${experience.attention.detail}` : ""}</span></span>
                </Link>
              ) : <p className="mt-4 text-sm leading-relaxed text-muted-foreground">Nothing is marked blocked. Your current work is clear to continue.</p>}
            </section>

            <section aria-labelledby="active-projects-heading">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground">Project context</p>
              <h2 id="active-projects-heading" className="mt-1 font-heading text-xl font-semibold">Active projects</h2>
              <div className="mt-4 divide-y divide-border border-y border-border">
                {experience.activeProjects.length > 0 ? experience.activeProjects.map((project) => <Link key={project.id} href={`/workspace/projects/${project.slug}`} className="block py-3 transition-colors hover:text-primary"><span className="font-medium">{project.name}</span><span className="mt-1 block text-sm text-muted-foreground line-clamp-1">{project.currentFocus ?? project.nextStep ?? "View project context"}</span></Link>) : <p className="py-3 text-sm text-muted-foreground">No active projects.</p>}
              </div>
            </section>
          </div>

          {experience.recentProjects.length > 0 ? <section className="border-t border-border pt-10" aria-labelledby="recent-heading">
            <div className="flex items-baseline justify-between gap-4"><div><p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground">Return paths</p><h2 id="recent-heading" className="mt-1 font-heading text-xl font-semibold">Recently active</h2></div><Link href="/workspace/projects" className="text-sm text-muted-foreground hover:text-primary">All projects</Link></div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {experience.recentProjects.map((project) => <Link key={project.id} href={`/workspace/projects/${project.slug}`} className="rounded-lg border border-border p-4 transition-colors hover:border-primary/40 hover:bg-accent/20"><div className="flex items-center justify-between gap-3"><span className="font-medium">{project.name}</span><ProjectStatusBadge status={project.status as "active" | "testing" | "paused" | "planning" | "archived"} /></div>{project.currentFocus ? <p className="mt-2 text-sm text-muted-foreground line-clamp-1">{project.currentFocus}</p> : null}</Link>)}
            </div>
          </section> : null}
        </div>
      ) : null}
    </div>
  );
}
