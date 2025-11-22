import { colors } from "./app/utils/sizes/constants/colors";
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/(tabs)/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Colores de Cinépolis
        theme: {
          1: colors.primary,
          2: colors.secondary,
          3: colors.tertiary,
          4: colors.quaternary,
          inputsGray: colors.inputsGray,
          white: colors.white,
          black: colors.black,
          gray: colors.gray,
          lightGray: colors.lightGray,
          darkGray: colors.darkGray,
          veryDarkGray: colors.veryDarkGray,
          veryLightGray: colors.veryLightGray,
          borderColor: colors.borderColor,
          error: colors.error,
          backgroundScreen: colors.backgroundScreen,
        },

        // Grises personalizados
        "gray-custom": {
          50: "#f5f5f5",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
      },
      // También puedes extender otros aspectos
      spacing: {
        18: "4.5rem",
        88: "22rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
