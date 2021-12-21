// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        rubik: "Rubik, sans-serif",
      },
      colors: {
        correct: {
          base: "#B3EA3E",
          dark: "#9EDD18",
        },
        wrong: {
          base: "#F65A5A",
          dark: "#E93535",
        },
        general: {
          base: "#4D7EFF",
          dark: "#255EF4",
        },
        generalOrange: {
          base: "#FFB340",
          dark: "#E58A00",
        },
        default: {
          base: "#FCFCFC",
          dark: "#F5F5F5",
        },
        disabled: "#D1D1D1",
      },
    },
  },
};
