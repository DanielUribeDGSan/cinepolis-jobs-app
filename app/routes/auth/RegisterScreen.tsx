import FormRegister from "@/app/screens/register/components/FormRegister";
import { LayoutAppBar } from "@/app/ui/layouts/LayoutAppBar";

export default function RegisterScreen() {
  return (
    <LayoutAppBar
      title="Register"
      showAppBar={true}
      showSafeArea={true}
      showBottomFooter={false}
    >
      <FormRegister />
    </LayoutAppBar>
  );
}
