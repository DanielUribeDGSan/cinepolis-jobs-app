import { StyleProps } from "@/app/types/Style";
import { containers } from "@/app/utils/sizes/constants/containers";
import React, { useMemo, useRef } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Crear un contexto para compartir la referencia del KeyboardAwareScrollView
export const KeyboardAwareScrollViewContext = React.createContext<{
  scrollToFocusedInput: (inputRef: any, extraScrollHeight?: number) => void;
} | null>(null);

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
  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);

  // Altura aproximada del Appbar.Header
  const headerHeight = hp("7%");

  // Función para hacer scroll al input enfocado manualmente
  const scrollToFocusedInput = (inputRef: any, extraScrollHeight?: number) => {
    if (scrollViewRef.current && inputRef?.current) {
      // Usar scrollToFocusedInput del KeyboardAwareScrollView
      // Esto es especialmente útil cuando cambias rápidamente entre inputs
      setTimeout(
        () => {
          if (inputRef.current) {
            scrollViewRef.current?.scrollToFocusedInput?.(
              inputRef.current,
              extraScrollHeight ||
                (Platform.OS === "android" ? hp("25%") : hp("10%"))
            );
          }
        },
        Platform.OS === "android" ? 150 : 50
      );
    }
  };

  const containerStyle = useMemo(
    () => [
      {
        paddingTop: hasHeader
          ? hp(containers.topScreen) + headerHeight
          : hp(containers.topScreen),
        paddingHorizontal: hp(containers.horizontalScreen),
        paddingBottom: showBottomFooter
          ? hp(containers.bottomFooter) + insets.bottom
          : Math.max(insets.bottom, 20),
        flex: 1,
      },
      viewContainerContent,
    ],
    [
      hasHeader,
      headerHeight,
      showBottomFooter,
      viewContainerContent,
      insets.bottom,
    ]
  );

  return (
    <KeyboardAwareScrollViewContext.Provider value={{ scrollToFocusedInput }}>
      <KeyboardAwareScrollView
        ref={scrollViewRef}
        style={[{ flex: 1 }, styleScrollViewContent]}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        onScroll={onScroll}
        scrollEventThrottle={16}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        // Configuraciones optimizadas para mejor detección y comportamiento consistente en iOS y Android
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        // Aumentar aún más el espacio extra para Android físico
        // Los inputs de Paper necesitan más espacio porque tienen estructura compleja
        // Aumentado para cuando cambias rápidamente entre inputs
        extraScrollHeight={Platform.OS === "ios" ? hp("8%") : hp("25%")}
        extraHeight={Platform.OS === "ios" ? hp("5%") : hp("20%")}
        // En Android, usar un delay un poco más largo para dar tiempo cuando cambias entre inputs
        // Esto ayuda a que KeyboardAwareScrollView recalcule correctamente la primera vez
        keyboardOpeningTime={Platform.OS === "ios" ? 0 : 300}
        enableResetScrollToCoords={false}
        // Mejorar la detección de inputs
        scrollEnabled={true}
        nestedScrollEnabled={true}
        bounces={Platform.OS === "ios"}
        overScrollMode={Platform.OS === "android" ? "never" : undefined}
        // Asegurar que siempre detecte el input enfocado
        viewIsInsideTabBar={false}
        // Configuraciones adicionales para mejor detección en Android
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollToOverflowEnabled={true}
      >
        <View style={containerStyle}>{children}</View>
      </KeyboardAwareScrollView>
    </KeyboardAwareScrollViewContext.Provider>
  );
};
