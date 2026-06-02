import type { Metadata } from "next";

import { Eyebrow } from "@/components/eyebrow";
import { SectionShell } from "@/components/section-shell";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: `Contact ${siteConfig.name} for partnerships, feedback, and inquiries.`,
});

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-grid mask-fade-b pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <SectionShell className="relative pt-16">
        <div className="mx-auto max-w-xl">
          <Eyebrow>Get in Touch</Eyebrow>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Contact
          </h1>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            For partnerships, product feedback, or general inquiries, reach out
            by email. We respond as capacity allows.
          </p>

          <div className="relative mt-10 overflow-hidden rounded-lg border border-border bg-card p-8">
            <span
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
              aria-hidden
            />
            <Eyebrow>Email</Eyebrow>
            <p className="mt-3">
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="rounded-sm text-lg font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
    </section>
  );
}
