import { TextStyles } from "@/app/theme/TextStyles";
import { StyleProps } from "@/app/types/Style";
import { colors } from "@/app/utils/sizes/constants/colors";
import { spacesSizes } from "@/app/utils/sizes/constants/fontSizes";
import useGetFontSize from "@/app/utils/sizes/hooks/useGetFontSize";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  label: string;
  className?: string;
  classNameText?: string;
  style?: StyleProps;
  styleText?: StyleProps;
}
const Button: React.FC<ButtonProps> = ({
  label,
  className,
  classNameText,
  style,
  styleText,
}) => {
  const { height, width } = useGetFontSize();
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={`inline-flex bg-theme-2 items-center justify-center ${className ?? ""}`}
      style={[
        {
          borderRadius: height(spacesSizes.borderRadiusButton),
          padding: width(spacesSizes.paddingButton),
          height: height(spacesSizes.heightButton),
        },
        style,
      ]}
    >
      <Text
        className={`text-[${colors.white}] font-bold ${classNameText ?? ""}`}
        style={[TextStyles.p, styleText]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
