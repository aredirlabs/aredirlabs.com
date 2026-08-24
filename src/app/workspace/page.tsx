import Link from "next/link";
import { ArrowRight, CircleAlert } from "lucide-react";

import { FailureState } from "@/components/ui/failure-state";
import { Eyebrow } from "@/components/eyebrow";
import { getDailyOperatingExperience } from "@/lib/workspace/queries";
import type { WorkspaceContinuationCandidate } from "@/lib/workspace/workspace-operational";

export const dynamic = "force-dynamic";

const label = (value: string) =>
  value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

function Position({ candidate }: { candidate: WorkspaceContinuationCandidate }) {
  return (
    <p className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-muted-foreground">
      {label(candidate.artifact.state)} · {label(candidate.artifact.workflow)} workflow
    </p>
  );
}

function SingleContinuation({ candidate }: { candidate: WorkspaceContinuationCandidate }) {
  return (
    <Link
      href={candidate.destination}
      className="group block rounded-xl border border-primary/30 bg-card p-6 shadow-sm transition-colors hover:border-primary/60 hover:bg-accent/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-8"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
        <p className="text-sm font-medium text-primary">{candidate.project.name}</p>
        <Position candidate={candidate} />
      </div>
      <h3 className="mt-3 font-heading text-2xl font-semibold tracking-tight">
        {candidate.artifact.title}
      </h3>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        {candidate.purpose}
      </p>
      <div className="mt-6 border-l-2 border-primary/60 pl-4">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-muted-foreground">
          Next action
        </p>
        <p className="mt-1 font-medium">{candidate.nextAction}</p>
      </div>
      {candidate.defectContext ? (
        <div className="mt-5 border-t border-border pt-5">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-muted-foreground">
            Investigation context
          </p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {candidate.defectContext.nextInvestigation}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Validation target: {candidate.defectContext.validationTarget}
          </p>
        </div>
      ) : null}
      <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
        Why this can continue: {candidate.reason}
      </p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
        Open Engineering Work
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

function AmbiguousContinuation({
  candidates,
  total,
}: {
  candidates: WorkspaceContinuationCandidate[];
  total: number;
}) {
  const additional = total - candidates.length;

  return (
    <div>
      <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Several valid things can continue. Current engineering state does not justify choosing one
        on your behalf.
      </p>
      <div className="mt-5 divide-y divide-border border-y border-border">
        {candidates.map((candidate) => (
          <Link
            key={candidate.artifact.id}
            href={candidate.destination}
            className="group block py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-2"
          >
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div className="min-w-0">
                <p className="text-sm font-medium text-primary">{candidate.project.name}</p>
                <h3 className="mt-1 font-heading text-lg font-semibold">
                  {candidate.artifact.title}
                </h3>
                <Position candidate={candidate} />
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                  {candidate.purpose}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Next:</span> {candidate.nextAction}
                </p>
                {candidate.defectContext ? (
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    Investigation: {candidate.defectContext.nextInvestigation}
                  </p>
                ) : null}
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Why available: {candidate.reason}
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-primary">
                Continue
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
      {additional > 0 ? (
        <p className="mt-3 text-xs text-muted-foreground">
          {additional} additional valid {additional === 1 ? "continuation exists" : "continuations exist"}.
          Open an active Project for more context.
        </p>
      ) : null}
    </div>
  );
}

export default async function WorkspacePage() {
  let experience: Awaited<ReturnType<typeof getDailyOperatingExperience>> | null = null;
  let error: string | null = null;

  try {
    experience = await getDailyOperatingExperience();
  } catch (caught) {
    console.error("Workspace load failed:", caught instanceof Error ? caught.message : caught);
    error = caught instanceof Error ? caught.message : "Failed to load workspace data";
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-9 sm:px-10 sm:py-14">
      <header className="mb-10 max-w-2xl sm:mb-12">
        <Eyebrow>Workspace</Eyebrow>
        <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          What should we accomplish now?
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Continue work supported by current engineering state, then review conditions that need
          awareness.
        </p>
      </header>

      {error ? (
        <FailureState
          title="Workspace unavailable"
          description="An unexpected error occurred while loading workspace data. Please try again or contact support if the issue persists."
          failureClass="unknown"
        />
      ) : experience ? (
        <div className="space-y-10 sm:space-y-12">
          <section aria-labelledby="continue-heading">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground">
              Meaningful continuation
            </p>
            <h2 id="continue-heading" className="mt-1 font-heading text-xl font-semibold">
              {experience.continuation.mode === "ambiguous" ? "Available continuations" : "Continue"}
            </h2>
            <div className="mt-4">
              {experience.continuation.mode === "single" ? (
                <SingleContinuation candidate={experience.continuation.candidates[0]} />
              ) : experience.continuation.mode === "ambiguous" ? (
                <AmbiguousContinuation
                  candidates={experience.continuation.candidates}
                  total={experience.continuation.totalCandidates}
                />
              ) : (
                <div className="border-y border-border py-6 sm:py-8">
                  <p className="font-medium">There is no clearly justified continuation right now.</p>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    Proposed and completed work remain available in their Projects, but current state
                    does not support presenting either as active continuation.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3">
                    <Link href="/workspace/projects" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                      View Projects <ArrowRight className="size-4" />
                    </Link>
                    {experience.activeProjects[0] ? (
                      <Link href={`/workspace/projects/${experience.activeProjects[0].slug}`} className="text-sm font-medium text-muted-foreground hover:text-primary hover:underline">
                        Open {experience.activeProjects[0].name}
                      </Link>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="border-t border-border pt-10" aria-labelledby="attention-heading">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground">
              Requires awareness
            </p>
            <h2 id="attention-heading" className="mt-1 font-heading text-xl font-semibold">
              Attention
            </h2>
            {experience.attention.items.length > 0 ? (
              <div className="mt-4 divide-y divide-border border-y border-border">
                {experience.attention.items.map((item) => (
                  <Link
                    key={`${item.artifact.kind}-${item.artifact.id}`}
                    href={item.destination}
                    className="flex gap-3 py-4 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-2"
                  >
                    <CircleAlert className="mt-0.5 size-4 shrink-0 text-warning" aria-hidden="true" />
                    <span>
                      <span className="block font-medium">{item.artifact.title}</span>
                      <span className="mt-1 block text-sm text-muted-foreground">
                        {item.project.name} · {item.condition}
                      </span>
                      {item.explanation ? (
                        <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                          {item.explanation}
                        </span>
                      ) : null}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                No supported engineering conditions currently require awareness.
              </p>
            )}
            {experience.attention.total > experience.attention.items.length ? (
              <p className="mt-3 text-xs text-muted-foreground">
                {experience.attention.total - experience.attention.items.length} additional supported
                conditions are available through their Projects.
              </p>
            ) : null}
          </section>

          <section className="border-t border-border pt-10" aria-labelledby="active-projects-heading">
            <div className="flex items-baseline justify-between gap-4">
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground">
                  Project orientation
                </p>
                <h2 id="active-projects-heading" className="mt-1 font-heading text-xl font-semibold">
                  Active projects
                </h2>
              </div>
              <Link href="/workspace/projects" className="text-sm text-muted-foreground hover:text-primary hover:underline">
                All projects
              </Link>
            </div>
            <div className="mt-4 divide-y divide-border border-y border-border">
              {experience.activeProjects.length > 0 ? (
                experience.activeProjects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/workspace/projects/${project.slug}`}
                    className="block py-4 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-2"
                  >
                    <span className="font-medium">{project.name}</span>
                    <span className="mt-1 block text-sm text-muted-foreground line-clamp-2">
                      Open the Project for operational context and structured focus.
                    </span>
                  </Link>
                ))
              ) : (
                <p className="py-4 text-sm text-muted-foreground">No active Projects.</p>
              )}
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}
