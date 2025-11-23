import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useLanguage } from "../contexts/LanguageContext";
import { LanguageCode } from "../services/LanguageStorageService";

const LanguageSelector = () => {
  const {
    currentLanguage,
    changeLanguage,
    isLoading,
    isStorageAvailable,
    availableLanguages,
  } = useLanguage();

  const [isChanging, setIsChanging] = useState(false);

  const handleLanguageChange = async (languageCode: LanguageCode) => {
    if (languageCode === currentLanguage || isChanging) return;

    setIsChanging(true);
    try {
      await changeLanguage(languageCode);

      if (!isStorageAvailable) {
        Alert.alert(
          "Advertencia",
          "El idioma se cambió pero no se puede guardar permanentemente.",
          [{ text: "OK" }]
        );
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "No se pudo cambiar el idioma. Inténtalo de nuevo.",
        [{ text: "OK" }]
      );
      console.error("Language change error:", error);
    } finally {
      setIsChanging(false);
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Cargando idiomas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.languageList}>
        {availableLanguages.map((language) => {
          const isSelected = currentLanguage === language.code;
          const isCurrentlyChanging = isChanging && isSelected;

          return (
            <TouchableOpacity
              key={language.code}
              style={[
                styles.languageButton,
                isSelected && styles.selectedLanguage,
                isChanging && !isSelected && styles.disabledButton,
              ]}
              onPress={() => handleLanguageChange(language.code)}
              disabled={isChanging}
              activeOpacity={0.7}
            >
              <View style={styles.languageContent}>
                <View style={styles.languageInfo}>
                  <Text style={styles.flag}>{language.flag}</Text>
                  <View>
                    <Text
                      style={[
                        styles.languageName,
                        isSelected && styles.selectedText,
                      ]}
                    >
                      {language.name}
                    </Text>
                    <Text
                      style={[
                        styles.languageCode,
                        isSelected && styles.selectedSubtext,
                      ]}
                    >
                      {language.code.toUpperCase()}
                    </Text>
                  </View>
                </View>

                <View style={styles.statusContainer}>
                  {isCurrentlyChanging && (
                    <ActivityIndicator size="small" color="white" />
                  )}
                  {isSelected && !isCurrentlyChanging && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: 200,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  currentLang: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  warning: {
    fontSize: 12,
    color: "#FF6B35",
    fontStyle: "italic",
  },
  languageList: {
    gap: 10,
  },
  languageButton: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: "#e1e5e9",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedLanguage: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  disabledButton: {
    opacity: 0.5,
  },
  languageContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  languageInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  flag: {
    fontSize: 24,
    marginRight: 12,
  },
  languageName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  languageCode: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  selectedText: {
    color: "white",
    fontWeight: "bold",
  },
  selectedSubtext: {
    color: "rgba(255, 255, 255, 0.8)",
  },
  statusContainer: {
    width: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  checkmark: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  footer: {
    marginTop: 20,
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  currentCode: {
    fontWeight: "bold",
    color: "#007AFF",
  },
});

export default LanguageSelector;
