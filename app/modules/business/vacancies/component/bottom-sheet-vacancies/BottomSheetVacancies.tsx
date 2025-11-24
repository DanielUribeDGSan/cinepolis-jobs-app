import React from "react";

import { useBottomSheetVacancies } from "./hooks/useBottomSheetVacancies";
import { VacanciesFilter } from "../../types/Vacancies";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { ScrollView, StyleSheet } from "react-native";
import { CardVacancy } from "../card-vacancy/CardVacancy";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { containers } from "@/app/utils/sizes/constants/containers";

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
  const {
    data,
    isLoading: _isLoading,
    error: _error,
    bottomSheetRef,
    snapPoints,
    index,
    handleSheetChanges,
  } = useBottomSheetVacancies({ filters, isOpen, onClose });

  return (
    <BottomSheet
      ref={bottomSheetRef}
      onChange={handleSheetChanges}
      snapPoints={snapPoints}
      index={index}
      enablePanDownToClose
    >
      <BottomSheetView style={styles.contentContainer}>
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          <CardVacancy vacancies={data ?? []} />
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
