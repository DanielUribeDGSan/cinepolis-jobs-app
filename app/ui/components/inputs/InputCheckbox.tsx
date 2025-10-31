import React from "react";
import { Checkbox } from "react-native-paper";
import { Controller, Control, FieldError } from "react-hook-form";
import {
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  View,
  Text,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colors } from "@/app/utils/sizes/constants/colors";
import { TextStyles } from "@/app/theme/TextStyles";

interface InputCheckboxProps {
  name: string;
  control: Control<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  error?: FieldError;
  disabled?: boolean;
  backgroundColor?: string;
  borderRadius?: number;
  checkedColor?: string;
  uncheckedColor?: string;
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
  size?: "small" | "medium" | "large";
}

const InputCheckbox: React.FC<InputCheckboxProps> = ({
  name,
  control,
  label,
  disabled = false,
  backgroundColor = colors.primary,
  borderRadius = wp("1%"),
  checkedColor = colors.primary,
  uncheckedColor = colors.primary,
  containerStyle,
  size = "small",
}) => {
  const sizeConfigs = {
    small: {
      padding: wp("2%"),
      checkboxScale: 0.8,
      containerSize: wp("5%"),
    },
    medium: {
      padding: wp("2.5%"),
      checkboxScale: 0.9,
      containerSize: wp("7%"),
    },
    large: {
      padding: wp("3%"),
      checkboxScale: 1,
      containerSize: wp("8%"),
    },
  };

  const config = sizeConfigs[size];

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <View className="flex-row items-center gap-2">
          <TouchableOpacity
            onPress={() => !disabled && onChange(!value)}
            disabled={disabled}
            activeOpacity={0.7}
            style={[
              {
                width: config.containerSize,
                height: config.containerSize,
                backgroundColor: value ? backgroundColor : "transparent",
                borderRadius: borderRadius,
                borderWidth: value ? 2 : 2,
                borderColor: value ? checkedColor : backgroundColor,
                justifyContent: "center",
                alignItems: "center",
                opacity: disabled ? 0.6 : 1,
              },
              containerStyle,
            ]}
          >
            <View
              style={{
                transform: [{ scale: config.checkboxScale }],
              }}
            >
              <Checkbox
                status={value ? "checked" : "unchecked"}
                onPress={() => !disabled && onChange(!value)}
                disabled={disabled}
                theme={{
                  colors: {
                    primary: checkedColor,
                    outline: uncheckedColor,
                  },
                }}
              />
            </View>
          </TouchableOpacity>
          {label && (
            <TouchableOpacity
              onPress={() => !disabled && onChange(!value)}
              activeOpacity={1}
            >
              <Text style={TextStyles.medium}>{label}</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    />
  );
};

export default InputCheckbox;
