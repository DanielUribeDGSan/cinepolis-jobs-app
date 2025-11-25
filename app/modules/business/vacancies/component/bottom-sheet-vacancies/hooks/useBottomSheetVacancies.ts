import BottomSheet from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useFetchSearchVacancies } from "../../../hooks/useFetchSearchVacancies";
import { VacanciesFilter } from "../../../types/Vacancies";

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
    return [hp("90")];
  }, []);

  // Controlar el BottomSheet mediante el ref cuando isOpen cambia
  useEffect(() => {
    if (!isOpen) {
      if (bottomSheetRef.current) {
        bottomSheetRef.current.close();
      }
      return;
    }

    // Esperar a que el BottomSheet esté completamente montado y los snapPoints estén listos
    // Usamos requestAnimationFrame dentro de setTimeout para asegurar que el layout esté renderizado
    const timeoutId = setTimeout(() => {
      requestAnimationFrame(() => {
        if (bottomSheetRef.current) {
          bottomSheetRef.current.snapToIndex(1);
        }
      });
    }, 150);

    return () => clearTimeout(timeoutId);
  }, [isOpen]);

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
    handleSheetChanges,
  };
};
