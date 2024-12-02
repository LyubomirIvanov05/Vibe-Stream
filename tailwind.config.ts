import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        component_bg: "#121212;",
        button_bg: "#363535",
        song_bg: "#613447",
        side_hovered_song: "#1f1f1f",
        your_library: "#b3b3b3"
      },
      width: {
        'custom-420': "26.25rem",
        'custom-640': "40rem"
      },
      height: {
        'custom-85%': "85%"
      }
    },
  },
  plugins: [],
} satisfies Config;
