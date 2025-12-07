import { CardVacancy } from "@/app/modules/business/vacancies/component/card-vacancy/CardVacancy";
import { LayoutAppBar } from "@/app/ui/layouts/layout-app-bar/LayoutAppBar";

export default function VacanciesScreen() {
  return (
    <LayoutAppBar showAppBar showBackButton showSafeArea showPaddingTop>
      <CardVacancy />
    </LayoutAppBar>
  );
}
