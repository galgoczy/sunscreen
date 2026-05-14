import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 192, height: 192 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #FFF8E1 0%, #FFE082 100%)",
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
              "radial-gradient(circle at 30% 30%, #FFFEF6 0%, #FFC107 80%)",
            boxShadow: "0 0 40px 10px rgba(255, 179, 0, 0.45)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
