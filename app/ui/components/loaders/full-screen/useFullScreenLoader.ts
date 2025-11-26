import { useEffect } from "react";
import { useFullScreenLoader } from "./FullScreenLoaderContext";

/**
 * Hook para manejar el loader full screen basado en el estado de carga
 * @param isLoading - Estado de carga que activa/desactiva el loader
 */
export const useFullScreenLoaderEffect = (isLoading: boolean) => {
  const { showLoader, hideLoader } = useFullScreenLoader();

  useEffect(() => {
    if (isLoading) {
      showLoader();
    } else {
      hideLoader();
    }

    // Cleanup: asegurar que el loader se oculte cuando el componente se desmonte
    return () => {
      if (isLoading) {
        hideLoader();
      }
    };
  }, [isLoading, showLoader, hideLoader]);
};
