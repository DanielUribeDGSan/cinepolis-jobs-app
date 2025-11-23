import { View, Keyboard, Pressable } from "react-native";

const LayoutForms = ({ children }: { children: React.ReactNode }) => {
  return (
    <Pressable
      className="flex-1"
      onPress={() => Keyboard.dismiss()}
      onStartShouldSetResponder={() => false}
      onMoveShouldSetResponder={() => false}
    >
      <View className="flex-1" pointerEvents="box-none">
        {children}
      </View>
    </Pressable>
  );
};

export default LayoutForms;
