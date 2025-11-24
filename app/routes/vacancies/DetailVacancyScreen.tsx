import { ShowVacancy } from "@/app/modules/business/vacancies/component/show-vacancy/ShowVacancy";
import { onBackPress } from "@/app/modules/shared/utils/backPage";
import { LayoutAppBar } from "@/app/ui/layouts/layout-app-bar/LayoutAppBar";

export default function DetailVacancyScreen() {
  return (
    <LayoutAppBar
      title="Detalle del Puesto"
      showAppBar={true}
      showSafeArea={true}
      showBottomFooter={false}
      onBackPress={onBackPress}
    >
      <ShowVacancy />
    </LayoutAppBar>
  );
}
