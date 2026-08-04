# INFRA-001 — Dependency Reproducibility Assessment

**Assessment date:** 2026-08-04
**Scope:** read-only inspection only. No package installation, lockfile generation, dependency update, application build, migration, seed, or repository configuration change was performed.

## Executive summary

The dependency graph is inconsistent because the committed npm lockfile contains an incomplete optional-WASM dependency subgraph. It records packages that require root-resolvable `@emnapi/core` and `@emnapi/runtime` entries but does not record those entries at the root. `npm ls --package-lock-only --all` reports five unresolved requirements as a result.

This is a **lockfile graph defect**, not a direct `package.json` versus lockfile root-manifest mismatch, not an npm supply-chain incident finding, and not a current-platform-only installation issue. The same absent root entries are present in the committed `package-lock.json` at commit `003c373` (2026-06-11), so an incomplete local install did not create the defect.

The lockfile is valid JSON with registry/integrity metadata, but it is **unreproducible** under the current npm 11.7.0 resolver. A controlled lockfile regeneration/repair by npm is required before runtime validation can be trusted. Manual lockfile editing is not recommended.

## Environment

| Concern | Observed value | Repository expectation |
| --- | --- | --- |
| Operating system | Windows 11 / build `10.0.26200`, x64 | No OS constraint declared. |
| Node | `v22.19.0` | No `engines` field declared. |
| npm | `11.7.0` | No `packageManager` field or npm version declared. |
| Package manager | npm | Confirmed by `package-lock.json` and npm scripts. |
| Lockfile format | npm lockfile v3 | Compatible format, but structurally incomplete. |
| Workspace manager | None | No `workspaces`, Yarn, or pnpm configuration/lockfile. |

The repository does not define a Node/npm toolchain expectation, so no historical npm version can be established from repository metadata. That limits attribution to a specific npm release but does not change the observed graph defect.

## Manifest comparison

The root `dependencies` and `devDependencies` objects in `package.json` exactly match the root package entry in `package-lock.json`. The manifest declares no optional dependencies, peer dependencies, overrides, or workspace configuration.

| Comparison | Result |
| --- | --- |
| Direct runtime dependencies | Match between manifest and lockfile root. |
| Direct development dependencies | Match between manifest and lockfile root. |
| Optional / peer dependencies | None declared by root manifest. |
| Overrides | None declared in manifest or lockfile. |
| Direct-package version mismatch | None found. |

The discrepancy is therefore transitive: it is in lockfile package entries, not the root manifest.

## Dependency graph findings

`npm ls --package-lock-only --all --json` reports these unresolved lockfile requirements:

| Consumer | Required dependency/range | Missing lockfile location |
| --- | --- | --- |
| `@tailwindcss/oxide-wasm32-wasi@4.3.0` | `@emnapi/core@^1.10.0` | `node_modules/@emnapi/core` absent |
| `@tailwindcss/oxide-wasm32-wasi@4.3.0` | `@emnapi/runtime@^1.10.0` | `node_modules/@emnapi/runtime` absent |
| `@img/sharp-wasm32@0.34.5` | `@emnapi/runtime@^1.7.0` | `node_modules/@emnapi/runtime` absent |
| `@napi-rs/wasm-runtime@1.1.4` | peer `@emnapi/core@^1.7.1` | `node_modules/@emnapi/core` absent |
| `@napi-rs/wasm-runtime@1.1.4` | peer `@emnapi/runtime@^1.7.1` | `node_modules/@emnapi/runtime` absent |

The principal graph path is:

```text
@tailwindcss/postcss@4.3.0
  → @tailwindcss/oxide@4.3.0
    → optional @tailwindcss/oxide-wasm32-wasi@4.3.0
      → @emnapi/core@^1.10.0 (missing root lock entry)
      → @emnapi/runtime@^1.10.0 (missing root lock entry)
      → @napi-rs/wasm-runtime@1.1.4
        → peer @emnapi/core/@emnapi/runtime (missing root lock entries)

sharp@0.34.5
  → optional @img/sharp-wasm32@0.34.5
    → @emnapi/runtime@^1.7.0 (missing root lock entry)
```

The lockfile contains nested `@emnapi/core@1.10.0` and `@emnapi/runtime@1.10.0` only beneath `@unrs/resolver-binding-wasm32-wasi`. Node resolution for the root-installed Tailwind and Sharp WASM packages cannot use those nested copies. The locked graph also has two `@emnapi/wasi-threads` versions (`1.2.2` at root and `1.2.1` nested), which is normal version duplication but does not supply the missing core/runtime nodes. npm identifies missing nodes, not extraneous/orphaned package entries.

## Lockfile assessment

