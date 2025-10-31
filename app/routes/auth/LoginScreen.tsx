import FormLogin from "@/app/screens/login/components/FormLogin";
import { LayoutAppBar } from "@/app/ui/layouts/LayoutAppBar";

export default function LoginScreen() {
  return (
    <LayoutAppBar title="Login">
      <FormLogin />
    </LayoutAppBar>
  );
}
