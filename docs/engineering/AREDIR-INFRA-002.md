# AREDIR-INFRA-002 — Controlled Dependency Lockfile Repair

## Outcome

Completed. `package-lock.json` was repaired with npm 11.7.0 using Node.js v22.19.0 on Windows 10.0.26200 (x64). No application source, schema, migration, or dependency manifest was changed by this package.

The repaired lockfile is version 3 and has SHA-256:

`00ecdefce071fa2db095a27b70f5a8e87828588494cae6097ebc465ed8ec9729`

## Cause addressed

`INFRA-001_DEPENDENCY_REPRODUCIBILITY_ASSESSMENT.md` established that the prior lockfile omitted root resolution records for `@emnapi/core` and `@emnapi/runtime`, despite optional wasm packages requiring them. That made `npm ci` unreproducible.

## Controlled repair

An isolated, scripts-disabled npm lockfile-only candidate was generated from the unchanged `package.json` and baseline lockfile. The repository lockfile then converged to the exact same candidate hash through npm's lockfile-only resolution.

The accepted change:

- adds `@emnapi/core@1.11.3` and `@emnapi/runtime@1.11.3` as optional peer-resolution records;
- records the bundled dependency tree of `@tailwindcss/oxide-wasm32-wasi@4.3.0`;
- resolves its required `@emnapi/wasi-threads` to `1.2.3` (previously `1.2.2`);
- normalizes npm 11 package metadata flags without changing direct dependencies, package sources, or package-manager configuration.

All resolved package sources remain `https://registry.npmjs.org/` and all resolved entries have integrity metadata.

## Validation

- Clean `npm ci --ignore-scripts --offline=false --no-audit --no-fund` succeeded: 724 packages installed.
- The lockfile hash was unchanged before and after that installation.
- `npm ls --package-lock-only --all --json` reports zero problems.
- A second offline, scripts-disabled `npm install --package-lock-only` was byte-for-byte idempotent.
- `npm run lint` passed.
- `node node_modules\\typescript\\bin\\tsc --noEmit` passed.
- `npm run build` reached Next.js but could not fetch Geist, Inter, and JetBrains Mono from Google Fonts. This is an external-network limitation, not a dependency or TypeScript failure.

No standard lifecycle-script-enabled installation was needed to establish dependency reproducibility or run lint/type validation. It remains a separate deployment-environment validation concern.

See `INFRA-002_LOCKFILE_REPAIR_REPORT.md` for the full evidence and risk record.
