import React, {
    createContext,
    useState,
    FC,
    Dispatch,
    useContext,
} from "react";
import { red } from "@material-ui/core/colors";
import { ThemeBgColor, ThemeColor } from "../../@types/types";
import { InitialTheme } from "./InitialTheme";

const defaultColor = {
    key: "red",
    color: red,
};

const defaultBg = {
    key: "light-up",
    color: "#fff",
};

type Bg = Omit<ThemeBgColor, "title">;

const AppColorContext = createContext<{
    color: ThemeColor;
    changeColor: Dispatch<ThemeColor>;
}>({ color: defaultColor, changeColor() {} });

const AppBgColorContext = createContext<{ bg: Bg; changeBg: Dispatch<Bg> }>({
    bg: defaultBg,
    changeBg() {},
});

export const ThemeContext: FC = ({ children }) => {
    const [bg, changeBg] = useState<Bg>(defaultBg);
    const [color, changeColor] = useState<ThemeColor>(defaultColor);

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
