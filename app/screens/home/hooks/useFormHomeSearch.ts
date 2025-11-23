import { useForm } from "react-hook-form";
import { defaultValuesHomeSearch } from "../data/data";
import { yupResolver } from "@hookform/resolvers/yup";
import { SchemaHomeSearch } from "../schema/SchemaHomeSearch";
import { useCallback } from "react";
import useGetFontSize from "@/app/utils/sizes/hooks/useGetFontSize";
import { HomeSearchForm } from "../types/HomeSearchForm";

const useFormHomeSearch = () => {
  const { height } = useGetFontSize();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<HomeSearchForm>({
    resolver: yupResolver(SchemaHomeSearch),
    mode: "onChange",
    defaultValues: defaultValuesHomeSearch,
  });

  const onSubmit = useCallback(async (data: HomeSearchForm) => {
    // eslint-disable-next-line no-console
    console.log("Search data:", data);
  }, []);

  return {
    control,
    errors,
    isValid,
    onSubmit,
    handleSubmit,
    height,
  };
};

export default useFormHomeSearch;
