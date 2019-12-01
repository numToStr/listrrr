import React, {
    createContext,
    useState,
    FC,
    Dispatch,
    useContext,
} from "react";
import {
    ThemeBgColorType,
    ThemeColorType,
    ThemeBgColors,
    ThemeColors,
} from "../../@types/types";
import { InitialTheme } from "./InitialTheme";
import { ThemeBgColorsMap, ThemeColorsMap } from "../../utils/theme";

const defaultColor = ThemeColorsMap[ThemeColors.RED];

const defaultBg = ThemeBgColorsMap[ThemeBgColors.LIGHT_UP];

type Bg = Omit<ThemeBgColorType, "title">;

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
