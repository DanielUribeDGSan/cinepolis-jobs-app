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
import { RegisterRequest } from "../../types/RegisterForm";
import { translations } from "../../constants/translations";

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
    onSuccess: () => {
      showSuccessMessage({
        title: translations.successRegister,
        description: translations.successRegisterDetail,
      });
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
