import { cinepolisApi } from "@/app/modules/network/api/cinepolisApi";
import { useMutate } from "@/app/modules/network/hooks/useMutate";
import { ErrorMessage } from "@/app/modules/network/types/ErrorMessage";
import { User } from "@/app/modules/users/types/User";
import { userStorage } from "@/app/modules/users/utils/storage/userStorage";
import { translationsMessages } from "@/app/ui/messages/constants/translations";
import {
  showErrorMessage,
  showLoadingMessage,
  showSuccessMessage,
  toastDismiss,
} from "@/app/ui/messages/Messages";
import { router } from "expo-router";
import { VerificationRequest } from "../../types/VerificationForm";

export const useVerifyCode = () => {
  return useMutate({
    mutationFn: async (body: VerificationRequest) => {
      const response = await cinepolisApi.post("/V1/Account/Validate", body);
      return response.data;
    },
    onMutate: () => {
      showLoadingMessage({
        title: translationsMessages.loadingData,
        description: "Verificando código...",
      });
    },
    onSuccess: async (response: any, variables: VerificationRequest) => {
      // Guardar el usuario después de verificar correctamente el código
      const userData: Partial<User> = {
        userName: variables.email,
      };

      // Guardar el token si viene en la respuesta
      if (response?.token) {
        userData.token = response.token;
      }

      await userStorage.saveUser(userData);

      showSuccessMessage({
        title: "Código verificado",
        description: "Tu cuenta ha sido verificada exitosamente",
      });
      toastDismiss();

      // Redirigir al HomeScreen después de verificar
      router.replace("/routes/home/HomeScreen" as any);
    },
    onError: async (error: ErrorMessage) => {
      toastDismiss();
      showErrorMessage({
        title: translationsMessages.errorGeneral,
        description: error.data?.error || "El código ingresado es inválido",
      });
    },
  });
};
