import apiClient from "@/app/modules/network/api/apiClient";
import { ErrorMessage } from "@/app/modules/network/types/ErrorMessage";
import {
  ResponseTranslations,
  Translation,
} from "@/app/modules/localization/translations/types/Translations";
import { TranslationsEndpoints } from "@/app/modules/localization/translations/services/translations.endpoints";

export const TranslationsService = {
  getTranslations: async (
    pageCode: string,
    idLanguage: string
  ): Promise<Translation[]> => {
    const response = await apiClient
      .get<ResponseTranslations>(
        TranslationsEndpoints.getTranslations(pageCode, idLanguage)
      )
      .catch((error: ErrorMessage) => {
        throw error;
      });

    return response.data.data;
  },
};
