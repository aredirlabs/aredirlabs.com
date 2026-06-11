import { createAuthClient } from "better-auth/react";

// Same-origin auth requests — do not hardcode NEXT_PUBLIC_SITE_URL here.
// Production may be served from *.vercel.app while the apex domain still
// points elsewhere; Better Auth resolves window.location.origin in the browser.
export const authClient = createAuthClient();
