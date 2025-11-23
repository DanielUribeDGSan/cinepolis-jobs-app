import apiClient from "../../network/api/apiClient";
import { ResponseTranslations, Translation } from "../types/Translations";
import { TranslationsEndpoints } from "./translations.endpoints";

export const TranslationsService = {
  getTranslations: async (
    pageCode: string,
    idLanguage: string
  ): Promise<Translation[]> => {
    const response = await apiClient.get<ResponseTranslations>(
      TranslationsEndpoints.getTranslations(pageCode, idLanguage)
    );
    return response.data.data;
  },
};
