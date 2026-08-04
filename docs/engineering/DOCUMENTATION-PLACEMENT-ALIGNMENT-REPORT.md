# Documentation Placement Alignment Report

## Canonical destinations

| Root artifact family | Canonical location |
| --- | --- |
| Engineering Work packages, contracts, reports, validation, and infrastructure | `docs/engineering/` |
| Platform assessment, discovery inventories, and AEF reconciliation | `docs/discovery/` |
| npm supply-chain assessment | `docs/engineering/security/` |

## Inventory disposition

- Engineering Work 001-004, completion/validation/remediation/runtime reports, domain/lifecycle/relationship/repository-reference contracts, and the Hydration OSR model: moved to `docs/engineering/`.
- AREDIR-INFRA-002 and the INFRA-001/002 assessment records: moved to `docs/engineering/`.
- PLATFORM-ASSESSMENT-001, the Authentication, Data Model, Feature, UI Foundation, and Repository Boundary inventories, and tracked AEF-DISCOVERY-003: moved to `docs/discovery/`.
- SECURITY-001: moved to `docs/engineering/security/`.

## Link and index checks

Only one moved reference crossed a new directory boundary: the INFRA-002 repair report now links to `./security/SECURITY-001_NPM_SUPPLY_CHAIN_ASSESSMENT.md`. The platform assessment's inventory links remain valid because their targets moved together under `docs/discovery/`. The existing AEF discovery links now resolve at their intended canonical location. No raw Windows filesystem paths were changed.

`docs/discovery/README.md` now exposes the platform-assessment set. `docs/engineering/README.md` is the intentionally small navigation entry point for the moved engineering records.
