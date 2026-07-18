/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: { 200: "#D5DAE1" },
        black: { DEFAULT: "#000", 500: "#1D2235" },
        blue: { 500: "#2b77e7" },
        // soft pastel accents for the aurora / micro-interactions (light theme)
        sky2: "#00c6ff",
        ocean: "#0072ff",
        mint: "#7af2c8",
        peach: "#ffd0a6",
        lilac: "#c9b8ff",
        rose: "#ffb3d1",
      },
      fontFamily: {
        worksans: ["Work Sans", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        card: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)",
        soft: "0 18px 40px -20px rgba(0,114,255,0.35)",
        lift: "0 30px 60px -28px rgba(0,114,255,0.45)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(28px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        pop: {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "60%": { opacity: "1", transform: "scale(1.04)" },
          "100%": { transform: "scale(1)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-7px)" },
        },
        "float-slow": {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(20px,-24px) scale(1.06)" },
        },
        blob: {
          "0%,100%": { borderRadius: "42% 58% 63% 37% / 41% 44% 56% 59%" },
          "50%": { borderRadius: "63% 37% 38% 62% / 55% 64% 36% 45%" },
        },
        "gradient-pan": {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        wiggle: {
          "0%,100%": { transform: "rotate(0deg)" },
          "20%": { transform: "rotate(16deg)" },
          "40%": { transform: "rotate(-9deg)" },
          "60%": { transform: "rotate(13deg)" },
          "80%": { transform: "rotate(-5deg)" },
        },
        "bob-arrow": {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
        ripple: {
          to: { transform: "scale(4)", opacity: "0" },
        },
        "spin-slow": { to: { transform: "rotate(360deg)" } },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in": "fade-in 0.6s ease both",
        pop: "pop 0.5s cubic-bezier(0.34,1.56,0.64,1) both",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 14s ease-in-out infinite",
        blob: "blob 12s ease-in-out infinite",
        "gradient-pan": "gradient-pan 6s ease infinite",
        shimmer: "shimmer 2.5s linear infinite",
        marquee: "marquee 28s linear infinite",
        wiggle: "wiggle 1.4s ease-in-out 0.6s both",
        "bob-arrow": "bob-arrow 1.6s ease-in-out infinite",
        "spin-slow": "spin-slow 22s linear infinite",
        "pulse-ring": "pulse-ring 1.8s ease-out infinite",
      },
    },
  },
  plugins: [],
};
