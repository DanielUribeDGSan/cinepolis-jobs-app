import { useTranslations } from "../contexts/TranslationsContext";

interface UseGetTextProps {
  idResourceCode: number;
  pageCode?: string;
}

export const useGetText = ({ idResourceCode, pageCode }: UseGetTextProps) => {
  const { getTranslationText } = useTranslations();
  const text = getTranslationText(idResourceCode, pageCode);

  return { text };
};
