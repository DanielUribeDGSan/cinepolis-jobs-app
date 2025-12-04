import LanguageSelector from "@/app/modules/localization/lenguage/components/LanguageSelector";
import { useScrollDetection } from "@/app/ui/layouts/tab-layout/hooks/useScrollDetection";
import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

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
          <Text>Registro2</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 20, padding: 16, gap: 12 }}>
        <TouchableOpacity
          onPress={() => {
            router.push("/routes/test/HomeTestScreen" as any);
          }}
          style={{
            backgroundColor: "#34C759",
            padding: 12,
            borderRadius: 8,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}>
            🧪 Probar Home Sin LayoutAppBar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            router.push("/routes/test/KeyboardTestScreen" as any);
          }}
          style={{
            backgroundColor: "#007AFF",
            padding: 12,
            borderRadius: 8,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}>
            🧪 Probar Teclado (Inputs Nativos)
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
