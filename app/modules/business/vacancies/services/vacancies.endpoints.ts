export const VacanciesEndpoints = {
  searchVacancies: (
    puesto: string,
    sector: string,
    pais: string,
    page: number,
    perpage: number,
    ciudad: string
  ) =>
    `/V1/Vacancy/SearchVacancy?puesto=${puesto}&sector=${sector}&pais=${pais}&page=${page}&perpage=${perpage}&ciudad=${ciudad}`,
};
