import type { LoginType, RegisterType, Token } from "../types";
import apiClient from "../../../utils/apiClient";
import { TokenManager } from "./tokenManager";

const AUTH_URL = "/auth";

export const authService = {
  login: async (credentials: LoginType): Promise<Token> => {
    const response = await apiClient.post(`${AUTH_URL}/login`, credentials);
    TokenManager.setToken(response.data);
    authService.getCurrentUser();
    return response.data;
  },
  register: async (data: RegisterType): Promise<void> => {
    await apiClient.post(`${AUTH_URL}/register`, data);
  },
  logout: (): void => {
    TokenManager.clear();
    window.location.href = "/login";
  },
  getCurrentUser: async (): Promise<{ name: string; email: string }> => {
    const response = await apiClient.get("/user/me");
    localStorage.setItem("currentUser", JSON.stringify(response.data));
    return response.data;
  },
};
