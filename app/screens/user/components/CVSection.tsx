import { colors } from "@/app/utils/sizes/constants/colors";
import { FontAwesome } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CVSectionProps {
  cvFileName?: string;
  onReplaceCV: (fileUri: string) => void;
}

const CVSection: React.FC<CVSectionProps> = ({ cvFileName, onReplaceCV }) => {
  const handleReplaceCV = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: true,
    });
    if (!result.canceled && result.assets[0]) {
      onReplaceCV(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>CV</Text>
        <TouchableOpacity
          onPress={handleReplaceCV}
          style={styles.replaceButton}
        >
          <FontAwesome name="refresh" size={16} color={colors.secondary} />
          <Text style={styles.replaceText}>Reemplazar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cvContainer}>
        <View style={styles.pdfBadge}>
          <Text style={styles.pdfText}>PDF</Text>
        </View>
        <Text style={styles.fileName}>
          {cvFileName || "No hay archivo seleccionado"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.primary,
  },
  replaceButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  replaceText: {
    fontSize: 14,
    color: colors.secondary,
    fontWeight: "500",
  },
  cvContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
  },
  pdfBadge: {
    backgroundColor: "#EF4444",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 10,
  },
  pdfText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "600",
  },
  fileName: {
    fontSize: 14,
    color: colors.primary,
    flex: 1,
  },
});

export default CVSection;
