import * as SecureStore from "expo-secure-store";

export type LanguageCode = "esp" | "en" | "pt";

export class LanguageStorageService {
  private static readonly LANGUAGE_KEY = "user-selected-language";

  static async getStoredLanguage(): Promise<LanguageCode | null> {
    try {
      const isAvailable = await SecureStore.isAvailableAsync();
      if (!isAvailable) return null;

      const storedLang = await SecureStore.getItemAsync(this.LANGUAGE_KEY);
      return storedLang as LanguageCode | null;
    } catch {
      return null;
    }
  }

  static async saveLanguage(language: LanguageCode): Promise<boolean> {
    try {
      const isAvailable = await SecureStore.isAvailableAsync();
      if (!isAvailable) {
        console.warn("SecureStore not available");
        return false;
      }

      await SecureStore.setItemAsync(this.LANGUAGE_KEY, language);
      return true;
    } catch {
      return false;
    }
  }

  static async isSecureStoreAvailable(): Promise<boolean> {
    try {
      return await SecureStore.isAvailableAsync();
    } catch {
      return false;
    }
  }
}
