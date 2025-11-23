import { useRef, useCallback } from "react";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { useTabBarVisibility } from "../contexts/TabBarVisibilityContext";

export const useScrollDetection = () => {
  const { setVisible, hasFocusedInput } = useTabBarVisibility();
  const scrollY = useRef(0);
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const currentScrollY = event.nativeEvent.contentOffset.y;
      const scrollDifference = currentScrollY - lastScrollY.current;

      // Actualizar referencias
      lastScrollY.current = currentScrollY;
      scrollY.current = currentScrollY;

      // Si hay un input enfocado, no cambiar la visibilidad durante el scroll
      // pero permitir que el scroll funcione normalmente
      if (hasFocusedInput) {
        return;
      }

      // Si estamos en la parte superior (scrollY <= 0), siempre mostrar
      if (currentScrollY <= 0) {
        setVisible(true);
        return;
      }

      // Solo cambiar la visibilidad si hay un movimiento significativo de scroll
      // Esto evita cambios constantes durante el scroll suave
      if (Math.abs(scrollDifference) > 2) {
        if (scrollDifference > 2) {
          // Scroll hacia abajo - ocultar
          setVisible(false);
        } else if (scrollDifference < -2) {
          // Scroll hacia arriba - mostrar
          setVisible(true);
        }
      }
    },
    [setVisible, hasFocusedInput]
  );

  return { handleScroll };
};
