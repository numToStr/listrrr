import { FormikHelpers } from "formik";
import { MutationHookOptions, MutationResult } from "@apollo/client";

export type SubmitHandler<Values> = (
    values: Values,
    bag: FormikHelpers<Values>
) => Promise<any>;

// Used in custom query hooks
export type HandleMutation<Variables> = (values: Variables) => Promise<any>;

// Used in custom query hooks
export type MyMutationHook<Data, Var> = (
    options?: MutationHookOptions<Data, Var>
) => [HandleMutation<Var>, MutationResult<Data>];

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
