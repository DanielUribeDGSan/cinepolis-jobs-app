import { useMutate } from "@/app/modules/network/hooks/useMutate";
import { ErrorMessage } from "@/app/modules/network/types/ErrorMessage";
import { translationsMessages } from "@/app/ui/messages/constants/translations";
import {
  showErrorMessage,
  showLoadingMessage,
  showSuccessMessage,
  toastDismiss,
} from "@/app/ui/messages/Messages";

import { cinepolisApi } from "@/app/modules/network/api/cinepolisApi";
import { User } from "@/app/modules/users/types/User";
import { userStorage } from "@/app/modules/users/utils/storage/userStorage";
import { router } from "expo-router";
import { translations } from "../../constants/translations";
import { RegisterRequest } from "../../types/RegisterForm";

export const useRegisterUser = () => {
  return useMutate({
    mutationFn: async (body: RegisterRequest) => {
      const response = await cinepolisApi.post("/V1/Account/Create", body);
      return response.data;
    },
    onMutate: () => {
      showLoadingMessage({
        title: translationsMessages.loadingData,
        description: translationsMessages.loadingDataDetail,
      });
    },
    onSuccess: async (response: any, variables: RegisterRequest) => {
      // Guardar el email del usuario en Secure Store
      const userData: Partial<User> = {
        userName: variables.email,
      };

      // Guardar el token si viene en la respuesta
      if (response?.token) {
        userData.token = response.token;
      }

      await userStorage.saveUser(userData);

      showSuccessMessage({
        title: translations.successRegister,
        description: translations.successRegisterDetail,
      });
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
