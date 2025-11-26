import { StyleProps } from "@/app/types/Style";
import { containers } from "@/app/utils/sizes/constants/containers";
import React, { useMemo } from "react";
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
  // Altura aproximada del Appbar.Header (56px en Android, 44px en iOS + StatusBar)
  const headerHeight = hp("7%");

  const containerStyle = useMemo(
    () => [
      {
        paddingTop: hasHeader
          ? hp(containers.topScreen) + headerHeight
          : hp(containers.topScreen),
        paddingHorizontal: hp(containers.horizontalScreen),
        paddingBottom: showBottomFooter ? hp(containers.bottomFooter) : 0,
        flex: 1,
      },
      viewContainerContent,
    ],
    [hasHeader, headerHeight, showBottomFooter, viewContainerContent]
  );

  const keyboardOffset = useMemo(() => {
    if (Platform.OS === "ios") {
      return hasHeader ? headerHeight : 0;
    }
    return hasHeader ? headerHeight + 20 : 20;
  }, [hasHeader, headerHeight]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={keyboardOffset}
    >
      <ScrollView
        style={[{ flex: 1 }, styleScrollViewContent]}
        contentContainerStyle={{ flexGrow: 1 }}
        onScroll={onScroll}
        scrollEventThrottle={16}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        nestedScrollEnabled={true}
        scrollEnabled={true}
        showsVerticalScrollIndicator={true}
        overScrollMode={Platform.OS === "android" ? "never" : undefined}
        onScrollBeginDrag={() => {
          // Cerrar el teclado cuando se inicia el scroll
          Keyboard.dismiss();
        }}
      >
        <View style={containerStyle}>{children}</View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
