import React from "react";
import { TextInput as RNTextInput } from "react-native";
import InputBase from "./InputBase";
import { InputsProps } from "./types/InputsProps";
import { colors } from "@/app/utils/sizes/constants/colors";
import { spacesSizes } from "@/app/utils/sizes/constants/fontSizes";

const InputEmail: React.FC<InputsProps> = ({
  name,
  control,
  label,
  placeholder = "ejemplo@correo.com",
  error,
  backgroundColor = colors.inputsGray,
  borderRadius = spacesSizes.borderRadiusButton,
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
