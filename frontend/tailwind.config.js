/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        app: {
          bg: "#222831",
          surface: "#31363F",
          text: "#EEEEEE",
          muted: "rgba(238,238,238,0.7)",
          border: "rgba(238,238,238,0.14)",
          accent: "#76ABAE",
          secondary: "#76ABAE",
          accentText: "#222831",
          danger: "#EF4444",
        },
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(118,171,174,0.25), 0 12px 40px rgba(118,171,174,0.10)",
      },
      borderRadius: {
        xl: "1rem",
      },
    },
  },
  plugins: [],
};
