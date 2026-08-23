import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { runInNewContext } from "node:vm";

import {
  AUTHENTICATED_THEME_STORAGE_KEY,
  PUBLIC_THEME_STORAGE_KEY,
  THEME_INITIALIZATION_SCRIPT,
  isAuthenticatedPath,
  resolveAuthenticatedTheme,
  resolvePublicTheme,
  resolveThemeForPath,
} from "@/lib/theme-preference";

/**
 * Visual-system foundation contract tests.
 *
 * Per PROJECT-UX-005 §23:
 * "Prefer behavior/contract tests over brittle pixel snapshots."
 *
 * These tests verify operational-role mapping logic, semantic contracts,
 * theme boundary isolation, and primitive behavior.
 */

// ─── Operational role mapping behavioral tests ─────────────────────────────

describe("operational-role-mapping", () => {
  it("maps Engineering Work states to correct operational roles", async () => {
    const { getEngineeringWorkStateRole } = await import(
      "@/lib/workspace/operational-role-mapping"
    );
    // Actionable
    assert.equal(getEngineeringWorkStateRole("active"), "actionable");
    assert.equal(getEngineeringWorkStateRole("in_review"), "actionable");
    // Settled
    assert.equal(getEngineeringWorkStateRole("completed"), "settled");
    assert.equal(getEngineeringWorkStateRole("closed"), "settled");
    assert.equal(getEngineeringWorkStateRole("cancelled"), "settled");
    // Inert
    assert.equal(getEngineeringWorkStateRole("proposed"), "inert");
    assert.equal(getEngineeringWorkStateRole("superseded"), "inert");
  });

  it("maps Project statuses to correct operational roles", async () => {
    const { getProjectStatusRole } = await import(
      "@/lib/workspace/operational-role-mapping"
    );
    assert.equal(getProjectStatusRole("active"), "actionable");
    assert.equal(getProjectStatusRole("testing"), "actionable");
    assert.equal(getProjectStatusRole("planning"), "inert");
    assert.equal(getProjectStatusRole("paused"), "inert");
    assert.equal(getProjectStatusRole("archived"), "inert");
  });

  it("maps reference statuses to correct operational roles", async () => {
    const { getReferenceStatusRole } = await import(
      "@/lib/workspace/operational-role-mapping"
    );
    assert.equal(getReferenceStatusRole("stale"), "attention");
    assert.equal(getReferenceStatusRole("missing"), "attention");
    assert.equal(getReferenceStatusRole("verified"), "settled");
    assert.equal(getReferenceStatusRole("expected"), "neutral");
  });

  it("maps milestone statuses to correct operational roles", async () => {
    const { getMilestoneStatusRole } = await import(
      "@/lib/workspace/operational-role-mapping"
    );
    assert.equal(getMilestoneStatusRole("active"), "actionable");
    assert.equal(getMilestoneStatusRole("blocked"), "attention");
    assert.equal(getMilestoneStatusRole("completed"), "settled");
    assert.equal(getMilestoneStatusRole("planned"), "inert");
    assert.equal(getMilestoneStatusRole("deferred"), "inert");
  });

  it("all mapping functions return only valid OperationalRole values", async () => {
    const mod = await import("@/lib/workspace/operational-role-mapping");
    const validRoles = new Set([
      "actionable",
      "attention",
      "settled",
      "inert",
      "neutral",
    ]);

    const workStates = [
      "proposed",
      "active",
      "in_review",
      "completed",
      "closed",
      "cancelled",
      "superseded",
    ] as const;
    for (const s of workStates) {
      assert.ok(validRoles.has(mod.getEngineeringWorkStateRole(s)),
        `getEngineeringWorkStateRole("${s}") returned invalid role`);
    }

    const projectStatuses = [
      "active",
      "testing",
      "paused",
      "planning",
      "archived",
    ] as const;
    for (const s of projectStatuses) {
      assert.ok(validRoles.has(mod.getProjectStatusRole(s)),
        `getProjectStatusRole("${s}") returned invalid role`);
    }
  });
});

