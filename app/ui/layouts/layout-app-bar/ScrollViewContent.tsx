import { StyleProps } from "@/app/types/Style";
import { colors } from "@/app/utils/sizes/constants/colors";
import { containers } from "@/app/utils/sizes/constants/containers";
import React, { useMemo } from "react";
import {
  KeyboardAvoidingView,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

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
          ? containers.topScreen + headerHeight
          : containers.topScreen,
        paddingHorizontal: containers.horizontalScreen,
        paddingBottom:
          Platform.OS === "android"
            ? showBottomFooter
              ? containers.bottomFooter + insets.bottom
              : Math.max(insets.bottom, 20)
            : showBottomFooter
              ? containers.bottomFooter + insets.bottom
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

  return Platform.OS === "ios" ? (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[{ flex: 1 }, styleScrollViewContent]}
        keyboardVerticalOffset={
          Platform.OS === "ios" ? 0 : hasHeader ? headerHeight : 0
        }
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
          style={{ flex: 1 }}
          onScroll={onScroll}
          scrollEventThrottle={16}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
          automaticallyAdjustKeyboardInsets={Platform.OS === "ios"}
        >
          <View style={containerStyle}>{children}</View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  ) : (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <KeyboardAvoidingView behavior={"height"} keyboardVerticalOffset={0}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="on-drag"
        >
          <View style={containerStyle}>{children}</View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: hp(containers.bottomComponent),
  },
});
