import ProfileContent from "@/app/screens/user/components/ProfileContent";
import { LayoutAppBar } from "@/app/ui/layouts/layout-app-bar/LayoutAppBar";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function ProfileScreen() {
  return (
    <LayoutAppBar
      showAppBar={true}
      showSafeArea
      styleScrollViewContent={{ paddingTop: 0 }}
      viewContainerContent={{ paddingHorizontal: 0, paddingTop: hp("8%") }}
    >
      <ProfileContent />
    </LayoutAppBar>
  );
}
