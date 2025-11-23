import * as Localization from "expo-localization";
import { LanguageCode } from "./LanguageStorageService";

export class LanguageDetectionService {
  static detectDeviceLanguage(): LanguageCode {
    try {
      const deviceLocale = Localization.getLocales()[0];
      const languageCode = deviceLocale.languageCode?.toLowerCase();
      const regionCode = deviceLocale.regionCode?.toLowerCase();

      switch (languageCode) {
        case "es":
          return "esp";
        case "en":
          return "en";
        case "pt":
          return "pt";
        default:
          return this.detectByRegion(regionCode);
      }
    } catch {
      return "esp";
    }
  }

  private static detectByRegion(regionCode?: string): LanguageCode {
    if (!regionCode) return "esp";

    const portugueseRegions = ["br", "pt", "ao", "mz", "cv", "gw", "st", "tl"];

    const englishRegions = ["us", "gb", "ca", "au", "nz", "ie", "za", "in"];

    if (portugueseRegions.includes(regionCode)) {
      return "pt";
    } else if (englishRegions.includes(regionCode)) {
      return "en";
    } else {
      return "esp";
    }
  }

  static getLanguageName(code: LanguageCode): string {
    const names = {
      esp: "Español",
      en: "English",
      pt: "Português",
    };
    return names[code];
  }

  static getLanguageFlag(code: LanguageCode): string {
    const flags = {
      esp: "🇪🇸",
      en: "🇺🇸",
      pt: "🇧🇷",
    };
    return flags[code];
  }
}
