const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

config.transformer = {
  ...config.transformer,
  minifierConfig: {
    ...config.transformer?.minifierConfig,
  },
};

config.resolver = {
  ...config.resolver,
  blacklistRE: /node_modules\/.*\/node_modules\/react-native\/.*/,
};

config.resolver.alias = {
  ...config.resolver.alias,
  app: "./routes",
  "@": "./",
};

module.exports = withNativeWind(config, { input: "./global.css" });
