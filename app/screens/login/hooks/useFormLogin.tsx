import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { SchemaLogin } from "../schemas/SchemaLogin";
import { LoginForm } from "../types/LoginForm";
import { defaultValuesLogin } from "../data/defaultValuesLogin";
import useGetFontSize from "@/app/utils/sizes/hooks/useGetFontSize";
import { useLoginUser } from "./mutate/useLoginUser";
import { useCallback } from "react";

const useFormLogin = () => {
  const { height } = useGetFontSize();
  const { mutateAsync: loginUser } = useLoginUser();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginForm>({
    resolver: yupResolver(SchemaLogin),
    mode: "onChange",
    defaultValues: defaultValuesLogin,
  });

  const onSubmit = useCallback(
    async (data: LoginForm) => {
      const body = {
        userName: data.email,
        password: data.password,
      };
      await loginUser(body);
    },
    [loginUser]
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

export default useFormLogin;
