# INFRA-002 Lockfile Repair Report

## Executive summary

The package lock inconsistency identified in INFRA-001 has been repaired and validated. The previous v3 lockfile was structurally incomplete around optional wasm/EMNAPI peer resolution. npm 11.7.0 generated a stable replacement from the unchanged manifest, and a clean install succeeded without lifecycle scripts.

Risk is low: this is a constrained transitive-resolution repair, not a dependency upgrade package. The only changed resolved version is the required optional transitive `@emnapi/wasi-threads` from `1.2.2` to `1.2.3`; no direct dependency version changed.

## Environment and baseline

| Item | Value |
| --- | --- |
| Operating system | Windows 10.0.26200, x64 |
| Node.js | v22.19.0 |
| npm | 11.7.0 |
| Lockfile format | npm lockfile v3 |
| Declared package manager | None |
| Declared Node engine | None |
| Baseline lockfile SHA-256 | `9f80dac57d3c3cf7420d141e0535752f9635120ee936ff21fc7c51e89d3d11f4` |
| Repaired lockfile SHA-256 | `00ecdefce071fa2db095a27b70f5a8e87828588494cae6097ebc465ed8ec9729` |

The environment had npm offline mode enabled, but its cache was incomplete. Candidate generation and clean installation therefore temporarily used `--offline=false`; no npm configuration file was changed.

## Candidate process and acceptance

1. Captured manifest and lockfile hashes and confirmed `package.json` has no package-manager or engines declaration.
2. Generated a candidate with `npm install --package-lock-only --ignore-scripts --no-audit --no-fund` in an isolated directory.
3. Reviewed the candidate before acceptance. Its manifest root was unchanged, it retained lockfile v3, and it had only registry URLs with integrity metadata.
4. Validated a fresh scripts-disabled `npm ci` from the candidate. The system temporary-directory service removed temporary manifests after command completion, so the final repository validation was run in the project workspace.
5. The repository lockfile converged to the exact reviewed candidate hash through the same npm lockfile-only operation.

## Lockfile delta

The repair changes 202 lines: 95 insertions and 109 deletions.

- Added root optional peer-resolution records:
  - `@emnapi/core@1.11.3`
  - `@emnapi/runtime@1.11.3`
- Added six bundled child records beneath `@tailwindcss/oxide-wasm32-wasi@4.3.0`, making its bundled wasm dependencies explicit in the v3 lockfile.
- Updated `@emnapi/wasi-threads` from `1.2.2` to `1.2.3`, required by the selected `@emnapi/core@1.11.3`.
- Remaining deletions are npm 11 normalization of `peer` and `dev` metadata flags.

There are no direct-dependency changes, package.json changes from this package, Git dependencies, local file dependencies, tarball dependencies, non-registry sources, or entries missing integrity metadata.

## Validation evidence

| Check | Result |
| --- | --- |
| Clean `npm ci --ignore-scripts --offline=false --no-audit --no-fund` | Passed; 724 packages installed |
| Lock hash before/after clean install | Identical (`00ec…9729`) |
| `npm ls --package-lock-only --all --json` | Passed; zero problems |
| Second offline lockfile-only resolution | Passed; byte-for-byte unchanged |
| `npm run lint` | Passed |
| `tsc --noEmit` | Passed |
| `npm run build` | Blocked by inaccessible Google Fonts, after Next.js began the production build |

`npm ls --all` reports `@emnapi/runtime@1.11.3` as extraneous in the physical install. The lockfile-only graph has zero problems and npm clean install succeeds without changing the lockfile. This is npm's installed-tree classification of the optional peer-resolution record, not an unresolved lockfile node.

## Supply-chain regression review

The following previously investigated package families were rechecked in the repaired lockfile:

- `keyv@4.5.4` remains present through the ESLint file-cache chain.
- `cacheable`, `@cacheable/*`, `cache-manager`, and `cacheable-request` are absent.
- `file-entry-cache@8.0.0` and `flat-cache@4.0.1` remain present.

None matches the reported incident versions recorded in [`SECURITY-001_NPM_SUPPLY_CHAIN_ASSESSMENT.md`](./security/SECURITY-001_NPM_SUPPLY_CHAIN_ASSESSMENT.md). No new affected package was introduced.

## Deferred validation

The production build needs network access to `fonts.googleapis.com` for Geist, Inter, and JetBrains Mono. Its failure is external to this lockfile repair. A network-enabled build environment should rerun `npm run build` as the final application build validation.

## Risk assessment and recommendation

The lockfile is now reproducible with the observed Node/npm toolchain and can support Engineering Work validation. The remaining risk is environmental: the repository does not declare an `engines` or `packageManager` constraint, so CI should use Node 22 and npm 11.7.0 (or establish a separately approved toolchain policy) for deterministic results.

Recommended next action: rerun the production build in an environment that can reach Google Fonts. No additional dependency remediation is indicated.
