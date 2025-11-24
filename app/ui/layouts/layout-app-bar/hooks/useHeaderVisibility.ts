import { useState, useCallback, useRef } from "react";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";

export const useHeaderVisibility = () => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { contentOffset } = event.nativeEvent;
      const currentScrollY = contentOffset.y;
      const scrollDifference = currentScrollY - lastScrollY.current;

      lastScrollY.current = currentScrollY;

      if (currentScrollY <= 0) {
        setIsVisible(true);
        return;
      }

      if (Math.abs(scrollDifference) > 2) {
        if (scrollDifference > 2) {
          setIsVisible(false);
        } else if (scrollDifference < -2) {
          setIsVisible(true);
        }
      }
    },
    []
  );

  return { isVisible, handleScroll };
};
