import { FormikHelpers } from "formik";
import { Color } from "@material-ui/core";

export enum StatusColors {
    OPEN = "#269f42",
    CLOSED = "#f00c1d",
}
export interface RequestHeaders {
    authorization?: string;
}

export type SubmitHandler<Values> = (
    values: Values,
    bag: FormikHelpers<Values>
) => Promise<any>;

export enum RearrangeType {
    PROJECT_COLUMN = "PROJECT_COLUMN",
    PROJECT_COLUMN_ISSUE = "PROJECT_COLUMN_ISSUE",
}

export enum DrawerType {
    DESKTOP,
    MOBILE,
}

export type FilterOption<V> = {
    title: string;
    value: V;
};

export enum FilterType {
    STATUS = "status",
    SORT = "sort",
    PROJECT = "project",
    LABEL = "label",
}

export enum ThemeColors {
    RED = "RED",
    BLUE = "BLUE",
    YELLOW = "YELLOW",
    GREEN = "GREEN",
    PURPLE = "PURPLE",
    ORANGE = "ORANGE",
}

export enum ThemeBgColors {
    LIGHT_UP = "LIGHT_UP",
    DIM = "DIM",
    SO_DARK = "SO_DARK",
}

export type ThemeColorType = {
    key: ThemeColors;
    color: Color;
};

export type ThemeBgColorType = {
    key: ThemeBgColors;
    color: string;
    title: string;
    type: "dark" | "light";
};

export type Bg = Omit<ThemeBgColorType, "title">;

export type AppTheme = {
    baseColor: ThemeColorType;
    baseBgColor: Omit<ThemeBgColorType, "title">;
};
