import FormHomeSearch from "@/app/screens/home/components/FormHomeSearch";
import { LayoutAppBar } from "@/app/ui/layouts/layout-app-bar/LayoutAppBar";
import LayoutForms from "@/app/ui/layouts/LayoutForms";
import { containers } from "@/app/utils/sizes/constants/containers";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { usePageTranslations } from "@/app/modules/translations/hooks/usePageTranslations";
import { PAGE_CODES } from "@/app/modules/translations/constants/pageCodes";
import { View } from "react-native";
import OnboardingSlider from "@/app/ui/components/carousel/HomeCarusel";

// Constante fuera del componente para evitar recreación en cada render
const HOME_PAGE_CODES = [PAGE_CODES.HOME];

export default function TabHomeScreen() {
  usePageTranslations(HOME_PAGE_CODES);

  return (
    <LayoutAppBar
      styleScrollViewContent={{ paddingTop: 0 }}
      viewContainerContent={{
        paddingHorizontal: 0,
        paddingTop: 0,
        paddingBottom: hp(containers.bottomComponent),
      }}
    >
      <LayoutForms>
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
        />

        <View
          style={{
            marginTop: hp("-5%"),
          }}
        >
          <FormHomeSearch />
        </View>
      </LayoutForms>
    </LayoutAppBar>
  );
}
