export const content = ["./src/**/*.{astro,html,js,jsx}"];
export const theme = {
  extend: {
    colors: {
      primary: {
        DEFAULT: "#2C3E50",
        dark: "#243342",
      },
      accent: {
        DEFAULT: "#C8A97E",
        dark: "#B8976F",
      },
      background: "#F8F6F2",
      text: "#1A1A1A",
      muted: "#7A7A7A",
    },
    fontFamily: {
      heading: ["Playfair Display", "serif"],
      body: ["Inter", "sans-serif"],
    },
  },
};
