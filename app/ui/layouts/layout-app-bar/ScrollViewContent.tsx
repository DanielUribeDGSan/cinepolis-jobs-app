import { StyleProps } from "@/app/types/Style";
import { containers } from "@/app/utils/sizes/constants/containers";
import {
  Keyboard,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
  ScrollView,
} from "react-native";

import { heightPercentageToDP as hp } from "react-native-responsive-screen";

interface ScrollViewContentProps {
  children: React.ReactNode;
  styleScrollViewContent?: StyleProps;
  viewContainerContent?: StyleProps;
  showBottomFooter: boolean;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

export const ScrollViewContent = ({
  children,
  styleScrollViewContent,
  viewContainerContent,
  showBottomFooter,
  onScroll,
}: ScrollViewContentProps) => {
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
        style={[
          {
            paddingTop: hp(containers.topScreen),
            paddingHorizontal: hp(containers.horizontalScreen),
            paddingBottom: showBottomFooter ? hp(containers.bottomFooter) : 0,
            flex: 1,
          },
          viewContainerContent,
        ]}
      >
        {children}
      </View>
    </ScrollView>
  );
};
