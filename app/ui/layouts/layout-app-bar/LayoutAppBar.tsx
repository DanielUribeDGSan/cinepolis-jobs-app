import React, { useEffect, useMemo } from "react";
import { Appbar } from "react-native-paper";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import {
  View,
  StatusBar,
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/app/utils/sizes/constants/colors";

import { StyleProps } from "@/app/types/Style";
import { useScrollDetection } from "@/app/ui/layouts/tab-layout/hooks/useScrollDetection";
import { ScrollViewContent } from "./ScrollViewContent";
import { useHeaderVisibility } from "./hooks/useHeaderVisibility";

interface LayoutAppBarProps {
  children: React.ReactNode;
  title?: string;
  backgroundColor?: string;
  titleColor?: string;
  iconColor?: string;
  statusBarStyle?: "light-content" | "dark-content" | "default";
  statusBarBackgroundColor?: string;
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
  title = "Login",
  backgroundColor = colors.primary,
  titleColor = colors.white,
  iconColor = colors.white,
  statusBarStyle = "light-content",
  statusBarBackgroundColor = colors.primary,
  showAppBar = false,
  showSafeArea = false,
  showBottomFooter = false,
  styleScrollViewContent,
  viewContainerContent,
  onBackPress,
  onMenuPress,
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
          <StatusBar
            barStyle={statusBarStyle}
            backgroundColor={statusBarBackgroundColor}
            translucent={false}
          />

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
            <Appbar.Header
              style={{
                backgroundColor: backgroundColor,
                elevation: 0,
                shadowOpacity: 0,
              }}
            >
              {onBackPress && (
                <Appbar.BackAction
                  onPress={onBackPress}
                  iconColor={iconColor}
                />
              )}

              <Appbar.Content
                title={title}
                titleStyle={{
                  color: titleColor,
                  fontSize: hp("2.5%"),
                  fontWeight: "600",
                }}
              />

              {onMenuPress && (
                <Appbar.Action
                  icon="dots-vertical"
                  onPress={onMenuPress}
                  iconColor={iconColor}
                />
              )}
            </Appbar.Header>
          </Animated.View>
        </>
      )}

      {showSafeArea ? (
        <>
          <SafeAreaView
            edges={["top"]}
            style={{
              backgroundColor: colors.primary,
            }}
          />
          <View style={{ flex: 1, backgroundColor: colors.white }}>
            <ScrollViewContent
              styleScrollViewContent={styleScrollViewContent}
              viewContainerContent={viewContainerContent}
              showBottomFooter={showBottomFooter}
              onScroll={handleCombinedScroll}
              hasHeader={showAppBar && isHeaderVisible}
            >
              {children}
            </ScrollViewContent>
          </View>
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
