import { TextStylesTemplates } from "@/app/theme/TextStylesTemplates";
import Button from "@/app/ui/components/buttons/Button";
import InputOTP from "@/app/ui/components/inputs/InputOTP";
import LayoutForms from "@/app/ui/layouts/LayoutForms";
import { colors } from "@/app/utils/sizes/constants/colors";
import { containers } from "@/app/utils/sizes/constants/containers";
import useGetFontSize from "@/app/utils/sizes/hooks/useGetFontSize";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import useFormVerification from "../hooks/useFormVerification";
import { useVerificationTimer } from "../hooks/useVerificationTimer";

const FormVerificationCode = () => {
  const { height } = useGetFontSize();
  const {
    handleSubmit,
    onSubmit,
    setValue,
    codeValue,
    errors,
    handleResendCode,
  } = useFormVerification();
  const { formattedTime, canResend, resetTimer } = useVerificationTimer();

  const handleCodeChange = (value: string) => {
    setValue("code", value, { shouldValidate: true });
  };

  const handleResend = async () => {
    await handleResendCode();
    resetTimer();
  };

  return (
    <LayoutForms>
      <Text
        className="text-center"
        style={[
          { marginVertical: height(containers.bottomComponent) },
          TextStylesTemplates.h1Primary,
        ]}
      >
        Introduce el código que te enviamos a tu correo electrónico
      </Text>

      <Text
        className="text-center "
        style={[TextStylesTemplates.pPrimary, { marginBottom: height("2%") }]}
      >
        Confirma tu dirección de correo electrónico con el código que te
        enviamos.
      </Text>

      <View style={{ marginVertical: height("3%") }}>
        <InputOTP
          length={5}
          value={codeValue || ""}
          onChange={handleCodeChange}
          error={!!errors.code}
        />
        {errors.code && (
          <Text
            style={{
              textAlign: "center",
              marginTop: 8,
              ...TextStylesTemplates.pPrimary,
              color: "#EF4444",
            }}
          >
            {errors.code.message}
          </Text>
        )}
      </View>

      <Button
        label="Confirmar cuenta"
        style={{
          marginVertical: height(containers.topComponent),
          backgroundColor: colors.secondary,
        }}
        styleText={{ color: colors.white }}
        onPress={handleSubmit(onSubmit)}
        disabled={!codeValue || codeValue.length !== 5}
      />

      <View className="flex-column justify-center items-center">
        {!canResend ? (
          <>
            <Text
              style={{
                ...TextStylesTemplates.smallSecondary,
                marginBottom: 8,
                fontWeight: "500",
              }}
            >
              {formattedTime}
            </Text>
            <Text
              style={{
                ...TextStylesTemplates.smallPrimary,
                opacity: 0.7,
              }}
            >
              Reenviar el código
            </Text>
          </>
        ) : (
          <TouchableOpacity onPress={handleResend}>
            <Text
              style={{
                ...TextStylesTemplates.smallSecondary,
                fontWeight: "600",
                textDecorationLine: "underline",
              }}
            >
              Reenviar el código
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </LayoutForms>
  );
};

export default FormVerificationCode;
