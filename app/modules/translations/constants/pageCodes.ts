/**
 * Constantes de pageCodes para las diferentes secciones de traducciones
 */
export const PAGE_CODES = {
  HOME: "60e84d20",
  EXPERIENCE: "60e84d21",
  YOUNG_TALENT: "60e84d22",
  VACANCIES: "60e84d23",
} as const;

export type PageCode = (typeof PAGE_CODES)[keyof typeof PAGE_CODES];
