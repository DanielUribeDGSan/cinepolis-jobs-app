import { useValidateLoginAndRegister } from "@/app/modules/users/hooks/useValidateLoginAndRegister";
import FormVerificationCode from "@/app/screens/verification/components/FormVerificationCode";
import { LayoutAppBar } from "@/app/ui/layouts/layout-app-bar/LayoutAppBar";

export default function VerificationCodeScreen() {
  const { AuthScreenWrapper } = useValidateLoginAndRegister();

  return (
    <AuthScreenWrapper>
      <LayoutAppBar
        showAppBar={true}
        showSafeArea={true}
        styleScrollViewContent={{ paddingTop: 0 }}
      >
        <FormVerificationCode />
      </LayoutAppBar>
    </AuthScreenWrapper>
  );
}
