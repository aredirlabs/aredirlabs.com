# AREDIR-AUTH-EXPERIENCE-001 — Invite-Only Authentication and Account Recovery Assessment

**Status:** discovery and architecture only; no implementation authorization

## Decision

**Recommendation: implement a hybrid activation and recovery slice.**

Keep the existing server-enforced email allow-list as the account-creation boundary. Add a controlled, explicitly communicated activation link to `/sign-up`, and implement Better Auth's supported password-recovery flow with transactional email. Do not build invitation records or an invitation administration UI yet.

This is the smallest secure change that lets an approved user activate an account and regain access without a developer changing a password. The person who administers the deployment still adds an email to `WORKSPACE_ALLOWED_EMAILS`; that is an administrative approval action, not a user self-service registration path.

## Evidence reviewed

| Area | Finding |
| --- | --- |
| Auth provider | Better Auth `1.6.16` uses the Drizzle/PostgreSQL adapter in `src/lib/auth.ts`. |
| Account creation | A `before` hook admits only normalized emails in `WORKSPACE_ALLOWED_EMAILS` for `/sign-up/email`. The check is server-side. |
| Sign-in experience | `/sign-in` collects credentials and sends a successful user to `/workspace`; it has no recovery link. |
| Sign-up discoverability | `/sign-up` is a public, manually reachable route but is not offered from normal public navigation. It says registration is invite-only. |
| Recovery | No `sendResetPassword` function, email service, reset pages, or recovery UI exists. Better Auth consequently reports reset as disabled. |
| Session and origin | Better Auth persists sessions in PostgreSQL. `authBaseURL` and trusted origins derive from `BETTER_AUTH_URL` / `NEXT_PUBLIC_SITE_URL`, with local and Vercel preview origins supported. |

The existing configuration is appropriate for a very small private workspace, but it is not a complete invitation lifecycle and currently makes forgotten passwords a developer-intervention event.

## Current-state assessment

### Approval and activation

An administrator approves a prospective user by placing their email in an environment variable and redeploying or restarting the relevant environment. The user is then expected to know the otherwise hidden `/sign-up` URL. This is functional but undiscoverable by design and has no record of who was approved, when, or whether the account was activated.

Direct access to `/sign-up` is acceptable only because the server-side allow-list is the actual control. Hiding the route is a product choice, not a security boundary. An unapproved email is rejected with the explicit message “Workspace registration is invite-only.” This is suitable for a small internal workspace, though it confirms that the submitted address was not approved.

The client currently forwards provider errors. The precise duplicate-account message should be deliberately verified and made actionable in a future implementation: “An account may already exist. Sign in or reset your password.” Do not add an account-existence lookup that creates a new enumeration endpoint.

### Sign-in and sessions

Sign-in is discoverable from the public header and redirects success to `/workspace`. The protected-route proxy only tests for the presence of a session cookie; server actions perform an actual Better Auth session lookup before mutations. A future authorization phase should validate sessions for protected reads and introduce membership/role checks; that is separate from the recovery slice.

The sign-in form does not distinguish invalid credentials, locked accounts, or a disabled account because no lockout/disabled-account model exists. Use a generic credential failure message. The current product has no account lock state, so “locked account” behavior cannot be claimed or designed as part of this slice.

## Models compared

| Model | Fit now | Decision |
| --- | --- | --- |
| A — allow-list plus manually shared URL | Technically adequate but leaves a poor activation journey and no recovery. | Not selected. |
| B — managed invitations | Supplies auditability, expiry, acceptance and future membership linkage, but needs a new domain, administration UI, email workflow, and token lifecycle. | Defer until multiple-user onboarding, delegated administration, project scope, or audit requirements justify it. |
| C — hybrid | Preserves the proven allow-list while providing a clear activation path and self-service recovery. | **Selected.** |

## Authentication, authorization, and membership

| Concern | Meaning in this product | Current state | Near-term scope |
| --- | --- | --- | --- |
| Authentication | Prove identity, establish a session, reset a password. | Better Auth email/password and sessions. | Activation guidance and recovery. |
| Authorization | Decide what an authenticated identity may read or change. | Authenticated mutations check sessions; no roles or permissions. | Not changed by this slice. |
| Membership | Associate a user with a workspace, organization, or project and potentially a role. | No membership model; workspace data is shared. | Defer with managed invitations. |

An allow-listed email is an account-creation gate. It is not membership, a role, or a continuing authorization policy for an existing account.

## Required operational capability

Recovery requires a transactional email provider that can send from a verified Aredir Labs sender and deliver production reset messages. It also requires separate local behavior: use a development-only inbox or a local mail capture service, never production recipients or credentials. The sender implementation must receive Better Auth's generated URL and send it without logging the URL or token.

Environment configuration remains distinct: local uses `http://localhost:3000`; production uses `https://aredirlabs.com`; preview behavior must use only an explicitly trusted preview origin. Reset requests must pass a same-origin, approved `/reset-password` callback URL rather than accepting arbitrary user input.

## Administrative capability boundary

Required now:

- Maintain the allow-list in each environment and communicate the controlled activation URL.
- Configure and monitor transactional email delivery, sender authentication, bounces, and provider access.
- Support exceptional access incidents through audited operational procedures.

Deferred:

- Invitation records, expiry, single-use activation tokens, acceptance status, inviter identity, bulk invites, roles, projects, and organization assignment.
- Account suspension/lockout administration and end-user profile administration.

## Acceptance gate for a future implementation

The hybrid slice is ready to implement only when an approved mail provider and sender identity are available for both local-safe testing and production. The implementation must meet the recovery contract in [PASSWORD-RECOVERY-EXPERIENCE-CONTRACT.md](./PASSWORD-RECOVERY-EXPERIENCE-CONTRACT.md) and the journeys in [AUTHENTICATION-USER-JOURNEY.md](./AUTHENTICATION-USER-JOURNEY.md).
