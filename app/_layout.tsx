import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import Toast from "react-native-toast-message";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useColorScheme } from "@/components/useColorScheme";
import "../global.css";
import {
  navigationLightTheme,
  navigationDarkTheme,
  darkTheme,
  lightTheme,
} from "./theme";
import { LanguageProvider } from "./modules/lenguage/contexts/LanguageContext";
import { TranslationsProvider } from "./modules/translations/contexts/TranslationsContext";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  const paperTheme = colorScheme === "dark" ? darkTheme : lightTheme;
  const navigationTheme =
    colorScheme === "dark" ? navigationDarkTheme : navigationLightTheme;

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TranslationsProvider>
          <PaperProvider theme={paperTheme}>
            <ThemeProvider value={navigationTheme}>
              <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen
                  name="routes/auth/LoginScreen"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="routes/auth/RegisterScreen"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="routes/home/(tabs)"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="routes/home/modal"
                  options={{ presentation: "modal", headerShown: false }}
                />
              </Stack>
            </ThemeProvider>
            <Toast />
          </PaperProvider>
        </TranslationsProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}
