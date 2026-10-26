/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // SF Pro on Apple devices, Inter everywhere else
        sans: ["-apple-system", "BlinkMacSystemFont", "var(--font-body)", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SF Mono", "var(--font-mono)", "Menlo", "monospace"],
      },
      colors: {
        canvas: "#f5f5f7",
        ink: {
          DEFAULT: "#1d1d1f",
          2: "#6e6e73",
          3: "#86868b",
        },
        // The one colour on the site
        azure: {
          DEFAULT: "#0071e3",
          hover: "#0077ed",
          soft: "#e8f2fd",
        },
      },
      letterSpacing: {
        display: "-0.035em",
      },
    },
  },
  plugins: [],
};
