import { cinepolisApi } from "@/app/modules/network/api/cinepolisApi";
import { useMutate } from "@/app/modules/network/hooks/useMutate";
import { ErrorMessage } from "@/app/modules/network/types/ErrorMessage";
import { User } from "@/app/modules/users/types/User";
import { userStorage } from "@/app/modules/users/utils/storage/userStorage";
import { translationsMessages } from "@/app/ui/messages/constants/translations";
import {
  showErrorMessage,
  showLoadingMessage,
  toastDismiss,
} from "@/app/ui/messages/Messages";
import { router } from "expo-router";
import { LoginRequest } from "../../types/LoginForm";

export const useLoginUser = () => {
  return useMutate({
    mutationFn: async (body: LoginRequest) =>
      await cinepolisApi.post("/V1/Account/Login", body),
    onMutate: () => {
      showLoadingMessage({
        title: translationsMessages.loadingData,
        description: translationsMessages.loadingDataDetail,
      });
    },
    onSuccess: async (response: any, variables: LoginRequest) => {
      // Guardar el email del usuario en Secure Store
      // El email viene como userName en el body del request
      const userData: Partial<User> = {
        userName: variables.userName,
      };

      // Guardar el token si viene en la respuesta
      if (response?.data?.token) {
        userData.token = response.data.token;
      }

      await userStorage.saveUser(userData);

      toastDismiss();

      // Redirigir al HomeScreen
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
};
