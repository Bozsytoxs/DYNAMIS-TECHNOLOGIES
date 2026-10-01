import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: { colors: { ink: "#0b1f4a", teal: "#0b5cff", amber: "#c49a22", paper: "#f6f8fc" /* teal = logo blue */ } } },
} satisfies Config;
