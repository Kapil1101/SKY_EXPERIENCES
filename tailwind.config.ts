import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: "#FF6B00",
        "warm-orange": "#FF9933",
        navy: "#1A1A2E",
        gold: "#FFD700",
        cream: "#FFF8F0",
        sage: "#4A7C59",
        muted: "#6B7280",
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      animation: {
        "breathe": "breathe 6s ease-in-out infinite",
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "marquee": "marquee 30s linear infinite",
      },
      keyframes: {
        breathe: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.4" },
          "50%": { transform: "scale(1.3)", opacity: "0.8" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;

