import { useRef, useCallback } from "react";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { useTabBarVisibility } from "../contexts/TabBarVisibilityContext";

export const useScrollDetection = () => {
  const { setVisible, hasFocusedInput } = useTabBarVisibility();
  const scrollY = useRef(0);
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { contentOffset, contentSize, layoutMeasurement } =
        event.nativeEvent;
      const currentScrollY = contentOffset.y;
      const scrollDifference = currentScrollY - lastScrollY.current;

      lastScrollY.current = currentScrollY;
      scrollY.current = currentScrollY;

      if (hasFocusedInput) {
        return;
      }

      // Verificar si hay contenido suficiente para hacer scroll
      const hasScrollableContent =
        contentSize.height > 0 &&
        layoutMeasurement.height > 0 &&
        contentSize.height > layoutMeasurement.height + 10; // 10px de tolerancia

      // Si no hay contenido suficiente para hacer scroll, siempre mostrar el tab bar
      if (!hasScrollableContent) {
        setVisible(true);
        return;
      }

      // Si estamos en la parte superior (scrollY <= 0), siempre mostrar
      if (currentScrollY <= 0) {
        setVisible(true);
        return;
      }

      // Detectar si estamos al final del scroll
      const isAtBottom =
        currentScrollY + layoutMeasurement.height >= contentSize.height - 10;

      if (isAtBottom) {
        setVisible(false);
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
