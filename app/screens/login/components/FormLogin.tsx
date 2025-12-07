import React from "react";
import { StyleSheet, View } from "react-native";

import LogoJobs from "@/app/ui/components/images/LogoJobs";

import InputEmail from "@/app/ui/components/inputs/InputEmail";
import InputPassword from "@/app/ui/components/inputs/InputPassword";
import useFormLogin from "../hooks/useFormLogin";

import Button from "@/app/ui/components/buttons/Button";
import LinkButton from "@/app/ui/components/buttons/LinkButton";
import InputCheckbox from "@/app/ui/components/inputs/InputCheckbox";
import TitleAndButton from "@/app/ui/components/utils/TitleAndButton";
import LayoutForms from "@/app/ui/layouts/LayoutForms";
import { colors } from "@/app/utils/sizes/constants/colors";
import { containers } from "@/app/utils/sizes/constants/containers";
import { router } from "expo-router";

const FormLogin = () => {
  const { control, errors, height, handleSubmit, onSubmit } = useFormLogin();

  return (
    <LayoutForms>
      <LogoJobs />

      <View style={styles.container}>
        <InputEmail
          name="email"
          control={control}
          label="Email"
          containerStyle={{ marginBottom: height("1%") }}
          error={errors.email}
          spaceBottom={true}
        />
        <InputPassword
          name="password"
          control={control}
          label="password"
          containerStyle={{ marginBottom: height("1%") }}
          error={errors.password}
          spaceBottom={true}
        />
      </View>

      <View className="flex-row justify-between items-center flex-wrap">
        <InputCheckbox
          name="remember"
          control={control}
          label="Recuérdame"
          containerStyle={{ marginBottom: height("1%") }}
        />
        <LinkButton
          onPress={() =>
            router.push({ pathname: "routes/auth/RegisterScreen" as any })
          }
          label="¿Olvidaste tu contraseña?"
          color={colors.secondary}
        />
      </View>

      <Button
        label="Iniciar sesión"
        style={{
          marginVertical: containers.topComponent,
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
        title="¿No tienes una cuenta?"
        onPress={() =>
          router.push({ pathname: "routes/auth/RegisterScreen" as any })
        }
        label="Regístrate"
        fontSize="p"
        styleText={{ marginBottom: containers.bottomText }}
        outline={false}
      />
    </LayoutForms>
  );
};

export default FormLogin;

const styles = StyleSheet.create({
  container: {
    gap: containers.bottomComponentInputs,
    marginBottom: containers.bottomComponentInputs,
  },
});
