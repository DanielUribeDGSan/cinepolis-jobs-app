import FormRegister from "@/app/screens/register/components/FormRegister";
import { LayoutAppBar } from "@/app/ui/layouts/layout-app-bar/LayoutAppBar";

export default function RegisterScreen() {
  return (
    <LayoutAppBar
      title="Register"
      showAppBar={false}
      showSafeArea={true}
      showBottomFooter={false}
    >
      <FormRegister />
    </LayoutAppBar>
  );
}
