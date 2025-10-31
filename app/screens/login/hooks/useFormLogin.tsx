import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { SchemaLogin } from "../schemas/SchemaLogin";
import { LoginForm } from "../types/LoginForm";
import { defaultValuesLogin } from "../data/defaultValuesLogin";
import useGetFontSize from "@/app/utils/sizes/hooks/useGetFontSize";

const useFormLogin = () => {
  const { height } = useGetFontSize();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginForm>({
    resolver: yupResolver(SchemaLogin),
    mode: "onChange",
    defaultValues: defaultValuesLogin,
  });

  return {
    control,
    errors,
    isValid,
    handleSubmit,
    height,
  };
};

export default useFormLogin;
