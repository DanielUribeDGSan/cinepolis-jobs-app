import React from "react";
import { Appbar } from "react-native-paper";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import {
  SafeAreaView,
  ScrollView,
  View,
  StatusBar,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Keyboard,
} from "react-native";
import { colors } from "@/app/utils/sizes/constants/colors";
import { containers } from "@/app/utils/sizes/constants/containers";
import { StyleProps } from "@/app/types/Style";
import { useScrollDetection } from "@/app/ui/layouts/tab-layout/hooks/useScrollDetection";

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
  onBackPress?: () => void;
  onMenuPress?: () => void;
}

const ScrollViewContent = ({
  children,
  styleScrollViewContent,
  showBottomFooter,
  onScroll,
}: {
  children: React.ReactNode;
  styleScrollViewContent?: StyleProps;
  showBottomFooter: boolean;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}) => {
  return (
    <ScrollView
      style={[{ flex: 1 }, styleScrollViewContent]}
      contentContainerStyle={{ flexGrow: 1 }}
      onScroll={onScroll}
      scrollEventThrottle={16}
      keyboardShouldPersistTaps="always"
      nestedScrollEnabled={true}
      scrollEnabled={true}
      showsVerticalScrollIndicator={true}
      onScrollBeginDrag={() => {
        // Cerrar el teclado cuando se inicia el scroll
        Keyboard.dismiss();
      }}
    >
      <View
        style={{
          paddingTop: hp(containers.topScreen),
          paddingHorizontal: hp(containers.horizontalScreen),
          paddingBottom: showBottomFooter ? hp(containers.bottomFooter) : 0,
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
  showBottomFooter = false,
  styleScrollViewContent,
  onBackPress,
  onMenuPress,
}: LayoutAppBarProps) => {
  // Usar el hook de scroll (no fallará si el contexto no está disponible)
  const { handleScroll } = useScrollDetection();

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
          <ScrollViewContent
            styleScrollViewContent={styleScrollViewContent}
            showBottomFooter={showBottomFooter}
            onScroll={handleScroll}
          >
            {children}
          </ScrollViewContent>
        </SafeAreaView>
      ) : (
        <ScrollViewContent
          styleScrollViewContent={styleScrollViewContent}
          showBottomFooter={showBottomFooter}
          onScroll={handleScroll}
        >
          {children}
        </ScrollViewContent>
      )}
    </View>
  );
};
