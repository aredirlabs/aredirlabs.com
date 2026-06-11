const PRODUCTION_FALLBACK =
  process.env.BETTER_AUTH_URL ??
  process.env.NEXT_PUBLIC_SITE_URL ??
  "http://localhost:3000";

export const authTrustedOrigins = [
  PRODUCTION_FALLBACK,
  "http://localhost:3000",
  "https://*.vercel.app",
];

export const authBaseURL =
  process.env.NODE_ENV === "production"
    ? {
        allowedHosts: [
          "aredirlabs.com",
          "www.aredirlabs.com",
          "*.vercel.app",
        ],
        fallback: PRODUCTION_FALLBACK,
      }
    : PRODUCTION_FALLBACK;
