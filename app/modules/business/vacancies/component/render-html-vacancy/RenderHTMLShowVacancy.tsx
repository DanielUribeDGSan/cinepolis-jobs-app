import { StyleProps } from "@/app/types/Style";
import { colors } from "@/app/utils/sizes/constants/colors";
import { fontSizes } from "@/app/utils/sizes/constants/fontSizes";
import React, { useMemo } from "react";
import { View } from "react-native";
import RenderHTML from "react-native-render-html";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

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
        fontSize: hp(fontSizes.p),
        lineHeight: hp(fontSizes.lineHeightP),
        color: colors.primary,
      },
      h1: {
        fontSize: hp(fontSizes.h2),
        lineHeight: hp(fontSizes.lineHeightH2),
        color: colors.primary,
      },
      h2: {
        fontSize: hp(fontSizes.h3),
        lineHeight: hp(fontSizes.lineHeightH3),
        color: colors.primary,
      },
      h3: {
        fontSize: hp(fontSizes.h4),
        lineHeight: hp(fontSizes.lineHeightH4),
        color: colors.primary,
      },
      h4: {
        fontSize: hp(fontSizes.h5),
        lineHeight: hp(fontSizes.lineHeightH5),
        color: colors.primary,
      },
      h5: {
        fontSize: hp(fontSizes.h6),
        lineHeight: hp(fontSizes.lineHeightH6),
        color: colors.primary,
      },
      h6: {
        fontSize: hp(fontSizes.h6),
        lineHeight: hp(fontSizes.lineHeightH6),
        color: colors.primary,
      },
      ul: {
        fontSize: hp(fontSizes.p),
        lineHeight: hp(fontSizes.lineHeightP),
        color: colors.primary,
      },
      li: {
        fontSize: hp(fontSizes.p),
        lineHeight: hp(fontSizes.lineHeightP),
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
