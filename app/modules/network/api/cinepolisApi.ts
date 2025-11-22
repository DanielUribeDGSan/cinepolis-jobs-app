import env from "@/app/config/env";
import axios, { AxiosError } from "axios";
import { ErrorMessage } from "../types/ErrorMessage";

export const cinepolisApi = axios.create({
  baseURL: env.apiUrl,
});

// Interceptor de respuesta para transformar errores de Axios
cinepolisApi.interceptors.response.use(
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
