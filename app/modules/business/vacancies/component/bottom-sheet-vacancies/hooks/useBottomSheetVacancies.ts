import BottomSheet from "@gorhom/bottom-sheet";
import { useFetchSearchVacancies } from "../../../hooks/useFetchSearchVacancies";
import { VacanciesFilter } from "../../../types/Vacancies";
import { useCallback, useMemo, useRef } from "react";
import { Dimensions } from "react-native";

interface UseBottomSheetVacanciesProps {
  filters: VacanciesFilter;
  isOpen: boolean;
  onClose?: () => void;
}

export const useBottomSheetVacancies = ({
  filters,
  isOpen,
  onClose,
}: UseBottomSheetVacanciesProps) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => {
    const { height: screenHeight } = Dimensions.get("window");
    return [screenHeight * 0.9];
  }, []);

  const index = useMemo(() => (isOpen ? 0 : -1), [isOpen]);

  const { data, isLoading, error } = useFetchSearchVacancies(filters);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1 && onClose) {
        onClose();
      }
    },
    [onClose]
  );

  return {
    data,
    isLoading,
    error,
    bottomSheetRef,
    snapPoints,
    index,
    handleSheetChanges,
  };
};
