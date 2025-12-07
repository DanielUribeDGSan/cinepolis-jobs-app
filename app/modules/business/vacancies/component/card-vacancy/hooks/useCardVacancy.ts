import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { useFetchSearchVacancies } from "../../../hooks/useFetchSearchVacancies";

export const useCardVacancy = () => {
  const { puesto, sector, pais, page, perpage, ciudad } =
    useLocalSearchParams();

  const filters = useMemo(
    () => ({
      puesto: (Array.isArray(puesto) ? puesto[0] : puesto) ?? "",
      sector: (Array.isArray(sector) ? sector[0] : sector) ?? "",
      pais: (Array.isArray(pais) ? pais[0] : pais) ?? "",
      page: Number(Array.isArray(page) ? page[0] : page) || 0,
      perpage: Number(Array.isArray(perpage) ? perpage[0] : perpage) || 10,
      ciudad: (Array.isArray(ciudad) ? ciudad[0] : ciudad) ?? "",
    }),
    [puesto, sector, pais, page, perpage, ciudad]
  );

  const { data, isLoading, error } = useFetchSearchVacancies(filters);

  return {
    data,
    isLoading,
    error,
  };
};
