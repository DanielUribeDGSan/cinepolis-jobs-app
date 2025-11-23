import { useRef, useEffect, useMemo, useCallback } from "react";
import { useTranslations } from "../contexts/TranslationsContext";

/**
 * Hook para registrar los pageCodes necesarios en una pantalla
 * @param pageCodes - Array de pageCodes o un solo pageCode que se necesitan en esta pantalla
 * @example
 * usePageTranslations(["60e84d20", "60e84d21"]);
 * usePageTranslations("60e84d20");
 */
export const usePageTranslations = (pageCodes: string | string[]) => {
  const { registerPageCodes } = useTranslations();
  const registeredCodesRef = useRef<string | null>(null);
  const isInitialMountRef = useRef(true);

  const normalizedCodes = useMemo(() => {
    const arr = Array.isArray(pageCodes) ? pageCodes : [pageCodes];
    return [...arr].sort();
  }, [pageCodes]);

  const codesKey = useMemo(() => {
    return JSON.stringify(normalizedCodes);
  }, [normalizedCodes]);

  const stableRegisterPageCodes = useCallback(
    (codes: string[], unregister?: boolean) => {
      registerPageCodes(codes, unregister);
    },
    [registerPageCodes]
  );

  useEffect(() => {
    const codesChanged = registeredCodesRef.current !== codesKey;

    if (isInitialMountRef.current || codesChanged) {
      if (
        !isInitialMountRef.current &&
        registeredCodesRef.current &&
        codesChanged
      ) {
        try {
          const prevCodes = JSON.parse(registeredCodesRef.current) as string[];
          if (prevCodes.length > 0) {
            stableRegisterPageCodes(prevCodes, true);
          }
        } catch {
          throw new Error("Error parsing codes");
        }
      }

      if (normalizedCodes.length > 0) {
        stableRegisterPageCodes(normalizedCodes);
      }
      registeredCodesRef.current = codesKey;
      isInitialMountRef.current = false;
    }

    return () => {
      if (registeredCodesRef.current) {
        try {
          const codes = JSON.parse(registeredCodesRef.current) as string[];
          if (codes.length > 0) {
            stableRegisterPageCodes(codes, true);
          }
        } catch {
          throw new Error("Error parsing codes");
        }
        registeredCodesRef.current = null;
        isInitialMountRef.current = true;
      }
    };
  }, [codesKey, normalizedCodes, stableRegisterPageCodes]);
};
