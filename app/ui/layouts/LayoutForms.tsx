import { Keyboard, TouchableWithoutFeedback, View } from "react-native";

const LayoutForms = ({ children }: { children: React.ReactNode }) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View className="flex-1">{children}</View>
    </TouchableWithoutFeedback>
  );
};

export default LayoutForms;
