import { colors } from "@/app/utils/sizes/constants/colors";
import { spacesSizes } from "@/app/utils/sizes/constants/fontSizes";
import React, { useEffect, useRef } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

interface InputOTPProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
}

const InputOTP: React.FC<InputOTPProps> = ({
  length = 5,
  value,
  onChange,
  error = false,
}) => {
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    // Inicializar los refs
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  const handleChange = (text: string, index: number) => {
    // Solo permitir números
    const numericText = text.replace(/[^0-9]/g, "");

    if (numericText.length > 1) {
      // Si se pega un código completo
      const newValue = numericText.slice(0, length);
      onChange(newValue);

      // Enfocar el último input
      if (newValue.length === length) {
        inputRefs.current[length - 1]?.focus();
      } else if (newValue.length < length) {
        inputRefs.current[newValue.length]?.focus();
      }
      return;
    }

    // Actualizar el valor
    const newValue =
      value.slice(0, index) + numericText + value.slice(index + 1);
    onChange(newValue.slice(0, length));

    // Mover al siguiente input si hay texto
    if (numericText && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Si se presiona backspace y el campo está vacío, ir al anterior
    if (e.nativeEvent.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleFocus = (index: number) => {
    inputRefs.current[index]?.focus();
  };

  return (
    <View style={styles.container}>
      {Array.from({ length }).map((_, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={1}
          onPress={() => handleFocus(index)}
        >
          <TextInput
            ref={(ref) => {
              inputRefs.current[index] = ref;
            }}
            style={[
              styles.input,
              error && styles.inputError,
              value[index] && styles.inputFilled,
            ]}
            value={value[index] || ""}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="number-pad"
            maxLength={1}
            selectTextOnFocus
            autoFocus={index === 0 && value.length === 0}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    marginVertical: 20,
  },
  input: {
    width: 50,
    height: 60,
    borderWidth: 2,
    borderColor: colors.inputsGray,
    borderRadius: spacesSizes.borderRadiusButton,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
    color: colors.primary,
    backgroundColor: colors.inputsGray,
  },
  inputFilled: {
    borderColor: colors.secondary,
    backgroundColor: colors.white,
  },
  inputError: {
    borderColor: "#EF4444",
  },
});

export default InputOTP;
