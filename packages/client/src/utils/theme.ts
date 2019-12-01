import {
    ThemeColors,
    ThemeColorType,
    ThemeBgColors,
    ThemeBgColorType,
} from "../@types/types";
import {
    red,
    blue,
    yellow,
    green,
    deepPurple,
    orange,
} from "@material-ui/core/colors";

export const ThemeColorsMap: Record<ThemeColors, ThemeColorType> = {
    [ThemeColors.RED]: { color: red, key: ThemeColors.RED },
    [ThemeColors.BLUE]: { color: blue, key: ThemeColors.BLUE },
    [ThemeColors.YELLOW]: { color: yellow, key: ThemeColors.YELLOW },
    [ThemeColors.GREEN]: { color: green, key: ThemeColors.GREEN },
    [ThemeColors.PURPLE]: { color: deepPurple, key: ThemeColors.PURPLE },
    [ThemeColors.ORANGE]: { color: orange, key: ThemeColors.ORANGE },
};

export const ThemeBgColorsMap: Record<ThemeBgColors, ThemeBgColorType> = {
    [ThemeBgColors.LIGHT_UP]: {
        key: ThemeBgColors.LIGHT_UP,
        color: "#fff",
        title: "Light Up",
        type: "light",
    },
    [ThemeBgColors.DIM]: {
        key: ThemeBgColors.DIM,
        color: "#3d3d3d",
        title: "Dim",
        type: "dark",
    },
    [ThemeBgColors.SO_DARK]: {
        key: ThemeBgColors.SO_DARK,
        color: "#212121",
        title: "So Dark",
        type: "dark",
    },
};
