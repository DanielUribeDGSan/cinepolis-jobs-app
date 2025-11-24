import apiClient from "@/app/modules/network/api/apiClient";
import { ErrorMessage } from "@/app/modules/network/types/ErrorMessage";
import { VacanciesEndpoints } from "./vacancies.endpoints";
import {
  VacanciesFilter,
  VacanciesResponse,
  Vacancy,
  VacancyDetail,
  VacancyDetailResponse,
} from "../types/Vacancies";

export const VacanciesService = {
  searchVacancies: async (filters: VacanciesFilter): Promise<Vacancy[]> => {
    const response = await apiClient
      .get<VacanciesResponse>(
        VacanciesEndpoints.searchVacancies(
          filters.puesto,
          filters.sector,
          filters.pais,
          filters.page,
          filters.perpage,
          filters.ciudad
        )
      )
      .catch((error: ErrorMessage) => {
        throw error;
      });

    return response.data.data;
  },

  getVacancyBySlug: async (slug: string): Promise<VacancyDetail> => {
    const response = await apiClient
      .get<VacancyDetailResponse>(VacanciesEndpoints.getVacancyBySlug(slug))
      .catch((error: ErrorMessage) => {
        throw error;
      });
    return response.data.data;
  },
};
