import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const runtime = "edge";
export const alt = SITE.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "linear-gradient(135deg, #FFF8E1 0%, #FFE082 60%, #FFB300 100%)",
          padding: "80px",
          fontFamily: "system-ui, -apple-system, Inter, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "#FF8F00",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 10px 30px rgba(255,143,0,0.4)",
            }}
          />
          <div
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: "#102A43",
            }}
          >
            {SITE.name}
          </div>
        </div>
        <div
          style={{
            fontSize: 88,
            fontWeight: 900,
            color: "#102A43",
            lineHeight: 1.05,
            letterSpacing: -2,
            maxWidth: 1000,
          }}
        >
          Reapply on time. Every time.
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 32,
            color: "#334E68",
            maxWidth: 900,
          }}
        >
          Live UV index + skin type + activity. A real countdown for sunscreen reapplication.
        </div>
      </div>
    ),
    { ...size }
  );
}
