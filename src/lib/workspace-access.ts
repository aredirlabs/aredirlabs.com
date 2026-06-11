const INVITE_ONLY_MESSAGE = "Workspace registration is invite-only.";

export function getWorkspaceInviteOnlyMessage() {
  return INVITE_ONLY_MESSAGE;
}

export function getWorkspaceAllowedEmails() {
  return new Set(
    (process.env.WORKSPACE_ALLOWED_EMAILS ?? "")
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean),
  );
}

export function isWorkspaceEmailAllowed(email: string) {
  return getWorkspaceAllowedEmails().has(email.trim().toLowerCase());
}
