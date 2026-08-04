# Engineering Work Runtime Verification

## Status

Runtime verification was **not executed**. This document records the exact boundary so that a later run can continue without treating static evidence as runtime proof.

## Blocking safety condition

At validation time:

- `.env.local` was absent;
- `DATABASE_URL` was absent from the process environment;
- no database target could be classified as non-production; and
- no approved authentication credentials or browser runtime were available.

No migration, seed, query, server start, sign-in attempt, or browser request was issued. This prevents accidental access to an unknown database target and avoids fabricating authentication evidence.

## Runtime checks still required

| Area | Required evidence |
| --- | --- |
| Database | Non-production target classification, table inventory, migration twice, foreign keys/defaults, and preservation of existing data |
| Seed | Seed twice; exactly one Hydration OSR Work under AlignFit; no invented references or changed project-memory records |
| Persistence | Exact expected values, null outcome/priority/condition fields, timestamps, and zero references |
| Isolation | AlignFit list/detail success; other project and unknown/malformed IDs return no Work/not found; empty project collection |
| Auth | Unauthenticated redirect; approved sign-in; Workspace and project routes load |
| UI | List/detail/empty state, no write controls, route and error behavior |
| Responsive/accessibility | Desktop, laptop, tablet, mobile, keyboard, visible focus, labels, and console review |
| Regression | Existing authenticated Workspace paths, sign-out, and public routes without unsafe data mutation |

## Static expectations to confirm at runtime

- The proxy should redirect unauthenticated `/workspace` requests to `/sign-in`.
- The seeded path should be `/workspace/projects/alignfit/engineering-work/eng_work_alignfit_hydration_operational_state`.
- The Work detail query should reject a valid Work ID paired with another Project slug.
- No references should appear for the seeded record unless deliberately and verifiably added.
- Local filesystem source locations should render as text, never a public navigable link.

## Remediated item to verify at runtime

AREDIR-ENGINEERING-WORK-004 changed the list and detail implementations to display visible `Type`, `Workflow`, and `Lifecycle state` definition terms alongside their badges. For the seed, Type and Workflow still both read `Architecture`, but each now has an explicit label. Runtime review should confirm this at all required viewports and with assistive technology.

## Build observation

The production build was attempted. It reached Next.js compilation and stopped only because Geist, Inter, and JetBrains Mono could not be fetched from Google Fonts. Re-run the build in a network-capable environment after dynamic validation; do not change the font architecture as part of this validation package.
