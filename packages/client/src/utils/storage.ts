import { Bg, ThemeColorType } from "../@types/types";
const tokenKey = "LISTRRR_TOKEN";
const themeKey = "APP_THEME";

type T = { bg: Bg; color: ThemeColorType };

// Utility for setting and getting auth token
export default class StorageUtil {
    private readonly storage = window.sessionStorage || window.localStorage;

    getToken(): string | null {
        return this.storage.getItem(tokenKey);
    }

    setToken(token: string): any {
        return this.storage.setItem(tokenKey, token);
    }

    static getTheme(): T | null {
        const j = localStorage.getItem(themeKey);

        if (!j) {
            return null;
        }

        return JSON.parse(j);
    }

    static setTheme(theme: T) {
        const t = JSON.stringify(theme);
        localStorage.setItem(themeKey, t);
    }
}
