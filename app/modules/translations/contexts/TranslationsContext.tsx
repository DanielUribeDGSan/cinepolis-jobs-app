import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useFetchTranslations } from "../hooks/useFetchTranslations";
import { Translation } from "../types/Translations";

interface TranslationsContextType {
  translations: Translation[];
  isLoading: boolean;
  getTranslationText: (idResourceCode: number, pageCode?: string) => string;
  getTranslation: (
    idResourceCode: number,
    pageCode?: string
  ) => Translation | undefined;
  registerPageCodes: (pageCodes: string[], unregister?: boolean) => void;
}

const TranslationsContext = createContext<TranslationsContextType | undefined>(
  undefined
);

interface TranslationsProviderProps {
  children: React.ReactNode;
  defaultPageCodes?: string[];
}

const PageCodeTranslations: React.FC<{
  pageCode: string;
  onData: (pageCode: string, translations: Translation[]) => void;
}> = ({ pageCode, onData }) => {
  const { data: translations = [] } = useFetchTranslations(pageCode);
  const prevTranslationsRef = useRef<Translation[]>([]);

  useEffect(() => {
    const hasChanged =
      prevTranslationsRef.current.length !== translations.length ||
      prevTranslationsRef.current.some(
        (prev, index) =>
          prev.idResourceCode !== translations[index]?.idResourceCode
      );

    if (hasChanged) {
      onData(pageCode, translations);
      prevTranslationsRef.current = translations;
    }
  }, [pageCode, translations, onData]);

  return null;
};

export const TranslationsProvider: React.FC<TranslationsProviderProps> = ({
  children,
  defaultPageCodes = [],
}) => {
  const registeredPageCodesRef = useRef<Set<string>>(new Set(defaultPageCodes));
  const [registeredPageCodes, setRegisteredPageCodes] = useState<Set<string>>(
    () => new Set(defaultPageCodes)
  );
  const [translationsMap, setTranslationsMap] = useState<
    Map<string, Translation[]>
  >(new Map());
  const isUpdatingRef = useRef(false);

  const registerPageCodes = useCallback(
    (pageCodes: string[], unregister = false) => {
      if (isUpdatingRef.current) {
        return;
      }

      isUpdatingRef.current = true;

      const currentSet = registeredPageCodesRef.current;
      const newSet = new Set(currentSet);
      let hasChanged = false;

      if (unregister) {
        pageCodes.forEach((code) => {
          if (newSet.has(code)) {
            newSet.delete(code);
            hasChanged = true;
          }
        });
      } else {
        pageCodes.forEach((code) => {
          if (!newSet.has(code)) {
            newSet.add(code);
            hasChanged = true;
          }
        });
      }

      if (hasChanged) {
        registeredPageCodesRef.current = newSet;

        requestAnimationFrame(() => {
          setRegisteredPageCodes((prev) => {
            if (prev.size !== newSet.size) {
              isUpdatingRef.current = false;
              return newSet;
            }
            const prevArray = Array.from(prev).sort();
            const newArray = Array.from(newSet).sort();
            const arraysEqual =
              prevArray.length === newArray.length &&
              prevArray.every((code, index) => code === newArray[index]);
            isUpdatingRef.current = false;
            return arraysEqual ? prev : newSet;
          });
        });
      } else {
        isUpdatingRef.current = false;
      }
    },
    []
  );

  const handlePageData = useCallback(
    (pageCode: string, translations: Translation[]) => {
      setTranslationsMap((prev) => {
        const currentTranslations = prev.get(pageCode) || [];

        const hasChanged =
          currentTranslations.length !== translations.length ||
          currentTranslations.some(
            (curr, index) =>
              curr.idResourceCode !== translations[index]?.idResourceCode
          );

        if (!hasChanged) {
          return prev;
        }

        const newMap = new Map(prev);
        newMap.set(pageCode, translations);
        return newMap;
      });
    },
    []
  );

  const allTranslations = useMemo(() => {
    const combined: Translation[] = [];
    translationsMap.forEach((translations) => {
      combined.push(...translations);
    });
    return combined;
  }, [translationsMap]);

  const isLoading = useMemo(() => {
    return Array.from(registeredPageCodes).some(
      (code) => !translationsMap.has(code)
    );
  }, [registeredPageCodes, translationsMap]);

  const getTranslationText = useCallback(
    (idResourceCode: number, pageCode?: string): string => {
      if (pageCode) {
        const pageTranslations = translationsMap.get(pageCode) || [];
        const translation = pageTranslations.find(
          (t) => t.idResourceCode === idResourceCode
        );
        return translation?.text || "";
      }

      const translation = allTranslations.find(
        (t) => t.idResourceCode === idResourceCode
      );
      return translation?.text || "";
    },
    [allTranslations, translationsMap]
  );

  const getTranslation = useCallback(
    (idResourceCode: number, pageCode?: string): Translation | undefined => {
      if (pageCode) {
        const pageTranslations = translationsMap.get(pageCode) || [];
        return pageTranslations.find(
          (t) => t.idResourceCode === idResourceCode
        );
      }

      return allTranslations.find((t) => t.idResourceCode === idResourceCode);
    },
    [allTranslations, translationsMap]
  );

  const value = useMemo(
    () => ({
      translations: allTranslations,
      isLoading,
      getTranslationText,
      getTranslation,
      registerPageCodes,
    }),
    [
      allTranslations,
      isLoading,
      getTranslationText,
      getTranslation,
      registerPageCodes,
    ]
  );

  const pageCodeComponents = useMemo(
    () =>
      Array.from(registeredPageCodes).map((pageCode) => (
        <PageCodeTranslations
          key={pageCode}
          pageCode={pageCode}
          onData={handlePageData}
        />
      )),
    [registeredPageCodes, handlePageData]
  );

  return (
    <TranslationsContext.Provider value={value}>
      {pageCodeComponents}
      {children}
    </TranslationsContext.Provider>
  );
};

export const useTranslations = () => {
  const context = useContext(TranslationsContext);
  if (!context) {
    throw new Error(
      "useTranslations must be used within a TranslationsProvider"
    );
  }
  return context;
};
