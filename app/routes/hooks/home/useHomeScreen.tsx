import { PAGE_CODES } from "@/app/modules/localization/translations/constants/pageCodes";
import { usePageTranslations } from "@/app/modules/localization/translations/hooks/usePageTranslations";
import { HomeSearchForm } from "@/app/screens/home/types/HomeSearchForm";
import { router } from "expo-router";
import { useCallback } from "react";

const HOME_PAGE_CODES = [PAGE_CODES.HOME];

export const useHomeScreen = () => {
  usePageTranslations(HOME_PAGE_CODES);

  const onSubmit = useCallback(async (data: HomeSearchForm) => {
    router.push({
      pathname: "/routes/vacancies/VacanciesScreen",
      params: {
        puesto: data.search ?? "",
        sector: data.search ?? "",
        pais: "",
        page: 0,
        perpage: 10,
        ciudad: "",
      },
    });
  }, []);

  return {
    onSubmit,
  };
};
