import { FormikHelpers } from "formik";
import { Color } from "@material-ui/core";

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

export type ThemeColor = {
    key: string;
    color: Color;
};

export type ThemeBgColor = {
    key: string;
    color: string;
    title: string;
};

export type AppTheme = {
    baseColor: ThemeColor;
    baseBgColor: Omit<ThemeBgColor, "title">;
};
