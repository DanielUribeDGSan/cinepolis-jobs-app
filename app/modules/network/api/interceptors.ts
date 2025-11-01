import { AxiosHeaders, type AxiosInstance } from "axios";

export const attachAuthorizationInterceptor = (apiClient: AxiosInstance) => {
  let currentToken: string | null = null;

  const setToken = (token: string | null) => {
    currentToken = token;
  };

  apiClient.interceptors.request.use(
    async (config) => {
      if (currentToken) {
        const updatedConfig = { ...config };
        updatedConfig.headers = new AxiosHeaders({
          ...config.headers,
          Authorization: `Bearer ${currentToken}`,
        });
        return updatedConfig;
      }
      return config;
    },
    (error: string | undefined) => Promise.reject(new Error(error))
  );

  return { setToken };
};