// ─── StateLabel semantic contract tests ────────────────────────────────────

describe("StateLabel", () => {
  it("exports a React component", async () => {
    const { StateLabel } = await import("@/components/ui/state-label");
    assert.equal(typeof StateLabel, "function");
  });

  it("exports OperationalRole type (compile-time contract)", async () => {
    const mod = await import("@/components/ui/state-label");
    // If this import resolves, the type contract is satisfied
    assert.ok(mod.StateLabel !== undefined);
  });
});

// ─── Primitive existence and export contract ───────────────────────────────

describe("visual-system primitive exports", () => {
  const primitives = [
    { name: "Environment", path: "@/components/ui/environment" },
    { name: "Surface", path: "@/components/ui/surface" },
    { name: "Inset", path: "@/components/ui/inset" },
    { name: "OperationalRow", path: "@/components/ui/structured-row" },
    { name: "MetadataField", path: "@/components/ui/metadata-field" },
    { name: "MetadataGroup", path: "@/components/ui/metadata-field" },
    { name: "Disclosure", path: "@/components/ui/disclosure" },
    { name: "Timeline", path: "@/components/ui/timeline" },
    { name: "TimelineEntry", path: "@/components/ui/timeline" },
    { name: "EmptyState", path: "@/components/ui/empty-state" },
    { name: "FailureState", path: "@/components/ui/failure-state" },
  ];

  for (const { name, path } of primitives) {
    it(`${name} is exported as a function from ${path}`, async () => {
      const mod = await import(path);
      assert.equal(typeof mod[name], "function", `${name} should be a function`);
    });
  }
});

// ─── Theme boundary isolation tests ────────────────────────────────────────

function executeThemeInitializer({
  pathname,
  publicPreference = null,
  authenticatedPreference = null,
  prefersDark = false,
  storageUnavailable = false,
}: {
  pathname: string;
  publicPreference?: string | null;
  authenticatedPreference?: string | null;
  prefersDark?: boolean;
  storageUnavailable?: boolean;
}) {
  const preferences = new Map<string, string>();
  if (publicPreference !== null) {
    preferences.set(PUBLIC_THEME_STORAGE_KEY, publicPreference);
  }
  if (authenticatedPreference !== null) {
    preferences.set(
      AUTHENTICATED_THEME_STORAGE_KEY,
      authenticatedPreference,
    );
  }

  const reads: string[] = [];
  let dark = false;
  runInNewContext(THEME_INITIALIZATION_SCRIPT, {
    window: {
      location: { pathname },
      localStorage: {
        getItem(key: string) {
          reads.push(key);
          if (storageUnavailable) throw new Error("storage unavailable");
          return preferences.get(key) ?? null;
        },
      },
      matchMedia() {
        return { matches: prefersDark };
      },
    },
    document: {
      documentElement: {
        classList: {
          toggle(name: string, force: boolean) {
            assert.equal(name, "dark");
            dark = force;
          },
        },
      },
    },
  });

  return { dark, reads };
}

