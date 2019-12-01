import React, {
    createContext,
    useState,
    FC,
    Dispatch,
    useContext,
    useEffect,
} from "react";
import {
    Bg,
    ThemeColorType,
    ThemeBgColors,
    ThemeColors,
} from "../../@types/types";
import { InitialTheme } from "./InitialTheme";
import { ThemeBgColorsMap, ThemeColorsMap } from "../../utils/theme";
import StorageUtil from "../../utils/storage";

const defaultColor = ThemeColorsMap[ThemeColors.RED];

const defaultBg = ThemeBgColorsMap[ThemeBgColors.LIGHT_UP];

const AppColorContext = createContext<{
    color: ThemeColorType;
    changeColor: Dispatch<ThemeColorType>;
}>({ color: defaultColor, changeColor() {} });

const AppBgColorContext = createContext<{ bg: Bg; changeBg: Dispatch<Bg> }>({
    bg: defaultBg,
    changeBg() {},
});

export const ThemeContext: FC = ({ children }) => {
    const [bg, changeBg] = useState<Bg>(defaultBg);
    const [color, changeColor] = useState<ThemeColorType>(defaultColor);

    useEffect(() => {
        const t = StorageUtil.getTheme();
        if (t) {
            changeBg(t.bg);
            changeColor(t.color);
        }
    }, []);

    useEffect(() => {
        StorageUtil.setTheme({ bg, color });
    }, [bg, color]);

    return (
        <AppBgColorContext.Provider value={{ bg, changeBg }}>
            <AppColorContext.Provider value={{ color, changeColor }}>
                <InitialTheme baseBgColor={bg} baseColor={color}>
                    {children}
                </InitialTheme>
            </AppColorContext.Provider>
        </AppBgColorContext.Provider>
    );
};

export const useAppBgColor = () => {
    const ctx = useContext(AppBgColorContext);

    if (!ctx) {
        throw new Error(
            `useAppBgColor can only be used inside AppBgColorContext`
        );
    }

    return ctx;
};

export const useAppColor = () => {
    const ctx = useContext(AppColorContext);

    if (!ctx) {
        throw new Error(`useAppColor can only be used inside AppColorContext`);
    }

    return ctx;
};
