import { TextStyleKey } from "../../types/TextStyleKey";

export interface LinkButtonProps {
  onPress: () => void;
  label: string;
  color?: string;
  textClassName?: string;
  outline?: boolean;
  fontSize?: TextStyleKey;
}
