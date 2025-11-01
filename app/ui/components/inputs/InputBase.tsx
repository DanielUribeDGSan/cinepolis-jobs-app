import React from "react";
import { TextInput, TextInputProps } from "react-native-paper";
import { Controller, Control, FieldError } from "react-hook-form";
import { Animated, StyleProp, ViewStyle } from "react-native";
import LayoutInput from "../../layouts/LayoutInput";
import useInputBase from "./hooks/useInputBase";
import { colors } from "@/app/utils/sizes/constants/colors";
import { spacesSizes } from "@/app/utils/sizes/constants/fontSizes";

interface InputBaseProps extends Omit<TextInputProps, "error"> {
  name: string;
  control: Control<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  error?: FieldError;
  backgroundColor?: string;
  borderRadius?: string;
  focusedBackgroundColor?: string;
  focusedBorderColor?: string;
  borderColor?: string;
  fontSize?: number;
  inputHeight?: number;
  className?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const InputBase: React.FC<InputBaseProps> = ({
  name,
  control,
  error,
  label,
  backgroundColor = colors.inputsGray,
  borderRadius = spacesSizes.borderRadiusButton,
  focusedBackgroundColor = colors.white,
  focusedBorderColor = colors.borderColor,
  borderColor = "transparent",
  mode = "flat",
  style,
  contentStyle,
  underlineStyle,
  fontSize,
  inputHeight,
  className,
  containerStyle,
  ...restProps
}) => {
  const {
    isActive,
    scaleAnim,
    borderScaleAnim,
    responsiveFontSize,
    responsiveHeight,
    setIsFocused,
  } = useInputBase({
    control,
    name,
    inputHeight,
    fontSize,
  });

  const getBorderColor = () => {
    if (error) return colors.error;
    if (isActive) return focusedBorderColor;
    return borderColor;
  };

  const getLabel = () => {
    if (error) return error.message;
    return label;
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <Animated.View
          className={className ?? ""}
          style={{
            transform: [{ scale: scaleAnim }, { scaleY: borderScaleAnim }],
            ...(containerStyle && typeof containerStyle === "object"
              ? containerStyle
              : {}),
          }}
        >
          <LayoutInput
            backgroundColor={
              isActive ? focusedBackgroundColor : backgroundColor
            }
            borderRadius={borderRadius}
            error={error}
            borderColor={getBorderColor()}
            borderWidth={error || isActive ? 2 : 0}
          >
            <TextInput
              {...restProps}
              label={getLabel()}
              value={value}
              onChangeText={(text) => {
                onChange(text);
              }}
              onBlur={(e) => {
                setIsFocused(false);
                onBlur();
                restProps.onBlur?.(e);
              }}
              onFocus={(e) => {
                setIsFocused(true);
                restProps.onFocus?.(e);
              }}
              mode={mode}
              error={!!error}
              underlineStyle={{
                display: "none",
                ...(underlineStyle && typeof underlineStyle === "object"
                  ? underlineStyle
                  : {}),
              }}
              contentStyle={{
                backgroundColor: "transparent",
                fontSize: responsiveFontSize,
                height: responsiveHeight,
                ...(contentStyle && typeof contentStyle === "object"
                  ? contentStyle
                  : {}),
              }}
              style={[
                {
                  backgroundColor: "transparent",
                  fontSize: responsiveFontSize,
                  height: responsiveHeight,
                },
                style,
              ]}
            />
          </LayoutInput>
        </Animated.View>
      )}
    />
  );
};

export default InputBase;
