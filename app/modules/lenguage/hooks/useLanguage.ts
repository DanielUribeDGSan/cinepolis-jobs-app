import { useState, useEffect } from "react";
import {
  LanguageCode,
  LanguageStorageService,
} from "../services/LanguageStorageService";
import { LanguageDetectionService } from "../services/LanguageDetectionService";

interface UseLanguageReturn {
  currentLanguage: LanguageCode;
  changeLanguage: (language: LanguageCode) => Promise<void>;
  isLoading: boolean;
  isStorageAvailable: boolean;
  availableLanguages: {
    code: LanguageCode;
    name: string;
    flag: string;
  }[];
}

export const useLanguage = (): UseLanguageReturn => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("esp");
  const [isLoading, setIsLoading] = useState(true);
  const [isStorageAvailable, setIsStorageAvailable] = useState(false);

  const availableLanguages = [
    {
      code: "esp" as LanguageCode,
      name: LanguageDetectionService.getLanguageName("esp"),
      flag: LanguageDetectionService.getLanguageFlag("esp"),
    },
    {
      code: "en" as LanguageCode,
      name: LanguageDetectionService.getLanguageName("en"),
      flag: LanguageDetectionService.getLanguageFlag("en"),
    },
    {
      code: "pt" as LanguageCode,
      name: LanguageDetectionService.getLanguageName("pt"),
      flag: LanguageDetectionService.getLanguageFlag("pt"),
    },
  ];

  useEffect(() => {
    initializeLanguage();
  }, []);

  const initializeLanguage = async () => {
    try {
      const storageAvailable =
        await LanguageStorageService.isSecureStoreAvailable();
      setIsStorageAvailable(storageAvailable);

      const storedLanguage = await LanguageStorageService.getStoredLanguage();

      let selectedLanguage: LanguageCode;

      if (storedLanguage) {
        selectedLanguage = storedLanguage;
      } else {
        selectedLanguage = LanguageDetectionService.detectDeviceLanguage();

        if (storageAvailable) {
          await LanguageStorageService.saveLanguage(selectedLanguage);
        }
      }

      setCurrentLanguage(selectedLanguage);
    } catch (error) {
      console.error("Error initializing language:", error);
      setCurrentLanguage("esp");
    } finally {
      setIsLoading(false);
    }
  };

  const changeLanguage = async (language: LanguageCode): Promise<void> => {
    try {
      setCurrentLanguage(language);

      const saved = await LanguageStorageService.saveLanguage(language);

      if (!saved) {
        console.warn("Language changed but not persisted");
      }
    } catch (error) {
      console.error("Error changing language:", error);
      throw error;
    }
  };

  return {
    currentLanguage,
    changeLanguage,
    isLoading,
    isStorageAvailable,
    availableLanguages,
  };
};
