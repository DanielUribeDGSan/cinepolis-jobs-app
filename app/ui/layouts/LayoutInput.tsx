import React from "react";
import { FieldError } from "react-hook-form";
import { View } from "react-native";

interface LayoutInputProps {
  backgroundColor: string;
  borderRadius: number;
  error: FieldError | undefined;
  borderColor?: string;
  borderWidth?: number;
  children: React.ReactNode;
  spaceBottom?: boolean;
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
      }}
    >
      {children}
    </View>
  );
};

export default LayoutInput;
