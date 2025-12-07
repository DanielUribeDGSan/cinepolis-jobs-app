import { useUserSession } from "@/app/modules/users/hooks/useUserSession";
import { CinepolisLogo } from "@/app/ui/components/icons/CinepolisLogo";
import { MenuIcon } from "@/app/ui/components/icons/MenuIcon";
import { UserIcon } from "@/app/ui/components/icons/UserIcon";
import { useDrawer } from "@/app/ui/drawer/DrawerContext";
import { colors } from "@/app/utils/sizes/constants/colors";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useCallback } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

interface useHeaderWithLogoProps {
  onMenuPress?: () => void;
  onUserPress?: () => void;
  showBackButton?: boolean;
  logoType?: "svg" | "image";
  iconColor?: string;
  backgroundColor?: string;
}

export const useHeaderWithLogo = ({
  onMenuPress,
  onUserPress,
  showBackButton,
  logoType,
  iconColor,
  backgroundColor,
}: useHeaderWithLogoProps) => {
  const { openDrawer } = useDrawer();
  const { isAuthenticated } = useUserSession();

  const handleMenuPress = useCallback(() => {
    if (onMenuPress) {
      onMenuPress();
    } else {
      openDrawer();
    }
  }, [onMenuPress, openDrawer]);

  const handleUserPress = useCallback(() => {
    if (onUserPress) {
      onUserPress();
    } else {
      if (isAuthenticated) {
        router.push({
          pathname: "routes/home/ProfileScreen" as any,
        });
      } else {
        router.push({
          pathname: "routes/auth/LoginScreen" as any,
        });
      }
    }
  }, [onUserPress, isAuthenticated]);

  const handleBackPress = useCallback(() => {
    if (showBackButton) {
      router.back();
    }
  }, [showBackButton]);

  const renderLogo = useCallback(() => {
    if (logoType === "svg") {
      return <CinepolisLogo width={"40%"} height={"3.7%"} color={iconColor} />;
    }
  }, [logoType, iconColor]);

  const renderMenuIcon = useCallback(() => {
    return (
      <View style={[styles.header, { backgroundColor }]}>
        {showBackButton ? (
          <TouchableOpacity
            onPress={handleBackPress}
            style={[styles.iconButton, { backgroundColor: colors.quinary }]}
            activeOpacity={0.7}
          >
            <FontAwesome
              name="arrow-left"
              size={hp("2%")}
              color={colors.white}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleMenuPress}
            style={[styles.iconButton, { backgroundColor: colors.quinary }]}
            activeOpacity={0.7}
          >
            <MenuIcon size={"5%"} color={iconColor} />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "routes/home/HomeScreen" as any,
            })
          }
          style={styles.logoContainer}
        >
          {renderLogo()}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleUserPress}
          style={[styles.iconButton, { backgroundColor: colors.quinary }]}
          activeOpacity={0.7}
        >
          <UserIcon size={"5%"} color={iconColor} />
        </TouchableOpacity>
      </View>
    );
  }, [
    backgroundColor,
    showBackButton,
    handleBackPress,
    handleMenuPress,
    iconColor,
    renderLogo,
    handleUserPress,
  ]);

  return {
    renderMenuIcon,
  };
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.primary,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp("4%"),
    paddingVertical: hp("1%"),
    paddingBottom: hp("2%"),
    backgroundColor: colors.primary,
  },
  iconButton: {
    width: hp("5%"),
    height: hp("5%"),
    borderRadius: hp("1.2%"),
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
