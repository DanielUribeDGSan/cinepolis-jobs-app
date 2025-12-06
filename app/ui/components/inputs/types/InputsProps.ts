import { FontAwesome } from "@expo/vector-icons";
import { Control, FieldError } from "react-hook-form";
import { StyleProp, TextStyle, ViewStyle } from "react-native";

export interface IconConfig {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  size?: string;
  color?: string;
  onPress?: () => void;
}

export interface InputsProps {
  name: string;
  control: Control<any>;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  error?: FieldError;
  backgroundColor?: string;
  borderRadius?: number;
  className?: string;
  maxLength?: number;
  allowDecimals?: boolean;
  allowNegative?: boolean;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  multiline?: boolean;
  numberOfLines?: number;
  style?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  leftIcon?: IconConfig;
  rightIcon?: IconConfig;
}
