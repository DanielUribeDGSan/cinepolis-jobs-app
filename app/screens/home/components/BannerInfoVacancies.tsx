import { containers } from "@/app/utils/sizes/constants/containers";
import { View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { TextStyles } from "../../../theme/TextStyles";
import FormattedText from "@/app/modules/translations/components/FormattedText";
import OnboardingSlider from "@/app/ui/components/carousel/HomeCarusel";
import { colors } from "@/app/utils/sizes/constants/colors";

const BannerInfoVacancies = () => {
  return (
    <View
      style={{
        paddingBottom: hp(containers.bottomComponent),
      }}
    >
      <OnboardingSlider
        slides={[
          {
            id: 1,
            image: require("@/assets/images/bg/bg-1.webp"),
          },
          {
            id: 2,
            image: require("@/assets/images/bg/bg-2.avif"),
          },
          {
            id: 3,
            image: require("@/assets/images/bg/bg-3.webp"),
          },
        ]}
      >
        <>
          <FormattedText
            idResourceCode={2}
            style={{
              ...TextStyles.h1,
              marginBottom: hp(containers.bottomParagraph),
              color: colors.white,
            }}
          />

          <FormattedText
            idResourceCode={5}
            style={{ ...TextStyles.p, color: colors.white }}
          />
        </>
      </OnboardingSlider>
    </View>
  );
};

export default BannerInfoVacancies;
