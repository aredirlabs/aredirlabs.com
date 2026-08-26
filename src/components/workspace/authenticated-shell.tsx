"use client";

import { useEffect, useState } from "react";

import { ActivityRail } from "@/components/workspace/activity-rail";
import { OrientationBand } from "@/components/workspace/orientation-band";
import { ProjectContextRail } from "@/components/workspace/project-context-rail";
import { MobileShell } from "@/components/workspace/mobile-shell";
import {
  useShellContext,
  type ShellContext,
} from "@/components/workspace/shell-context";
import {
  getProjectIdentityBySlug,
  getWorkIdentityById,
  type ProjectIdentity,
  type WorkIdentity,
} from "@/components/workspace/shell-identity-actions";

function useResolvedIdentity(context: ShellContext) {
  const [projectIdentity, setProjectIdentity] =
    useState<ProjectIdentity>(null);
  const [workIdentity, setWorkIdentity] = useState<WorkIdentity>(null);

  useEffect(() => {
    let cancelled = false;

    async function resolve() {
      if (!context.projectSlug) {
        if (!cancelled) {
          setProjectIdentity(null);
          setWorkIdentity(null);
        }
        return;
      }

      try {
        const [proj, work] = await Promise.all([
          getProjectIdentityBySlug(context.projectSlug),
          context.workId
            ? getWorkIdentityById(context.projectSlug, context.workId)
            : Promise.resolve(null),
        ]);
        if (!cancelled) {
          setProjectIdentity(proj);
          setWorkIdentity(work);
        }
      } catch {
        if (!cancelled) {
          setProjectIdentity(null);
          setWorkIdentity(null);
        }
      }
    }

    resolve();

    return () => {
      cancelled = true;
    };
  }, [context.projectSlug, context.workId]);

  return { projectIdentity, workIdentity };
}

export function AuthenticatedShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const context = useShellContext();
  const { projectIdentity, workIdentity } = useResolvedIdentity(context);

  const showProjectRail =
    context.altitude === "project" || context.altitude === "work";

  return (
    <div className="flex min-h-screen flex-col bg-surface-environment text-foreground md:h-screen md:flex-row md:overflow-hidden">
      <ActivityRail />

      <div className="flex min-w-0 flex-1 flex-col md:h-screen md:overflow-hidden">
        <div className="md:hidden">
          <MobileShell
            context={context}
            projectName={projectIdentity?.name ?? null}
            workTitle={workIdentity?.title ?? null}
            projectStatus={projectIdentity?.status ?? null}
            projectStage={projectIdentity?.stage ?? null}
          />
        </div>

        <div className="hidden md:block">
          <OrientationBand
            context={context}
            projectName={projectIdentity?.name ?? null}
            workTitle={workIdentity?.title ?? null}
          />
        </div>

        <div className="flex flex-1 md:min-h-0 md:overflow-hidden">
          {showProjectRail && context.projectSlug && (
            <div className="hidden lg:block">
              <ProjectContextRail
                projectSlug={context.projectSlug}
                projectName={projectIdentity?.name ?? null}
                status={projectIdentity?.status ?? null}
                stage={projectIdentity?.stage ?? null}
              />
            </div>
          )}

          <main className="min-w-0 flex-1 md:overflow-auto">{children}</main>
        </div>
      </div>
    </div>
  );
}
