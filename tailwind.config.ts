import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sun: {
          50: "#FFF8E1",
          100: "#FFECB3",
          200: "#FFE082",
          300: "#FFD54F",
          400: "#FFCA28",
          500: "#FFB300",
          600: "#FFA000",
          700: "#FF8F00",
          800: "#FF6F00",
        },
        sky: {
          50: "#E3F2FD",
          100: "#BBDEFB",
          200: "#90CAF9",
          300: "#64B5F6",
          400: "#42A5F5",
          500: "#1E88E5",
          600: "#1976D2",
          700: "#1565C0",
          800: "#0D47A1",
        },
        ink: {
          DEFAULT: "#102A43",
          soft: "#334E68",
          mute: "#627D98",
        },
        cream: "#FFFBF2",
      },
      fontFamily: {
        sans: [
          "Inter",
          "DM Sans",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 6px 24px -8px rgba(16,42,67,0.18), 0 2px 6px -2px rgba(16,42,67,0.08)",
      },
      keyframes: {
        pulseSun: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.05)", opacity: "0.92" },
        },
        flash: {
          "0%, 100%": { backgroundColor: "transparent" },
          "50%": { backgroundColor: "rgba(255,179,0,0.35)" },
        },
      },
      animation: {
        pulseSun: "pulseSun 2.4s ease-in-out infinite",
        flash: "flash 1s ease-in-out 3",
      },
    },
  },
  plugins: [],
};

export default config;
