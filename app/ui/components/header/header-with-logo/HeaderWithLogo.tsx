import { colors } from "@/app/utils/sizes/constants/colors";
import React from "react";
import { StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useHeaderWithLogo } from "./hooks/useHeaderWithLogo";

interface HeaderWithLogoProps {
  onMenuPress?: () => void;
  onUserPress?: () => void;
  logoType?: "svg" | "image";
  backgroundColor?: string;
  iconColor?: string;
  showSafeArea?: boolean;
  showStatusBar?: boolean;
  showBackButton?: boolean;
  statusBarStyle?: "light-content" | "dark-content";
}

export const HeaderWithLogo: React.FC<HeaderWithLogoProps> = ({
  onMenuPress,
  onUserPress,
  showBackButton,
  logoType = "svg",
  backgroundColor = colors.primary,
  iconColor = colors.white,
  showSafeArea = true,
  showStatusBar = true,
  statusBarStyle = "light-content",
}) => {
  const { renderMenuIcon } = useHeaderWithLogo({
    onMenuPress,
    onUserPress,
    showBackButton,
    backgroundColor,
    logoType,
    iconColor,
  });

  return (
    <>
      {showStatusBar && (
        <StatusBar
          backgroundColor={backgroundColor}
          barStyle={statusBarStyle}
        />
      )}
      {showSafeArea ? (
        <SafeAreaView
          edges={["top"]}
          style={[styles.safeArea, { backgroundColor }]}
        >
          {renderMenuIcon()}
        </SafeAreaView>
      ) : (
        renderMenuIcon()
      )}
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.primary,
  },
});
