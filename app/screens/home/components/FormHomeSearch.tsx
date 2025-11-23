import InputText from "@/app/ui/components/inputs/InputText";
import React from "react";

import useFormHomeSearch from "../hooks/useFormHomeSearch";
import LayoutForms from "@/app/ui/layouts/LayoutForms";
import Button from "@/app/ui/components/buttons/Button";
import { containers } from "@/app/utils/sizes/constants/containers";
import { colors } from "@/app/utils/sizes/constants/colors";

const FormHomeSearch = () => {
  const { control, height, onSubmit, handleSubmit } = useFormHomeSearch();
  return (
    <LayoutForms>
      <InputText
        name="search"
        control={control}
        label="Search"
        leftIcon={{ name: "search", size: "2.2%", color: colors.primary }}
      />

      <InputText
        name="location"
        control={control}
        label="Location"
        leftIcon={{ name: "map-marker", size: "2.2%", color: colors.primary }}
      />

      <Button
        label="Iniciar sesión"
        style={{ marginVertical: height(containers.topComponent) }}
        styleText={{ color: colors.white }}
        onPress={handleSubmit(onSubmit)}
      />
    </LayoutForms>
  );
};

export default FormHomeSearch;
