import React, { useState } from "react";
import { TextInput, HelperText, TextInputProps } from "react-native-paper";
import { Controller, Control, FieldError } from "react-hook-form";
import LayoutInput from "../../layouts/LayoutInput";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface InputBaseProps extends Omit<TextInputProps, "error"> {
  name: string;
  control: Control<any>;
  error?: FieldError;
  backgroundColor?: string;
  borderRadius?: number;
  focusedBackgroundColor?: string;
  focusedBorderColor?: string;
  borderColor?: string;
  fontSize?: number;
  inputHeight?: number;
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
  ...restProps
}) => {
  const [isFocused, setIsFocused] = useState(false);

  // Tamaños responsivos por defecto
  const responsiveFontSize = fontSize || wp("4%");
  const responsiveHeight = inputHeight || hp("6.5%");

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <LayoutInput
            backgroundColor={
              isFocused ? focusedBackgroundColor : backgroundColor
            }
            borderRadius={borderRadius}
            error={error}
            borderColor={isFocused ? focusedBorderColor : borderColor}
            borderWidth={isFocused ? 2 : 0}
          >
            <TextInput
              {...restProps}
              value={value}
              onChangeText={onChange}
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
        )}
      />

      {error && (
        <HelperText
          type="error"
          visible={!!error}
          style={{
            marginBottom: hp("1.5%"),
            fontSize: wp("3.5%"), // Texto de error también responsivo
          }}
        >
          {error.message}
        </HelperText>
      )}
    </>
  );
};

export default InputBase;
