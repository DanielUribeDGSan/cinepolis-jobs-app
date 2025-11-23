import { showErrorMessage } from "@/app/ui/messages/Messages";
import { useLanguage } from "../../lenguage/hooks/useLanguage";

import { useFetch } from "../../network/hooks/useFetch";
import { ErrorMessage } from "../../network/types/ErrorMessage";
import { translationsMessages } from "@/app/ui/messages/constants/translations";
import { TranslationsService } from "../services/translations.service";

export const useFetchTranslations = (pageCode: string) => {
  const { getLanguageCode } = useLanguage();
  const idLanguage = getLanguageCode();

  return useFetch({
    key: ["useFetchTranslations", pageCode],
    fetchFn: () =>
      TranslationsService.getTranslations(pageCode, idLanguage).catch(
        async (error: ErrorMessage) => {
          showErrorMessage({
            title: translationsMessages.errorNetworkSummary,
            description: error.data.error,
          });
        }
      ),
    enabled: true,
  });
};
