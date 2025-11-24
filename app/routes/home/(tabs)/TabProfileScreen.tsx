import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useScrollDetection } from "@/app/ui/layouts/tab-layout/hooks/useScrollDetection";
import LanguageSelector from "@/app/modules/localization/lenguage/components/LanguageSelector";
import { router } from "expo-router";

export default function TabProfileScreen() {
  const { handleScroll } = useScrollDetection();

  return (
    <ScrollView
      style={{ flex: 1, padding: 1 }}
      className="bg-theme-backgroundScreen"
      onScroll={handleScroll}
      scrollEventThrottle={16}
      keyboardShouldPersistTaps="handled"
      nestedScrollEnabled={true}
    >
      <LanguageSelector />
      <View className="flex-row justify-center items-center gap-2">
        <TouchableOpacity
          onPress={() => {
            router.push("/routes/auth/LoginScreen");
          }}
        >
          <Text>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            router.push("/routes/auth/LoginScreen");
          }}
        >
          <Text>Registro</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
