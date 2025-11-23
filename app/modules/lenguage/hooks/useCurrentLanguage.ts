import { useLanguage } from "../contexts/LanguageContext";

export const useCurrentLanguage = () => {
  const { currentLanguage } = useLanguage();

  return currentLanguage; // Retorna 'esp', 'en', o 'pt'
};
