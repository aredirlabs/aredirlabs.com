import assert from "node:assert/strict";
import test from "node:test";

import { and, or, sql } from "drizzle-orm";

import {
  continuationEligibilityPredicate,
  operatingProject,
  eligibleWorkState,
  hasNoCondition,
  hasRequiredWorkText,
} from "./queries";
import {
  workspaceEngineeringWork,
  workspaceEngineeringWorkDefects,
} from "../db/schema";

function flattenSql(obj: any): string {
  if (typeof obj === "string") return obj;
  if (obj === null || obj === undefined) return "";
  if (obj.constructor?.name === "StringChunk" && Array.isArray(obj.value)) {
    return obj.value.join("");
  }
  if (Array.isArray(obj.queryChunks)) {
    return obj.queryChunks.map((c: any) => flattenSql(c)).join("");
  }
  if (Array.isArray(obj)) {
    return obj.map((c: any) => flattenSql(c)).join("");
  }
  if (typeof obj === "object") {
    if (obj.name) return `"${obj.name}"`;
    if (obj.column?.name) return `"${obj.column.name}"`;
    if (obj.config?.name) return `"${obj.config.name}"`;
    const proto = Object.getPrototypeOf(obj);
    if (proto?.constructor?.name) return `<${proto.constructor.name}>`;
  }
  return String(obj);
}

/**
 * Constructs the August 7 broken predicate: the Defect completeness OR
 * as a raw SQL template literal without Drizzle or() grouping.
 * Uses the identical exported production predicates for all non-Defect clauses.
 */
function brokenAugust7Predicate() {
  const brokenDefectContext = sql<boolean>`
    ${workspaceEngineeringWork.workflow} <> 'defect'
    OR (
      ${workspaceEngineeringWorkDefects.engineeringWorkId} IS NOT NULL
      AND btrim(${workspaceEngineeringWorkDefects.observedBehavior}) <> ''
      AND btrim(${workspaceEngineeringWorkDefects.expectedBehavior}) <> ''
      AND btrim(${workspaceEngineeringWorkDefects.reproductionSteps}) <> ''
      AND btrim(${workspaceEngineeringWorkDefects.environment}) <> ''
      AND btrim(${workspaceEngineeringWorkDefects.evidence}) <> ''
      AND btrim(${workspaceEngineeringWorkDefects.nextInvestigation}) <> ''
      AND btrim(${workspaceEngineeringWorkDefects.validationTarget}) <> ''
    )
  `;
  return and(operatingProject, eligibleWorkState, hasNoCondition, hasRequiredWorkText, brokenDefectContext)!;
}

test("Production continuation predicate has the OR parenthesized inside the AND group", () => {
  const sql = flattenSql(continuationEligibilityPredicate());

  assert.match(
    sql,
    /and\s*\(\s*\n?\s*"workflow"\s*<>\s*'defect'\s+or\s/m,
    "Production predicate must have 'AND (' grouping the OR clause",
  );
});

test("Production continuation predicate structurally contains the OR inside the AND group before defect field checks", () => {
  const sql = flattenSql(continuationEligibilityPredicate());

  assert.match(
    sql,
    /and\s*\([^)]*or\s*\n?\s*"engineering_work_id"\s+IS\s+NOT\s+NULL/m,
    "Production predicate must contain the OR inside the AND group before the defect field checks",
  );
});

test("August 7 broken predicate lacks the AND-group parenthesization (regression guard)", () => {
  const sql = flattenSql(brokenAugust7Predicate());

  assert.doesNotMatch(
    sql,
    /and\s*\(\s*\n?\s*"workflow"\s*<>\s*'defect'\s+or\s/m,
    "August 7 broken predicate must NOT have the AND-group parenthesization",
  );
});

test("August 7 broken predicate places OR at the same precedence as the outer AND", () => {
  const sql = flattenSql(brokenAugust7Predicate());

  assert.doesNotMatch(
    sql,
    /and\s*\([^)]*or\s*\n?\s*"engineering_work_id"\s+IS\s+NOT\s+NULL/m,
    "August 7 broken predicate must NOT have the OR inside the AND group",
  );
});
