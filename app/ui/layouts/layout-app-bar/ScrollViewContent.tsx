import { StyleProps } from "@/app/types/Style";
import { containers } from "@/app/utils/sizes/constants/containers";
import React, { useMemo } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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
    <KeyboardAwareScrollView
      style={[{ flex: 1 }, styleScrollViewContent]}
      contentContainerStyle={{
        flexGrow: 1,
      }}
      onScroll={onScroll}
      scrollEventThrottle={16}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      showsVerticalScrollIndicator={false}
      // Configuraciones específicas de KeyboardAwareScrollView
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      extraScrollHeight={Platform.OS === "ios" ? hp("5%") : hp("10%")} // Espacio extra para asegurar visibilidad
      keyboardOpeningTime={Platform.OS === "ios" ? 250 : 0}
      enableResetScrollToCoords={false} // No resetear posición automáticamente
      // Desactivar bounce/overscroll para prevenir espacios en blanco
      bounces={false}
      overScrollMode="never"
    >
      <View style={containerStyle}>{children}</View>
    </KeyboardAwareScrollView>
  );
};
