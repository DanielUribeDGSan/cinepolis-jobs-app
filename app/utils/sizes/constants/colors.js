// Este archivo re-exporta los colores desde el archivo TypeScript
// para que pueda ser usado en archivos de configuración CommonJS/ESM

const colors = {
  primary: "#05102a",
  secondary: "#4781ff",
  tertiary: "#15274d",
  quaternary: "#edf2ff",
  inputsGray: "#eceef1",
  white: "#ffffff",
  black: "#000000",
  gray: "#808080",
  lightGray: "#d3d3d3",
  darkGray: "#a9a9a9",
  veryDarkGray: "#808080",
  veryLightGray: "#d3d3d3",
  borderColor: "#c7cdd6",
  error: "#ff4c4c",
  backgroundScreen: "#f5f5f5",
};

module.exports = colors;
module.exports.default = colors;
