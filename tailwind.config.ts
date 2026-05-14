import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sun: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
        },
        sky: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
        },
        peach: {
          50: "#FFF7ED",
          100: "#FFEDD5",
          200: "#FED7AA",
          300: "#FDBA74",
          400: "#FB923C",
        },
        ink: {
          DEFAULT: "#0F172A",
          soft: "#334155",
          mute: "#64748B",
          faint: "#94A3B8",
        },
        cream: "#FFFCF5",
        paper: "#FEFCF7",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        display: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      boxShadow: {
        card: "0 1px 0 0 rgba(255,255,255,0.6) inset, 0 1px 2px -1px rgba(15,23,42,0.06), 0 12px 32px -12px rgba(245,158,11,0.18), 0 24px 48px -24px rgba(15,23,42,0.12)",
        soft: "0 1px 2px -1px rgba(15,23,42,0.06), 0 8px 24px -12px rgba(15,23,42,0.10)",
        glow: "0 6px 24px -6px rgba(245,158,11,0.45)",
        ring: "0 0 0 1px rgba(245,158,11,0.15), 0 8px 24px -8px rgba(245,158,11,0.25)",
        innerHighlight: "inset 0 1px 0 0 rgba(255,255,255,0.4)",
      },
      backgroundImage: {
        "sun-gradient": "linear-gradient(180deg, #FBBF24 0%, #D97706 100%)",
        "sun-gradient-hover": "linear-gradient(180deg, #FCD34D 0%, #B45309 100%)",
        "sky-gradient": "linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)",
        "warm-mesh":
          "radial-gradient(at 0% 0%, rgba(253, 230, 138, 0.6) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(254, 215, 170, 0.5) 0px, transparent 50%), radial-gradient(at 50% 100%, rgba(254, 240, 138, 0.4) 0px, transparent 50%)",
      },
      keyframes: {
        pulseSun: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.05)", opacity: "0.92" },
        },
        flash: {
          "0%, 100%": { backgroundColor: "transparent" },
          "50%": { backgroundColor: "rgba(251,191,36,0.30)" },
        },
        pulseRays: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.85" },
          "50%": { transform: "scale(1.06)", opacity: "1" },
        },
        spinSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        floatY: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        slideUp: {
          "0%": { transform: "translateY(110%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        pulseSun: "pulseSun 2.4s ease-in-out infinite",
        flash: "flash 1s ease-in-out 3",
        pulseRays: "pulseRays 3.2s ease-in-out infinite",
        spinSlow: "spinSlow 90s linear infinite",
        floatY: "floatY 5s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        slideUp: "slideUp 0.45s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
