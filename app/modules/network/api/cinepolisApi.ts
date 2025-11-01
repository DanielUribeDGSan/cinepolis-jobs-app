import env from "@/app/config/env";
import axios from "axios";

export const cinepolisApi = axios.create({
  baseURL: env.apiUrl,
});
