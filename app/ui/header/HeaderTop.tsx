import { Pressable, SafeAreaView, StyleSheet, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Text } from "react-native-paper";
import { colors } from "@/app/utils/sizes/constants/colors";

export default function HeaderTop({ title }: { title: string }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View className="px-5 py-4  text-white border-b border-gray-100">
        <View className="flex-row items-center justify-between">
          <View className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center">
            <FontAwesome name="user" size={16} color="#6B7280" />
          </View>

          <Text className="text-2xl font-bold text-white">{title}</Text>

          <Pressable className="w-8 h-8 rounded-full bg-orange-500 items-center justify-center">
            <FontAwesome name="plus" size={16} color="white" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.white,
  },
});
