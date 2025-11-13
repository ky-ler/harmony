import axios from "axios";
import { env } from "~/lib/env";

const api = axios.create({
  baseURL: env.API_URL,
  headers: {
    "Content-type": "application/json",
    "ngrok-skip-browser-warning": true,
  },
});

const addAccessTokenInterceptor = (
  getAccessTokenSilently: () => Promise<string>,
) => {
  api.interceptors.request.use(async (config) => {
    const token = await getAccessTokenSilently();
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};

export { api, addAccessTokenInterceptor };
