import { StyleProps } from "@/app/types/Style";
import { useScrollDetection } from "@/app/ui/layouts/tab-layout/hooks/useScrollDetection";
import { colors } from "@/app/utils/sizes/constants/colors";
import React, { useEffect, useMemo } from "react";
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderWithLogo } from "../../components/header/header-with-logo/HeaderWithLogo";
import { ScrollViewContent } from "./ScrollViewContent";
import { useHeaderVisibility } from "./hooks/useHeaderVisibility";

interface LayoutAppBarProps {
  children: React.ReactNode;
  showAppBar?: boolean;
  showSafeArea?: boolean;
  styleScrollViewContent?: StyleProps;
  showBottomFooter?: boolean;
  viewContainerContent?: StyleProps;
  onBackPress?: () => void;
  onMenuPress?: () => void;
}

export const LayoutAppBar = ({
  children,
  showAppBar = false,
  showSafeArea = false,
  showBottomFooter = true,
  styleScrollViewContent,
  viewContainerContent,
}: LayoutAppBarProps) => {
  const { handleScroll: handleTabBarScroll } = useScrollDetection();
  const { isVisible: isHeaderVisible, handleScroll: handleHeaderScroll } =
    useHeaderVisibility();

  const translateY = useMemo(() => new Animated.Value(0), []);
  const opacity = useMemo(() => new Animated.Value(1), []);

  useEffect(() => {
    if (isHeaderVisible) {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          tension: 65,
          friction: 11,
        }),
        Animated.spring(opacity, {
          toValue: 1,
          useNativeDriver: true,
          tension: 65,
          friction: 11,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: -100,
          useNativeDriver: true,
          tension: 65,
          friction: 11,
        }),
        Animated.spring(opacity, {
          toValue: 0,
          useNativeDriver: true,
          tension: 65,
          friction: 11,
        }),
      ]).start();
    }
  }, [isHeaderVisible, translateY, opacity]);

  const handleCombinedScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    handleTabBarScroll(event);
    handleHeaderScroll(event);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      {showAppBar && (
        <>
          <Animated.View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1000,
              transform: [{ translateY }],
              opacity,
              pointerEvents: isHeaderVisible ? "auto" : "none",
            }}
          >
            <HeaderWithLogo />
          </Animated.View>
        </>
      )}

      {showSafeArea ? (
        <>
          {Platform.OS === "ios" && (
            <SafeAreaView
              edges={["top"]}
              style={{
                backgroundColor: colors.primary,
              }}
            />
          )}

          <ScrollViewContent
            styleScrollViewContent={styleScrollViewContent}
            viewContainerContent={viewContainerContent}
            showBottomFooter={showBottomFooter}
            onScroll={handleCombinedScroll}
            hasHeader={showAppBar && isHeaderVisible}
          >
            {children}
          </ScrollViewContent>
        </>
      ) : (
        <ScrollViewContent
          styleScrollViewContent={styleScrollViewContent}
          viewContainerContent={viewContainerContent}
          showBottomFooter={showBottomFooter}
          onScroll={handleCombinedScroll}
          hasHeader={showAppBar && isHeaderVisible}
        >
          {children}
        </ScrollViewContent>
      )}
    </View>
  );
};
