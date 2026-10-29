import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#08338F",
          teal: "#00B8E0",
          black: "#121C26",
          white: "#FFFFFF"
        },
        neutral: {
          50: "#F6F8FB",
          100: "#EDF1F7",
          200: "#DCE3ED",
          400: "#8A96A8",
          600: "#4A5666",
          800: "#243040"
        }
      },
      fontFamily: {
        sans: ["Onest", "system-ui", "sans-serif"]
      },
      animation: {
        "fade-in": "fadeIn 0.9s ease-out forwards",
        "fade-up": "fadeUp 0.9s ease-out forwards"
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
