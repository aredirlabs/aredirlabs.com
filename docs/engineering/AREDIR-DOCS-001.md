# AREDIR-DOCS-001 - Canonical Documentation Placement Alignment

## Completion classification

**Ready for focused documentation commit**

## Scope result

Twenty-four untracked root-level package records and the tracked `AEF-DISCOVERY-003.md` discovery reconciliation record were moved exactly once into the established `docs/engineering`, `docs/discovery`, and `docs/engineering/security` taxonomy. Content, identifiers, dates, findings, and conclusions were preserved; no application, schema, migration, environment, or database file was changed.

## Placement summary

| Family | Destination | Count |
| --- | --- | ---: |
| Engineering Work, validation, contracts, and infrastructure | `docs/engineering/` | 17 |
| Platform assessment, discovery inventories, and AEF reconciliation | `docs/discovery/` | 7 |
| Supply-chain security assessment | `docs/engineering/security/` | 1 |

## Reference and navigation result

The Engineering Work and infrastructure companion documents moved together, preserving their relative references. The cross-directory link from the lockfile repair report to the security assessment now uses its canonical security path. Discovery navigation now lists the platform assessment set, and a minimal Engineering Records index groups the Engineering Work series, contracts, validation, infrastructure, migration, and security records.

## Safety record

No root duplicate was retained, no document was deleted, no secret-bearing environment file was touched, and the tracked `drizzle/` migration artifacts remain outside this change.
