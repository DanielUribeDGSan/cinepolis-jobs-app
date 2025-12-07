import { cinepolisApi } from "@/app/modules/network/api/cinepolisApi";
import { useMutate } from "@/app/modules/network/hooks/useMutate";
import { ErrorMessage } from "@/app/modules/network/types/ErrorMessage";
import { useFullScreenLoaderEffect } from "@/app/ui/components/loaders/full-screen/useFullScreenLoader";
import { translationsMessages } from "@/app/ui/messages/constants/translations";
import {
  showErrorMessage,
  showSuccessMessage,
  toastDismiss,
} from "@/app/ui/messages/Messages";

export const useResendCode = () => {
  const mutationResult = useMutate({
    mutationFn: async (email: string) => {
      const response = await cinepolisApi.post("/V1/Account/ResendCode", {
        email,
      });
      return response.data;
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

  useFullScreenLoaderEffect(mutationResult.isPending || false);

  return mutationResult;
};
