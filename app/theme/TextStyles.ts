import { StyleSheet } from "react-native";
import { fontSizes } from "../utils/sizes/constants/fontSizes";

export const TextStyles = StyleSheet.create({
  h1: {
    fontSize: fontSizes.h1,
    fontWeight: "900",
    lineHeight: fontSizes.lineHeightH1,
  },
  h2: {
    fontSize: fontSizes.h2,
    fontWeight: "800",
    lineHeight: fontSizes.lineHeightH2,
  },
  h3: {
    fontSize: fontSizes.h3,
    fontWeight: "700",
    lineHeight: fontSizes.lineHeightH3,
  },
  h4: {
    fontSize: fontSizes.h4,
    fontWeight: "500",
    lineHeight: fontSizes.lineHeightH4,
  },
  h5: {
    fontSize: fontSizes.h5,
    fontWeight: "500",
    lineHeight: fontSizes.lineHeightH5,
  },
  h6: {
    fontSize: fontSizes.h6,
    fontWeight: "500",
    lineHeight: fontSizes.lineHeightH6,
  },
  p: {
    fontSize: fontSizes.p,
    lineHeight: fontSizes.lineHeightP,
  },
  button: {
    fontSize: fontSizes.button,
    lineHeight: fontSizes.lineHeightButton,
  },
  small: {
    fontSize: fontSizes.small,
    lineHeight: fontSizes.lineHeightSmall,
  },
  verySmall: {
    fontSize: fontSizes.verySmall,
    lineHeight: fontSizes.lineHeightVerySmall,
  },
  medium: {
    fontSize: fontSizes.medium,
    lineHeight: fontSizes.lineHeightMedium,
  },
});
