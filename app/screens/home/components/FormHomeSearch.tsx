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
        leftIcon={{ name: "search", size: "2.2%", color: colors.gray }}
        backgroundColor={colors.white}
      />

      <InputText
        name="location"
        control={control}
        label={textSearch}
        leftIcon={{ name: "map-marker", size: "2.2%", color: colors.gray }}
        backgroundColor={colors.white}
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
    paddingHorizontal: containers.horizontalScreen,
    backgroundColor: colors.lightBlue,
    padding: hp("1%"),
    paddingTop: hp("1%"),
    paddingBottom: hp("5%"),
    gap: hp("3%"),
  },

  button: {
    backgroundColor: colors.secondary,
    marginTop: hp("2%"), // Más espacio entre el último input y el botón
    marginBottom: hp("2%"),
  },
  spacer: {
    height: hp("2%"), // Altura para capturar el espacio entre inputs
  },
});

export default FormHomeSearch;
