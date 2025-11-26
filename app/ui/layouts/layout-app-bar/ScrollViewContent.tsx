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

  // Configuración optimizada para KeyboardAwareScrollView
  const keyboardConfig = useMemo(
    () => ({
      extraScrollHeight: Platform.OS === "ios" ? hp("8%") : hp("12%"),
      keyboardOpeningTime: Platform.OS === "ios" ? 250 : 100,
      enableResetScrollToCoords: false,
      enableAutomaticScroll: true,
      bounces: false,
      overScrollMode: "never" as const,
      androidOptions: {
        enableResizeOnKeyboardHide: true,
        enableKeyboardAvoidingView: false,
      },
    }),
    []
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
      extraScrollHeight={keyboardConfig.extraScrollHeight}
      keyboardOpeningTime={keyboardConfig.keyboardOpeningTime}
      enableResetScrollToCoords={keyboardConfig.enableResetScrollToCoords}
      enableAutomaticScroll={keyboardConfig.enableAutomaticScroll}
      // Prevenir espacios en blanco
      bounces={keyboardConfig.bounces}
      overScrollMode={keyboardConfig.overScrollMode}
      // Configuraciones específicas para Android
      {...(Platform.OS === "android" && {
        extraHeight: hp("15%"), // Altura extra específica para Android
        extraScrollHeight: hp("15%"),
      })}
      // Función personalizada para obtener referencias de inputs
      // @ts-ignore
      getTextInputRefs={() => {
        // KeyboardAwareScrollView automáticamente encuentra los inputs
        return [];
      }}
    >
      <View style={containerStyle}>{children}</View>
    </KeyboardAwareScrollView>
  );
};
