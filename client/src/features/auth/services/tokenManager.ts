import type { Token } from "../types";

export class TokenManager {
  private static ACCESS_TOKEN = "accessToken";
  private static REFRESH_TOKEN = "refreshToken";

  static getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN);
  }

  static getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  static setToken(token: Token): void {
    localStorage.setItem(this.ACCESS_TOKEN, token.accessToken);
    localStorage.setItem(this.REFRESH_TOKEN, token.refreshToken);
  }

  static clear(): void {
    localStorage.removeItem(this.ACCESS_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }

  static isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }
}
