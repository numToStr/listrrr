import { FormikHelpers } from "formik";
import { MutationHookOptions, MutationResult } from "@apollo/client";

export type SubmitHandler<Values> = (
    values: Values,
    bag: FormikHelpers<Values>
) => unknown;

// Used in custom query hooks
export type HandleMutation<Variables> = (values: Variables) => void;

// Used in custom query hooks
export type MutationHook<Data, Variables, FnParams> = (
    options?: Omit<MutationHookOptions<Data, Variables>, "update">
) => [HandleMutation<FnParams>, MutationResult<Data>];

export type MyMutationHook<Data, Var> = (
    options?: MutationHookOptions<Data, Var>
) => [HandleMutation<Var>, MutationResult<Data>];

export enum RearrangeType {
    PROJECT_COLUMN = "PROJECT_COLUMN",
    PROJECT_COLUMN_ISSUE = "PROJECT_COLUMN_ISSUE",
}
