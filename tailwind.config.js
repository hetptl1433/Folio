/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Latent Space — near-black void so emissive points read as light, not paint.
        void: "#05060B",
        background: "#05060B",
        surface: "#0C0F1A",
        "surface-2": "#10131F",
        "surface-3": "#161A28",
        grid: "#1A2036",
        hairline: "#222842",

        // Cluster signals
        violet: "#7C5CFF", // ML / research mass
        "violet-soft": "#A48CFF",
        teal: "#2DE2C9", // full-stack / shipping mass
        "teal-soft": "#7BF0DE",
        ember: "#FF7A45", // the rare anomaly / highlight / CTA
        "ember-soft": "#FFA277",

        // Text
        text: "#E8ECF8",
        "text-dim": "#8A90A8",
        "text-faint": "#5A6076",

        // Back-compat aliases (legacy class names sprinkled around)
        primary: "#7C5CFF",
        secondary: "#2DE2C9",
        tertiary: "#FF7A45",
        "on-surface": "#E8ECF8",
        "on-surface-variant": "#8A90A8",
        "on-background": "#E8ECF8",
        outline: "#5A6076",
        "outline-variant": "#222842",
        error: "#FF6B6B",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
        // legacy aliases
        "body-md": ["Inter", "sans-serif"],
        "body-lg": ["Inter", "sans-serif"],
        "headline-md": ["Space Grotesk", "sans-serif"],
        "headline-lg": ["Space Grotesk", "sans-serif"],
        "label-md": ["JetBrains Mono", "monospace"],
        code: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        "label-md": [
          "13px",
          { lineHeight: "1.2", letterSpacing: "0.18em", fontWeight: "500" },
        ],
        code: ["13px", { lineHeight: "1.6", letterSpacing: "0.02em" }],
        "body-md": ["16px", { lineHeight: "1.7", fontWeight: "400" }],
        "body-lg": ["18px", { lineHeight: "1.7", fontWeight: "400" }],
        "headline-md": ["clamp(1.6rem, 3vw, 2.4rem)", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "600" }],
        "headline-lg": ["clamp(2.2rem, 6vw, 4.5rem)", { lineHeight: "1.02", letterSpacing: "-0.03em", fontWeight: "700" }],
        "headline-lg-mobile": ["clamp(2rem, 9vw, 3rem)", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "700" }],
        display: ["clamp(3rem, 11vw, 8.5rem)", { lineHeight: "0.94", letterSpacing: "-0.04em", fontWeight: "700" }],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.5rem",
        full: "9999px",
      },
      spacing: {
        "stack-sm": "12px",
        "stack-md": "32px",
        "stack-lg": "96px",
        unit: "8px",
        gutter: "24px",
        "margin-mobile": "20px",
        "margin-desktop": "64px",
      },
      maxWidth: {
        "container-max": "1320px",
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(124, 92, 255, 0.35)",
        "glow-teal": "0 0 40px -8px rgba(45, 226, 201, 0.35)",
        "glow-ember": "0 0 44px -6px rgba(255, 122, 69, 0.45)",
      },
      keyframes: {
        "blink-cursor": {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.45", transform: "scale(0.82)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "blink-cursor": "blink-cursor 1.05s steps(1) infinite",
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        "pulse-dot": "pulse-dot 2.4s ease-in-out infinite",
        marquee: "marquee 26s linear infinite",
      },
    },
  },
  plugins: [],
};
