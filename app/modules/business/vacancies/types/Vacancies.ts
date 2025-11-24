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

export interface VacancyDetail {
  idVacancy: string;
  positionTitle: string;
  positionCode: string;
  supervisor: string;
  personResponsible: string;
  aboutUs: string;
  imagineThis: string;
  whatNeed: string;
  challenge: string;
  wePropose: string;
  knowMore: string;
  deiStatement: string;
  idCountry: string;
  country: string;
  idCity: string;
  city: string;
  idSector: string;
  sector: string;
}

export interface VacancyDetailResponse extends GeneralResponse<VacancyDetail> {
  data: VacancyDetail;
}
