import { containers } from "@/app/utils/sizes/constants/containers";
import { View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { TextStyles } from "../../../theme/TextStyles";
import FormattedText from "@/app/modules/translations/components/FormattedText";

const BannerInfoVacancies = () => {
  return (
    <View
      style={{
        paddingBottom: hp(containers.bottomComponent),
      }}
    >
      <FormattedText
        idResourceCode={2}
        style={{
          ...TextStyles.h1,
          marginBottom: hp(containers.bottomParagraph),
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

      <FormattedText idResourceCode={5} style={{ ...TextStyles.p }} />
    </View>
  );
};

export default BannerInfoVacancies;
