/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'gray-900': '#111827',
        'gray-800': '#1F2937',
        'gray-700': '#374151',
        'blue-600': '#2563EB',
        'blue-700': '#1D4ED8',
      },
    },
  },
  plugins: [],
};
