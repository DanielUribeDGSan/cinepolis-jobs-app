import { useCallback, useRef, useState } from "react";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";

export const useHeaderVisibility = () => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { contentOffset, contentSize, layoutMeasurement } =
        event.nativeEvent;
      const currentScrollY = contentOffset.y;
      const scrollDifference = currentScrollY - lastScrollY.current;

      lastScrollY.current = currentScrollY;

      // Si estamos en la parte superior, siempre mostrar el header
      if (currentScrollY <= 0) {
        setIsVisible(true);
        return;
      }

      // Detectar si estamos al final del scroll
      const isAtBottom =
        contentSize.height > 0 &&
        layoutMeasurement.height > 0 &&
        currentScrollY + layoutMeasurement.height >= contentSize.height - 10;

      // Si estamos al final del scroll, no cambiar el estado del header
      // Esto evita el rebote cuando intentas hacer scroll más allá del final
      if (isAtBottom) {
        return;
      }

      // Solo cambiar la visibilidad si hay un movimiento significativo de scroll
      if (Math.abs(scrollDifference) > 2) {
        if (scrollDifference > 2) {
          setIsVisible(false);
        } else if (scrollDifference < -2) {
          setIsVisible(true);
        }
      }
    },
    []
  );

  return { isVisible, handleScroll };
};
