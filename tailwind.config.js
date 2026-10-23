/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./templates/**/*.html", "./content/**/*.py", "./static/js/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        title: ["Instrument Serif", "Georgia", "serif"],
        body: ["Manrope", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      colors: {
        table: "#e7ece9",
        slate: "#d6e1dc",
        felt: "#f7f8f4",
        parchment: "#142027",
        "parchment-dk": "#e8eeea",
        ink: "#142027",
        gold: "#1f6b5a",
        bronze: "#3e5f6b",
        ember: "#2e7d67",
      },
      boxShadow: {
        card: "none",
        glow: "none",
      },
    },
  },
  plugins: [],
};
