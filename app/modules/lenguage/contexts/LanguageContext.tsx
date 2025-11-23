import React, { createContext, useContext } from "react";
import { useLanguage as useLanguageHook } from "../hooks/useLanguage";
import { LanguageCode } from "../services/LanguageStorageService";

interface LanguageContextType {
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

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const languageData = useLanguageHook();

  return (
    <LanguageContext.Provider value={languageData}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
