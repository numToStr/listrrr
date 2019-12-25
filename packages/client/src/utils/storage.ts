import { Bg, ThemeColorType } from "../@types/types";
const tokenKey = "LISTRRR_TOKEN";
const themeKey = "APP_THEME";

type T = { bg: Bg; color: ThemeColorType };

const storage = window.sessionStorage || window.localStorage;

// Utility for setting and getting auth token
export default class StorageUtil {
    static getToken(): string | null {
        return storage.getItem(tokenKey);
    }

    static setToken(token: string): any {
        return storage.setItem(tokenKey, token);
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
