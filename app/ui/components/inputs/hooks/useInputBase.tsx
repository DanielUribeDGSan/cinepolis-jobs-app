import { useEffect, useRef, useState, useMemo } from "react";
import { useWatch, Control } from "react-hook-form";
import { Animated, Easing } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

interface UseInputBaseProps {
  control: Control<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  name: string;
  inputHeight?: number;
  fontSize?: number;
}

const useInputBase = ({
  control,
  name,
  inputHeight,
  fontSize,
}: UseInputBaseProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const isFirstRender = useRef(true);

  const scaleAnim = useMemo(() => new Animated.Value(1), []);
  const borderScaleAnim = useMemo(() => new Animated.Value(1), []);
  const glowAnim = useMemo(() => new Animated.Value(0), []);

  const responsiveFontSize = fontSize || hp("2%");
  const responsiveHeight = inputHeight || hp("7%");

  const watchedValue = useWatch({ control, name });
  const hasContent = useMemo(() => {
    if (typeof watchedValue === "string") {
      return !!watchedValue && watchedValue.trim().length > 0;
    }
    return !!watchedValue;
  }, [watchedValue]);

  const isActive = isFocused || hasContent;

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (isFocused) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1.01,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.spring(borderScaleAnim, {
          toValue: 1.02,
          friction: 8,
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
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 80,
          useNativeDriver: true,
        }),
        Animated.spring(borderScaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 60,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 200,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isFocused, scaleAnim, borderScaleAnim, glowAnim]);

  return {
    isFocused,
    setIsFocused,
    hasContent,
    isActive,
    scaleAnim,
    borderScaleAnim,
    glowAnim,
    responsiveFontSize,
    responsiveHeight,
    watchedValue,
  };
};

export default useInputBase;
