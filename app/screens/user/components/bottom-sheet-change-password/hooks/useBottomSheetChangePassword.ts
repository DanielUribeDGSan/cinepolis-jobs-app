import BottomSheet from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

interface UseBottomSheetChangePasswordProps {
  isOpen: boolean;
  onClose?: () => void;
}

export const useBottomSheetChangePassword = ({
  isOpen,
  onClose,
}: UseBottomSheetChangePasswordProps) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => {
    return [hp("80%")];
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
    const timeoutId = setTimeout(() => {
      requestAnimationFrame(() => {
        if (bottomSheetRef.current) {
          bottomSheetRef.current.snapToIndex(0);
        }
      });
    }, 150);

    return () => clearTimeout(timeoutId);
  }, [isOpen]);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1 && onClose) {
        onClose();
      }
    },
    [onClose]
  );

  return {
    bottomSheetRef,
    snapPoints,
    handleSheetChanges,
  };
};
