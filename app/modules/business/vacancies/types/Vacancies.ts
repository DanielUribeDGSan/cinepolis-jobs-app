import { GeneralResponse } from "@/app/modules/shared/types/GeneralResponse";

export interface Vacancy {
  idVacancy: string;
  slug: string;
  positionTitle: string;
  aboutUs: string;
  idCountry: string;
  country: string;
  idCity: string;
  city: string;
  idSector: string;
  sector: string;
}

export interface VacanciesResponse extends GeneralResponse<Vacancy[]> {
  data: Vacancy[];
}

export interface VacanciesFilter {
  puesto: string;
  sector: string;
  pais: string;
  page: number;
  perpage: number;
  ciudad: string;
}
