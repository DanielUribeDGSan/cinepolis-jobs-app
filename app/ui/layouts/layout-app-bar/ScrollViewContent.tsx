import { StyleProps } from "@/app/types/Style";
import { containers } from "@/app/utils/sizes/constants/containers";
import React, { useMemo } from "react";
import { NativeScrollEvent, NativeSyntheticEvent, View } from "react-native";
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
    <KeyboardAwareScrollView style={{ flex: 1 }}>
      <View style={containerStyle}>{children}</View>
    </KeyboardAwareScrollView>
  );
};
