import React from "react";
import { View } from "react-native";
import { FieldError } from "react-hook-form";

interface LayoutInputProps {
  backgroundColor: string;
  borderRadius: number;
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
        borderRadius: borderRadius,
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
