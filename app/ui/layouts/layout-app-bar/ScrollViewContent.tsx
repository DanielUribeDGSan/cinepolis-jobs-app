import { StyleProps } from "@/app/types/Style";
import { containers } from "@/app/utils/sizes/constants/containers";
import React, { useEffect, useMemo, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ScrollViewContentProps {
  children: React.ReactNode;
  styleScrollViewContent?: StyleProps;
  viewContainerContent?: StyleProps;
  showBottomFooter: boolean;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  hasHeader?: boolean;
}

export const ScrollViewContent = ({
  children,
  styleScrollViewContent,
  viewContainerContent,
  showBottomFooter,
  onScroll,
  hasHeader = false,
}: ScrollViewContentProps) => {
  const insets = useSafeAreaInsets();
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  // Detectar cuando el teclado está visible
  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
      }
    );

    const keyboardWillHide = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  // Altura aproximada del Appbar.Header
  const headerHeight = hp("7%");

  const containerStyle = useMemo(
    () => [
      {
        paddingTop: hasHeader
          ? hp(containers.topScreen) + headerHeight
          : hp(containers.topScreen),
        paddingHorizontal: hp(containers.horizontalScreen),
        paddingBottom: showBottomFooter
          ? hp(containers.bottomFooter) + insets.bottom
          : Math.max(insets.bottom, 20), // Mínimo 20px, máximo insets.bottom
        flex: 1,
        // Agregar padding extra solo cuando el teclado está visible para evitar que el input quede cortado
        // pero mantenerlo mínimo para evitar espacio blanco
        ...(keyboardHeight > 0 && {
          paddingBottom:
            (showBottomFooter
              ? hp(containers.bottomFooter) + insets.bottom
              : Math.max(insets.bottom, 20)) +
            (Platform.OS === "ios" ? hp("1.5%") : hp("2%")), // Espacio mínimo adicional
        }),
      },
      viewContainerContent,
    ],
    [
      hasHeader,
      headerHeight,
      showBottomFooter,
      viewContainerContent,
      insets.bottom,
      keyboardHeight,
    ]
  );

  // Calcular offset del teclado más preciso
  const keyboardOffset = useMemo(() => {
    const baseOffset = insets.top;

    if (Platform.OS === "ios") {
      return hasHeader ? headerHeight + baseOffset : baseOffset;
    }

    // En Android, ajustar según la presencia del header
    return hasHeader ? headerHeight + 20 : 20;
  }, [hasHeader, headerHeight, insets.top]);

  // Calcular padding del contenido cuando el teclado está visible
  const contentPaddingBottom = useMemo(() => {
    if (keyboardHeight > 0) {
      // Cuando el teclado está visible, agregar espacio suficiente para que el input no quede cortado
      // pero sin crear espacio blanco visible
      return Platform.OS === "ios" ? hp("2%") : hp("2.5%");
    }
    return Platform.OS === "android" ? 20 : 10;
  }, [keyboardHeight]);

  // En iOS, usar solo automaticallyAdjustKeyboardInsets del ScrollView
  // En Android, usar KeyboardAvoidingView
  if (Platform.OS === "ios") {
    return (
      <ScrollView
        style={[{ flex: 1 }, styleScrollViewContent]}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: contentPaddingBottom,
        }}
        onScroll={onScroll}
        scrollEventThrottle={16}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        nestedScrollEnabled={true}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        // En iOS, usar automaticallyAdjustKeyboardInsets para manejar el teclado
        // Esto evita el espacio blanco que causa KeyboardAvoidingView con behavior="padding"
        automaticallyAdjustKeyboardInsets={true}
        automaticallyAdjustContentInsets={false}
      >
        <View style={containerStyle}>{children}</View>
      </ScrollView>
    );
  }

  // En Android, usar KeyboardAvoidingView
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="height"
      keyboardVerticalOffset={keyboardOffset}
      enabled={true}
    >
      <ScrollView
        style={[{ flex: 1 }, styleScrollViewContent]}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: contentPaddingBottom,
        }}
        onScroll={onScroll}
        scrollEventThrottle={16}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        nestedScrollEnabled={true}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
      >
        <View style={containerStyle}>{children}</View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
