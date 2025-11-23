import { ScrollView, Text } from "react-native";
import { useScrollDetection } from "@/app/ui/layouts/tab-layout/hooks/useScrollDetection";

export default function TabMyVacancies() {
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
      <Text>Vacantes</Text>
    </ScrollView>
  );
}
