import BannerInfoVacancies from "@/app/screens/home/components/BannerInfoVacancies";
import FormHomeSearch from "@/app/screens/home/components/FormHomeSearch";
import { LayoutAppBar } from "@/app/ui/layouts/layout-app-bar/LayoutAppBar";
import LayoutForms from "@/app/ui/layouts/LayoutForms";
import { containers } from "@/app/utils/sizes/constants/containers";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { usePageTranslations } from "@/app/modules/translations/hooks/usePageTranslations";
import { PAGE_CODES } from "@/app/modules/translations/constants/pageCodes";
import { View } from "react-native";

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
        <BannerInfoVacancies />
        <View
          style={{
            paddingHorizontal: hp(containers.horizontalScreen),
          }}
        >
          <FormHomeSearch />
        </View>
      </LayoutForms>
    </LayoutAppBar>
  );
}
