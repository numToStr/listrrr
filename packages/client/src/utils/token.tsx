const tokenKey = "LISTRRR_TOKEN";

// Utility for setting and getting auth token
export class TokenUtil {
    static getToken(): string | null {
        if (window.sessionStorage) {
            return sessionStorage.getItem(tokenKey);
        }

        return localStorage.getItem(tokenKey);
    }

    static setToken(token: string): any {
        if (window.sessionStorage) {
            return sessionStorage.setItem(tokenKey, token);
        }

        return localStorage.setItem(tokenKey, token);
    }
}
