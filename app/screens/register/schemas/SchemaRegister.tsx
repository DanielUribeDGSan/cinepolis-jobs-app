import * as yup from "yup";

const passwordRules =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!_.%*?&])[A-Za-z\d@$!_.%*?&]{8,}$/;

export const SchemaRegister = yup.object({
  email: yup.string().email("Email inválido").required("Email es requerido"),
  password: yup
    .string()
    .matches(passwordRules, "Contraseña inválida")
    .required("Contraseña es requerida"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Las contraseñas no coinciden")
    .required("Confirmar contraseña es requerida"),
  acceptTerms: yup
    .boolean()
    .required("Aceptar términos y condiciones es requerido"),
});

export type RegisterFormData = yup.InferType<typeof SchemaRegister>;
