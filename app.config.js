// app.config.js
import "dotenv/config";

export default {
  expo: {
    name: "cinepolis-jobs-app",
    slug: "cinepolis-jobs-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.danieluribedg.cinepolis-jobs-app",
      infoPlist: {
        NSAppTransportSecurity: {
          NSAllowsArbitraryLoads: true,
        },
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.danieluribedg.cinepolisjobsapp",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: ["expo-router", "expo-secure-store"],
    experiments: {
      typedRoutes: true,
    },
    updates: {
      url: "https://u.expo.dev/04a2da44-2cb7-4c21-a82f-3581b7ebe71b",
    },
    runtimeVersion: "1.0.0",
    extra: {
      apiUrl:
        process.env.API_URL ||
        "https://cinepolis-jobs-dev.azurewebsites.net/api",
      environment: process.env.NODE_ENV || "development",
      eas: {
        projectId: "04a2da44-2cb7-4c21-a82f-3581b7ebe71b",
      },
    },
  },
};
