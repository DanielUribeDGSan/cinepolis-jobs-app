import { useUserSession } from "@/app/modules/users/hooks/useUserSession";
import { TextStylesTemplates } from "@/app/theme/TextStylesTemplates";
import Button from "@/app/ui/components/buttons/Button";
import LayoutForms from "@/app/ui/layouts/LayoutForms";
import { colors } from "@/app/utils/sizes/constants/colors";
import { containers } from "@/app/utils/sizes/constants/containers";
import { fontSizes } from "@/app/utils/sizes/constants/fontSizes";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useProfile } from "../hooks/useProfile";
import AccountSection from "./AccountSection";
import CVSection from "./CVSection";
import PersonalInfoSection from "./PersonalInfoSection";
import ProfileTabs from "./ProfileTabs";

interface ProfileContentProps {
  onOpenChangePassword: () => void;
}

const ProfileContent: React.FC<ProfileContentProps> = ({
  onOpenChangePassword,
}) => {
  const {
    user,
    activeTab,
    setActiveTab,
    isEditingPersonalInfo,
    setIsEditingPersonalInfo,
    control,
    errors,
    handleSubmit,
    handleUpdatePersonalInfo,
    handleUpdateCV,
    height,
    isLoading,
  } = useProfile();

  console.log(user);

  const { clearSession } = useUserSession();

  const handleLogout = async () => {
    await clearSession();
    router.replace("/routes/auth/LoginScreen" as any);
  };

  const getInitials = () => {
    const userData = user as any;

    // Si existe el nombre, usar las iniciales del nombre
    if (userData?.name) {
      const firstName = userData.name.trim().charAt(0).toUpperCase();
      const lastName = userData.lastName?.trim().charAt(0).toUpperCase() || "";
      return lastName ? firstName + lastName : firstName;
    }

    // Si no existe el nombre, usar las iniciales del correo
    if (userData?.userName) {
      const email = userData.userName.trim();
      const emailParts = email.split("@");
      const emailPrefix = emailParts[0] || "";
      return emailPrefix.substring(0, 2).toUpperCase();
    }
    console.log(userData);

    return "CP"; // Fallback por defecto
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.secondary} />
      </View>
    );
  }

  return (
    <LayoutForms>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{getInitials()}</Text>
          </View>
          <Text style={[TextStylesTemplates.h1Primary, styles.welcomeText]}>
            Bienvenid@,
          </Text>
        </View>

        <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === "personal" && (
          <View style={styles.content}>
            <Text
              style={[
                TextStylesTemplates.h2Primary,
                { marginBottom: height("2%") },
              ]}
            >
              Datos personales
            </Text>

            <AccountSection
              email={(user as any)?.userName || ""}
              control={control}
              errors={errors}
              onOpenChangePassword={onOpenChangePassword}
            />

            <PersonalInfoSection
              control={control}
              errors={errors}
              isEditing={isEditingPersonalInfo}
              onEdit={() => setIsEditingPersonalInfo(true)}
              onSave={handleSubmit(handleUpdatePersonalInfo)}
              onCancel={() => setIsEditingPersonalInfo(false)}
            />

            <CVSection
              cvFileName={(user as any)?.cvFileName}
              onReplaceCV={handleUpdateCV}
            />

            <View style={styles.logoutContainer}>
              <Button
                label="Cerrar sesión"
                colorLabel={colors.white}
                onPress={handleLogout}
                style={styles.logoutButton}
                styleText={{ color: colors.white }}
              />
            </View>
          </View>
        )}

        {activeTab === "vacancies" && (
          <View style={styles.content}>
            <Text
              style={[
                TextStylesTemplates.h2Primary,
                { marginBottom: height("2%") },
              ]}
            >
              Vacantes aplicadas
            </Text>
            <Text style={styles.emptyText}>No hay vacantes aplicadas aún</Text>
          </View>
        )}
      </View>
    </LayoutForms>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    paddingVertical: containers.topSection,
    paddingHorizontal: containers.horizontalScreen,
    alignItems: "center",
    backgroundColor: colors.white,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: colors.tertiary,
    borderWidth: 2,
    borderColor: colors.borderColor,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.white,
    letterSpacing: 1,
  },
  welcomeText: {
    color: colors.primary,
    textAlign: "center",
  },
  content: {
    padding: containers.horizontalScreen,
  },
  emptyText: {
    fontSize: fontSizes.p,
    color: colors.gray,
    textAlign: "center",
    backgroundColor: "red",
  },
  logoutContainer: {
    marginTop: containers.topComponent,
  },
  logoutButton: {
    backgroundColor: colors.secondary,
  },
});

export default ProfileContent;
