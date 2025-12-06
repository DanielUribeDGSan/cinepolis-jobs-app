import LanguageSelector from "@/app/modules/localization/lenguage/components/LanguageSelector";
import { userStorage } from "@/app/modules/users/utils/storage/userStorage";
import { LayoutAppBar } from "@/app/ui/layouts/layout-app-bar/LayoutAppBar";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  const handleLogout = async () => {
    await userStorage.clearUser();
    router.replace({
      pathname: "routes/auth/LoginScreen" as any,
    });
  };

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
        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: "routes/auth/VerificationCodeScreen" as any,
            });
          }}
        >
          <Text>Verificación de código</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-center items-center mt-4">
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-red-500 px-6 py-3 rounded-lg"
        >
          <Text className="text-white font-semibold">Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </LayoutAppBar>
  );
}
