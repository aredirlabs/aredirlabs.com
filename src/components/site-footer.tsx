import Link from "next/link";

import { SiteLogo } from "@/components/site-logo";
import { navItems, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type SiteFooterProps = {
  className?: string;
};

export function SiteFooter({ className }: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn("relative border-t border-grid-line bg-card/40", className)}
      role="contentinfo"
    >
      <div className="bg-grid mask-fade-b pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-3">
            <SiteLogo />
            <p className="max-w-xs text-sm text-muted-foreground">
              {siteConfig.tagline}
            </p>
          </div>
          <nav aria-label="Footer">
            <ul className="flex flex-col gap-2 sm:items-end">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-grid-line pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="text-foreground/80 underline-offset-4 transition-colors hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {siteConfig.contactEmail}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
