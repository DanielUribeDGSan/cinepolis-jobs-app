import { StyleProps } from "@/app/types/Style";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface LogoJobsProps {
  width?: number;
  height?: number;
  imageSource?: string;
  className?: string;
  style?: StyleProps;
}

const LogoJobs = ({
  width = wp("70%"),
  height = hp("10%"),
  imageSource = require("@/assets/images/logos/logo-black.png"),
  className,
  style,
}: LogoJobsProps) => {
  return (
    <View className={className ?? ""} style={style}>
      <Image
        source={imageSource}
        contentFit="contain"
        transition={1000}
        style={[styles.image, { width, height }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    alignSelf: "center",
    objectFit: "contain",
  },
});

export default LogoJobs;
