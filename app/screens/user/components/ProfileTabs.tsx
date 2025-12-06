import { colors } from "@/app/utils/sizes/constants/colors";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ProfileTabsProps {
  activeTab: "personal" | "vacancies";
  onTabChange: (tab: "personal" | "vacancies") => void;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => onTabChange("personal")}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === "personal" && styles.activeTabText,
          ]}
        >
          Datos personales
        </Text>
        {activeTab === "personal" && <View style={styles.underline} />}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => onTabChange("vacancies")}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === "vacancies" && styles.activeTabText,
          ]}
        >
          Vacantes aplicadas
        </Text>
        {activeTab === "vacancies" && <View style={styles.underline} />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    position: "relative",
  },
  tabText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  activeTabText: {
    color: colors.secondary,
    fontWeight: "600",
  },
  underline: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: colors.secondary,
  },
});

export default ProfileTabs;
