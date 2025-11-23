import * as yup from "yup";

export const SchemaHomeSearch = yup.object({
  search: yup.string().nullable().default(null),
  location: yup.string().nullable().default(null),
});

export type HomeSearchFormData = {
  search: string;
  location: string;
};
