import { SafeAreaView, StyleSheet, StatusBar } from "react-native";

import { colors } from "@/app/utils/sizes/constants/colors";

export default function HeaderTop() {
  return (
    <>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <SafeAreaView style={styles.safeArea} />
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.primary,
  },
});
