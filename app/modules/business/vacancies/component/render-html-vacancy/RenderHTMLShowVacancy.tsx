import { StyleProps } from "@/app/types/Style";
import { colors } from "@/app/utils/sizes/constants/colors";
import { fontSizes } from "@/app/utils/sizes/constants/fontSizes";
import React, { useMemo } from "react";
import { View } from "react-native";
import RenderHTML from "react-native-render-html";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

interface RenderHTMLShowVacancyProps {
  html: string;
  style?: StyleProps;
}

export const RenderHTMLShowVacancy = ({
  html,
  style,
}: RenderHTMLShowVacancyProps) => {
  const tagsStyles = useMemo(
    () => ({
      p: {
        fontSize: fontSizes.p,
        lineHeight: fontSizes.lineHeightP,
        color: colors.primary,
      },
      h1: {
        fontSize: fontSizes.h2,
        lineHeight: fontSizes.lineHeightH2,
        color: colors.primary,
      },
      h2: {
        fontSize: fontSizes.h3,
        lineHeight: fontSizes.lineHeightH3,
        color: colors.primary,
      },
      h3: {
        fontSize: fontSizes.h4,
        lineHeight: fontSizes.lineHeightH4,
        color: colors.primary,
      },
      h4: {
        fontSize: fontSizes.h5,
        lineHeight: fontSizes.lineHeightH5,
        color: colors.primary,
      },
      h5: {
        fontSize: fontSizes.h6,
        lineHeight: fontSizes.lineHeightH6,
        color: colors.primary,
      },
      h6: {
        fontSize: fontSizes.h6,
        lineHeight: fontSizes.lineHeightH6,
        color: colors.primary,
      },
      ul: {
        fontSize: fontSizes.p,
        lineHeight: fontSizes.lineHeightP,
        color: colors.primary,
      },
      li: {
        fontSize: fontSizes.p,
        lineHeight: fontSizes.lineHeightP,
        color: colors.primary,
      },
    }),
    []
  );

  const contentWidth = useMemo(() => wp("100%"), []);
  return (
    <View style={style}>
      <RenderHTML
        tagsStyles={tagsStyles}
        contentWidth={contentWidth}
        source={{ html: html }}
      />
    </View>
  );
};
