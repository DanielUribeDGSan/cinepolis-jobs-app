import { useInputFocus } from "@/app/ui/layouts/tab-layout/hooks/useInputFocus";
import { colors } from "@/app/utils/sizes/constants/colors";
import { spacesSizes } from "@/app/utils/sizes/constants/fontSizes";
import { FontAwesome } from "@expo/vector-icons";
import React, { useMemo, useRef } from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import {
  Animated,
  StyleProp,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ViewStyle,
} from "react-native";
import { TextInput, TextInputProps } from "react-native-paper";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import LayoutInput from "../../layouts/LayoutInput";
import useInputBase from "./hooks/useInputBase";
import { IconConfig } from "./types/InputsProps";

interface InputBaseProps extends Omit<TextInputProps, "error"> {
  name: string;
  control: Control<any>;
  error?: FieldError;
  backgroundColor?: string;
  borderRadius?: string;
  focusedBackgroundColor?: string;
  focusedBorderColor?: string;
  borderColor?: string;
  fontSize?: number;
  inputHeight?: number;
  className?: string;
  containerStyle?: StyleProp<ViewStyle>;
  leftIcon?: IconConfig;
  rightIcon?: IconConfig;
}

const InputBase: React.FC<InputBaseProps> = ({
  name,
  control,
  error,
  label,
  backgroundColor = colors.inputsGray,
  borderRadius = spacesSizes.borderRadiusButton,
  focusedBackgroundColor = colors.white,
  focusedBorderColor = colors.borderColor,
  borderColor = "transparent",
  mode = "flat",
  style,
  contentStyle,
  underlineStyle,
  fontSize,
  inputHeight,
  className,
  containerStyle,
  leftIcon,
  rightIcon,
  ...restProps
}) => {
  const {
    isActive,
    scaleAnim,
    borderScaleAnim,
    responsiveFontSize,
    responsiveHeight,
    setIsFocused,
    isFocused,
  } = useInputBase({
    control,
    name,
    inputHeight,
    fontSize,
  });

  // Ocultar tab bar cuando el input está enfocado
  useInputFocus(isFocused);

  const inputRef = useRef<any>(null);
  const containerRef = useRef<any>(null);

  const handleFocus = (e: any) => {
    setIsFocused(true);

    // Dejar que KeyboardAwareScrollView maneje el scroll automático completamente
    // No hacer scroll manual para evitar conflictos cuando el usuario hace scroll manualmente
    restProps.onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    restProps.onBlur?.(e);
  };

  const getBorderColor = () => {
    if (error) return colors.error;
    if (isActive) return focusedBorderColor;
    return borderColor;
  };

  const getLabel = () => {
    if (error) return error.message;
    return label;
  };

  const getIconColor = (iconConfig?: IconConfig) => {
    if (iconConfig?.color) return iconConfig.color;
    if (error) return colors.error;
    return isActive ? focusedBorderColor : "#666";
  };

  // Crear tema personalizado para React Native Paper para asegurar colores consistentes
  const paperTheme = useMemo(
    () => ({
      colors: {
        primary: colors.primary, // Color del label igual al texto
        text: colors.primary, // Color del texto del input
        placeholder: colors.gray, // Color del placeholder
        error: colors.error, // Color del error
      },
    }),
    []
  );

  const renderIcon = (iconConfig: IconConfig) => {
    const IconComponent = (
      <FontAwesome
        name={iconConfig.name}
        size={hp(iconConfig.size ?? "2.2%") || hp("2.2%")}
        color={getIconColor(iconConfig)}
      />
    );

    if (iconConfig.onPress) {
      return (
        <TouchableOpacity
          onPress={iconConfig.onPress}
          style={{ padding: 5 }}
          activeOpacity={0.7}
        >
          {IconComponent}
        </TouchableOpacity>
      );
    }

    return IconComponent;
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <TouchableWithoutFeedback
          onPress={() => {
            // Enfocar el input cuando se hace clic en cualquier parte del contenedor
            inputRef.current?.focus();
          }}
        >
          <Animated.View
            ref={containerRef}
            className={className ?? ""}
            style={{
              transform: [{ scale: scaleAnim }, { scaleY: borderScaleAnim }],
              marginBottom: 10, // Añadir margen inferior para evitar solapamientos
              ...(containerStyle && typeof containerStyle === "object"
                ? containerStyle
                : {}),
            }}
          >
            <LayoutInput
              backgroundColor={
                isActive ? focusedBackgroundColor : backgroundColor
              }
              borderRadius={borderRadius}
              error={error}
              borderColor={getBorderColor()}
              borderWidth={error || isActive ? 2 : 0}
            >
              <TextInput
                {...restProps}
                ref={inputRef}
                label={getLabel()}
                value={value}
                onChangeText={(text) => {
                  onChange(text);
                }}
                onBlur={(e) => {
                  handleBlur(e);
                  onBlur();
                }}
                onFocus={handleFocus}
                mode={mode}
                error={!!error}
                theme={paperTheme}
                textColor={colors.primary} // Color explícito del texto
                activeOutlineColor={colors.secondary} // Color del borde cuando está activo
                outlineColor="transparent" // Color del borde cuando no está activo
                left={
                  leftIcon ? (
                    <TextInput.Icon icon={() => renderIcon(leftIcon)} />
                  ) : undefined
                }
                right={
                  rightIcon ? (
                    <TextInput.Icon icon={() => renderIcon(rightIcon)} />
                  ) : undefined
                }
                underlineStyle={{
                  display: "none",
                  ...(underlineStyle && typeof underlineStyle === "object"
                    ? underlineStyle
                    : {}),
                }}
                contentStyle={{
                  backgroundColor: "transparent",
                  fontSize: responsiveFontSize,
                  height: responsiveHeight,
                  color: colors.primary, // Color explícito del texto en contentStyle
                  ...(contentStyle && typeof contentStyle === "object"
                    ? contentStyle
                    : {}),
                }}
                style={[
                  {
                    backgroundColor: "transparent",
                    fontSize: responsiveFontSize,
                    height: responsiveHeight,
                    fontWeight: "600",
                    color: colors.primary, // Color explícito del texto
                  },
                  style,
                ]}
                // Configuraciones adicionales para mejor manejo del teclado
                returnKeyType="next"
                blurOnSubmit={false}
                enablesReturnKeyAutomatically={true}
              />
            </LayoutInput>
          </Animated.View>
        </TouchableWithoutFeedback>
      )}
    />
  );
};

export default InputBase;
