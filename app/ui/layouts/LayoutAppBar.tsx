import React from "react";
import { Appbar } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeAreaView, ScrollView, View } from "react-native";

interface LayoutAppBarProps {
  children: React.ReactNode;
  title?: string;
  onBackPress?: () => void;
  onMenuPress?: () => void;
  backgroundColor?: string;
  titleColor?: string;
  iconColor?: string;
}

export const LayoutAppBar = ({
  children,
  title = "Login",
  onBackPress,
  onMenuPress,
  backgroundColor = "#05102a",
  titleColor = "#ffffff",
  iconColor = "#ffffff",
}: LayoutAppBarProps) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      {/* App Bar usando React Native Paper */}
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

      {/* Contenido principal */}
      <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ paddingTop: 30, paddingHorizontal: 20, flex: 1 }}>
            {children}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};