| Property | Assessment | Evidence |
| --- | --- | --- |
| Parse validity | Valid | Lockfile parses as npm v3 JSON. |
| Root manifest consistency | Valid | Root dependency and devDependency objects match `package.json`. |
| Transitive graph completeness | Invalid | Five unresolved dependency/peer requirements reported by npm’s lockfile-only tree validation. |
| Source/integrity metadata | Valid | All 874 package records use npm-registry URLs and resolved entries carry integrity values; no Git, tarball, local file/link, or non-registry sources found. |
| Merge evidence | None observed | No conflict markers; Git history shows the same missing root entries in the committed lockfile. |
| Reproducibility | Unreproducible | `npm ci` rejects the graph because expected `@emnapi` entries are absent. |
| Trustworthiness | Partial only | Suitable as historical resolution evidence, not safe as an installation lock until repaired. |

The lockfile was last committed in the 2026-06-11 Workspace change (`003c373`). Its filesystem modification timestamp is not used as authorship evidence.

## Root cause analysis

### Confirmed cause

The committed lockfile omits root package entries needed by optional WASM packages already recorded within it. Specifically, the lockfile has `@tailwindcss/oxide-wasm32-wasi@4.3.0`, `@img/sharp-wasm32@0.34.5`, and `@napi-rs/wasm-runtime@1.1.4`, along with their requirements for `@emnapi/core` and/or `@emnapi/runtime`, but lacks both root `node_modules/@emnapi/core` and `node_modules/@emnapi/runtime` entries.

### Ruled out by evidence

| Candidate explanation | Assessment |
| --- | --- |
| Root dependency update after lock generation | Not supported: root manifest and root lock entry match. |
| Current Windows/x64 platform alone | Not supported: the missing entries are required by cross-platform optional WASM packages explicitly present in the lockfile. |
| Incomplete local install created the lock defect | Ruled out: the committed lockfile has the same omissions. |
| Git merge conflict text | Not observed. |
| External/Git/local package source | Not observed. |
| Keyv/Cacheable incident | Unrelated; the incident assessment found no affected version. |

### Most likely origin, with uncertainty preserved

The lockfile was generated or last resolved by a package-manager process that did not materialize the root `@emnapi` nodes required by these optional WASM dependency paths. This is consistent with a stale or incomplete peer/optional-dependency resolution record. The repository does not record its generating npm version, so this assessment cannot attribute the omission to a particular npm release or prove whether it was a package-manager defect versus a historical interrupted/partial lockfile update.

## Remediation options

| Option | Benefits | Risks / repository impact |
| --- | --- | --- |
| Controlled npm lockfile regeneration with pinned Node/npm | Lets npm construct a complete graph, validates the actual resolver, and produces an auditable diff. | May change transitive resolutions because several root ranges use `^`; must be reviewed to ensure no intentional dependency upgrade is accepted. |
| npm-generated targeted lockfile repair | Could add only the missing graph nodes if the package manager preserves current resolutions. | Requires confirming output is minimal; still modifies lockfile and cannot safely be hand-authored. |
| Manual `package-lock.json` editing | Appears narrowly scoped. | High risk of incorrect integrity, placement, peer metadata, or resolution semantics; not trustworthy. |
| Add direct `@emnapi` pins/overrides | Might force entries into graph. | Changes dependency intent and hides the defective transitive lock; out of scope. |
| Delete and reinstall `node_modules` | Useful only after a correct lock exists. | Does not repair the committed lockfile and is not a reproducibility solution by itself. |

## Recommended remediation

Use a **controlled npm lockfile regeneration with a declared, pinned Node/npm toolchain**, preserving current direct dependency intent and reviewing the resulting lockfile diff for unexpected transitive version changes. Confirm that the regenerated lock contains root-resolvable `@emnapi/core` and `@emnapi/runtime` entries satisfying the recorded WASM consumers, then perform a clean reproducibility validation before runtime validation.

This is a recommendation only. No remediation was performed in this package.

## Risk assessment

- **Current runtime-validation risk: High.** A clean install cannot currently be relied upon; build/type outcomes from a partial local dependency tree are not authoritative.
- **Dependency-version-change risk during remediation: Medium.** Unpinned `^` ranges may allow unrelated transitive movement if regeneration is not constrained/reviewed.
- **Application-code risk: Low.** No source evidence indicates application code caused the graph inconsistency.
- **Supply-chain exposure risk: No evidence for the Keyv/Cacheable incident.** This remains separate from the reproducibility defect.

Runtime validation can safely proceed **after** the lockfile is repaired by the recommended controlled process and a clean install validates against it. It should not proceed on the present lockfile as a reproducibility claim.
