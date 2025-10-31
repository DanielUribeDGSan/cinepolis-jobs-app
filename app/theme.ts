import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#05102a",
    primaryContainer: "#05102a",
    secondary: "#4781ff",
    secondaryContainer: "#4781ff",
    tertiary: "#15274d",
    tertiaryContainer: "#15274d",
    quaternary: "#edf2ff",
    quaternaryContainer: "#edf2ff",
    surface: "#FFFFFF",
    surfaceVariant: "#F5F5F5",
    background: "#FAFAFA",
    error: "#FF3B30",
    onPrimary: "#FFFFFF",
    onSecondary: "#FFFFFF",
    onSurface: "#1C1C1E",
    onBackground: "#1C1C1E",
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#007AFF",
    primaryContainer: "#1A365D",
    secondary: "#FF6B35",
    background: "#000000",
    surface: "#1C1C1E",
    onSurface: "#FFFFFF",
  },
};

export const navigationLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#05102a",
    background: "#FAFAFA",
    card: "#FFFFFF",
    text: "#1C1C1E",
    border: "#E5E7EB",
    notification: "#4781ff",
  },
};

export const navigationDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#4781ff",
    background: "#000000",
    card: "#1C1C1E",
    text: "#FFFFFF",
    border: "#374151",
    notification: "#4781ff",
  },
};
