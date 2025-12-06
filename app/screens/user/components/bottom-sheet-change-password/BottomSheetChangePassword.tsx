import Button from "@/app/ui/components/buttons/Button";
import InputPassword from "@/app/ui/components/inputs/InputPassword";
import { colors } from "@/app/utils/sizes/constants/colors";
import useGetFontSize from "@/app/utils/sizes/hooks/useGetFontSize";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { useUpdatePassword } from "../../hooks/mutate/useUpdatePassword";
import { SchemaUpdatePassword } from "../../schemas/SchemaUpdatePassword";
import { UpdatePasswordRequest } from "../../types/ProfileForm";
import { useBottomSheetChangePassword } from "./hooks/useBottomSheetChangePassword";

interface BottomSheetChangePasswordProps {
  isOpen: boolean;
  onClose?: () => void;
}

const BottomSheetChangePassword: React.FC<BottomSheetChangePasswordProps> = ({
  isOpen,
  onClose,
}) => {
  const { height } = useGetFontSize();
  const { mutateAsync: updatePassword } = useUpdatePassword();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdatePasswordRequest>({
    resolver: yupResolver(SchemaUpdatePassword),
    mode: "onChange",
  });

  const { bottomSheetRef, snapPoints, handleSheetChanges } =
    useBottomSheetChangePassword({
      isOpen,
      onClose: () => {
        reset();
        onClose?.();
      },
    });

  const onSubmitPassword = async (data: UpdatePasswordRequest) => {
    await updatePassword(data);
    reset();
    onClose?.();
  };

  // No renderizar el BottomSheet si no está abierto para evitar problemas de inicialización
  if (!isOpen) {
    return null;
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      onChange={handleSheetChanges}
      snapPoints={snapPoints}
      index={0}
      enablePanDownToClose
      animateOnMount={false}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Cambiar contraseña</Text>

          <InputPassword
            name="currentPassword"
            control={control}
            label="Contraseña actual"
            containerStyle={{ marginBottom: height("2%") }}
            error={errors.currentPassword}
          />

          <InputPassword
            name="newPassword"
            control={control}
            label="Nueva contraseña"
            containerStyle={{ marginBottom: height("2%") }}
            error={errors.newPassword}
          />

          <InputPassword
            name="confirmPassword"
            control={control}
            label="Confirmar nueva contraseña"
            containerStyle={{ marginBottom: height("3%") }}
            error={errors.confirmPassword}
          />

          <View style={styles.buttonContainer}>
            <Button
              label="Guardar"
              style={{
                backgroundColor: colors.secondary,
                marginRight: 10,
                flex: 1,
              }}
              styleText={{ color: colors.white }}
              onPress={handleSubmit(onSubmitPassword)}
              size="small"
            />
            <Button
              label="Cancelar"
              style={{
                backgroundColor: colors.white,
                borderWidth: 1,
                borderColor: colors.secondary,
                flex: 1,
              }}
              styleText={{ color: colors.secondary }}
              onPress={() => {
                reset();
                onClose?.();
              }}
              size="small"
            />
          </View>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  container: {
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.primary,
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
});

export default BottomSheetChangePassword;
