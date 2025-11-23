import { showErrorMessage } from "@/app/ui/messages/Messages";
import { useLanguage } from "../../lenguage/contexts/LanguageContext";

import { useFetch } from "../../network/hooks/useFetch";
import { ErrorMessage } from "../../network/types/ErrorMessage";
import { translationsMessages } from "@/app/ui/messages/constants/translations";
import { TranslationsService } from "../services/translations.service";
import { useMemo } from "react";
import { useFullScreenLoaderEffect } from "@/app/ui/loaders/full-screen/useFullScreenLoader";

export const useFetchTranslations = (pageCode: string) => {
  const { currentLanguage } = useLanguage();

  const idLanguage = useMemo(() => {
    switch (currentLanguage) {
      case "esp":
        return "1";
      case "en":
        return "2";
      case "pt":
        return "3";
      default:
        return "1";
    }
  }, [currentLanguage]);

  const queryResult = useFetch({
    key: ["useFetchTranslations", pageCode, idLanguage],
    fetchFn: () =>
      TranslationsService.getTranslations(pageCode, idLanguage).catch(
        async (error: ErrorMessage) => {
          showErrorMessage({
            title: translationsMessages.errorNetworkSummary,
            description: error.data.error,
          });
        }
      ),
    enabled: !!pageCode && !!idLanguage,
  });

  // Activar/desactivar el loader full screen basado en el estado de carga
  useFullScreenLoaderEffect(queryResult.isLoading || false);

  return queryResult;
};
