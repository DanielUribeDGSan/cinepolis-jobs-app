import { useCallback } from "react";
import { buttonsStyles } from "../../../../utils/sizes/constants/buttons";

const useButton = () => {
  const getSize = useCallback((size: "small" | "medium" | "large") => {
    switch (size) {
      case "small":
        return {
          ...buttonsStyles.small,
        };
      case "medium":
        return {
          ...buttonsStyles.medium,
        };
      case "large":
        return {
          ...buttonsStyles.large,
        };
      default:
        return {
          ...buttonsStyles.default,
        };
    }
  }, []);

  return {
    getSize,
  };
};

export default useButton;
