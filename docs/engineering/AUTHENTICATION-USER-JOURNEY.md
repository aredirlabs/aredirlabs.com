# Authentication User Journey

## Sign in

```text
Public site → /sign-in → email + password → Better Auth validates credentials
                                              ├─ success → /workspace
                                              └─ failure → generic credential error
```

The public header makes sign-in discoverable. A successful form submission routes to `/workspace` and refreshes the client so session-aware UI updates. `/workspace` redirects a browser without a session cookie to `/sign-in`; server mutations subsequently verify the Better Auth session.

The sign-in page must add a visible recovery link. It should not offer a public registration link, because activation is initiated through controlled administrator communication. Its errors should remain generic: do not distinguish an unknown email, bad password, unapproved address, or a future disabled account.

There is no present locked/disabled-account state. If one is introduced later, it belongs to an account status/authorization decision and should retain the same non-enumerating sign-in response.

## Account activation

```text
Administrator approves exact email → sends /sign-up activation link → user submits registration
                                                                    ├─ allowed → account + session → /workspace
                                                                    ├─ unapproved → invite-only guidance
                                                                    └─ existing → sign in or recover password
```

The link explains where to start; the allow-list decides who may finish. Registration remains enabled only for allow-listed addresses. An approved account that already exists should not attempt re-registration; the user signs in or follows recovery.

## Password recovery

```text
/sign-in → Forgot password → /forgot-password → submit email → generic confirmation
                                                            ↓
                                               email with Better Auth link
                                                            ↓
                                          Better Auth validates token and redirects
                                                            ↓
                                         /reset-password?token=… → new password + confirmation
                                                            ├─ valid → reset, revoke sessions, /sign-in
                                                            └─ invalid/expired → safe retry state
```

The reset token must be treated as a credential. The reset page must not send it to analytics, logs, error reporting, or third-party resources. After a completed reset, all sessions are revoked and the user signs in anew.

## Ownership boundaries across the journey

| Journey point | Authentication | Authorization / membership |
| --- | --- | --- |
| Sign in | Credential validation and session creation. | Later workspace access decisions. |
| Activation | Allow-listed identity can create an account. | No role or project membership is granted by the allow-list. |
| Recovery | Proves control of account email and changes a credential. | Does not alter role, membership, or project access. |
| Workspace access | Valid session establishes identity. | Current product has shared workspace access; future roles/memberships decide scope. |
