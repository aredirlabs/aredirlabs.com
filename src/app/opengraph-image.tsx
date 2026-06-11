import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site-config";

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const markBuffer = await readFile(
    join(process.cwd(), "public/brand/aredir-mark-dark.png"),
  );
  const markSrc = `data:image/png;base64,${markBuffer.toString("base64")}`;

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
          background: "#0a0c14",
          color: "#e8ebf2",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "linear-gradient(90deg, #0a0c14, #007aff, #0a0c14)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            marginBottom: 36,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markSrc} alt="" width={112} height={112} />
          <span style={{ fontSize: 40, fontWeight: 600 }}>{siteConfig.name}</span>
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
      </div>
    ),
    { ...size },
  );
}
