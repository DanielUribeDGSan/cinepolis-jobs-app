import React from "react";
import { View } from "react-native";
import { FieldError } from "react-hook-form";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

interface LayoutInputProps {
  backgroundColor: string;
  borderRadius: string;
  error: FieldError | undefined;
  borderColor?: string;
  borderWidth?: number;
  children: React.ReactNode;
}

const LayoutInput = ({
  backgroundColor,
  borderRadius,
  error,
  borderColor,
  borderWidth,
  children,
}: LayoutInputProps) => {
  return (
    <View
      style={{
        backgroundColor: backgroundColor,
        borderRadius: hp(borderRadius),
        borderColor: borderColor,
        borderWidth: borderWidth,
        overflow: "hidden",
        marginBottom: error ? 4 : 25,
      }}
    >
      {children}
    </View>
  );
};

export default LayoutInput;
