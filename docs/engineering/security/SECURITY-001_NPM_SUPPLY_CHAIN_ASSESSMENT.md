# SECURITY-001 — npm Supply Chain Exposure Assessment

**Assessment date:** 2026-08-04
**Method:** read-only inspection of `package.json`, `package-lock.json`, existing `node_modules`, npm configuration, environment-file names/variable names, and the currently published malicious-version list. No dependency, lockfile, environment, application, build, migration, or configuration change was made.

## Executive summary

**Risk classification: No evidence of exposure.**

The locked dependency graph has one transitive Keyv package: `keyv@4.5.4`, reached only through the development dependency chain `eslint@9.39.5 → file-entry-cache@8.0.0 → flat-cache@4.0.1 → keyv@4.5.4`. It is not a direct dependency.

The consulted current incident list identifies `keyv@6.0.0` as malicious, not `4.5.4`. It also identifies specific Cacheable-related releases; none of `cacheable`, `@cacheable/*`, or `@keyv/*` occurs in the lockfile or installed tree. The two additional incident-listed packages in the chain (`file-entry-cache@8.0.0` and `flat-cache@4.0.1`) are likewise not their published malicious versions (`11.1.6` and `6.1.24`, respectively).

This conclusion is limited to the current locked/installed repository state and the advisory list consulted on the assessment date. A separate pre-existing package-lock consistency issue should be investigated before a future dependency install.

## Packages examined

The primary requested package families were inspected by direct manifest/lockfile name search and read-only `npm ls` commands:

| Package/family | Direct dependency | Locked / installed occurrence | Result |
| --- | --- | --- | --- |
| `keyv` | No | One: `4.5.4` | Transitive; not listed as malicious by the consulted incident list. |
| `@keyv/*` | No | None | No evidence in current graph. |
| `cacheable` | No | None | No evidence in current graph. |
| `@cacheable/*` | No | None | No evidence in current graph. |
| `file-entry-cache` | No | One: `8.0.0` | Incident-listed package, but not the listed malicious `11.1.6`. |
| `flat-cache` | No | One: `4.0.1` | Incident-listed package, but not the listed malicious `6.1.24`. |
| `cache-manager` | No | None | No evidence; incident list identifies `7.2.10`. |
| `cacheable-request` | No | None | No evidence; incident list identifies `13.0.20`. |

The published incident list contains 443 package/version records. A lockfile name comparison found no match for any listed affected scoped families (`@adminide-stack`, `@arv-bedrock`, `@cacheable`, `@deliveroo`, `@hubsync`, `@nebula.js`, `@onereach`, `@or-sdk`, `@ornikar`, `@picsart`, `@qlik`, `@servicetitan`, `@thiennq`, `@umacloud`, or `@workbench-stack`) and no other listed bare-package match beyond the three packages above.

## Dependency findings

```text
aredirlabs-com
└─ devDependency: eslint@9.39.5
   └─ file-entry-cache@8.0.0
      └─ flat-cache@4.0.1
         └─ keyv@4.5.4
```

`npm ls keyv --all --json` confirms the same chain from the installed tree. `npm ls` found no Cacheable or `@cacheable/*` package. The lockfile has one `node_modules/keyv` location and no `@keyv/*`, `cacheable`, or `@cacheable/*` location; there is no multiple-version occurrence.

## Version assessment

| Discovered package | Installed/locked version | Published malicious version(s) consulted | Assessment |
| --- | --- | --- | --- |
| `keyv` | `4.5.4` | `6.0.0` | Known unaffected for this incident list: installed version is not listed. |
| `file-entry-cache` | `8.0.0` | `11.1.6` | Known unaffected for this incident list: installed version is not listed. |
| `flat-cache` | `4.0.1` | `6.1.24` | Known unaffected for this incident list: installed version is not listed. |
| `cacheable` | Absent | `2.5.1` | No evidence of exposure. |
| `@cacheable/memory` | Absent | `2.2.1` | No evidence of exposure. |
| `@cacheable/net` | Absent | `2.1.1` | No evidence of exposure. |
| `@cacheable/node-cache` | Absent | `3.1.2` | No evidence of exposure. |
| `@cacheable/utils` | Absent | `2.5.1` | No evidence of exposure. |
| `cache-manager` | Absent | `7.2.10` | No evidence of exposure. |
| `cacheable-request` | Absent | `13.0.20` | No evidence of exposure. |

The malicious-version comparison uses the [Wiz Research IOC package/version list](https://raw.githubusercontent.com/wiz-sec-public/wiz-research-iocs/main/reports/keyv-packages.csv), retrieved on the assessment date. The list names the affected `@cacheable/*` releases and the `keyv`, `cacheable`, `cache-manager`, `cacheable-request`, `file-entry-cache`, and `flat-cache` versions above.

## Repository inventory

- `package.json` declares 13 runtime dependencies and 9 development dependencies. It declares no optional or peer dependencies and no workspaces.
- No direct dependency is in the affected Keyv/Cacheable families.
- The project uses npm lockfile version 3. No Yarn, pnpm, or npm workspace configuration was present; no repository `.npmrc` was present.
- The observed npm configuration includes an environment-level `offline=true` setting. This affects package retrieval behavior but does not add a repository dependency source.

## Environment risk

Only `.env.example` is present in the repository; no `.env`, `.env.local`, or `.env.production.local` file was found. Its variable names indicate that a normal development/deployment environment may hold:

- database connection credentials (`DATABASE_URL`),
- Better Auth secret material (`BETTER_AUTH_SECRET`),
- authentication/site URLs, and
- workspace allow-list email addresses.

If a malicious dependency executed in a developer, CI, or deployment process with those values present, it could potentially read and exfiltrate them. Deployment-provider secrets are not stored in this repository and were not inspected. This is an impact statement, not evidence that malicious code executed.

## Lockfile assessment

- `package-lock.json` is 476,442 bytes and was last modified 2026-07-09 (26 days before this assessment).
- Root dependency and devDependency declarations in the lockfile match `package.json`; optional and peer dependency declarations are absent in the manifest.
- All 873 locked package records use `https://registry.npmjs.org/` resolution URLs; no Git, tarball/non-registry URL, local file/link dependency, or Git dependency spec was found.
- Every resolved lock entry has an integrity field.
- Read-only installation validation previously reported that `package.json` and `package-lock.json` are not fully synchronized because the lockfile lacks `@emnapi/core` and `@emnapi/runtime` entries expected by the current resolution. This is not evidence of the Keyv/Cacheable compromise, but it prevents treating a future installation from the present lockfile as fully validated.

## Risk classification

**No evidence of exposure.** The only discovered Keyv-family occurrence is a single transitive `keyv@4.5.4`, not the incident-listed malicious `6.0.0`; no Cacheable-family package is present; and the other incident-listed packages found (`file-entry-cache`, `flat-cache`) are not the listed malicious releases. The existing package-lock consistency issue is a separate supply-chain hygiene concern, not a finding of this incident’s compromised version.

Engineering Work source-level validation can continue on this evidence. Any validation that requires a fresh dependency installation should first investigate the independent lockfile consistency finding.

## Recommended next step

**Additional investigation required** — investigate and reconcile the package-lock consistency discrepancy before the next dependency installation or CI dependency restore. Do not treat this recommendation as a remediation instruction for the Keyv/Cacheable incident; no affected version was found.
