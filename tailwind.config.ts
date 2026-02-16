import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eefbf8",
          100: "#d6f4ee",
          500: "#0f766e",
          600: "#0c5f59",
          700: "#0a4f4a"
        }
      }
    }
  },
  plugins: []
};

export default config;
