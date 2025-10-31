import React from "react";
import { TextInput, HelperText, TextInputProps } from "react-native-paper";
import { Controller, Control, FieldError } from "react-hook-form";
import { Animated, StyleProp, ViewStyle } from "react-native";
import LayoutInput from "../../layouts/LayoutInput";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import useInputBase from "./hooks/useInputBase";

interface InputBaseProps extends Omit<TextInputProps, "error"> {
  name: string;
  control: Control<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  error?: FieldError;
  backgroundColor?: string;
  borderRadius?: number;
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
  backgroundColor = "#eceef1",
  borderRadius = 10,
  focusedBackgroundColor = "#ffffff",
  focusedBorderColor = "#c7cdd6",
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

  return (
    <>
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
              borderColor={isActive ? focusedBorderColor : borderColor}
              borderWidth={isActive ? 2 : 0}
            >
              <TextInput
                {...restProps}
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

      {error && (
        <HelperText
          type="error"
          visible={!!error}
          style={{
            marginBottom: hp("1.5%"),
            fontSize: wp("3.5%"),
          }}
        >
          {error.message}
        </HelperText>
      )}
    </>
  );
};

export default InputBase;
