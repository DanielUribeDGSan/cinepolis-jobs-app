import { TextStylesTemplates } from "@/app/theme/TextStylesTemplates";
import LayoutForms from "@/app/ui/layouts/LayoutForms";
import { colors } from "@/app/utils/sizes/constants/colors";
import { containers } from "@/app/utils/sizes/constants/containers";
import { fontSizes } from "@/app/utils/sizes/constants/fontSizes";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
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
  } = useProfile();

  //   if (isLoading) {
  //     return (
  //       <View style={styles.loaderContainer}>
  //         <ActivityIndicator size="large" color={colors.secondary} />
  //       </View>
  //     );
  //   }

  return (
    <LayoutForms>
      <View style={styles.container}>
        <View style={styles.header}>
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
});

export default ProfileContent;
