import type { Metadata } from "next";

import { OperatingField } from "@/components/prototype/operating-field";
import {
  FIELD_INSTRUMENT_QUERY,
  fieldRouteInitFromParams,
  type FieldRouteInit,
} from "@/lib/prototype/operating-field";

import { readFieldSnapshot } from "./snapshot";

/**
 * EXPERIMENTAL PROTOTYPE — Aredir Operating Field.
 *
 * A disposable experience experiment for the authenticated operating
 * environment. It renders as a full-viewport surface above the canonical
 * authenticated shell so the spatial concept can be evaluated without altering
 * the production shell, routes, or domain behaviour.
 *
 * The optional `project` / `work` / `instrument` query parameters are the
 * smallest presentation-route contract for the disposable Field Instrument:
 * they let a cold load or a full refresh reconstruct the altitude and the open
 * instrument. The client mirrors the same contract into history for Back /
 * Forward. This is not a general routing system.
 *
 * Lives under /workspace so the existing proxy session guard applies.
 * Delete this directory, src/components/prototype, and
 * src/lib/prototype to remove the experiment.
 */

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Operating Field — experimental",
  robots: { index: false, follow: false },
};

function single(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function OperatingFieldPage({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) {
  const [snapshot, params] = await Promise.all([readFieldSnapshot(), searchParams]);

  const routeInit: FieldRouteInit = fieldRouteInitFromParams({
    project: single(params.project),
    work: single(params.work),
    [FIELD_INSTRUMENT_QUERY]: single(params[FIELD_INSTRUMENT_QUERY]),
  });

  return <OperatingField snapshot={snapshot} routeInit={routeInit} />;
}