import { FormattedText } from "@/app/modules/localization/translations/components/FormattedText";
import { TextStyles } from "@/app/theme/TextStyles";
import { colors } from "@/app/utils/sizes/constants/colors";
import { containers } from "@/app/utils/sizes/constants/containers";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

interface BannerBackgroundGradientProps {
  imagePath: string | number;
  titleIdResourceCode: number;
}

export const BannerBackgroundGradient = ({
  imagePath,
  titleIdResourceCode,
}: BannerBackgroundGradientProps) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#4781ff", "#15274d", "#05102a"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.imageContainer}>
            <Image
              source={
                typeof imagePath === "string" ? { uri: imagePath } : imagePath
              }
              style={styles.image}
              contentFit="cover"
              priority="high"
            />
          </View>
          <View style={styles.textOverlay}>
            <LinearGradient
              colors={[
                "rgba(5, 16, 42, 0.97)",
                "rgba(5, 16, 42, 0.97)",
                "rgba(5, 16, 42, 0.5)",
                "transparent",
              ]}
              locations={[0, 0.5, 0.7, 1]}
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={styles.gradientOverlay}
            >
              <View style={styles.textContainer}>
                <FormattedText
                  idResourceCode={titleIdResourceCode}
                  style={styles.title}
                />
              </View>
            </LinearGradient>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp("100%"),
    height: hp("60%"),
    borderRadius: 0,
    overflow: "hidden",
  },
  gradient: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  imageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  image: {
    width: wp("100%"),
    height: hp("55%"),
    resizeMode: "cover",
  },
  textOverlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "80%",
  },
  gradientOverlay: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    paddingBottom: hp("4%"),
    paddingHorizontal: containers.horizontalScreen,
  },
  textContainer: {
    width: wp("100%"),
    alignItems: "flex-start",
  },
  title: {
    ...TextStyles.h1,
    color: colors.white,
    textAlign: "left",
    letterSpacing: 0.5,
  },
});
