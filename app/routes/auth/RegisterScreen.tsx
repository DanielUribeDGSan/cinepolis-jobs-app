import { useValidateLoginAndRegister } from "@/app/modules/users/hooks/useValidateLoginAndRegister";
import FormRegister from "@/app/screens/register/components/FormRegister";
import { LayoutAppBar } from "@/app/ui/layouts/layout-app-bar/LayoutAppBar";

export default function RegisterScreen() {
  const { AuthScreenWrapper } = useValidateLoginAndRegister();

  return (
    <AuthScreenWrapper>
      <LayoutAppBar
        showAppBar={true}
        showSafeArea={true}
        styleScrollViewContent={{ paddingTop: 0 }}
      >
        <FormRegister />
      </LayoutAppBar>
    </AuthScreenWrapper>
  );
}
