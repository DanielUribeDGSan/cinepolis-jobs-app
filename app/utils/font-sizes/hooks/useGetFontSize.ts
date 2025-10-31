import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FontSizeKey, fontSizes } from "../constants/fontSizes";
import { useCallback, useMemo } from "react";

const useGetFontSize = () => {
  const fontSize = useCallback((size: FontSizeKey): number => {
    const percentage = fontSizes[size];
    return wp(percentage);
  }, []);

  const height = useCallback((percentage: string): number => {
    return hp(percentage);
  }, []);

  const width = useCallback((percentage: string): number => {
    return wp(percentage);
  }, []);

  return useMemo(() => {
    return {
      fontSize,
      height,
      width,
    };
  }, [fontSize, height, width]);
};

export default useGetFontSize;
