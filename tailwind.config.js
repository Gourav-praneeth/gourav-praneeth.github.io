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
        table: "#f8f2e8",
        slate: "#eee8f7",
        felt: "#fffdf9",
        parchment: "#252126",
        "parchment-dk": "#ece2d6",
        ink: "#252126",
        gold: "#6f50d9",
        bronze: "#b54836",
        ember: "#2f7d63",
      },
      boxShadow: {
        card: "0 18px 50px -24px rgba(70,55,83,0.32)",
        glow: "0 0 0 1px rgba(111,80,217,0.2), 0 14px 34px -16px rgba(111,80,217,0.45)",
      },
    },
  },
  plugins: [],
};
