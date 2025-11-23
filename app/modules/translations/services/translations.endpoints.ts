export const TranslationsEndpoints = {
  getTranslations: (pageCode: string, idLanguage: string) =>
    `/V1/Resource/Page?pageCode=${pageCode}&idLanguage=${idLanguage}`,
};
