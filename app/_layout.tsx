import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider as PaperProvider } from "react-native-paper";
import Toast from "react-native-toast-message";

import { useColorScheme } from "@/components/useColorScheme";
import "../global.css";
import { LanguageProvider } from "./modules/localization/lenguage/contexts/LanguageContext";
import { TranslationsProvider } from "./modules/localization/translations/contexts/TranslationsContext";
import {
  darkTheme,
  lightTheme,
  navigationDarkTheme,
  navigationLightTheme,
} from "./theme";
import FullScreenLoader from "./ui/components/loaders/full-screen/FullScreenLoader";
import { FullScreenLoaderProvider } from "./ui/components/loaders/full-screen/FullScreenLoaderContext";
import { DrawerComponent } from "./ui/drawer/DrawerComponent";
import { DrawerProvider } from "./ui/drawer/DrawerContext";

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <FullScreenLoaderProvider>
            <TranslationsProvider>
              <DrawerProvider>
                <PaperProvider theme={paperTheme}>
                  <ThemeProvider value={navigationTheme}>
                    <Stack>
                      <Stack.Screen
                        name="index"
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="routes/home/HomeScreen"
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="routes/home/ProfileScreen"
                        options={{ headerShown: false }}
                      />
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
                        name="routes/vacancies/DetailVacancyScreen"
                        options={{ headerShown: false }}
                      />
                    </Stack>
                    <DrawerComponent />
                  </ThemeProvider>
                  <Toast />
                  <FullScreenLoader />
                </PaperProvider>
              </DrawerProvider>
            </TranslationsProvider>
          </FullScreenLoaderProvider>
        </LanguageProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
