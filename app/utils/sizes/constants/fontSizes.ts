import { heightPercentageToDP as hp } from "react-native-responsive-screen";
export const fontSizes = {
  h1: hp("3.5%"),
  lineHeightH1: hp("3.6%"),
  h2: hp("3%"),
  lineHeightH2: hp("3.1%"),
  h3: hp("2.8%"),
  lineHeightH3: hp("2.9%"),
  h4: hp("2.6%"),
  lineHeightH4: hp("2.7%"),
  h5: hp("2.4%"),
  lineHeightH5: hp("2.5%"),
  h6: hp("2.2%"),
  lineHeightH6: hp("2.4%"),
  p: hp("2.3%"),
  lineHeightP: hp("2.4%"),
  button: hp("2%"),
  lineHeightButton: hp("2.5%"),
  medium: hp("2.1%"),
  lineHeightMedium: hp("2.2%"),
  small: hp("1.9%"),
  lineHeightSmall: hp("2%"),
  verySmall: hp("1.7%"),
  lineHeightVerySmall: hp("1.8%"),
};

export const spacesSizes = {
  bottomTitle: hp("3%"),
  bottomSection: hp("3%"),
  topSection: hp("3%"),
  leftSection: hp("3%"),
  rightSection: hp("3%"),
  horizontalSection: hp("3%"),
  verticalSection: hp("3%"),
  borderRadiusButton: hp("1%"),
  paddingButton: hp("1%"),
  heightButton: hp("7%"),
  widthButton: hp("1%"),
};

export type SpacesSizesKey = keyof typeof spacesSizes;
export type FontSizeKey = keyof typeof fontSizes;
