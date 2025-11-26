import { TextStyles } from "@/app/theme/TextStyles";
import { colors } from "@/app/utils/sizes/constants/colors";
import { containers } from "@/app/utils/sizes/constants/containers";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

interface BackButtonProps {
  label: string;
}

const BackButton = ({ label }: BackButtonProps) => {
  const onPress = () => {
    router.back();
  };
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <FontAwesome name="arrow-left" size={hp("2%")} color={colors.primary} />
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    gap: hp("1%"),
    marginBottom: hp(containers.bottomComponent),
  },
  text: {
    ...TextStyles.p,
  },
});
