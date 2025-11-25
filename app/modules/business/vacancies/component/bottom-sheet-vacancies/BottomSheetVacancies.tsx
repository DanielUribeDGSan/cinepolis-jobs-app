import React from "react";

import { containers } from "@/app/utils/sizes/constants/containers";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { ScrollView, StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { VacanciesFilter } from "../../types/Vacancies";
import { CardVacancy } from "../card-vacancy/CardVacancy";
import { useBottomSheetVacancies } from "./hooks/useBottomSheetVacancies";

interface BottomSheetVacanciesProps {
  filters: VacanciesFilter;
  isOpen?: boolean;
  onClose?: () => void;
}

export const BottomSheetVacancies = ({
  filters,
  isOpen = false,
  onClose,
}: BottomSheetVacanciesProps) => {
  const { data, isLoading, bottomSheetRef, snapPoints, handleSheetChanges } =
    useBottomSheetVacancies({ filters, isOpen, onClose });

  // No renderizar el BottomSheet si no está abierto para evitar problemas de inicialización
  if (!isOpen) {
    return null;
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      onChange={handleSheetChanges}
      snapPoints={snapPoints}
      index={1}
      enablePanDownToClose
      animateOnMount={false}
    >
      <BottomSheetView style={styles.contentContainer}>
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          <CardVacancy vacancies={data ?? []} isLoading={isLoading} />
        </ScrollView>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: hp(containers.horizontalScreenContent),
  },
});
