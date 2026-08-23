import type { OperationalRole } from "@/components/ui/state-label";
import type { EngineeringWorkState } from "@/lib/workspace/engineering-work";
import type { WorkspaceProjectStatus } from "@/lib/workspace/project-status";

/**
 * Semantic operational-role mapping.
 *
 * Per PROJECT-UX-004 §9:
 * "A role is a presentation family, not a lifecycle state."
 * "Exactly one operational axis owns strong state color within a region."
 *
 * This module provides a reusable mechanism for mapping domain values
 * to visual operational roles (actionable, attention, settled, inert, neutral).
 * It does NOT create a new business-domain state machine.
 */

export function getEngineeringWorkStateRole(
  state: EngineeringWorkState,
): OperationalRole {
  switch (state) {
    case "active":
    case "in_review":
      return "actionable";
    case "completed":
    case "closed":
    case "cancelled":
      return "settled";
    case "proposed":
    case "superseded":
      return "inert";
    default:
      return "neutral";
  }
}

export function getProjectStatusRole(
  status: WorkspaceProjectStatus,
): OperationalRole {
  switch (status) {
    case "active":
    case "testing":
      return "actionable";
    case "planning":
    case "paused":
    case "archived":
      return "inert";
    default:
      return "neutral";
  }
}

/**
 * Maps reference status to operational role.
 * Per PROJECT-UX-004 §9:
 * "expected is actionable only where evidence is required;
 * elsewhere show neutral."
 * We use neutral for expected since we can't determine context here.
 */
export function getReferenceStatusRole(
  status: "expected" | "verified" | "stale" | "missing",
): OperationalRole {
  switch (status) {
    case "stale":
    case "missing":
      return "attention";
    case "verified":
      return "settled";
    case "expected":
      return "neutral";
    default:
      return "neutral";
  }
}

/**
 * Maps milestone status to operational role.
 */
export function getMilestoneStatusRole(
  status: "active" | "blocked" | "completed" | "planned" | "deferred",
): OperationalRole {
  switch (status) {
    case "active":
      return "actionable";
    case "blocked":
      return "attention";
    case "completed":
      return "settled";
    case "planned":
    case "deferred":
      return "inert";
    default:
      return "neutral";
  }
}
