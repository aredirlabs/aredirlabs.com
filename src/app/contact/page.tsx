import type { Metadata } from "next";

import { SectionShell } from "@/components/section-shell";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: `Contact ${siteConfig.name} for partnerships, feedback, and inquiries.`,
});

export default function ContactPage() {
  return (
    <SectionShell className="pt-12">
      <div className="mx-auto max-w-xl">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Contact
        </h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          For partnerships, product feedback, or general inquiries, reach out by
          email. We respond as capacity allows.
        </p>

        <div className="mt-10 rounded-xl border border-border bg-card p-8">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Email
          </h2>
          <p className="mt-2">
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="text-lg font-medium text-brand-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              {siteConfig.contactEmail}
            </a>
          </p>
          <p className="mt-6 text-sm text-muted-foreground">
            Placeholder contact address—update when a production inbox is
            configured. No form or backend integration in this version.
          </p>
        </div>
      </div>
    </SectionShell>
  );
}
