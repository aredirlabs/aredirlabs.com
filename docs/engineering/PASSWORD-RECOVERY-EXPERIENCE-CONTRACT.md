# Password Recovery Experience Contract

## Scope

This contract defines the minimum future recovery experience for existing email/password accounts. It uses Better Auth's password-reset endpoints and its configured password hashing. It does not authorize custom password hashing, direct account-table updates, account verification, or managed invitations.

## Required experience

| Step | Contract |
| --- | --- |
| Start | `/sign-in` provides a visible “Forgot password?” link to a request-reset page. |
| Request | The page accepts an email and calls Better Auth's `requestPasswordReset` with a fixed, trusted reset callback URL. |
| Response | Always show the same success state: “If an account exists for that email, you’ll receive reset instructions shortly.” Do not vary it for unknown, unapproved, or delivery-failed addresses. |
| Email | A configured `emailAndPassword.sendResetPassword` callback sends Better Auth's generated URL from an authenticated Aredir Labs sender. Do not compose a replacement token or URL. |
| Link handling | Better Auth validates the path token and redirects to the application reset page with the token. An invalid or expired link goes to the same page with a non-sensitive “This reset link is invalid or has expired” state. |
| Reset | The page requires new-password confirmation, applies the same password policy as registration, and calls Better Auth's `resetPassword` with the token. |
| Completion | Confirm success, send the user to `/sign-in`, and require sign-in with the new password. |

## Installed Better Auth behavior

The installed `better-auth@1.6.16` supplies the needed primitives:

- `requestPasswordReset` returns a generic success response even if no user exists and performs dummy token/database work to reduce timing differences.
- It stores a reset verification value in the existing `verification` table with the `reset-password:<token>` identifier.
- Its default token expiry is one hour; set `resetPasswordTokenExpiresIn` explicitly to **3600 seconds** so the product decision is visible in configuration.
- `resetPassword` validates configured password length, hashes through Better Auth, deletes the verification entry after success, and therefore makes a successful token single-use.
- Session removal occurs only when `revokeSessionsOnPasswordReset` is enabled. Set it to **true** so every existing session is invalidated after a completed reset.

The existing `verification`, `account`, and `session` tables support this flow; no schema migration is expected solely for the reset feature.

## Security and privacy requirements

- Use generic user-facing responses and normalized request timing; do not reveal whether an account exists.
- Rate-limit reset requests by IP and by a privacy-preserving email-derived key at the edge or application boundary. Define and test the selected limits before release.
- Do not log passwords, raw reset tokens, reset URLs, or email bodies. Ensure request/query logging redacts the token-bearing Better Auth reset path.
- Treat reset links as credentials: avoid analytics capture, third-party scripts, referrer leakage, error reporting breadcrumbs, and support-ticket copying.
- Use HTTPS in production, a verified sender domain, and a trusted same-origin callback. Do not allow an arbitrary `redirectTo` value.
- Keep production mail credentials and recipients out of local development. Local recovery should use an isolated capture inbox or provider sandbox.
- Notify the account's email address after a successful reset if the selected email provider/operational design supports it; the notification must not contain credentials or a reset token.

## Password and session policy

Registration currently enforces only a client-side eight-character minimum, while Better Auth enforces its server-side configured password limits. The recovery implementation must make the server policy explicit and use the same rule and explanatory copy on registration and reset pages. A confirmation field is an experience safeguard and must be checked client-side before submission; Better Auth remains the authority for the password update.

Set `revokeSessionsOnPasswordReset: true`. The reset itself should not silently create a new session. The user must deliberately sign in afterward. This preserves a clear recovery boundary and eliminates sessions held by a party who knew the old password.

## Delivery and observability contract

The email delivery adapter must report operational success/failure without emitting recipient addresses or credential-bearing URLs into application logs. Monitor provider-level accepted, bounced, delayed, and complaint events using access-controlled provider tooling. Application logs may record a coarse event type, environment, provider result category, and a correlation ID that cannot be reversed to a recipient.

Better Auth's installed unknown-user path logs an email address at its error logger. Before production enablement, verify the logger configuration redacts that field or routes it only to access-controlled logs with an appropriate retention policy. This is an implementation acceptance item, not a reason to create a custom reset flow.

## Test acceptance criteria

- Known and unknown addresses produce indistinguishable UI success states.
- A valid email receives a production-origin link in production and a local-origin link in local development.
- An expired token and a previously used token cannot set a password.
- Successful reset invalidates all existing sessions and allows the new password to sign in.
- Short, mismatched, and provider-rejected passwords do not update credentials.
- Reset links/tokens and passwords are absent from application, analytics, and test artifacts.
- Excessive requests are safely throttled without revealing account existence.
