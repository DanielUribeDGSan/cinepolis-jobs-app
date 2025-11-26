import React from "react";
import { StyleSheet, Text, TextProps, TextStyle } from "react-native";
import { useTranslations } from "../contexts/TranslationsContext";

interface FormattedTextProps extends Omit<TextProps, "children"> {
  idResourceCode: number;
  pageCode?: string;
  styleChildren?: TextStyle;
}

export const FormattedText: React.FC<FormattedTextProps> = ({
  idResourceCode,
  pageCode,
  style,
  styleChildren,
  ...textProps
}) => {
  const { getTranslationText } = useTranslations();
  const text = getTranslationText(idResourceCode, pageCode);

  const formattedContent = parseBoldText(text, styleChildren);

  return (
    <Text style={style} {...textProps}>
      {formattedContent}
    </Text>
  );
};

const parseBoldText = (
  text: string,
  styleChildren?: TextStyle
): (string | React.ReactElement)[] => {
  if (!text) return [];

  const parts = text.split(/(\*n\*.*?\*\/n\*)/g);

  return parts.map((part, index) => {
    if (part.match(/\*n\*.*?\*\/n\*/)) {
      // Extrae el texto entre *n* y */n*
      const boldText = part.replace(/\*n\*(.*?)\*\/n\*/, "$1");

      return React.createElement(
        Text,
        {
          key: `bold-${boldText}-${String(index)}`,
          style: [styles.bold, styleChildren],
        },
        boldText
      );
    }
    return part;
  });
};

const styles = StyleSheet.create({
  bold: {
    fontWeight: "bold",
  },
});

export default FormattedText;
