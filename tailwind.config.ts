
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        border: "hsl(220 13% 91%)",
        input: "hsl(220 13% 91%)",
        ring: "hsl(28 50% 52%)",
        background: "hsl(0 0% 100%)",
        foreground: "hsl(240 10% 3.9%)",
        primary: {
          DEFAULT: "hsl(28 50% 52%)",
          foreground: "hsl(0 0% 98%)",
        },
        secondary: {
          DEFAULT: "hsl(60 9.1% 97.8%)",
          foreground: "hsl(240 5.9% 10%)",
        },
        accent: {
          DEFAULT: "hsl(28 29% 55%)",
          foreground: "hsl(240 5.9% 10%)",
        },
        muted: {
          DEFAULT: "hsl(60 4.8% 95.9%)",
          foreground: "hsl(240 3.8% 46.1%)",
        },
        card: "hsl(0 0% 100%)",
        mint: "hsl(120 60% 95%)",
        destructive: {
          DEFAULT: "hsl(0 84.2% 60.2%)",
          foreground: "hsl(0 0% 98%)",
        },
        popover: {
          DEFAULT: "hsl(0 0% 100%)",
          foreground: "hsl(240 10% 3.9%)",
        },
        // New luxe 2025 palette
        luxury: {
          blush: "hsl(332 43% 96%)",
          champagne: "hsl(30 36% 82%)",
          cognac: "hsl(36 35% 55%)",
          amber: "hsl(28 50% 47%)",
          emerald: "hsl(152 73% 28%)",
          espresso: "hsl(177 40% 16%)",
          dark: "hsl(30 33% 12%)",
        }
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.25rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out",
        "fade-in": "fade-in 0.4s ease-out",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
      },
      screens: {
        'xs': '475px',
      },
      fontWeight: {
        'extra-bold': '800',
        'black': '900',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
