# Invite-Only Registration Assessment

## Current contract

`/sign-up` is intentionally absent from routine public navigation but publicly addressable. It submits to Better Auth, whose server-side `before` hook permits only an address in `WORKSPACE_ALLOWED_EMAILS`. Email values are trimmed and lowercased before comparison.

This means an emailed or otherwise controlled `/sign-up` link is safe to expose to a prospective user: possession of the link alone cannot create an account. The allow-list is the security boundary; obscurity of the route is not.

## Recommended activation journey

1. An administrator approves an exact email address in the relevant environment's allow-list and deploys/restarts the configuration.
2. The administrator sends that person the canonical, environment-correct `/sign-up` link with the instruction to use the approved address.
3. The page states that registration is invite-only and that a different address will not work.
4. On successful registration, Better Auth creates the account and session; the application sends the user to `/workspace`.
5. If an account already exists, the page directs the user to sign in or recover their password without exposing further account information.

The activation message can be sent by an administrator manually in this phase. “Controlled” means the approved canonical URL is deliberately communicated; it does not imply a new secret invitation token.

## User-facing copy contract

| Situation | Required response |
| --- | --- |
| Registration landing | “Workspace registration is invite-only. Use the email address that received your activation instructions.” |
| Unapproved email | “Workspace registration is invite-only. Contact your workspace administrator if you believe you should have access.” |
| Existing account | “An account may already exist for this address. Sign in or reset your password.” |
| Registration unavailable | “Account activation is temporarily unavailable. Contact your workspace administrator.” |

The exact duplicate-account response must be normalized in the future UI rather than blindly presenting a provider-specific error. Registration may disclose that an approved email is not eligible; this is an accepted trade-off in a small invite-only workspace. Sign-in and reset requests must not disclose account existence.

## Why not managed invitations now

Invitation records are appropriate when the product needs any of the following: expiring activation, acceptance tracking, delegated invitations, a durable audit trail, automatic role assignment, organization/project scope, or regular multi-user onboarding. None is required to solve the confirmed recovery gap or to make the present allow-list activation path understandable.

When that threshold is reached, introduce a dedicated invitation domain rather than overloading `WORKSPACE_ALLOWED_EMAILS`. It should own inviter, email, token digest, expiry, status, accepted user, scope, and audit events. Do not treat a bare allow-list entry as an invitation record.

## Registration security requirements

- Keep the allow-list check in the Better Auth server hook; never move it solely to the client or proxy.
- Apply the same email normalization at all approval and lookup boundaries.
- Never place allowed addresses, configuration secrets, or approval state in client bundles.
- Do not accept a return URL from the activation request without an allow-list of origins and paths.
- Keep local and production allow-lists separate.
- Record administrative configuration changes through the deployment/platform audit trail until a first-class invitation audit exists.
