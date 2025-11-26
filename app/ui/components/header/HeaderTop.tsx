import { router } from "expo-router";
import React from "react";
import { HeaderWithLogo } from "./header-with-logo/HeaderWithLogo";

interface HeaderTopProps {
  onMenuPress?: () => void;
  onUserPress?: () => void;
}

export default function HeaderTop({
  onMenuPress,
  onUserPress,
}: HeaderTopProps) {
  const handleUserPress = () => {
    if (onUserPress) {
      onUserPress();
    } else {
      // Navegar al perfil o login
      router.push("/routes/home/(tabs)/TabProfileScreen" as any);
    }
  };

  return (
    <HeaderWithLogo
      onMenuPress={onMenuPress}
      onUserPress={handleUserPress}
      logoType="svg"
    />
  );
}
