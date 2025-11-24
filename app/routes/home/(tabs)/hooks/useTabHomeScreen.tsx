import { VacanciesFilter } from "@/app/modules/business/vacancies/types/Vacancies";
import { PAGE_CODES } from "@/app/modules/localization/translations/constants/pageCodes";
import { usePageTranslations } from "@/app/modules/localization/translations/hooks/usePageTranslations";
import { HomeSearchForm } from "@/app/screens/home/types/HomeSearchForm";
import { useCallback, useMemo, useState } from "react";

const HOME_PAGE_CODES = [PAGE_CODES.HOME];

export const useTabHomeScreen = () => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [filters, setFilters] = useState<VacanciesFilter>({
    puesto: "",
    sector: "",
    pais: "",
    page: 1,
    perpage: 10,
    ciudad: "",
  });

  usePageTranslations(HOME_PAGE_CODES);

  const slides = useMemo(
    () => [
      {
        id: 1,
        image: require("@/assets/images/bg/bg-1.webp"),
      },
      {
        id: 2,
        image: require("@/assets/images/bg/bg-2.avif"),
      },
      {
        id: 3,
        image: require("@/assets/images/bg/bg-3.webp"),
      },
    ],
    []
  );

  const onSubmit = useCallback(
    async (data: HomeSearchForm) => {
      setIsBottomSheetOpen(true);
      setFilters({
        puesto: data.search ?? "",
        sector: data.search ?? "",
        pais: "",
        page: 1,
        perpage: 10,
        ciudad: "",
      });
    },
    [setIsBottomSheetOpen]
  );

  const onCloseBottomSheet = useCallback(() => {
    setIsBottomSheetOpen(false);
  }, [setIsBottomSheetOpen]);

  return {
    slides,
    isBottomSheetOpen,
    filters,
    setIsBottomSheetOpen,
    onSubmit,
    onCloseBottomSheet,
  };
};