describe("theme preference resolution", () => {
  it("defaults authenticated routes to dark and honors stored choices", () => {
    assert.equal(resolveAuthenticatedTheme(null), "dark");
    assert.equal(resolveAuthenticatedTheme("dark"), "dark");
    assert.equal(resolveAuthenticatedTheme("light"), "light");
  });

  it("keeps public explicit preference ahead of system preference", () => {
    assert.equal(resolvePublicTheme("dark", false), "dark");
    assert.equal(resolvePublicTheme("light", true), "light");
    assert.equal(resolvePublicTheme(null, true), "dark");
    assert.equal(resolvePublicTheme(null, false), "light");
  });

  it("recognizes only the workspace route family as authenticated", () => {
    assert.equal(isAuthenticatedPath("/workspace"), true);
    assert.equal(isAuthenticatedPath("/workspace/projects/a"), true);
    assert.equal(isAuthenticatedPath("/workspace-tools"), false);
    assert.equal(isAuthenticatedPath("/"), false);
  });

  it("selects the preference belonging to the current environment", () => {
    assert.equal(
      resolveThemeForPath({
        pathname: "/workspace",
        publicPreference: "light",
        authenticatedPreference: "dark",
        prefersDark: false,
      }),
      "dark",
    );
    assert.equal(
      resolveThemeForPath({
        pathname: "/",
        publicPreference: "light",
        authenticatedPreference: "dark",
        prefersDark: true,
      }),
      "light",
    );
  });

  const initializerCases = [
    {
      name: "authenticated default",
      input: { pathname: "/workspace" },
      dark: true,
      key: AUTHENTICATED_THEME_STORAGE_KEY,
    },
    {
      name: "authenticated stored light",
      input: {
        pathname: "/workspace/projects/a",
        authenticatedPreference: "light",
        publicPreference: "dark",
      },
      dark: false,
      key: AUTHENTICATED_THEME_STORAGE_KEY,
    },
    {
      name: "authenticated stored dark",
      input: {
        pathname: "/workspace",
        authenticatedPreference: "dark",
        publicPreference: "light",
      },
      dark: true,
      key: AUTHENTICATED_THEME_STORAGE_KEY,
    },
    {
      name: "public stored light",
      input: {
        pathname: "/",
        publicPreference: "light",
        authenticatedPreference: "dark",
        prefersDark: true,
      },
      dark: false,
      key: PUBLIC_THEME_STORAGE_KEY,
    },
    {
      name: "public stored dark",
      input: { pathname: "/about", publicPreference: "dark" },
      dark: true,
      key: PUBLIC_THEME_STORAGE_KEY,
    },
    {
      name: "public system fallback",
      input: { pathname: "/projects", prefersDark: true },
      dark: true,
      key: PUBLIC_THEME_STORAGE_KEY,
    },
  ] as const;

  for (const testCase of initializerCases) {
    it(`pre-paint initializer handles ${testCase.name}`, () => {
      const result = executeThemeInitializer(testCase.input);
      assert.equal(result.dark, testCase.dark);
      assert.deepEqual(result.reads, [testCase.key]);
    });
  }

  it("defaults authenticated routes to dark when storage is unavailable", () => {
    const result = executeThemeInitializer({
      pathname: "/workspace",
      storageUnavailable: true,
    });
    assert.equal(result.dark, true);
    assert.deepEqual(result.reads, [AUTHENTICATED_THEME_STORAGE_KEY]);
  });

  it("uses the public system preference when storage is unavailable", () => {
    const result = executeThemeInitializer({
      pathname: "/",
      prefersDark: true,
      storageUnavailable: true,
    });
    assert.equal(result.dark, true);
    assert.deepEqual(result.reads, [PUBLIC_THEME_STORAGE_KEY]);
  });
});

