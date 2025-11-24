import { useFetch } from "@/app/modules/network/hooks/useFetch";
import { VacanciesService } from "../services/vacancies.service";
import { ErrorMessage } from "@/app/modules/network/types/ErrorMessage";
import { showErrorMessage } from "@/app/ui/messages/Messages";
import { translationsMessages } from "@/app/ui/messages/constants/translations";

export const useFetchGetVacancy = (slug: string) =>
  useFetch({
    key: ["fetchGetVacancy", slug],
    fetchFn: () =>
      VacanciesService.getVacancyBySlug(slug).catch(
        async (error: ErrorMessage) => {
          showErrorMessage({
            title: translationsMessages.errorNetworkSummary,
            description: error.data.error,
          });
        }
      ),
    enabled: true,
  });
