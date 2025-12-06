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
import { UpdatePasswordRequest } from "../../types/ProfileForm";

export const useUpdatePassword = () => {
  return useMutate({
    mutationFn: async (body: UpdatePasswordRequest) => {
      const response = await cinepolisApi.post(
        "/V1/Account/UpdatePassword",
        body
      );
      return response.data;
    },
    onMutate: () => {
      showLoadingMessage({
        title: translationsMessages.loadingData,
        description: "Actualizando contraseña...",
      });
    },
    onSuccess: async () => {
      showSuccessMessage({
        title: "Contraseña actualizada",
        description: "Tu contraseña ha sido actualizada exitosamente",
      });
      toastDismiss();
    },
    onError: async (error: ErrorMessage) => {
      toastDismiss();
      showErrorMessage({
        title: translationsMessages.errorGeneral,
        description: error.data?.error || "Error al actualizar la contraseña",
      });
    },
  });
};
