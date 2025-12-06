import Button from "@/app/ui/components/buttons/Button";
import InputEmail from "@/app/ui/components/inputs/InputEmail";
import InputPassword from "@/app/ui/components/inputs/InputPassword";
import { colors } from "@/app/utils/sizes/constants/colors";
import useGetFontSize from "@/app/utils/sizes/hooks/useGetFontSize";
import React from "react";
import { Control, FieldError } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { ProfileForm } from "../types/ProfileForm";

interface AccountSectionProps {
  email: string;
  control: Control<ProfileForm>;
  errors: {
    email?: FieldError;
    password?: FieldError;
  };
  onOpenChangePassword: () => void;
}

const AccountSection: React.FC<AccountSectionProps> = ({
  email,
  control,
  errors,
  onOpenChangePassword,
}) => {
  const { height } = useGetFontSize();

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

      <Button
        label="Cambiar contraseña"
        style={{
          backgroundColor: colors.white,
          borderWidth: 1,
          borderColor: colors.secondary,
          marginTop: height("2%"),
        }}
        styleText={{ color: colors.secondary }}
        onPress={onOpenChangePassword}
      />
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
});

export default AccountSection;
