import { AxiosError, AxiosHeaders, type AxiosInstance } from "axios";
import { ErrorMessage } from "../types/ErrorMessage";

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

  // Interceptor de respuesta para transformar errores de Axios
  apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      // Si el error tiene una respuesta del servidor, transformarlo a la estructura esperada
      if (error.response) {
        const transformedError: ErrorMessage = {
          status: error.response.status,
          data: error.response.data as ErrorMessage["data"],
        };
        return Promise.reject(transformedError);
      }
      // Si no hay respuesta (error de red, timeout, etc.), rechazar con el error original
      return Promise.reject(error);
    }
  );

  return { setToken };
};
