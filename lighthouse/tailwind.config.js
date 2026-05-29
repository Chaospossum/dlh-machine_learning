/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--app-font)", "system-ui", "sans-serif"],
      },
      colors: {
        accent: "var(--accent)",
        "accent-soft": "var(--accent-soft)",
      },
    },
  },
  plugins: [],
};
