import FormHomeSearch from "@/app/screens/home/components/FormHomeSearch";
import { LayoutAppBar } from "@/app/ui/layouts/layout-app-bar/LayoutAppBar";
import LayoutForms from "@/app/ui/layouts/LayoutForms";
import { containers } from "@/app/utils/sizes/constants/containers";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import { BottomSheetVacancies } from "@/app/modules/business/vacancies/component/bottom-sheet-vacancies/BottomSheetVacancies";
import OnboardingSlider from "@/app/ui/components/carousel/HomeCarusel";
import { View } from "react-native";
import { useTabHomeScreen } from "./hooks/useTabHomeScreen";

export default function TabHomeScreen() {
  const { isBottomSheetOpen, filters, slides, onSubmit, onCloseBottomSheet } =
    useTabHomeScreen();

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
        <OnboardingSlider slides={slides} />
        <View
          style={{
            marginTop: hp("-5%"),
          }}
        >
          <FormHomeSearch onSubmit={onSubmit} />
        </View>
      </LayoutForms>
      <BottomSheetVacancies
        filters={filters}
        isOpen={isBottomSheetOpen}
        onClose={onCloseBottomSheet}
      />
    </LayoutAppBar>
  );
}
