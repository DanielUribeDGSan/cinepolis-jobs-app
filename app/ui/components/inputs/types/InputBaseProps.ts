import { Control, FieldError } from "react-hook-form";
import { TextInputProps } from "react-native-paper";
import { StyleProp, ViewStyle } from "react-native";

export interface InputBaseProps extends Omit<TextInputProps, "error"> {
  name: string;
  control: Control<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  error?: FieldError;
  backgroundColor?: string;
  borderRadius?: number;
  focusedBackgroundColor?: string;
  focusedBorderColor?: string;
  borderColor?: string;
  fontSize?: number;
  inputHeight?: number;
  className?: string;
  containerStyle?: StyleProp<ViewStyle>;
}
