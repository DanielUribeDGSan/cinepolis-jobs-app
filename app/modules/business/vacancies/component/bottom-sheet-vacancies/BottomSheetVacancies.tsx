import React from "react";

import { useBottomSheetVacancies } from "./hooks/useBottomSheetVacancies";
import { VacanciesFilter } from "../../types/Vacancies";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { StyleSheet, Text } from "react-native";

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
    data: _data,
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
        <Text>Awesome 🎉</Text>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: "center",
  },
});
