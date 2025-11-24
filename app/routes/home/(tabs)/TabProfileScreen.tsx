import { ScrollView } from "react-native";
import { useScrollDetection } from "@/app/ui/layouts/tab-layout/hooks/useScrollDetection";
import LanguageSelector from "@/app/modules/localization/lenguage/components/LanguageSelector";

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
    </ScrollView>
  );
}
