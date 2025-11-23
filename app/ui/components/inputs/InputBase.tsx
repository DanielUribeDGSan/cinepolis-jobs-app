import React from "react";
import { TextInput, TextInputProps } from "react-native-paper";
import { Controller, Control, FieldError } from "react-hook-form";
import { Animated, StyleProp, ViewStyle, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import LayoutInput from "../../layouts/LayoutInput";
import useInputBase from "./hooks/useInputBase";
import { colors } from "@/app/utils/sizes/constants/colors";
import { spacesSizes } from "@/app/utils/sizes/constants/fontSizes";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { IconConfig } from "./types/InputsProps";

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
  leftIcon?: IconConfig;
  rightIcon?: IconConfig;
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
  leftIcon,
  rightIcon,
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

  const getIconColor = (iconConfig?: IconConfig) => {
    if (iconConfig?.color) return iconConfig.color;
    if (error) return colors.error;
    return isActive ? focusedBorderColor : "#666";
  };

  const renderIcon = (iconConfig: IconConfig) => {
    const IconComponent = (
      <FontAwesome
        name={iconConfig.name}
        size={hp(iconConfig.size ?? "2.2%") || hp("2.2%")}
        color={getIconColor(iconConfig)}
      />
    );

    if (iconConfig.onPress) {
      return (
        <TouchableOpacity
          onPress={iconConfig.onPress}
          style={{ padding: 5 }}
          activeOpacity={0.7}
        >
          {IconComponent}
        </TouchableOpacity>
      );
    }

    return IconComponent;
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
              left={
                leftIcon ? (
                  <TextInput.Icon icon={() => renderIcon(leftIcon)} />
                ) : undefined
              }
              right={
                rightIcon ? (
                  <TextInput.Icon icon={() => renderIcon(rightIcon)} />
                ) : undefined
              }
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
