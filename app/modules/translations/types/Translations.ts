export interface Translation {
  pageCode: string;
  page: string;
  idResourceCode: number;
  resourceCode: string;
  idResourceCodeType: number;
  resourceCodeType: string;
  idLanguage: number;
  language: string;
  text: string;
}

export interface ResponseTranslations {
  success: boolean;
  error: string;
  dataError: string;
  data: Translation[];
}
