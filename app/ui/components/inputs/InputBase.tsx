import React, { useState, useRef, useEffect } from "react";
import { TextInput, HelperText, TextInputProps } from "react-native-paper";
import { Controller, Control, FieldError } from "react-hook-form";
import { Animated, Easing, StyleProp, ViewStyle } from "react-native";
import LayoutInput from "../../layouts/LayoutInput";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface InputBaseProps extends Omit<TextInputProps, "error"> {
  name: string;
  control: Control<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  error?: FieldError;
  backgroundColor?: string;
  borderRadius?: number;
  focusedBackgroundColor?: string;
  focusedBorderColor?: string;
  borderColor?: string;
  fontSize?: number;
  inputHeight?: number;
  className?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const InputBase: React.FC<InputBaseProps> = ({
  name,
  control,
  error,
  backgroundColor = "#eceef1",
  borderRadius = 10,
  focusedBackgroundColor = "#ffffff",
  focusedBorderColor = "#c7cdd6",
  borderColor = "transparent",
  mode = "flat",
  style,
  contentStyle,
  underlineStyle,
  fontSize,
  inputHeight,
  className,
  containerStyle,
  ...restProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const isFirstRender = useRef(true);

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const borderScaleAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  const responsiveFontSize = fontSize || wp("4%");
  const responsiveHeight = inputHeight || hp("8%");

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (isFocused) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1.03,
          friction: 5,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.spring(borderScaleAnim, {
          toValue: 1.05,
          friction: 6,
          tension: 50,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.08,
          duration: 100,
          easing: Easing.out(Easing.back(2)),
          useNativeDriver: true,
        }),

        Animated.parallel([
          Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 6,
            tension: 80,
            useNativeDriver: true,
          }),
          Animated.spring(borderScaleAnim, {
            toValue: 1,
            friction: 5,
            tension: 60,
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 200,
            easing: Easing.in(Easing.cubic),
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <Animated.View
            className={className ?? ""}
            style={{
              transform: [{ scale: scaleAnim }, { scaleY: borderScaleAnim }],
              ...(containerStyle && typeof containerStyle === "object"
                ? containerStyle
                : {}),
            }}
          >
            <LayoutInput
              backgroundColor={
                isFocused ? focusedBackgroundColor : backgroundColor
              }
              borderRadius={borderRadius}
              error={error}
              borderColor={isFocused ? focusedBorderColor : borderColor}
              borderWidth={isFocused ? 2 : 0}
            >
              <TextInput
                {...restProps}
                value={value}
                onChangeText={onChange}
                onBlur={(e) => {
                  setIsFocused(false);
                  onBlur();
                  restProps.onBlur?.(e);
                }}
                onFocus={(e) => {
                  setIsFocused(true);
                  restProps.onFocus?.(e);
                }}
                mode={mode}
                error={!!error}
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
                  ...(contentStyle && typeof contentStyle === "object"
                    ? contentStyle
                    : {}),
                }}
                style={[
                  {
                    backgroundColor: "transparent",
                    fontSize: responsiveFontSize,
                    height: responsiveHeight,
                  },
                  style,
                ]}
              />
            </LayoutInput>
          </Animated.View>
        )}
      />

      {error && (
        <HelperText
          type="error"
          visible={!!error}
          style={{
            marginBottom: hp("1.5%"),
            fontSize: wp("3.5%"),
          }}
        >
          {error.message}
        </HelperText>
      )}
    </>
  );
};

export default InputBase;
