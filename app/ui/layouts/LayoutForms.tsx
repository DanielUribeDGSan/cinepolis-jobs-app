import { Keyboard, Pressable, View } from "react-native";

const LayoutForms = ({ children }: { children: React.ReactNode }) => {
  return (
    <Pressable
      className="flex-1"
      onPress={() => Keyboard.dismiss()}
      style={{ flex: 1 }}
    >
      <View className="flex-1" pointerEvents="box-none">
        {children}
      </View>
    </Pressable>
  );
};

export default LayoutForms;
