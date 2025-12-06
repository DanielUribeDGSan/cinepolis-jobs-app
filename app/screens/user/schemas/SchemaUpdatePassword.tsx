import * as yup from "yup";

const passwordRules =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!_.%*?&])[A-Za-z\d@$!_.%*?&]{8,}$/;

export const SchemaUpdatePassword = yup.object({
  currentPassword: yup.string().required("La contraseña actual es requerida"),
  newPassword: yup
    .string()
    .matches(passwordRules, "Contraseña inválida")
    .required("La nueva contraseña es requerida"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), undefined], "Las contraseñas no coinciden")
    .required("Confirmar contraseña es requerida"),
});

export type UpdatePasswordFormData = yup.InferType<typeof SchemaUpdatePassword>;
