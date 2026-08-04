# Authentication Inventory

## Implementation

| Area | Current implementation | Maturity / assessment |
| --- | --- | --- |
| Provider | Better Auth `^1.6.16`, configured in `src/lib/auth.ts` with Drizzle’s PostgreSQL adapter. | Implemented and reusable. |
| Credentials | Email/password enabled; no social/enterprise provider configured. | Implemented. |
| API | Catch-all `/api/auth/[[...route]]` delegates GET, POST, PATCH, PUT, and DELETE to Better Auth’s Next.js handler. | Implemented. |
| Client | `createAuthClient()` in `src/lib/auth-client.ts`, intentionally same-origin. | Reusable. |
| Sign in | Client form invokes `authClient.signIn.email`, shows normalized errors, then routes to `/workspace`. | Implemented. |
| Sign up | Client form invokes `authClient.signUp.email`; minimum password length is eight at the form layer. | Implemented, invite-only. |
| Registration boundary | A Better Auth `before` hook intercepts `/sign-up/email` and allows only normalized addresses listed in `WORKSPACE_ALLOWED_EMAILS`. | Implemented configuration gate; not a full authorization model. |
| Session persistence | Better Auth `session` table persists token, expiry, IP address, user agent, and timestamps. | Implemented. |
| Workspace route guard | `src/proxy.ts` redirects `/workspace*` without a `__Secure-better-auth.session_token` or `better-auth.session_token` cookie. | Implemented first gate; cookie presence only. |
| Server mutation guard | Each project artifact creation action calls `auth.api.getSession({ headers: await headers() })`. | Implemented and stronger than the proxy guard. |
| Public header state | `SiteHeader` calls `auth.api.getSession` and displays Sign In or Workspace/sign-out controls. | Implemented. |
| Sign out | Public header and Workspace nav call `authClient.signOut()` and redirect. | Implemented. |

## User and authentication tables

- `user`: id, name, unique email, email verification flag, image, timestamps.
- `session`: token, expiry, IP/user-agent metadata, timestamps, and cascading `userId` relation.
- `account`: Better Auth provider/account credentials and optional token fields, cascading `userId` relation.
- `verification`: identifier/value/expiry records for Better Auth verification flows.

The domain schema has no reference to `user.id`. Authentication identities and Workspace data are currently separate ownership domains.

## Authorization boundaries

| Boundary | Enforced today | Not enforced today |
| --- | --- | --- |
| Account creation | Allow-listed email environment variable. | Invitation records, expiry, role assignment, audit trail, or revalidation after creation. |
| Sign in | Better Auth credentials. | Allow-list enforcement on existing accounts. |
| `/workspace` navigation | Cookie-presence redirect in proxy. | Full session verification at every server-rendered read route. |
| Artifact creation | Valid Better Auth session required by server actions. | Role, project membership, organization, or field-level permission. |
| Artifact reads | Protected by proxy route entry. | User-specific data filtering or server-side session check in page/query code. |
| Settings | Route is protected by proxy. | Actual profile/workspace settings operations. |

## Current authenticated experience

An approved user can create an account, sign in, arrive at the Workspace dashboard, navigate a desktop sidebar or mobile horizontal navigation, review shared project/knowledge records, add project-scoped milestones, notes, documents, and prompts, and sign out. The public header detects a valid session to expose Workspace access.

## Reusable foundations

- Better Auth server configuration, route handler, client, and error-normalization helper.
- Environment-based allowed-email check and user-facing invite-only message.
- Server-action pattern that obtains a session from request headers before mutation.
- Responsive sign-in/sign-up and sign-out controls.

## Gaps recorded for baseline purposes

- No authorization roles, memberships, or ownership model.
- No domain artifact creator/editor identity or audit fields.
- No explicit authorization helper shared by server pages and actions.
- Proxy session check is not equivalent to session validation.
- No password reset, email verification UI, account recovery, profile editing, or invitation administration surface is present in application code.

These are inventory findings, not proposed changes.
