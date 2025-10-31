const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Configurar Expo Router para usar screens/ en lugar de app/
config.resolver.alias = {
  ...config.resolver.alias,
  app: "./routes",
};

module.exports = withNativeWind(config, { input: "./global.css" });
