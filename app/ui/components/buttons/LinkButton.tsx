import { colors } from "@/app/utils/sizes/constants/colors";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { TextStyles } from "../../../theme/TextStyles";

interface LinkButtonProps {
  onPress: () => void;
  label: string;
  color?: string;
  textClassName?: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({
  onPress,
  label,
  color,
  textClassName,
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Text
        className={`underline ${textClassName || `text-[${colors.secondary}]`}`}
        style={{
          ...TextStyles.medium,
          ...(color && { color }),
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default LinkButton;
