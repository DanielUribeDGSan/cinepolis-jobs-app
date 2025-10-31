import React from "react";
import { Control, FieldError } from "react-hook-form";
import InputBase from "./InputBase";

interface InputTextProps {
  name: string;
  control: Control<any>;
  label: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  multiline?: boolean;
  numberOfLines?: number;
  disabled?: boolean;
  error?: FieldError;
  backgroundColor?: string;
  borderRadius?: number;
}

const InputText: React.FC<InputTextProps> = ({
  name,
  control,
  label,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "sentences",
  multiline = false,
  numberOfLines = 1,
  disabled = false,
  error,
  backgroundColor = "#eceef1",
  borderRadius = 10,
  ...restProps
}) => {
  return (
    <InputBase
      name={name}
      control={control}
      label={label}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      multiline={multiline}
      numberOfLines={numberOfLines}
      disabled={disabled}
      error={error}
      backgroundColor={backgroundColor}
      borderRadius={borderRadius}
      {...restProps}
    />
  );
};

export default InputText;
