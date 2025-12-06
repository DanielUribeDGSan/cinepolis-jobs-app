import Button from "@/app/ui/components/buttons/Button";
import InputEmail from "@/app/ui/components/inputs/InputEmail";
import InputPassword from "@/app/ui/components/inputs/InputPassword";
import { colors } from "@/app/utils/sizes/constants/colors";
import useGetFontSize from "@/app/utils/sizes/hooks/useGetFontSize";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { Control, FieldError, useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { useUpdatePassword } from "../hooks/mutate/useUpdatePassword";
import { SchemaUpdatePassword } from "../schemas/SchemaUpdatePassword";
import { ProfileForm, UpdatePasswordRequest } from "../types/ProfileForm";

interface AccountSectionProps {
  email: string;
  control: Control<ProfileForm>;
  errors: {
    email?: FieldError;
    password?: FieldError;
  };
}

const AccountSection: React.FC<AccountSectionProps> = ({
  email,
  control,
  errors,
}) => {
  const { height } = useGetFontSize();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const { mutateAsync: updatePassword } = useUpdatePassword();

  const {
    control: passwordControl,
    handleSubmit,
    formState: { errors: passwordErrors },
  } = useForm<UpdatePasswordRequest>({
    resolver: yupResolver(SchemaUpdatePassword),
    mode: "onChange",
  });

  const onSubmitPassword = async (data: UpdatePasswordRequest) => {
    await updatePassword(data);
    setShowChangePassword(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Información de tu cuenta</Text>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Correo Electrónico</Text>
        <InputEmail
          name="email"
          control={control}
          label=""
          disabled={true}
          containerStyle={{ marginBottom: height("1%") }}
          error={errors.email}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Contraseña</Text>
        <InputPassword
          name="password"
          control={control}
          label=""
          disabled={true}
          secureTextEntry={true}
          containerStyle={{ marginBottom: height("1%") }}
          error={errors.password}
        />
      </View>

      {showChangePassword ? (
        <View style={styles.passwordForm}>
          <InputPassword
            name="currentPassword"
            control={passwordControl}
            label="Contraseña actual"
            containerStyle={{ marginBottom: height("1%") }}
            error={passwordErrors.currentPassword}
          />
          <InputPassword
            name="newPassword"
            control={passwordControl}
            label="Nueva contraseña"
            containerStyle={{ marginBottom: height("1%") }}
            error={passwordErrors.newPassword}
          />
          <InputPassword
            name="confirmPassword"
            control={passwordControl}
            label="Confirmar nueva contraseña"
            containerStyle={{ marginBottom: height("1%") }}
            error={passwordErrors.confirmPassword}
          />
          <View style={styles.buttonContainer}>
            <Button
              label="Guardar"
              style={{
                backgroundColor: colors.secondary,
                marginRight: 10,
              }}
              styleText={{ color: colors.white }}
              onPress={handleSubmit(onSubmitPassword)}
            />
            <Button
              label="Cancelar"
              style={{
                backgroundColor: colors.white,
                borderWidth: 1,
                borderColor: colors.secondary,
              }}
              styleText={{ color: colors.secondary }}
              onPress={() => setShowChangePassword(false)}
            />
          </View>
        </View>
      ) : (
        <Button
          label="Cambiar contraseña"
          style={{
            backgroundColor: colors.white,
            borderWidth: 1,
            borderColor: colors.secondary,
            marginTop: height("2%"),
          }}
          styleText={{ color: colors.secondary }}
          onPress={() => setShowChangePassword(true)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.primary,
    marginBottom: 20,
  },
  fieldContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.primary,
    marginBottom: 8,
  },
  passwordForm: {
    marginTop: 15,
    padding: 15,
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
});

export default AccountSection;
