
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
        sans: ["Outfit", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "system-ui", "sans-serif"],
        sharp: ["Space Grotesk", "system-ui", "sans-serif"],
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
        // Luxe 2025 palette with your specified colors
        luxury: {
          blush: "hsl(340 36% 96%)", // #f9edf0
          champagne: "hsl(24 41% 82%)", // #e6c8b7  
          cognac: "hsl(34 36% 55%)", // #c3955b
          amber: "hsl(28 50% 47%)", // #ba6a36
          emerald: "hsl(152 73% 28%)", // keeping emerald as is
          espresso: "hsl(177 40% 16%)", // #1c3934
          dark: "hsl(30 33% 12%)", // #261311
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
      },
      letterSpacing: {
        'tighter': '-0.04em',
        'tight': '-0.02em',
        'normal': '0',
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.1em',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
