/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        app: {
          bg: "#0B0F17",
          surface: "#121826",
          text: "#E5E7EB",
          muted: "#9CA3AF",
          border: "rgba(255,255,255,0.08)",
          accent: "#14B8A6",
          secondary: "#60A5FA",
          accentText: "#041414",
          danger: "#EF4444",
        },
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(20,184,166,0.25), 0 12px 40px rgba(20,184,166,0.10)",
      },
      borderRadius: {
        xl: "1rem",
      },
    },
  },
  plugins: [],
};
