import { Control, FieldError } from "react-hook-form";
import { StyleProp, ViewStyle } from "react-native";

export interface InputsProps {
  name: string;
  control: Control<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  label: string;
  placeholder?: string;
  disabled?: boolean;
  error?: FieldError;
  backgroundColor?: string;
  borderRadius?: string;
  className?: string;
  maxLength?: number;
  allowDecimals?: boolean;
  allowNegative?: boolean;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  multiline?: boolean;
  numberOfLines?: number;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}
