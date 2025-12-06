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
import { UpdatePersonalInfoRequest } from "../../types/ProfileForm";

export const useUpdatePersonalInfo = () => {
  return useMutate({
    mutationFn: async (body: UpdatePersonalInfoRequest) => {
      const response = await cinepolisApi.post(
        "/V1/Account/UpdatePersonalInfo",
        body
      );
      return response.data;
    },
    onMutate: () => {
      showLoadingMessage({
        title: translationsMessages.loadingData,
        description: "Actualizando información...",
      });
    },
    onSuccess: async () => {
      showSuccessMessage({
        title: "Información actualizada",
        description: "Tu información personal ha sido actualizada exitosamente",
      });
      toastDismiss();
    },
    onError: async (error: ErrorMessage) => {
      toastDismiss();
      showErrorMessage({
        title: translationsMessages.errorGeneral,
        description: error.data?.error || "Error al actualizar la información",
      });
    },
  });
};
