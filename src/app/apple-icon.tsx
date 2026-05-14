import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #FFE082 0%, #FFA000 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 110,
            height: 110,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 30% 30%, #FFFEF6 0%, #FFB300 80%)",
            boxShadow: "0 0 40px 12px rgba(255, 143, 0, 0.55)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
