import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { defaultValuesRegister } from "../data/defaultValuesRegister";
import useGetFontSize from "@/app/utils/sizes/hooks/useGetFontSize";

import { useCallback } from "react";
import { SchemaRegister } from "../schemas/SchemaRegister";
import { RegisterForm } from "../types/RegisterForm";
import { useRegisterUser } from "./mutate/useRegisterUser";

const useFormRegister = () => {
  const { height } = useGetFontSize();
  const { mutateAsync: registerUser } = useRegisterUser();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterForm>({
    resolver: yupResolver(SchemaRegister),
    mode: "onChange",
    defaultValues: defaultValuesRegister,
  });

  const onSubmit = useCallback(
    async (data: RegisterForm) => {
      const body = {
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        acceptTerms: data.acceptTerms,
      };

      await registerUser(body);
    },
    [registerUser]
  );

  return {
    control,
    errors,
    isValid,
    onSubmit,
    handleSubmit,
    height,
  };
};

export default useFormRegister;
