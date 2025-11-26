import { StyleProps } from "@/app/types/Style";
import { containers } from "@/app/utils/sizes/constants/containers";
import React, { useEffect, useMemo, useRef, useState } from "react";
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
  const scrollViewRef = useRef<ScrollView>(null);
  const wasKeyboardVisible = useRef(false);
  const currentScrollY = useRef(0);

  // Detectar cuando el teclado está visible
  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      (e) => {
        const newHeight = e.endCoordinates.height;
        setKeyboardHeight(newHeight);

        // Si el teclado acaba de aparecer (primera vez), hacer scroll solo un poco
        // para asegurar que el input quede visible sin ir hasta el final
        if (!wasKeyboardVisible.current && newHeight > 0) {
          wasKeyboardVisible.current = true;
          // Esperar a que el teclado termine de aparecer y el layout se ajuste
          setTimeout(
            () => {
              // Hacer scroll solo un poco más desde la posición actual
              // Usar un offset pequeño para que el input quede visible sin ir hasta el final
              const additionalScroll =
                Platform.OS === "ios" ? hp("1.5%") : hp("2%");
              scrollViewRef.current?.scrollTo({
                y: currentScrollY.current + additionalScroll,
                animated: true,
              });
            },
            Platform.OS === "ios" ? 100 : 150
          );
        }
      }
    );

    const keyboardWillHide = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
        wasKeyboardVisible.current = false;
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
        paddingBottom: hp(containers.bottomFooter),
        flex: 1,
        // Agregar padding extra solo cuando el teclado está visible para evitar que el input quede cortado
        ...(keyboardHeight > 0 && {
          paddingBottom: hp(containers.bottomFooter),
        }),
      },
      viewContainerContent,
    ],
    [hasHeader, headerHeight, viewContainerContent, keyboardHeight]
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
      // Aumentado para asegurar que el input no se corte desde la primera vez
      return Platform.OS === "ios" ? hp("5.5%") : hp("6%");
    }
    return Platform.OS === "android" ? 20 : 10;
  }, [keyboardHeight]);

  // En iOS, usar KeyboardAvoidingView con behavior="padding" como en el ejemplo que funciona
  // En Android, usar KeyboardAvoidingView con behavior="height"
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={keyboardOffset}
      enabled={true}
    >
      <ScrollView
        ref={scrollViewRef}
        style={[{ flex: 1 }, styleScrollViewContent]}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: contentPaddingBottom,
        }}
        onScroll={(e) => {
          // Trackear la posición actual del scroll
          currentScrollY.current = e.nativeEvent.contentOffset.y;
          onScroll?.(e);
        }}
        scrollEventThrottle={16}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        nestedScrollEnabled={true}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        overScrollMode={Platform.OS === "android" ? "never" : undefined}
        // En iOS, también usar automaticallyAdjustKeyboardInsets para mejor manejo
        automaticallyAdjustKeyboardInsets={Platform.OS === "ios"}
        automaticallyAdjustContentInsets={false}
      >
        <View style={containerStyle}>{children}</View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
