import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/engineering-operating-system",
        destination: "/engineering",
        permanent: true,
      },
      {
        source: "/docs/company",
        destination: "/engineering",
        permanent: true,
      },
      {
        source: "/docs/company/:path*",
        destination: "/engineering",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
