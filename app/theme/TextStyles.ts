import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { fontSizes } from "../utils/sizes/constants/fontSizes";
import { StyleSheet } from "react-native";

export const TextStyles = StyleSheet.create({
  h1: {
    fontSize: wp(fontSizes.h1),
    fontWeight: "bold",
    lineHeight: hp(fontSizes.lineHeightH1),
  },
  h2: {
    fontSize: wp(fontSizes.h2),
    fontWeight: "bold",
    lineHeight: hp(fontSizes.lineHeightH2),
  },
  h3: {
    fontSize: wp(fontSizes.h3),
    fontWeight: "bold",
    lineHeight: hp(fontSizes.lineHeightH3),
  },
  h4: {
    fontSize: wp(fontSizes.h4),
    fontWeight: "500",
    lineHeight: hp(fontSizes.lineHeightH4),
  },
  h5: {
    fontSize: wp(fontSizes.h5),
    fontWeight: "500",
    lineHeight: hp(fontSizes.lineHeightH5),
  },
  h6: {
    fontSize: wp(fontSizes.h6),
    fontWeight: "500",
    lineHeight: hp(fontSizes.lineHeightH6),
  },
  p: {
    fontSize: wp(fontSizes.p),
    lineHeight: hp(fontSizes.lineHeightP),
  },
  button: {
    fontSize: wp(fontSizes.button),
    lineHeight: hp(fontSizes.lineHeightButton),
  },
  small: {
    fontSize: wp(fontSizes.small),
    lineHeight: hp(fontSizes.lineHeightSmall),
  },
  medium: {
    fontSize: wp(fontSizes.medium),
    lineHeight: hp(fontSizes.lineHeightMedium),
  },
});
