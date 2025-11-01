import React from "react";
import { Text, View } from "react-native";
import LinkButton from "../buttons/LinkButton";
import { TextStyles } from "@/app/theme/TextStyles";
import { LinkButtonProps } from "../buttons/types/LinkButtonProps";
import { StyleProps } from "@/app/types/Style";

interface TitleAndButtonProps extends LinkButtonProps {
  title: string;
  className?: string;
  style?: StyleProps;
  styleText?: StyleProps;
  textClassName?: string;
  textClassNameLinkButton?: string;
  colorLinkButton?: string;
  colorText?: string;
}

const TitleAndButton: React.FC<TitleAndButtonProps> = ({
  title,
  label,
  fontSize,
  className,
  style,
  outline,
  textClassName,
  textClassNameLinkButton,
  colorLinkButton,
  colorText,
  styleText,
  onPress,
}) => {
  return (
    <View className={className ?? ""} style={style}>
      <Text
        className={`${textClassName ?? ""}`}
        style={[
          { ...TextStyles.p, ...(colorText && { color: colorText }) },
          styleText,
        ]}
      >
        {title}
      </Text>
      <LinkButton
        onPress={onPress}
        textClassName={textClassNameLinkButton}
        label={label}
        fontSize={fontSize}
        outline={outline}
        color={colorLinkButton}
      />
    </View>
  );
};

export default TitleAndButton;
