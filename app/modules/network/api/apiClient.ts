import axios, { AxiosInstance } from "axios";

import { attachAuthorizationInterceptor } from "./interceptors";
import env from "@/app/config/env";

const TIME_OUT = 50000;

const apiClient: AxiosInstance = axios.create({
  baseURL: env.apiUrl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: TIME_OUT,
});

export const { setToken } = attachAuthorizationInterceptor(apiClient);

export default apiClient;
