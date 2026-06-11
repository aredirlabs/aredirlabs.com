"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import { runAuthAction } from "@/lib/auth-form";
import { SiteLogo } from "@/components/site-logo";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const result = await runAuthAction(
        () =>
          authClient.signIn.email({
            email,
            password,
          }),
        {
          fallbackMessage:
            "Sign in failed. Check your email, password, and connection.",
        },
      );

      if (result.error) {
        setError(result.error);
        return;
      }

      router.push("/workspace");
      router.refresh();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-[80dvh] items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <SiteLogo
            variant="lockup"
            size="md"
            className="mx-auto justify-center"
          />
          <h1 className="mt-6 text-xl font-semibold tracking-tight">
            Sign in to Workspace
          </h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Workspace access is limited to approved Aredir Labs users.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-foreground"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Signing in…" : "Sign In"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Registration is invite-only.
        </p>
      </div>
    </div>
  );
}
