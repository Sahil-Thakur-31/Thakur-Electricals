import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 70% 30%, #3a1f0a 0%, #0d0b0a 55%, #0d0b0a 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 96,
              height: 96,
              borderRadius: "9999px",
              border: "4px solid #ff8a2a",
              fontSize: 56,
            }}
          >
            ⚡
          </div>
          <div style={{ display: "flex", fontSize: 72, fontWeight: 700, color: "#fff6ea" }}>
            Thakur&nbsp;<span style={{ color: "#ff8a2a" }}>Electricals</span>
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 34, color: "#f4c869", fontWeight: 600 }}>
          {siteConfig.tagline}
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#d8cfc7", marginTop: 18 }}>
          Electrical Sales · Services · Repairing — Vadgaon Budruk, Pune
        </div>
      </div>
    ),
    { ...size }
  );
}
