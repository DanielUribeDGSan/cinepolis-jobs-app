export const fontSizes = {
  h1: "8%",
  lineHeightH1: "4%",
  h2: "7%",
  lineHeightH2: "3.8%",
  h3: "6%",
  lineHeightH3: "3.2%",
  h4: "5%",
  lineHeightH4: "2.5%",
  h5: "4%",
  lineHeightH5: "2.3%",
  h6: "3%",
  lineHeightH6: "1.5%",
  p: "2%",
  lineHeightP: "2.5%",
  button: "2%",
  lineHeightButton: "2.5%",
  medium: "2%",
  lineHeightMedium: "2%",
  small: "3%",
  lineHeightSmall: "1.5%",
};

export const spacesSizes = {
  bottomTitle: "3%",
  bottomSection: "3%",
  topSection: "3%",
  leftSection: "3%",
  rightSection: "3%",
  horizontalSection: "3%",
  verticalSection: "3%",
  borderRadiusButton: "1%",
  paddingButton: "1%",
  heightButton: "8%",
  widthButton: "1%",
};

export type SpacesSizesKey = keyof typeof spacesSizes;
export type FontSizeKey = keyof typeof fontSizes;
