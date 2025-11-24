import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { fontSizes } from "../utils/sizes/constants/fontSizes";
import { StyleSheet } from "react-native";

export const TextStyles = StyleSheet.create({
  h1: {
    fontSize: hp(fontSizes.h1),
    fontWeight: "900",
    lineHeight: hp(fontSizes.lineHeightH1),
  },
  h2: {
    fontSize: hp(fontSizes.h2),
    fontWeight: "800",
    lineHeight: hp(fontSizes.lineHeightH2),
  },
  h3: {
    fontSize: hp(fontSizes.h3),
    fontWeight: "700",
    lineHeight: hp(fontSizes.lineHeightH3),
  },
  h4: {
    fontSize: hp(fontSizes.h4),
    fontWeight: "500",
    lineHeight: hp(fontSizes.lineHeightH4),
  },
  h5: {
    fontSize: hp(fontSizes.h5),
    fontWeight: "500",
    lineHeight: hp(fontSizes.lineHeightH5),
  },
  h6: {
    fontSize: hp(fontSizes.h6),
    fontWeight: "500",
    lineHeight: hp(fontSizes.lineHeightH6),
  },
  p: {
    fontSize: hp(fontSizes.p),
    lineHeight: hp(fontSizes.lineHeightP),
  },
  button: {
    fontSize: hp(fontSizes.button),
    lineHeight: hp(fontSizes.lineHeightButton),
  },
  small: {
    fontSize: hp(fontSizes.small),
    lineHeight: hp(fontSizes.lineHeightSmall),
  },
  verySmall: {
    fontSize: hp(fontSizes.verySmall),
    lineHeight: hp(fontSizes.lineHeightVerySmall),
  },
  medium: {
    fontSize: hp(fontSizes.medium),
    lineHeight: hp(fontSizes.lineHeightMedium),
  },
});
