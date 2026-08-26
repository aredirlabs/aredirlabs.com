"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

export type ShellAltitude = "workspace" | "project" | "work";

export type ShellContext = {
  altitude: ShellAltitude;
  projectSlug: string | null;
  workId: string | null;
};

const PROJECT_SEGMENT = "projects";
const EW_SEGMENT = "engineering-work";

function resolveAltitude(
  segments: string[],
): { altitude: ShellAltitude; projectSlug: string | null; workId: string | null } {
  const projectsIdx = segments.indexOf(PROJECT_SEGMENT);

  if (projectsIdx === -1) {
    return { altitude: "workspace", projectSlug: null, workId: null };
  }

  const slug = segments[projectsIdx + 1] ?? null;
  if (!slug) {
    return { altitude: "workspace", projectSlug: null, workId: null };
  }

  const ewIdx = segments.indexOf(EW_SEGMENT, projectsIdx);
  if (ewIdx === -1) {
    return { altitude: "project", projectSlug: slug, workId: null };
  }

  const workId = segments[ewIdx + 1] ?? null;
  if (!workId) {
    return { altitude: "project", projectSlug: slug, workId: null };
  }

  return { altitude: "work", projectSlug: slug, workId };
}

export function useShellContext(): ShellContext {
  const pathname = usePathname();

  return useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);

    if (segments[0] !== "workspace") {
      return { altitude: "workspace", projectSlug: null, workId: null };
    }

    const inner = segments.slice(1);
    return resolveAltitude(inner);
  }, [pathname]);
}
