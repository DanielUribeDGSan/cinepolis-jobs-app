import BannerInfoVacancies from "@/app/screens/home/components/BannerInfoVacancies";
import FormHomeSearch from "@/app/screens/home/components/FormHomeSearch";
import { LayoutAppBar } from "@/app/ui/layouts/LayoutAppBar";
import LayoutForms from "@/app/ui/layouts/LayoutForms";
import { containers } from "@/app/utils/sizes/constants/containers";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function TabHomeScreen() {
  return (
    <LayoutAppBar
      styleScrollViewContent={{ paddingTop: hp(containers.topScreen) }}
    >
      <LayoutForms>
        <BannerInfoVacancies />
        <BannerInfoVacancies />

        <FormHomeSearch />
        <FormHomeSearch />
      </LayoutForms>
    </LayoutAppBar>
  );
}
