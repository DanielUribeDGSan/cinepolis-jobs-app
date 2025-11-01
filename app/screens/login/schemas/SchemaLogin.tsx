import * as yup from "yup";

const passwordRules =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!_.%*?&])[A-Za-z\d@$!_.%*?&]{8,}$/;

export const SchemaLogin = yup.object({
  email: yup.string().email("Email inválido").required("Email es requerido"),
  password: yup
    .string()
    .matches(passwordRules, "Contraseña inválida")
    .required("Contraseña es requerida"),
  remember: yup.boolean().default(false),
});

export type LoginFormData = yup.InferType<typeof SchemaLogin>;
