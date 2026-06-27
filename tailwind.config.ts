import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-manrope)", "Manrope", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-cormorant)", "\"Cormorant Garamond\"", "Georgia", "serif"],
        manrope: ["var(--font-manrope)", "Manrope", "Inter", "system-ui", "sans-serif"],
        cormorant: ["var(--font-cormorant)", "\"Cormorant Garamond\"", "Georgia", "serif"],
        fraunces: ["var(--font-fraunces)", "Fraunces", "Georgia", "serif"],
        inter: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "\"IBM Plex Mono\"", "ui-monospace", "monospace"]
      },
      fontSize: {
        "ractysh-hero": [
          "clamp(4rem, 7vw, 7rem)",
          { lineHeight: "0.95", letterSpacing: "0", fontWeight: "700" }
        ],
        "ractysh-section": [
          "clamp(2.8rem, 4vw, 5rem)",
          { lineHeight: "0.96", letterSpacing: "0", fontWeight: "700" }
        ],
        "ractysh-card": [
          "clamp(1.5rem, 2vw, 2.2rem)",
          { lineHeight: "1", letterSpacing: "0", fontWeight: "600" }
        ]
      },
      colors: {
        porcelain: "#FAF8F4",
        ink: {
          DEFAULT: "#1B1611",
          50: "#f7f7f5",
          100: "#ededeb",
          200: "#d9d9d5",
          300: "#b8b8b2",
          400: "#8d8d86",
          500: "#676762",
          600: "#4a4a45",
          700: "#333330",
          800: "#1f1f1d",
          900: "#10100f",
          950: "#070707"
        },
        charcoal: "#3A332C",
        oxblood: {
          DEFAULT: "#7E1A2A",
          dark: "#6A1523",
          light: "#9B2E40"
        },
        "antique-gold": {
          DEFAULT: "#C49A3A",
          light: "#D4AA4A",
          muted: "#A88530"
        },
        champagne: "#F0E6D2"
      },
      boxShadow: {
        glow: "0 0 80px rgba(255,255,255,0.14)",
        glass: "inset 0 1px 0 rgba(255,255,255,0.14), 0 20px 80px rgba(0,0,0,0.34)"
      },
      backgroundImage: {
        "radial-soft": "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.16), transparent 42%)",
        "luxury-line": "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)"
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        "ticker-scroll": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        }
      },
      animation: {
        "fade-in": "fade-in 0.8s ease-out",
        "ticker-scroll": "ticker-scroll 30s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
