import FormLogin from "@/app/screens/login/components/FormLogin";
import { LayoutAppBar } from "@/app/ui/layouts/layout-app-bar/LayoutAppBar";

export default function LoginScreen() {
  return (
    <LayoutAppBar
      title="Login"
      showAppBar={false}
      showSafeArea={true}
      showBottomFooter={false}
    >
      <FormLogin />
    </LayoutAppBar>
  );
}