describe("authenticated theme boundary", () => {
  it("AuthenticatedThemeProvider is exported", async () => {
    const { AuthenticatedThemeProvider } = await import(
      "@/components/authenticated-theme-provider"
    );
    assert.equal(typeof AuthenticatedThemeProvider, "function");
  });

  it("toggleAuthenticatedTheme is exported", async () => {
    const { toggleAuthenticatedTheme } = await import(
      "@/components/authenticated-theme-provider"
    );
    assert.equal(typeof toggleAuthenticatedTheme, "function");
  });

  it("useAuthenticatedTheme hook is exported", async () => {
    const { useAuthenticatedTheme } = await import(
      "@/components/authenticated-theme-provider"
    );
    assert.equal(typeof useAuthenticatedTheme, "function");
  });

  it("provider source reads aredir-auth-theme (not aredir-theme)", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const filePath = path.default.resolve(
      process.cwd(),
      "src/components/authenticated-theme-provider.tsx",
    );
    const source = fs.default.readFileSync(filePath, "utf-8");
    assert.ok(
      source.includes("aredir-auth-theme"),
      "Provider should reference aredir-auth-theme key",
    );
    assert.ok(
      source.includes("AUTHENTICATED_THEME_STORAGE_KEY"),
      "Provider should use the shared authenticated storage key",
    );
  });

  it("provider restores public theme on unmount (workspace→public transition)", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const filePath = path.default.resolve(
      process.cwd(),
      "src/components/authenticated-theme-provider.tsx",
    );
    const source = fs.default.readFileSync(filePath, "utf-8");
    assert.ok(
      source.includes("aredir-theme"),
      "Provider should reference aredir-theme for public theme restoration",
    );
    // Should have cleanup function that reads public preference
    assert.ok(
      source.includes("resolvePublicTheme"),
      "Provider should resolve the public theme during unmount cleanup",
    );
    assert.ok(
      source.includes("useLayoutEffect"),
      "Provider should switch environments before the browser paints",
    );
    assert.ok(
      !source.includes("useEffect"),
      "Provider must not defer environment theme switching until after paint",
    );
  });

  it("workspace layout mounts AuthenticatedThemeProvider", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const layoutPath = path.default.resolve(
      process.cwd(),
      "src/app/workspace/layout.tsx",
    );
    const source = fs.default.readFileSync(layoutPath, "utf-8");
    assert.ok(
      source.includes("AuthenticatedThemeProvider"),
      "Workspace layout should mount AuthenticatedThemeProvider",
    );
  });

  it("workspace layout has NO inline script (React server component)", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const layoutPath = path.default.resolve(
      process.cwd(),
      "src/app/workspace/layout.tsx",
    );
    const source = fs.default.readFileSync(layoutPath, "utf-8");
    assert.ok(
      !source.includes("dangerouslySetInnerHTML"),
      "Workspace layout must NOT contain dangerouslySetInnerHTML (invalid in React server components)",
    );
    assert.ok(
      !source.includes("<script"),
      "Workspace layout must NOT contain inline <script> tag",
    );
  });

});

// ─── Badge migration semantic tests ────────────────────────────────────────

describe("badge migration semantic contracts", () => {
  it("EngineeringWorkStateBadge uses StateLabel internally", async () => {
    // Verify the component file imports StateLabel
    const fs = await import("node:fs");
    const path = await import("node:path");
    const filePath = path.default.resolve(
      process.cwd(),
      "src/components/workspace/engineering-work-badges.tsx",
    );
    const source = fs.default.readFileSync(filePath, "utf-8");
    assert.ok(
      source.includes('from "@/components/ui/state-label"'),
      "EngineeringWorkStateBadge should import StateLabel",
    );
  });

  it("ProjectStatusBadge uses StateLabel internally", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const filePath = path.default.resolve(
      process.cwd(),
      "src/components/workspace/project-status-badge.tsx",
    );
    const source = fs.default.readFileSync(filePath, "utf-8");
    assert.ok(
      source.includes('from "@/components/ui/state-label"'),
      "ProjectStatusBadge should import StateLabel",
    );
  });

  it("ProjectStageBadge uses neutral role (taxonomy, not operational)", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const filePath = path.default.resolve(
      process.cwd(),
      "src/components/workspace/project-status-badge.tsx",
    );
    const source = fs.default.readFileSync(filePath, "utf-8");
    assert.ok(
      source.includes('role="neutral"'),
      "ProjectStageBadge should use neutral role (stage is taxonomy)",
    );
  });
});

// ─── FailureState contract tests ───────────────────────────────────────────

describe("FailureState failure class contract", () => {
  it("FailureState component is exported", async () => {
    const { FailureState } = await import("@/components/ui/failure-state");
    assert.equal(typeof FailureState, "function");
  });
});

// ─── CSS token existence tests ─────────────────────────────────────────────

