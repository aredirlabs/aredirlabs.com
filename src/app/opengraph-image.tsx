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
          background: "#14161c",
          color: "#e8ebf2",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "linear-gradient(90deg, #14161c, #4b8eff, #14161c)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            marginBottom: 36,
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 14,
              background: "#1d2740",
              border: "1px solid #39435c",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 700,
              color: "#cdddff",
            }}
          >
            A
          </div>
          <span style={{ fontSize: 36, fontWeight: 600 }}>{siteConfig.name}</span>
        </div>
        <p style={{ fontSize: 46, fontWeight: 600, lineHeight: 1.15, maxWidth: 960 }}>
          Building intelligent software that helps people learn, perform, and
          make better decisions.
        </p>
        <p
          style={{
            fontSize: 22,
            color: "#9aa3b8",
            marginTop: 26,
            fontFamily: "monospace",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          AI-powered SaaS · Quality engineering · Product development
        </p>
        {/* ember apex dot */}
        <div
          style={{
            position: "absolute",
            bottom: 80,
            right: 80,
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: "#ffb95f",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
