import InputText from "@/app/ui/components/inputs/InputText";
import React from "react";

import useFormHomeSearch from "../hooks/useFormHomeSearch";

import Button from "@/app/ui/components/buttons/Button";
import { colors } from "@/app/utils/sizes/constants/colors";
import { containers } from "@/app/utils/sizes/constants/containers";
import { StyleSheet, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { HomeSearchForm } from "../types/HomeSearchForm";
import BannerInfoVacancies from "./BannerInfoVacancies";

interface FormHomeSearchProps {
  onSubmit: (data: HomeSearchForm) => Promise<void>;
}

const FormHomeSearch = ({ onSubmit }: FormHomeSearchProps) => {
  const { control, textSearch, textButtonSearch, handleSubmit } =
    useFormHomeSearch();

  return (
    <View style={styles.container}>
      <BannerInfoVacancies />

      <InputText
        name="search"
        control={control}
        label={textSearch}
        leftIcon={{ name: "search", size: "2.2%", color: colors.primary }}
        backgroundColor={colors.inputsGray}
      />

      <InputText
        name="location"
        control={control}
        label={textSearch}
        leftIcon={{ name: "map-marker", size: "2.2%", color: colors.primary }}
        backgroundColor={colors.inputsGray}
      />

      <Button
        label={textButtonSearch}
        style={styles.button}
        styleText={{ color: colors.white }}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: hp(containers.horizontalScreen),
    backgroundColor: colors.white,
    borderTopRightRadius: hp("3%"),
    borderTopLeftRadius: hp("3%"),
    padding: hp("1%"),
  },

  button: {
    backgroundColor: colors.secondary,
    marginTop: hp("1%"),
  },
});

export default FormHomeSearch;