describe("CSS token foundation", () => {
  it("globals.css defines surface level tokens", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const cssPath = path.default.resolve(
      process.cwd(),
      "src/app/globals.css",
    );
    const css = fs.default.readFileSync(cssPath, "utf-8");
    assert.ok(css.includes("--surface-environment:"), "Missing --surface-environment token");
    assert.ok(css.includes("--surface-surface:"), "Missing --surface-surface token");
    assert.ok(css.includes("--surface-inset:"), "Missing --surface-inset token");
  });

  it("globals.css defines operational role tokens in both themes", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const cssPath = path.default.resolve(
      process.cwd(),
      "src/app/globals.css",
    );
    const css = fs.default.readFileSync(cssPath, "utf-8");
    const roles = ["actionable", "attention", "settled", "inert"];
    for (const role of roles) {
      assert.ok(css.includes(`--role-${role}:`), `Missing --role-${role} in :root`);
      assert.ok(css.includes(`--role-${role}-bg:`), `Missing --role-${role}-bg`);
      assert.ok(css.includes(`--role-${role}-border:`), `Missing --role-${role}-border`);
    }
    // Verify dark theme overrides exist
    const darkSection = css.substring(css.indexOf(".dark {"));
    for (const role of roles) {
      assert.ok(darkSection.includes(`--role-${role}:`), `Missing --role-${role} in .dark`);
    }
  });

  it("globals.css defines geometry tokens", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const cssPath = path.default.resolve(
      process.cwd(),
      "src/app/globals.css",
    );
    const css = fs.default.readFileSync(cssPath, "utf-8");
    assert.ok(css.includes("--radius-surface:"), "Missing --radius-surface");
    assert.ok(css.includes("--radius-inset:"), "Missing --radius-inset");
    assert.ok(css.includes("--radius-badge:"), "Missing --radius-badge");
  });

  it("globals.css defines typography tokens", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const cssPath = path.default.resolve(
      process.cwd(),
      "src/app/globals.css",
    );
    const css = fs.default.readFileSync(cssPath, "utf-8");
    assert.ok(css.includes("--type-altitude:"), "Missing --type-altitude");
    assert.ok(css.includes("--type-section:"), "Missing --type-section");
    assert.ok(css.includes("--type-truth:"), "Missing --type-truth");
    assert.ok(css.includes("--type-narrative:"), "Missing --type-narrative");
    assert.ok(css.includes("--type-state:"), "Missing --type-state");
  });
});

// ─── Timeline collapsed-by-default contract ────────────────────────────────

describe("Timeline collapsed-by-default contract", () => {
  it("Timeline uses native details/summary for collapse", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const filePath = path.default.resolve(
      process.cwd(),
      "src/components/ui/timeline.tsx",
    );
    const source = fs.default.readFileSync(filePath, "utf-8");
    assert.ok(
      source.includes("<details"),
      "Timeline should use <details> for collapsed-by-default",
    );
    assert.ok(
      source.includes("<summary"),
      "Timeline should use <summary> for expand trigger",
    );
  });
});

// ─── OperationalRow safety contract ────────────────────────────────────────

describe("OperationalRow safety contract", () => {
  it("OperationalRow does not nest action inside href anchor", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const filePath = path.default.resolve(
      process.cwd(),
      "src/components/ui/structured-row.tsx",
    );
    const source = fs.default.readFileSync(filePath, "utf-8");
    // Should NOT render action when href is provided
    assert.ok(
      source.includes("action && !href"),
      "OperationalRow should not render action inside href anchor",
    );
  });

  it("OperationalRow includes reduced-motion support", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const filePath = path.default.resolve(
      process.cwd(),
      "src/components/ui/structured-row.tsx",
    );
    const source = fs.default.readFileSync(filePath, "utf-8");
    assert.ok(
      source.includes("motion-reduce:transition-none"),
      "OperationalRow should disable transitions for reduced motion",
    );
  });
});

// ─── Disclosure reduced-motion contract ────────────────────────────────────

describe("Disclosure reduced-motion contract", () => {
  it("Disclosure chevron respects reduced-motion", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const filePath = path.default.resolve(
      process.cwd(),
      "src/components/ui/disclosure.tsx",
    );
    const source = fs.default.readFileSync(filePath, "utf-8");
    assert.ok(
      source.includes("motion-reduce:transition-none"),
      "Disclosure chevron should respect reduced-motion",
    );
  });
});
