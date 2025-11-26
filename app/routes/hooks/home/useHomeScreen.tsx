import { VacanciesFilter } from "@/app/modules/business/vacancies/types/Vacancies";
import { PAGE_CODES } from "@/app/modules/localization/translations/constants/pageCodes";
import { usePageTranslations } from "@/app/modules/localization/translations/hooks/usePageTranslations";
import { HomeSearchForm } from "@/app/screens/home/types/HomeSearchForm";
import { useCallback, useState } from "react";

const HOME_PAGE_CODES = [PAGE_CODES.HOME];

export const useHomeScreen = () => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [filters, setFilters] = useState<VacanciesFilter>({
    puesto: "",
    sector: "",
    pais: "",
    page: 0,
    perpage: 10,
    ciudad: "",
  });

  usePageTranslations(HOME_PAGE_CODES);

  const onSubmit = useCallback(
    async (data: HomeSearchForm) => {
      setIsBottomSheetOpen(true);
      setFilters({
        puesto: data.search ?? "",
        sector: data.search ?? "",
        pais: "",
        page: 0,
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
    isBottomSheetOpen,
    filters,
    setIsBottomSheetOpen,
    onSubmit,
    onCloseBottomSheet,
  };
};
