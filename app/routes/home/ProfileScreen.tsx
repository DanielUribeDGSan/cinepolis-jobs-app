import ProfileContent from "@/app/screens/user/components/ProfileContent";
import BottomSheetChangePassword from "@/app/screens/user/components/bottom-sheet-change-password/BottomSheetChangePassword";
import { LayoutAppBar } from "@/app/ui/layouts/layout-app-bar/LayoutAppBar";
import { useState } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function ProfileScreen() {
  const [showChangePassword, setShowChangePassword] = useState(false);

  return (
    <>
      <LayoutAppBar
        showAppBar={true}
        showSafeArea
        styleScrollViewContent={{ paddingTop: 0 }}
        viewContainerContent={{ paddingHorizontal: 0, paddingTop: hp("8%") }}
      >
        <ProfileContent
          onOpenChangePassword={() => setShowChangePassword(true)}
        />
      </LayoutAppBar>
      <BottomSheetChangePassword
        isOpen={showChangePassword}
        onClose={() => setShowChangePassword(false)}
      />
    </>
  );
}
