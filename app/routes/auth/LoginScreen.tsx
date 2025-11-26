import FormLogin from "@/app/screens/login/components/FormLogin";
import { LayoutAppBar } from "@/app/ui/layouts/layout-app-bar/LayoutAppBar";

export default function LoginScreen() {
  return (
    <LayoutAppBar
      showAppBar={true}
      showSafeArea={true}
      styleScrollViewContent={{ paddingTop: 0 }}
    >
      <FormLogin />
    </LayoutAppBar>
  );
}
