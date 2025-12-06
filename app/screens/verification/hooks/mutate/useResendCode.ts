import { cinepolisApi } from "@/app/modules/network/api/cinepolisApi";
import { useMutate } from "@/app/modules/network/hooks/useMutate";
import { ErrorMessage } from "@/app/modules/network/types/ErrorMessage";
import { translationsMessages } from "@/app/ui/messages/constants/translations";
import {
  showErrorMessage,
  showLoadingMessage,
  showSuccessMessage,
  toastDismiss,
} from "@/app/ui/messages/Messages";

export const useResendCode = () => {
  return useMutate({
    mutationFn: async (email: string) => {
      const response = await cinepolisApi.post("/V1/Account/ResendCode", {
        email,
      });
      return response.data;
    },
    onMutate: () => {
      showLoadingMessage({
        title: translationsMessages.loadingData,
        description: "Reenviando código...",
      });
    },
    onSuccess: async () => {
      showSuccessMessage({
        title: "Código reenviado",
        description: "Se ha enviado un nuevo código a tu correo electrónico",
      });
      toastDismiss();
    },
    onError: async (error: ErrorMessage) => {
      toastDismiss();
      showErrorMessage({
        title: translationsMessages.errorGeneral,
        description: error.data?.error || "Error al reenviar el código",
      });
    },
  });
};
