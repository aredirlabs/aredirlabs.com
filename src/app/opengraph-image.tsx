import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site-config";

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          padding: 80,
          background: "#0f1729",
          color: "#f8fafc",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: "#1e3a5f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            A
          </div>
          <span style={{ fontSize: 36, fontWeight: 600 }}>{siteConfig.name}</span>
        </div>
        <p style={{ fontSize: 40, fontWeight: 600, lineHeight: 1.2, maxWidth: 900 }}>
          Building focused software for real-world workflows.
        </p>
        <p style={{ fontSize: 24, color: "#94a3b8", marginTop: 24 }}>
          {siteConfig.tagline}
        </p>
        <div
          style={{
            position: "absolute",
            bottom: 80,
            right: 80,
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "#d97736",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
