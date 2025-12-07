import { useMutate } from "@/app/modules/network/hooks/useMutate";
import { ErrorMessage } from "@/app/modules/network/types/ErrorMessage";
import { useFullScreenLoaderEffect } from "@/app/ui/components/loaders/full-screen/useFullScreenLoader";
import { translationsMessages } from "@/app/ui/messages/constants/translations";
import {
  showErrorMessage,
  showSuccessMessage,
  toastDismiss,
} from "@/app/ui/messages/Messages";

import { cinepolisApi } from "@/app/modules/network/api/cinepolisApi";
import { router } from "expo-router";
import { translations } from "../../constants/translations";
import { RegisterRequest } from "../../types/RegisterForm";

export const useRegisterUser = () => {
  const mutationResult = useMutate({
    mutationFn: async (body: RegisterRequest) => {
      const response = await cinepolisApi.post("/V1/Account/Create", body);
      return response.data;
    },
    onSuccess: async (response: any, variables: RegisterRequest) => {
      showSuccessMessage({
        title: translations.successRegister,
        description: translations.successRegisterDetail,
      });
      toastDismiss();

      router.push({
        pathname: "routes/auth/VerificationCodeScreen" as any,
        params: { email: variables.email },
      });
    },
    onError: async (error: ErrorMessage) => {
      toastDismiss();
      showErrorMessage({
        title: translationsMessages.errorGeneral,
        description: error.data.error,
      });
    },
  });

  useFullScreenLoaderEffect(mutationResult.isPending || false);

  return mutationResult;
};
