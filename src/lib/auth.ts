import { APIError, betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { authBaseURL, authTrustedOrigins } from "@/lib/auth-config";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import {
  getWorkspaceInviteOnlyMessage,
  isWorkspaceEmailAllowed,
} from "@/lib/workspace-access";

type AuthBodyWithEmail = {
  body?: {
    email?: unknown;
  };
};

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
    usePlural: false,
  }),
  emailAndPassword: {
    enabled: true,
  },
  hooks: {
    before: async (ctx) => {
      const pathname = ctx.request
        ? new URL(ctx.request.url).pathname.replace(/^\/api\/auth/, "")
        : "";

      if (pathname !== "/sign-up/email") {
        return;
      }

      const email = (ctx as AuthBodyWithEmail).body?.email;

      if (typeof email !== "string" || !isWorkspaceEmailAllowed(email)) {
        throw APIError.from("FORBIDDEN", {
          code: "WORKSPACE_REGISTRATION_INVITE_ONLY",
          message: getWorkspaceInviteOnlyMessage(),
        });
      }
    },
  },
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: authBaseURL,
  trustedOrigins: authTrustedOrigins,
});
