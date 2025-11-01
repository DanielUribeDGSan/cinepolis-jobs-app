import React from "react";
import { TextInput as RNTextInput } from "react-native";
import InputBase from "./InputBase";
import { InputsProps } from "./types/InputsProps";
import { colors } from "@/app/utils/sizes/constants/colors";
import { spacesSizes } from "@/app/utils/sizes/constants/fontSizes";

const InputNumber: React.FC<InputsProps> = ({
  name,
  control,
  label,
  placeholder = "Ingresa un número",
  error,
  backgroundColor = colors.inputsGray,
  borderRadius = spacesSizes.borderRadiusButton,
  disabled = false,
  maxLength,
  allowDecimals = false,
  allowNegative = false,
  ...restProps
}) => {
  const formatNumber = (text: string): string => {
    let formatted = text.replace(/[^0-9.-]/g, "");

    if (!allowDecimals) {
      formatted = formatted.replace(/\./g, "");
    }

    if (!allowNegative) {
      formatted = formatted.replace(/-/g, "");
    }

    if (allowDecimals) {
      const parts = formatted.split(".");
      if (parts.length > 2) {
        formatted = parts[0] + "." + parts.slice(1).join("");
      }
    }

    if (allowNegative && formatted.includes("-")) {
      const minusCount = (formatted.match(/-/g) || []).length;
      if (
        minusCount > 1 ||
        (formatted.indexOf("-") !== 0 && formatted.includes("-"))
      ) {
        formatted = formatted.replace(/-/g, "");
        if (text.startsWith("-")) {
          formatted = "-" + formatted;
        }
      }
    }

    return formatted;
  };

  return (
    <InputBase
      name={name}
      control={control}
      label={label}
      placeholder={placeholder}
      keyboardType="numeric"
      error={error}
      backgroundColor={backgroundColor}
      borderRadius={borderRadius}
      disabled={disabled}
      maxLength={maxLength}
      render={(props) => (
        <RNTextInput
          {...props}
          onChangeText={(text) => {
            const formattedNumber = formatNumber(text);
            props.onChangeText?.(formattedNumber);
          }}
        />
      )}
      {...restProps}
    />
  );
};

export default InputNumber;
