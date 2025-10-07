import axios from "axios";
import { TokenManager } from "./tokenManager";

const API_URL = import.meta.env.VITE_API_HOST || "http://localhost:5000";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

let refreshing = false;
let pendingRequests: ((token: string) => void)[] = [];

apiClient.interceptors.request.use((config) => {
  const token = TokenManager.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log(
    "Request:",
    config.method?.toUpperCase(),
    config.url,
    config.data || ""
  );

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      const refreshToken = TokenManager.getRefreshToken();
      if (!refreshToken) {
        TokenManager.clear();
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }

      if (refreshing) {
        return new Promise((resolve) => {
          pendingRequests.push((newToken: string) => {
            original.headers.Authorization = `Bearer ${newToken}`;
            resolve(apiClient(original));
          });
        });
      }
      refreshing = true;
      // Attempt to refresh token
      try {
        const { data } = await axios.post(`${API_URL}/auth/refresh`, {
          refresh_token: TokenManager.getRefreshToken(),
        });

        TokenManager.setToken(data);
        apiClient.defaults.headers.common.Authorization = `Bearer ${data.access_token}`;

        pendingRequests.forEach((cb) => cb(data.access_token));
        pendingRequests = [];

        return apiClient(original);
      } catch (err) {
        TokenManager.clear();
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        refreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
