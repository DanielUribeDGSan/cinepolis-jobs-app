import { useMutate } from "@/app/modules/network/hooks/useMutate";
import { ErrorMessage } from "@/app/modules/network/types/ErrorMessage";
import { translationsMessages } from "@/app/ui/messages/constants/translations";
import {
  showErrorMessage,
  showLoadingMessage,
  toastDismiss,
} from "@/app/ui/messages/Messages";
import { LoginRequest } from "../../types/LoginForm";
import { cinepolisApi } from "@/app/modules/network/api/cinepolisApi";

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
    onSuccess: () => {
      toastDismiss();
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
