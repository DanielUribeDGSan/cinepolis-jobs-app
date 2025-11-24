import { containers } from "@/app/utils/sizes/constants/containers";
import { View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { TextStyles } from "../../../theme/TextStyles";
import FormattedText from "@/app/modules/localization/translations/components/FormattedText";

import { colors } from "@/app/utils/sizes/constants/colors";

const BannerInfoVacancies = () => {
  return (
    <View>
      <View
        style={{
          paddingTop: hp(containers.topScreen),
          paddingBottom: hp(containers.bottomComponent),
        }}
      >
        <FormattedText
          idResourceCode={2}
          style={{
            ...TextStyles.h1,
            marginBottom: hp(containers.bottomParagraph),
            color: colors.primary,
          }}
        />
        <FormattedText idResourceCode={390} style={{ ...TextStyles.p }} />
        <FormattedText
          idResourceCode={391}
          style={{
            ...TextStyles.p,
            marginBottom: hp(containers.bottomParagraph),
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
