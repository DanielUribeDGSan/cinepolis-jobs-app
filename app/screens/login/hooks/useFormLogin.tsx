import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { SchemaLogin } from "../schemas/SchemaLogin";
import { LoginForm } from "../types/LoginForm";

const useFormLogin = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginForm>({
    resolver: yupResolver(SchemaLogin),
    mode: "onChange",
  });

  return {
    control,
    handleSubmit,
    errors,
    isValid,
  };
};

export default useFormLogin;
