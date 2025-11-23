import { useEffect } from "react";
import { useTabBarVisibility } from "../contexts/TabBarVisibilityContext";

/**
 * Hook para que los inputs notifiquen cuando están enfocados
 * y ocultar la tab bar automáticamente
 */
export const useInputFocus = (isFocused: boolean) => {
  const { addFocusedInput, removeFocusedInput } = useTabBarVisibility();

  useEffect(() => {
    if (isFocused) {
      addFocusedInput();
    } else {
      removeFocusedInput();
    }

    // Cleanup: asegurarse de remover el input cuando el componente se desmonte
    return () => {
      if (isFocused) {
        removeFocusedInput();
      }
    };
  }, [isFocused, addFocusedInput, removeFocusedInput]);
};
