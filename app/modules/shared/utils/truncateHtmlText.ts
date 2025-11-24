/**
 * Limita el texto HTML a un máximo de caracteres, contando solo el texto visible
 * @param html - Texto HTML a truncar
 * @param maxLength - Longitud máxima en caracteres (default: 100)
 * @returns Texto HTML truncado con "..." si excede el límite
 */
export const truncateHtmlText = (
  html: string,
  maxLength: number = 100
): string => {
  if (!html) return "";

  const truncatedText = html.substring(0, maxLength).trim();

  return `${truncatedText}...`;
};
