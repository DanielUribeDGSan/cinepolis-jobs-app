import { colors } from "@/app/utils/sizes/constants/colors";
import { spacesSizes } from "@/app/utils/sizes/constants/fontSizes";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import InputBase from "./InputBase";
import { InputsProps } from "./types/InputsProps";

const InputPassword: React.FC<InputsProps> = ({
  name,
  control,
  label,
  placeholder = "Ingresa tu contraseña",
  error,
  backgroundColor = colors.inputsGray,
  borderRadius = spacesSizes.borderRadiusButton,
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
              style={{ padding: hp("1%") }}
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={hp("2.2%")}
                color={error ? colors.error : colors.gray}
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
