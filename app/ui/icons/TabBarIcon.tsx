import { colors } from "@/app/utils/sizes/constants/colors";
import useGetFontSize from "@/app/utils/sizes/hooks/useGetFontSize";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { View } from "react-native";

export default function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
  focused: boolean;
}) {
  const { height } = useGetFontSize();
  return (
    <View
      className={`rounded-full items-center justify-center ${props.focused ? "bg-theme-secondary" : ""}`}
      style={{ width: height("5%"), height: height("5%") }}
    >
      <FontAwesome
        size={height("3%")}
        {...props}
        color={props.focused ? colors.white : colors.white}
      />
    </View>
  );
}
