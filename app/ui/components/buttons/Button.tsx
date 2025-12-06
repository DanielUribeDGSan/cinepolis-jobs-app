import { TextStyles } from "@/app/theme/TextStyles";
import { StyleProps } from "@/app/types/Style";
import { colors } from "@/app/utils/sizes/constants/colors";
import React from "react";
import { StyleProp, Text, TextStyle, TouchableOpacity } from "react-native";
import useButton from "./hooks/useButton";

interface ButtonProps {
  label: string;
  className?: string;
  classNameText?: string;
  style?: StyleProps;
  styleText?: StyleProp<TextStyle>;
  onPress?: () => void;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  colorLabel?: string;
}
const Button: React.FC<ButtonProps> = ({
  label,
  className,
  classNameText,
  style,
  styleText,
  onPress,
  disabled = false,
  size = "large",
  colorLabel = colors.white,
}) => {
  const { getSize } = useButton();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled}
      className={`inline-flex bg-theme-secondary items-center justify-center ${className ?? ""}`}
      style={[
        {
          ...getSize(size),
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      <Text
        className={`text-[${colorLabel}] font-bold ${classNameText ?? ""}`}
        style={[TextStyles.p, styleText]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
