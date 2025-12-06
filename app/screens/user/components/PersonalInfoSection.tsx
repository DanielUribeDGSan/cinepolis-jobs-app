import Button from "@/app/ui/components/buttons/Button";
import InputText from "@/app/ui/components/inputs/InputText";
import { colors } from "@/app/utils/sizes/constants/colors";
import useGetFontSize from "@/app/utils/sizes/hooks/useGetFontSize";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Control, FieldError } from "react-hook-form";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { ProfileForm } from "../types/ProfileForm";

interface PersonalInfoSectionProps {
  control: Control<ProfileForm>;
  errors: {
    name?: FieldError;
    lastName?: FieldError;
    secondLastName?: FieldError;
    gender?: FieldError;
    birthDate?: FieldError;
    phone?: FieldError;
    suburb?: FieldError;
    city?: FieldError;
    country?: FieldError;
  };
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  control,
  errors,
  isEditing,
  onEdit,
  onSave,
  onCancel,
}) => {
  const { height } = useGetFontSize();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Información personal</Text>
        {!isEditing && (
          <TouchableOpacity onPress={onEdit} style={styles.editButton}>
            <FontAwesome name="pencil" size={16} color={colors.secondary} />
            <Text style={styles.editText}>Editar</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.fieldsContainer}>
        <InputText
          name="name"
          control={control}
          label="Nombre(s)"
          disabled={!isEditing}
          containerStyle={{ marginBottom: height("1%") }}
          error={errors.name}
        />
        <InputText
          name="lastName"
          control={control}
          label="Apellido(s)"
          disabled={!isEditing}
          containerStyle={{ marginBottom: height("1%") }}
          error={errors.lastName}
        />
        <InputText
          name="secondLastName"
          control={control}
          label="Segundo apellido"
          disabled={!isEditing}
          containerStyle={{ marginBottom: height("1%") }}
          error={errors.secondLastName}
        />
        <InputText
          name="gender"
          control={control}
          label="Sexo"
          disabled={!isEditing}
          containerStyle={{ marginBottom: height("1%") }}
          error={errors.gender}
        />
        <InputText
          name="birthDate"
          control={control}
          label="Fecha de nacimiento"
          disabled={!isEditing}
          placeholder="DD/MM/YYYY"
          containerStyle={{ marginBottom: height("1%") }}
          error={errors.birthDate}
        />
        <InputText
          name="phone"
          control={control}
          label="Teléfono de contacto"
          disabled={!isEditing}
          keyboardType="phone-pad"
          containerStyle={{ marginBottom: height("1%") }}
          error={errors.phone}
        />
        <InputText
          name="suburb"
          control={control}
          label="Colonia"
          disabled={!isEditing}
          containerStyle={{ marginBottom: height("1%") }}
          error={errors.suburb}
        />
        <InputText
          name="city"
          control={control}
          label="Ciudad"
          disabled={!isEditing}
          containerStyle={{ marginBottom: height("1%") }}
          error={errors.city}
        />
        <InputText
          name="country"
          control={control}
          label="País"
          disabled={!isEditing}
          containerStyle={{ marginBottom: height("1%") }}
          error={errors.country}
        />
      </View>

      {isEditing && (
        <View style={styles.buttonContainer}>
          <Button
            label="Guardar"
            style={{
              backgroundColor: colors.secondary,
              paddingHorizontal: hp("2%"),
              marginRight: hp("2%"),
            }}
            styleText={{ color: colors.white }}
            onPress={onSave}
            size="small"
          />
          <Button
            label="Cancelar"
            style={{
              backgroundColor: colors.white,
              borderWidth: height("0.1%"),
              borderColor: colors.secondary,
              paddingHorizontal: hp("2%"),
            }}
            styleText={{ color: colors.secondary }}
            onPress={onCancel}
            size="small"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.primary,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  editText: {
    fontSize: 14,
    color: colors.secondary,
    fontWeight: "500",
  },
  fieldsContainer: {
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
});

export default PersonalInfoSection;
