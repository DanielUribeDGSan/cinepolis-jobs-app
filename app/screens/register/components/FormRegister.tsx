import React from "react";
import { Text, View } from "react-native";

import { TextStylesTemplates } from "@/app/theme/TextStylesTemplates";
import Button from "@/app/ui/components/buttons/Button";
import LinkButton from "@/app/ui/components/buttons/LinkButton";
import InputCheckbox from "@/app/ui/components/inputs/InputCheckbox";
import InputEmail from "@/app/ui/components/inputs/InputEmail";
import InputPassword from "@/app/ui/components/inputs/InputPassword";
import TitleAndButton from "@/app/ui/components/utils/TitleAndButton";
import LayoutForms from "@/app/ui/layouts/LayoutForms";
import { colors } from "@/app/utils/sizes/constants/colors";
import { containers } from "@/app/utils/sizes/constants/containers";
import { router } from "expo-router";
import useFormRegister from "../hooks/useFormRegister";

const FormRegister = () => {
  const { control, errors, height, handleSubmit, onSubmit } = useFormRegister();

  return (
    <LayoutForms>
      <Text
        className="text-center"
        style={[
          { marginVertical: height(containers.bottomComponent) },
          TextStylesTemplates.h1Primary,
        ]}
      >
        Crear cuenta
      </Text>

      <View>
        <InputEmail
          name="email"
          control={control}
          label="Email"
          containerStyle={{ marginBottom: height("1%") }}
          error={errors.email}
        />
        <InputPassword
          name="password"
          control={control}
          label="password"
          containerStyle={{ marginBottom: height("1%") }}
          error={errors.password}
        />
        <InputPassword
          name="confirmPassword"
          control={control}
          label="Confirmar contraseña"
          containerStyle={{ marginBottom: height("1%") }}
          error={errors.confirmPassword}
        />
      </View>

      <View className="flex-row justify-between items-center flex-wrap">
        <InputCheckbox
          name="remember"
          control={control}
          label="Sí, he leído y doy mi consentimiento a los "
          containerStyle={{ marginBottom: height("1%") }}
        />
        <LinkButton
          onPress={() =>
            router.push({ pathname: "routes/auth/RegisterScreen" as any })
          }
          label="Términos y condiciones"
          color={colors.secondary}
        />
      </View>

      <Button
        label="Crear una cuenta"
        style={{
          marginVertical: height(containers.topComponent),
          backgroundColor: colors.secondary,
        }}
        styleText={{ color: colors.white }}
        onPress={handleSubmit(onSubmit)}
      />

      <TitleAndButton
        className="flex-column justify-center items-center"
        textClassName="font-bold"
        colorLinkButton={colors.secondary}
        textClassNameLinkButton="font-bold"
        title="¿Ya tienes una cuenta?"
        onPress={() =>
          router.push({ pathname: "routes/auth/LoginScreen" as any })
        }
        label="Inicia sesión"
        fontSize="p"
        styleText={{ marginBottom: height(containers.bottomText) }}
        outline={false}
      />
    </LayoutForms>
  );
};

export default FormRegister;
