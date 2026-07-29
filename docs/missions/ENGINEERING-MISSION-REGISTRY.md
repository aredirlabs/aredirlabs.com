# Engineering Mission Registry (Labs)

| Field | Value |
| --- | --- |
| **Role** | Index and operational views only |
| **Authoritative records** | [records/](./records/) |
| **Contract** | [ENGINEERING-MISSION-CONTRACT.md](./ENGINEERING-MISSION-CONTRACT.md) |
| **Template** | [ENGINEERING-MISSION-TEMPLATE.md](./ENGINEERING-MISSION-TEMPLATE.md) |
| **Last updated** | 2026-07-28 |

**Authority rule:** Individual Mission records remain the source of truth. This registry must not contradict a record. If they diverge, **fix the registry**.

Primary Active is a **designation in this registry**, not a Mission lifecycle state.

---

## Primary Active

| Mission ID | Title | Kind | State | Path | Owning capability | Primary package | Brief outcome | Updated |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| — | _No Primary Active Mission_ | — | — | — | — | — | Operating focus clear after AREDIR-MISSION-001 closure | 2026-07-28 |

Previously Primary Active during AREDIR-MISSION-001 execution: [AREDIR-MISSION-001](./records/AREDIR-MISSION-001_engineering-mission-contract.md) (now Closed).

---

## Master table

| Mission ID | Title | Kind | State | Activation designation | Path | Owning capability | Primary package | Brief outcome | Last governance update |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| AREDIR-MISSION-001 | Establish Engineering Mission contract, template, and Labs registry | methodology | Closed | none (was Primary Active while Active) | [record](./records/AREDIR-MISSION-001_engineering-mission-contract.md) | AEF C9 Delivery & Release | AREDIR-MISSION-001 | Governed Mission docs operational in `docs/missions/` | 2026-07-28 |

---

## Views

Views filter the master table. They are **not** additional lifecycles.

### Other Active

_None._

### Authorized / Ready

_None._

### Paused

_None._

### Proposed

_None._

### Completed Awaiting Closure

_None._

### Closed

| Mission ID | Title | Closed | Knowledge candidate |
| --- | --- | --- | --- |
| AREDIR-MISSION-001 | Establish Engineering Mission contract, template, and Labs registry | 2026-07-28 | yes |

### Cancelled

_None._

### Superseded

_None._

---

## Registry maintenance

1. Add a master-table row when a Labs Mission record is created.
2. Update state columns when the record’s decision log records a transition.
3. Keep at most one Primary Active for the Labs operating context.
4. Clear Primary Active when the designated Mission leaves Active (Paused / Completed / Closed / Cancelled / Superseded) unless another Active Mission is designated.
5. Never edit outcome, scope, or success conditions in the registry — edit the record.
