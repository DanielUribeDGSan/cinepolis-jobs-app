import Constants from "expo-constants";

interface EnvConfig {
  apiUrl: string;
  environment: string;
}

const getEnvVars = (): EnvConfig => {
  return {
    apiUrl:
      Constants.expoConfig?.extra?.apiUrl ||
      "https://cinepolis-jobs-dev.azurewebsites.net/api",
    environment: Constants.expoConfig?.extra?.environment || "development",
  };
};

export default getEnvVars();
