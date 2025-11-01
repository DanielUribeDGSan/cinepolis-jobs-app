import React from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";

import LogoJobs from "@/app/ui/components/images/LogoJobs";

import useFormLogin from "../hooks/useFormLogin";
import InputEmail from "@/app/ui/components/inputs/InputEmail";
import InputPassword from "@/app/ui/components/inputs/InputPassword";

import { spacesSizes } from "@/app/utils/sizes/constants/fontSizes";
import InputCheckbox from "@/app/ui/components/inputs/InputCheckbox";
import { router } from "expo-router";
import LinkButton from "@/app/ui/components/buttons/LinkButton";
import Button from "@/app/ui/components/buttons/Button";
import { containers } from "@/app/utils/sizes/constants/containers";
import { colors } from "@/app/utils/sizes/constants/colors";

const FormLogin = () => {
  const { control, height } = useFormLogin();

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View className="flex-1">
        <LogoJobs style={{ marginBottom: height(spacesSizes.bottomTitle) }} />

        <View>
          <InputEmail
            name="email"
            control={control}
            label="Email"
            containerStyle={{ marginBottom: height("1%") }}
          />
          <InputPassword
            name="password"
            control={control}
            label="password"
            containerStyle={{ marginBottom: height("1%") }}
          />
        </View>
        <View className="flex-row justify-between items-center">
          <InputCheckbox
            name="remember"
            control={control}
            label="Recuérdame"
            containerStyle={{ marginBottom: height("1%") }}
          />
          <LinkButton
            onPress={() => router.push("/routes/auth/RegisterScreen")}
            label="¿Olvidaste tu contraseña?"
          />
        </View>
        <Button
          label="Iniciar sesión"
          style={{ marginTop: height(containers.topComponent) }}
          styleText={{ color: colors.white }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default FormLogin;
