import { content as _content, plugin } from "flowbite-react/tailwind";
/** @type {import('tailwindcss').Config} */
export const content = [
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",

  // Or if using `src` directory:
  "./src/**/*.{js,ts,jsx,tsx,mdx}",
  _content(),
];
export const theme = {
  screens: {
    sm: "480px",
    md: "768px",
    lg: "976px",
    xl: "1440px",
  },
  extend: {},
};
export const plugins = [plugin({ charts: true, forms: true, tooltips: true })];
