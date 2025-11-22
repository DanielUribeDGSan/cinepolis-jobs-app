import { useSegments } from "expo-router";
import { useMemo } from "react";
import { translationsTabLayout } from "../constants/translations";

export const useTabLayoutComponent = () => {
  const segments = useSegments();

  const title = useMemo(() => {
    const currentSegment = segments[segments.length - 1];
    if (currentSegment === "index") {
      return translationsTabLayout.home;
    } else if (currentSegment === "TabMyVacancies") {
      return translationsTabLayout.myVacancies;
    } else if (currentSegment === "TabProfileScreen") {
      return translationsTabLayout.profile;
    }
    return translationsTabLayout.home;
  }, [segments]);
  return { title };
};
