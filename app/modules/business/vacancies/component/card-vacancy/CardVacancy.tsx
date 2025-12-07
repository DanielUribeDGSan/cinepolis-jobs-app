import LinkButton from "@/app/ui/components/buttons/LinkButton";
import { colors } from "@/app/utils/sizes/constants/colors";
import { fontSizes } from "@/app/utils/sizes/constants/fontSizes";
import { router } from "expo-router";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import { RenderHTMLVacancy } from "../render-html-vacancy/RenderHTMLVacancy";
import { useCardVacancy } from "./hooks/useCardVacancy";

export const CardVacancy = () => {
  const { data, isLoading } = useCardVacancy();
  if (isLoading) {
    return (
      <ActivityIndicator
        style={{ marginTop: hp("40%") }}
        size="large"
        color={colors.primary}
      />
    );
  }

  return (
    <View className="flex  w-full " style={styles.container}>
      {data?.map((vacancy) => (
        <View
          className="flex border border-theme-borderColor w-full "
          style={styles.cardVacancy}
          key={vacancy.idVacancy}
        >
          <View className="">
            <Text style={styles.title}>{vacancy.positionTitle}</Text>
            <RenderHTMLVacancy html={vacancy.aboutUs} />
            <View
              className="flex flex-row items-center gap-x-1 "
              style={{ marginTop: hp("1%") }}
            >
              <Text style={styles.locationTitle}>Ubicación:</Text>
              <Text style={styles.locationValue}>
                {vacancy.city}, {vacancy.country}
              </Text>
            </View>
            <View
              className="flex flex-row items-center gap-x-1 "
              style={{ marginTop: hp("1%") }}
            >
              <Text style={styles.categoryTitle}>Categoría:</Text>
              <Text style={styles.categoryValue}>{vacancy.sector}</Text>
            </View>
            <View
              className="flex justify-end items-end"
              style={{ marginTop: hp("1%") }}
            >
              <LinkButton
                onPress={() => {
                  router.push({
                    pathname: "/routes/vacancies/DetailVacancyScreen",
                    params: { slug: vacancy.slug },
                  });
                }}
                label="Ver Puesto"
                color={colors.secondary}
                textClassName="text-black"
                fontSize="small"
              />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: hp("1%"),
  },
  cardVacancy: {
    borderWidth: hp("0.1%"),
    borderRadius: hp("3%"),
    padding: hp("2%"),
    marginBottom: hp("2%"),
  },
  title: {
    fontSize: fontSizes.h4,
    lineHeight: fontSizes.lineHeightH4,
    fontWeight: "800",
    marginBottom: hp("1%"),
    color: colors.primary,
  },
  description: {
    marginBottom: hp("1%"),
  },
  locationTitle: {
    fontSize: fontSizes.small,
    lineHeight: fontSizes.lineHeightSmall,
    fontWeight: "600",
    color: colors.primary,
  },
  locationValue: {
    fontSize: fontSizes.small,
    lineHeight: fontSizes.lineHeightSmall,
    color: colors.primary,
  },
  categoryTitle: {
    fontSize: fontSizes.small,
    lineHeight: fontSizes.lineHeightSmall,
    fontWeight: "600",
    color: colors.primary,
  },
  categoryValue: {
    fontSize: fontSizes.small,
    lineHeight: fontSizes.lineHeightSmall,
    color: colors.primary,
  },
});
