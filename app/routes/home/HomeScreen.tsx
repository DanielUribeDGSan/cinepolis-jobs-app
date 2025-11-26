import FormHomeSearch from "@/app/screens/home/components/FormHomeSearch";
import { LayoutAppBar } from "@/app/ui/layouts/layout-app-bar/LayoutAppBar";
import LayoutForms from "@/app/ui/layouts/LayoutForms";

import { BottomSheetVacancies } from "@/app/modules/business/vacancies/component/bottom-sheet-vacancies/BottomSheetVacancies";
import { BannerBackgroundGradient } from "@/app/ui/components/banners/banner-background-gradient/BannerBackgroundGradient";
import { useHomeScreen } from "../hooks/home/useHomeScreen";

export default function HomeScreen() {
  const { isBottomSheetOpen, filters, onSubmit, onCloseBottomSheet } =
    useHomeScreen();

  return (
    <LayoutAppBar
      showAppBar={true}
      showSafeArea={true}
      styleScrollViewContent={{ paddingTop: 0 }}
      viewContainerContent={{ paddingHorizontal: 0 }}
    >
      <LayoutForms>
        <BannerBackgroundGradient
          imagePath={require("@/assets/images/banners/persona1.webp")}
          titleIdResourceCode={47}
        />
        <FormHomeSearch onSubmit={onSubmit} />
      </LayoutForms>
      <BottomSheetVacancies
        filters={filters}
        isOpen={isBottomSheetOpen}
        onClose={onCloseBottomSheet}
      />
    </LayoutAppBar>
  );
}
