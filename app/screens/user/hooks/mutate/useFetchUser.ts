import { cinepolisApi } from "@/app/modules/network/api/cinepolisApi";
import { useFetch } from "@/app/modules/network/hooks/useFetch";
import { User } from "@/app/modules/users/types/User";

export const useFetchUser = () => {
  return useFetch<User>({
    key: ["user"],
    fetchFn: async () => {
      const response = await cinepolisApi.get("/V1/Account/Profile");
      return response.data;
    },
  });
};
