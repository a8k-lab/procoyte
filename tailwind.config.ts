import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      white: "#FFFFFF",
      black: "#18181B",
      muted: "#F4F4F5",
      "muted-foreground": "#71717A",
      primary: "#1A96F7",
      secondary: "#24B78F",
      error: "#EB5757",
      warning: "#FFBB3E",
      destructive: "#EF4444",
    },
    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)"],
        inter: ["var(--font-inter)"],
      },
    },
  },
  plugins: [],
};

export default config;
