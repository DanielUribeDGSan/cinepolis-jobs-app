import React from "react";
import { Control, FieldError } from "react-hook-form";
import { TextInput as RNTextInput } from "react-native";
import InputBase from "./InputBase";

interface InputNumberProps {
  name: string;
  control: Control<any>;
  label: string;
  placeholder?: string;
  error?: FieldError;
  backgroundColor?: string;
  borderRadius?: number;
  disabled?: boolean;
  maxLength?: number;
  allowDecimals?: boolean;
  allowNegative?: boolean;
}

const InputNumber: React.FC<InputNumberProps> = ({
  name,
  control,
  label,
  placeholder = "Ingresa un número",
  error,
  backgroundColor = "#eceef1",
  borderRadius = 10,
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
