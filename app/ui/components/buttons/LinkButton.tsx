import { colors } from "@/app/utils/sizes/constants/colors";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { TextStyles } from "../../../theme/TextStyles";
import { LinkButtonProps } from "./types/LinkButtonProps";

const LinkButton: React.FC<LinkButtonProps> = ({
  onPress,
  label,
  color,
  outline = true,
  textClassName,
  fontSize = "medium",
}) => {
  const fontSizeStyle = fontSize ? TextStyles[fontSize] : TextStyles.medium;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Text
        className={` ${outline ? "underline" : ""} ${textClassName ?? `text-[${colors.secondary}]`}`}
        style={{
          ...fontSizeStyle,
          ...(color && { color }),
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default LinkButton;
