import { cinepolisApi } from "@/app/modules/network/api/cinepolisApi";
import { useMutate } from "@/app/modules/network/hooks/useMutate";
import { ErrorMessage } from "@/app/modules/network/types/ErrorMessage";
import { User } from "@/app/modules/users/types/User";
import { userStorage } from "@/app/modules/users/utils/storage/userStorage";
import { useFullScreenLoaderEffect } from "@/app/ui/components/loaders/full-screen/useFullScreenLoader";
import { translationsMessages } from "@/app/ui/messages/constants/translations";
import { showErrorMessage, toastDismiss } from "@/app/ui/messages/Messages";
import { router } from "expo-router";
import { LoginRequest } from "../../types/LoginForm";

export const useLoginUser = () => {
  const mutationResult = useMutate({
    mutationFn: async (body: LoginRequest) =>
      await cinepolisApi.post("/V1/Account/Login", body),

    onSuccess: async (response: any, variables: LoginRequest) => {
      const userData: Partial<User> = {
        userName: variables.userName,
      };

      if (response?.data?.token) {
        userData.token = response.data.token;
      }

      await userStorage.saveUser(userData);

      toastDismiss();

      router.replace("/routes/home/HomeScreen" as any);
    },
    onError: async (error: ErrorMessage) => {
      toastDismiss();
      showErrorMessage({
        title: translationsMessages.errorGeneral,
        description: error.data.error,
      });
    },
  });

  useFullScreenLoaderEffect(mutationResult.isPending || false);

  return mutationResult;
};
