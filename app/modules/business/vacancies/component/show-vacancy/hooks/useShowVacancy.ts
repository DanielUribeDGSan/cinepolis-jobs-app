import { useLocalSearchParams } from "expo-router";
import { useFetchGetVacancy } from "../../../hooks/useFetchGetVacancy";

export const useShowVacancy = () => {
  const { slug } = useLocalSearchParams();
  const { data, isLoading, error } = useFetchGetVacancy((slug as string) ?? "");

  return { data, isLoading, error };
};
