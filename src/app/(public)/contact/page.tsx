import type { Metadata } from "next";

import { Eyebrow } from "@/components/eyebrow";
import { PublicPageHero } from "@/components/public-page-hero";
import { SectionShell } from "@/components/section-shell";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: `Contact ${siteConfig.name} for partnerships, feedback, and inquiries.`,
});

export default function ContactPage() {
  return (
    <>
      <PublicPageHero
        eyebrow="Get in Touch"
        title="Contact"
        description={
          <p>
            For partnerships, product feedback, or general inquiries, reach out
            by email. We respond as capacity allows.
          </p>
        }
      />
      <SectionShell>
        <div className="mx-auto max-w-3xl border-y border-border py-10 sm:py-12">
          <Eyebrow>Get in Touch</Eyebrow>
          <p className="mt-4">
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="rounded-sm font-heading text-2xl font-semibold tracking-tight text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-3xl"
            >
              {siteConfig.contactEmail}
            </a>
          </p>
          <p className="mt-6 text-sm text-muted-foreground">
            No contact form in this version—email is the fastest way to reach us.
          </p>
        </div>
      </SectionShell>
    </>
  );
}
