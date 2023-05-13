const { createThemes } = require('tw-colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./components/**/**/**/*.{php,js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    createThemes({
      light: {
        primary: "#E5ECF2",
        tertiary: "#091E42",
        "content-bg": "#EFF1FC",
        "lightest-version": "#F6F7FD"
      }
    }),
    // Initialize with default values (see options below)
    require("tailwindcss-radix")(),
  ],
}

