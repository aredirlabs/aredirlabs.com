# Engineering Missions

| Field | Value |
| --- | --- |
| **Authority** | [ENGINEERING-MISSION-CONTRACT.md](./ENGINEERING-MISSION-CONTRACT.md) |
| **Form** | Repository Markdown records + Labs registry |
| **Owning repository** | `aredirlabs-com` |
| **Instantiating package** | AREDIR-MISSION-001 |
| **Prior discovery** | [DISCOVERY-003](../discovery/AREDIR-DISCOVERY-003_ENGINEERING_OPERATIONS_ARCHITECTURE.md) · [DISCOVERY-004](../discovery/AREDIR-DISCOVERY-004_ENGINEERING_MISSION_ARTIFACT_DEFINITION.md) |

This directory is the **canonical home for Engineering Mission artifacts** owned by Aredir Labs.

Missions orient currently pursued engineering work. They do **not** replace Opportunities, Packages, Findings, Verification, Decisions, ADRs, Releases, Promotion, Projects, or Roadmaps.

## Contents

| Path | Purpose |
| --- | --- |
| [ENGINEERING-MISSION-CONTRACT.md](./ENGINEERING-MISSION-CONTRACT.md) | Normative contract (lifecycle, ownership, relationships) |
| [ENGINEERING-MISSION-TEMPLATE.md](./ENGINEERING-MISSION-TEMPLATE.md) | Reusable record template |
| [ENGINEERING-MISSION-REGISTRY.md](./ENGINEERING-MISSION-REGISTRY.md) | Labs index and operational views (not a second SoT) |
| [records/](./records/) | Authoritative individual Mission records |
| [AREDIR-MISSION-001_COMPLETION_REPORT.md](./AREDIR-MISSION-001_COMPLETION_REPORT.md) | Contract implementation completion report |

## Traceability chain

```text
Finding / evidence
        ↓
Opportunity (optional)
        ↓
Decision
        ↓
Engineering Mission (orientation / commitment / focus)
        ↓
Package(s) (specification)
        ↓
Verification / release
        ↓
Knowledge candidate → Promotion (deliberate)
```

## Quick start

1. Copy [ENGINEERING-MISSION-TEMPLATE.md](./ENGINEERING-MISSION-TEMPLATE.md) to `records/{QUALIFIER}-MISSION-###_short-slug.md`.
2. Fill required fields; leave non-material sections as `N/A — not material`.
3. Add a row to [ENGINEERING-MISSION-REGISTRY.md](./ENGINEERING-MISSION-REGISTRY.md).
4. Do **not** duplicate package progress, Opportunity state, or verification matrices on the Mission.

## Rules

1. Individual Mission records in `records/` remain **authoritative**.
2. The registry is an **index / projection view** only.
3. Exactly one authoritative repository or authority domain per Mission (v1).
4. Mission is **optional** for package work — not every package requires a Mission.
5. No Mission hierarchy in v1.
6. Primary Active is a **registry designation**, not a lifecycle state.
