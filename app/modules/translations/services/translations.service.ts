import apiClient from "../../network/api/apiClient";
import { ErrorMessage } from "../../network/types/ErrorMessage";
import { ResponseTranslations, Translation } from "../types/Translations";
import { TranslationsEndpoints } from "./translations.endpoints";

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
