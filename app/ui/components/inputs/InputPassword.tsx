import React, { useState } from "react";
import { Control, FieldError } from "react-hook-form";
import { TextInput } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import InputBase from "./InputBase";
import { InputsProps } from "./types/InputsProps";

const InputPassword: React.FC<InputsProps> = ({
  name,
  control,
  label,
  placeholder = "Ingresa tu contraseña",
  error,
  backgroundColor = "#eceef1",
  borderRadius = 10,
  disabled = false,
  ...restProps
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <InputBase
      name={name}
      control={control}
      label={label}
      placeholder={placeholder}
      secureTextEntry={!showPassword}
      keyboardType="default"
      autoCapitalize="none"
      autoComplete="password"
      autoCorrect={false}
      textContentType="password"
      error={error}
      backgroundColor={backgroundColor}
      borderRadius={borderRadius}
      disabled={disabled}
      right={
        <TextInput.Icon
          icon={() => (
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={{ padding: 5 }} // Área de toque más grande
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={22}
                color={error ? "#FF3B30" : "#666"}
              />
            </TouchableOpacity>
          )}
        />
      }
      {...restProps}
    />
  );
};

export default InputPassword;
