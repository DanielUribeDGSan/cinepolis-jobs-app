import React from "react";
import { Control, FieldError } from "react-hook-form";
import { TextInput as RNTextInput } from "react-native";
import InputBase from "./InputBase";

interface InputEmailProps {
  name: string;
  control: Control<any>;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  error?: FieldError;
  backgroundColor?: string;
  borderRadius?: number;
}

const InputEmail: React.FC<InputEmailProps> = ({
  name,
  control,
  label,
  placeholder = "ejemplo@correo.com",
  error,
  backgroundColor = "#eceef1",
  borderRadius = 10,
  ...restProps
}) => {
  const formatEmail = (text: string): string => {
    return text
      .replace(/\s/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9@.\-_]/g, "");
  };

  return (
    <InputBase
      name={name}
      control={control}
      label={label}
      placeholder={placeholder}
      keyboardType="email-address"
      autoCapitalize="none"
      autoComplete="email"
      autoCorrect={false}
      textContentType="emailAddress"
      error={error}
      backgroundColor={backgroundColor}
      borderRadius={borderRadius}
      render={(props) => (
        <RNTextInput
          {...props}
          onChangeText={(text) => {
            const formattedEmail = formatEmail(text);
            props.onChangeText?.(formattedEmail);
          }}
        />
      )}
      {...restProps}
    />
  );
};

export default InputEmail;
