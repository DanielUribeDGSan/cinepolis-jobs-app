import * as yup from "yup";

export const SchemaLogin = yup.object({
  email: yup.string().email("Email inválido").required("Email es requerido"),
  password: yup
    .string()
    .min(6, "Mínimo 6 caracteres")
    .required("Contraseña es requerida"),
  remember: yup.boolean().default(false),
});

export type LoginFormData = yup.InferType<typeof SchemaLogin>;
