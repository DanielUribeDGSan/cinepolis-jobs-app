import { FormattedText } from "@/app/modules/localization/translations/components/FormattedText";
import { colors } from "@/app/utils/sizes/constants/colors";
import { containers } from "@/app/utils/sizes/constants/containers";
import { View } from "react-native";
import { TextStyles } from "../../../theme/TextStyles";

const BannerInfoVacancies = () => {
  return (
    <View>
      <View
        style={{
          paddingTop: containers.topScreen,
          paddingBottom: containers.bottomSection,
        }}
      >
        <FormattedText
          idResourceCode={2}
          style={{
            ...TextStyles.h1,
            marginBottom: containers.bottomParagraph,
            color: colors.primary,
          }}
        />
        <FormattedText idResourceCode={390} style={{ ...TextStyles.p }} />
        <FormattedText
          idResourceCode={391}
          style={{
            ...TextStyles.p,
            marginBottom: containers.bottomParagraph,
          }}
        />
        <FormattedText
          idResourceCode={5}
          style={{ ...TextStyles.p, color: colors.primary }}
        />
      </View>
    </View>
  );
};

export default BannerInfoVacancies;
