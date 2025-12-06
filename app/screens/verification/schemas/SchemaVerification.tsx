import * as yup from "yup";

export const SchemaVerification = yup.object({
  code: yup
    .string()
    .required("El código es requerido")
    .length(5, "El código debe tener 5 dígitos")
    .matches(/^\d+$/, "El código debe contener solo números"),
});

export type VerificationFormData = yup.InferType<typeof SchemaVerification>;
