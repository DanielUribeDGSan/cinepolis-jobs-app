import LanguageSelector from "@/app/modules/localization/lenguage/components/LanguageSelector";
import { LayoutAppBar } from "@/app/ui/layouts/layout-app-bar/LayoutAppBar";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  return (
    <LayoutAppBar
      showAppBar={true}
      showSafeArea={true}
      styleScrollViewContent={{ paddingTop: 0 }}
      viewContainerContent={{ paddingHorizontal: 0 }}
    >
      <LanguageSelector />
      <View className="flex-row justify-center items-center gap-2">
        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: "routes/auth/LoginScreen" as any,
            });
          }}
        >
          <Text>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: "routes/auth/RegisterScreen" as any,
            });
          }}
        >
          <Text>Registro</Text>
        </TouchableOpacity>
      </View>
    </LayoutAppBar>
  );
}
