import { useFetch } from "@/app/modules/network/hooks/useFetch";
import { VacanciesService } from "../services/vacancies.service";
import { ErrorMessage } from "@/app/modules/network/types/ErrorMessage";
import { showErrorMessage } from "@/app/ui/messages/Messages";
import { translationsMessages } from "@/app/ui/messages/constants/translations";
import { VacanciesFilter } from "../types/Vacancies";

export const useFetchSearchVacancies = (filters: VacanciesFilter) =>
  useFetch({
    key: ["fetchSearchVacancies", filters],
    fetchFn: () =>
      VacanciesService.searchVacancies(filters).catch(
        async (error: ErrorMessage) => {
          showErrorMessage({
            title: translationsMessages.errorNetworkSummary,
            description: error.data.error,
          });
        }
      ),
    enabled: true,
  });
