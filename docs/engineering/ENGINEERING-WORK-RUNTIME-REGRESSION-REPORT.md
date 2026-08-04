# Engineering Work Runtime Regression Report

## Summary

No regression was observed in the executable pre-authentication surface. The built application served all sampled public routes, and the proxy continued to protect Workspace routes. Authenticated regression checks were deferred only because the existing approved account credential was not available.

## Evidence

| Surface | Status | Evidence |
| --- | --- | --- |
| Public home/about/engineering/projects/project/contact | Pass | HTTP 200 on the built local application. |
| Workspace guard | Pass | HTTP 307 to `/sign-in` without a session cookie. |
| Engineering Work direct guard | Pass | HTTP 307 to `/sign-in` without a session cookie. |
| Database prerequisite | Pass | One approved Work row, zero references, and one allow-listed account. |
| Workspace dashboard and existing authenticated features | Deferred | Credential unavailable; no mutation attempted. |
| Create-action regression | Skipped | Deliberately avoided to prevent shared Dev data pollution. |
| Build/static regression | Pass | TypeScript, lint, Drizzle check, whitespace check, and build all passed. |

## Diagnostic notes

- `npm run dev` continues to encounter the documented local Windows `spawn EPERM` behavior.
- The production build and `next start` path are healthy; `next start -- -p 3002` was ready in 339 ms.
- A separate listener on port 3000 was not this application and returned 404 for expected paths. It did not affect the isolated port-3002 validation.
- No Google Fonts restriction occurred in this run.

## Deferred regression exit criteria

With an approved credential, verify the Workspace dashboard, registry, project overview, milestones, notes, documents, prompts, Knowledge Assets, settings placeholder, session persistence, sign-out, and post-authentication public header behavior. Do not exercise mutations unless their data impact is explicitly approved.
