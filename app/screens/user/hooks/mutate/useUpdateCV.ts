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
import { UpdateCVRequest } from "../../types/ProfileForm";

export const useUpdateCV = () => {
  return useMutate({
    mutationFn: async (body: UpdateCVRequest) => {
      const formData = new FormData();
      formData.append("cvFile", body.cvFile as any);
      const response = await cinepolisApi.post(
        "/V1/Account/UpdateCV",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    },
    onMutate: () => {
      showLoadingMessage({
        title: translationsMessages.loadingData,
        description: "Subiendo CV...",
      });
    },
    onSuccess: async () => {
      showSuccessMessage({
        title: "CV actualizado",
        description: "Tu CV ha sido actualizado exitosamente",
      });
      toastDismiss();
    },
    onError: async (error: ErrorMessage) => {
      toastDismiss();
      showErrorMessage({
        title: translationsMessages.errorGeneral,
        description: error.data?.error || "Error al actualizar el CV",
      });
    },
  });
};
