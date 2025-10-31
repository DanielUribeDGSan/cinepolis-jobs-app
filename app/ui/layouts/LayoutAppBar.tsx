import React from "react";
import { Appbar } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView, ScrollView, View, StatusBar } from "react-native";
import { colors } from "@/app/utils/sizes/constants/colors";
import useGetFontSize from "@/app/utils/sizes/hooks/useGetFontSize";
import { containers } from "@/app/utils/sizes/constants/containers";

interface LayoutAppBarProps {
  children: React.ReactNode;
  title?: string;
  onBackPress?: () => void;
  onMenuPress?: () => void;
  backgroundColor?: string;
  titleColor?: string;
  iconColor?: string;
  statusBarStyle?: "light-content" | "dark-content" | "default";
  statusBarBackgroundColor?: string;
}

export const LayoutAppBar = ({
  children,
  title = "Login",
  onBackPress,
  onMenuPress,
  backgroundColor = colors.primary,
  titleColor = colors.white,
  iconColor = colors.white,
  statusBarStyle = "light-content",
  statusBarBackgroundColor = colors.primary,
}: LayoutAppBarProps) => {
  const { width, height } = useGetFontSize();
  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={statusBarBackgroundColor}
        translucent={false}
      />

      <Appbar.Header
        style={{
          backgroundColor: backgroundColor,
          elevation: 0,
          shadowOpacity: 0,
        }}
      >
        {onBackPress && (
          <Appbar.BackAction onPress={onBackPress} iconColor={iconColor} />
        )}

        <Appbar.Content
          title={title}
          titleStyle={{
            color: titleColor,
            fontSize: wp("5%"),
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

      <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
          <View
            style={{
              paddingTop: height(containers.topScreen),
              paddingHorizontal: width(containers.horizontalScreen),
              flex: 1,
            }}
          >
            {children}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};
