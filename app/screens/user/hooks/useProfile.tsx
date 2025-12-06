import useGetFontSize from "@/app/utils/sizes/hooks/useGetFontSize";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { defaultValuesProfile } from "../data/defaultValuesProfile";
import {
  ProfileForm,
  UpdateCVRequest,
  UpdatePasswordRequest,
  UpdatePersonalInfoRequest,
} from "../types/ProfileForm";
import { useFetchUser } from "./mutate/useFetchUser";
import { useUpdateCV } from "./mutate/useUpdateCV";
import { useUpdatePassword } from "./mutate/useUpdatePassword";
import { useUpdatePersonalInfo } from "./mutate/useUpdatePersonalInfo";

export const useProfile = () => {
  const { height } = useGetFontSize();
  const { data: user, isLoading, refetch } = useFetchUser();
  const { mutateAsync: updatePassword } = useUpdatePassword();
  const { mutateAsync: updatePersonalInfo } = useUpdatePersonalInfo();
  const { mutateAsync: updateCV } = useUpdateCV();

  const [activeTab, setActiveTab] = useState<"personal" | "vacancies">(
    "personal"
  );
  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProfileForm>({
    defaultValues: defaultValuesProfile,
  });

  // Cargar datos del usuario cuando se obtengan
  useEffect(() => {
    if (user) {
      setValue("email", (user as any).userName || "");
      setValue("name", (user as any).name || "");
      setValue("lastName", (user as any).lastName || "");
      setValue("secondLastName", (user as any).secondLastName || "");
      setValue("gender", (user as any).gender || "");
      setValue("phone", (user as any).phone || "");
      setValue("suburb", (user as any).suburb || "");
      setValue("city", (user as any).city || "");
      setValue("country", (user as any).country || "");
    }
  }, [user, setValue]);

  const handleUpdatePassword = useCallback(
    async (data: UpdatePasswordRequest) => {
      await updatePassword(data);
      setShowChangePassword(false);
    },
    [updatePassword]
  );

  const handleUpdatePersonalInfo = useCallback(
    async (data: ProfileForm) => {
      const personalInfo: UpdatePersonalInfoRequest = {
        name: data.name,
        lastName: data.lastName,
        secondLastName: data.secondLastName,
        gender: data.gender,
        birthDate: data.birthDate,
        phone: data.phone,
        suburb: data.suburb,
        city: data.city,
        country: data.country,
      };
      await updatePersonalInfo(personalInfo);
      setIsEditingPersonalInfo(false);
      await refetch();
    },
    [updatePersonalInfo, refetch]
  );

  const handleUpdateCV = useCallback(
    async (cvFile: string) => {
      const cvData: UpdateCVRequest = { cvFile };
      await updateCV(cvData);
      await refetch();
    },
    [updateCV, refetch]
  );

  return {
    user,
    isLoading,
    activeTab,
    setActiveTab,
    isEditingPersonalInfo,
    setIsEditingPersonalInfo,
    showChangePassword,
    setShowChangePassword,
    control,
    handleSubmit,
    errors,
    watch,
    height,
    handleUpdatePassword,
    handleUpdatePersonalInfo,
    handleUpdateCV,
  };
};
