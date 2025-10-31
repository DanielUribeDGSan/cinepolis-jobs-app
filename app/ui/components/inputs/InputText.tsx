import React from "react";
import InputBase from "./InputBase";
import { InputsProps } from "./types/InputsProps";

const InputText: React.FC<InputsProps> = ({
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
