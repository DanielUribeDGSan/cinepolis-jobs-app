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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

interface ScrollViewContentProps {
  children: React.ReactNode;
  styleScrollViewContent?: StyleProps;
  viewContainerContent?: StyleProps;
  showBottomFooter: boolean;
  hasHeader?: boolean;
  showPaddingTop?: boolean;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

export const ScrollViewContent = ({
  children,
  styleScrollViewContent,
  viewContainerContent,
  hasHeader = false,
  showPaddingTop = false,
  onScroll,
}: ScrollViewContentProps) => {
  const headerHeight = hp("7%");

  const containerStyle = useMemo(
    () => [
      {
        paddingTop: hasHeader
          ? containers.topScreen + headerHeight
          : containers.topScreen,
        paddingHorizontal: containers.horizontalScreen,

        flex: 1,
      },
      viewContainerContent,
    ],
    [hasHeader, headerHeight, viewContainerContent]
  );

  return Platform.OS === "ios" ? (
    <View style={[styles.container]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[{ flex: 1 }, styleScrollViewContent]}
        keyboardVerticalOffset={
          Platform.OS === "ios" ? 0 : hasHeader ? headerHeight : 0
        }
      >
        <ScrollView
          contentContainerStyle={[
            {
              flexGrow: 1,
              paddingTop: showPaddingTop ? containers.topSection : 0,
            },
            styles.scrollContent,
          ]}
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
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.primary }}
      edges={["top"]}
    >
      <View style={[styles.container, { flex: 1 }]}>
        <KeyboardAwareScrollView
          contentContainerStyle={[
            {
              paddingTop: showPaddingTop ? containers.topSection : 0,
              paddingBottom: containers.bottomComponent,
            },
          ]}
          style={{ flex: 1, backgroundColor: colors.white }}
          onScroll={onScroll}
          scrollEventThrottle={16}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="on-drag"
          nestedScrollEnabled={true}
          enableOnAndroid={true}
          enableAutomaticScroll={true}
          extraScrollHeight={150}
          extraHeight={150}
          keyboardOpeningTime={0}
          scrollEnabled={true}
          bounces={false}
        >
          <View style={containerStyle}>{children}</View>
        </KeyboardAwareScrollView>
      </View>
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
    paddingBottom: containers.bottomComponent,
  },
});
