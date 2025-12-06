import { truncateHtmlText } from "@/app/modules/shared/utils/truncateHtmlText";
import { colors } from "@/app/utils/sizes/constants/colors";
import { fontSizes } from "@/app/utils/sizes/constants/fontSizes";
import React, { useMemo } from "react";
import RenderHTML from "react-native-render-html";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

interface RenderHTMLVacancyProps {
  html: string;
}

export const RenderHTMLVacancy = ({ html }: RenderHTMLVacancyProps) => {
  const tagsStyles = useMemo(
    () => ({
      p: {
        fontSize: fontSizes.small,
        lineHeight: fontSizes.lineHeightSmall,
        color: colors.primary,
      },
      h1: {
        fontSize: fontSizes.h4,
        lineHeight: fontSizes.lineHeightH4,
        color: colors.primary,
      },
      h2: {
        fontSize: fontSizes.h4,
        lineHeight: fontSizes.lineHeightH4,
        color: colors.primary,
      },
      h3: {
        fontSize: fontSizes.h4,
        lineHeight: fontSizes.lineHeightH4,
        color: colors.primary,
      },
      h4: {
        fontSize: fontSizes.h4,
        lineHeight: fontSizes.lineHeightH4,
        color: colors.primary,
      },
      h5: {
        fontSize: fontSizes.h4,
        lineHeight: fontSizes.lineHeightH4,
        color: colors.primary,
      },
      h6: {
        fontSize: fontSizes.h4,
        lineHeight: fontSizes.lineHeightH4,
        color: colors.primary,
      },
      ul: {
        fontSize: fontSizes.small,
        lineHeight: fontSizes.lineHeightSmall,
        color: colors.primary,
      },
      li: {
        fontSize: fontSizes.small,
        lineHeight: fontSizes.lineHeightSmall,
        color: colors.primary,
      },
    }),
    []
  );

  const contentWidth = useMemo(() => wp("100%"), []);
  return (
    <RenderHTML
      tagsStyles={tagsStyles}
      contentWidth={contentWidth}
      source={{ html: truncateHtmlText(html, 300) }}
    />
  );
};
