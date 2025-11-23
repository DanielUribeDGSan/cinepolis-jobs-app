import React from "react";
import { Appbar } from "react-native-paper";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { SafeAreaView, ScrollView, View, StatusBar } from "react-native";
import { colors } from "@/app/utils/sizes/constants/colors";
import { containers } from "@/app/utils/sizes/constants/containers";
import { StyleProps } from "@/app/types/Style";

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
  onBackPress?: () => void;
  onMenuPress?: () => void;
}

const ScrollViewContent = ({
  children,
  styleScrollViewContent,
}: {
  children: React.ReactNode;
  styleScrollViewContent?: StyleProps;
}) => {
  return (
    <ScrollView
      style={[{ flex: 1 }, styleScrollViewContent]}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View
        style={{
          paddingTop: hp(containers.topScreen),
          paddingHorizontal: hp(containers.horizontalScreen),
          paddingBottom: hp(containers.bottomFooter),
          flex: 1,
        }}
      >
        {children}
      </View>
    </ScrollView>
  );
};

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
  styleScrollViewContent,
  onBackPress,
  onMenuPress,
}: LayoutAppBarProps) => {
  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      {showAppBar && (
        <>
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
        </>
      )}

      {showSafeArea ? (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
          <ScrollViewContent styleScrollViewContent={styleScrollViewContent}>
            {children}
          </ScrollViewContent>
        </SafeAreaView>
      ) : (
        <ScrollViewContent styleScrollViewContent={styleScrollViewContent}>
          {children}
        </ScrollViewContent>
      )}
    </View>
  );
};
