import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm clay. `ink-soft`/`ink-faint` are the only hierarchy tools besides
        // italic and whitespace — there is no bold anywhere in this design.
        paper: "#f0e7dc",
        "paper-deep": "#e7dccf",
        ink: "#2b2521",
        "ink-soft": "rgba(43, 37, 33, 0.65)",
        "ink-faint": "rgba(43, 37, 33, 0.35)",
        accent: "#9c5a3c",
        rule: "rgba(43, 37, 33, 0.14)",
        // Aliases kept so any straggling `border-border` / `bg-background` resolves.
        background: "#f0e7dc",
        foreground: "#2b2521",
        muted: "rgba(43, 37, 33, 0.65)",
        border: "rgba(43, 37, 33, 0.14)",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "Times New Roman", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
