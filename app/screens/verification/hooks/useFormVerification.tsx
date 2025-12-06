import { yupResolver } from "@hookform/resolvers/yup";
import { useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { defaultValuesVerification } from "../data/defaultValuesVerification";
import { SchemaVerification } from "../schemas/SchemaVerification";
import { VerificationForm } from "../types/VerificationForm";
import { useResendCode } from "./mutate/useResendCode";
import { useVerifyCode } from "./mutate/useVerifyCode";

const useFormVerification = () => {
  const { email } = useLocalSearchParams<{ email: string }>();
  const { mutateAsync: verifyCode } = useVerifyCode();
  const { mutateAsync: resendCode } = useResendCode();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<VerificationForm>({
    resolver: yupResolver(SchemaVerification),
    mode: "onChange",
    defaultValues: defaultValuesVerification,
  });

  const codeValue = watch("code");

  const onSubmit = useCallback(
    async (data: VerificationForm) => {
      if (!email) {
        throw new Error("Email no encontrado");
      }
      await verifyCode({ code: data.code, email });
    },
    [verifyCode, email]
  );

  const handleResendCode = useCallback(async () => {
    if (!email) {
      throw new Error("Email no encontrado");
    }
    await resendCode(email);
  }, [resendCode, email]);

  return {
    control,
    errors,
    onSubmit,
    handleSubmit,
    setValue,
    codeValue,
    handleResendCode,
  };
};

export default useFormVerification;
