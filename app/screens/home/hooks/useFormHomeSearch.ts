import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { defaultValuesHomeSearch } from "../data/data";
import { SchemaHomeSearch } from "../schema/SchemaHomeSearch";

import { useGetText } from "@/app/modules/localization/translations/hooks/useGetText";
import useGetFontSize from "@/app/utils/sizes/hooks/useGetFontSize";
import { HomeSearchForm } from "../types/HomeSearchForm";

const useFormHomeSearch = () => {
  const { height } = useGetFontSize();
  const { text: textSearch } = useGetText({ idResourceCode: 4 });
  const { text: textLocation } = useGetText({ idResourceCode: 7 });
  const { text: textButtonSearch } = useGetText({ idResourceCode: 263 });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<HomeSearchForm>({
    resolver: yupResolver(SchemaHomeSearch),
    mode: "onChange",
    defaultValues: defaultValuesHomeSearch,
  });

  return {
    control,
    errors,
    isValid,
    textSearch,
    textLocation,
    textButtonSearch,
    handleSubmit,
    height,
  };
};

export default useFormHomeSearch;
