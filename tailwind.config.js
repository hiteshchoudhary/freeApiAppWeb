/** @type {import('tailwindcss').Config} */

// Colours are CSS variables (RGB channels in globals.css) so they flip with the theme and still take opacity modifiers
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

module.exports = {
  darkMode: "class",
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
        canvas: token("canvas"),
        surface: token("surface"),
        ink: {
          DEFAULT: token("ink"),
          2: token("ink-2"),
          3: token("ink-3"),
        },
        // The one colour on the site
        azure: {
          DEFAULT: token("azure"),
          hover: token("azure-hover"),
          soft: "var(--azure-soft)",
        },
      },
      letterSpacing: {
        display: "-0.035em",
      },
    },
  },
  plugins: [],
};
