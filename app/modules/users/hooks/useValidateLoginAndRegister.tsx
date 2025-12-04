import { colors } from "@/app/utils/sizes/constants/colors";
import { router } from "expo-router";
import React, { ReactNode, useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useUserSession } from "./useUserSession";

interface AuthScreenWrapperProps {
  children: ReactNode;
}

export const AuthScreenWrapper: React.FC<AuthScreenWrapperProps> = ({
  children,
}) => {
  const { isAuthenticated, isLoading } = useUserSession();
  const [shouldShowContent, setShouldShowContent] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.replace("/routes/home/HomeScreen" as any);
      } else {
        const timer = setTimeout(() => {
          setShouldShowContent(true);
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading || isAuthenticated || !shouldShowContent) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator
          size="large"
          color={colors.primary}
          animating={true}
        />
      </View>
    );
  }

  return <>{children}</>;
};

export const useValidateLoginAndRegister = () => {
  return {
    AuthScreenWrapper,
  };
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    width: "100%",
    height: "100%",
  },
});
