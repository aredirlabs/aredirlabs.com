import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";

const defaultTitle = siteConfig.name;
const defaultDescription = siteConfig.tagline;

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: defaultTitle,
    template: `%s · ${defaultTitle}`,
  },
  description: defaultDescription,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    title: defaultTitle,
    description: defaultDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
};

export function pageMetadata({
  title,
  description,
}: {
  title: string;
  description: string;
}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title: `${title} · ${siteConfig.name}`,
      description,
    },
    twitter: {
      title: `${title} · ${siteConfig.name}`,
      description,
    },
  };
}
