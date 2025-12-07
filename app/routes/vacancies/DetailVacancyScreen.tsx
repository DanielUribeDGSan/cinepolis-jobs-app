import { ShowVacancy } from "@/app/modules/business/vacancies/component/show-vacancy/ShowVacancy";
import { LayoutAppBar } from "@/app/ui/layouts/layout-app-bar/LayoutAppBar";

export default function DetailVacancyScreen() {
  return (
    <LayoutAppBar showAppBar showSafeArea showBackButton showPaddingTop>
      <ShowVacancy />
    </LayoutAppBar>
  );
}
