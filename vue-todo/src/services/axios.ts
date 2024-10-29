import axios from "axios";
import type { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "https://backend-auto-estudo-20242-production.up.railway.app",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
