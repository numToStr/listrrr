import { FormikHelpers } from "formik";
import { MutationHookOptions, MutationResult } from "@apollo/client";

export type SubmitHandler<Values> = (
    values: Values,
    bag: FormikHelpers<Values>
) => unknown;

// Used in custom query hooks
export type HandleMutation<Params> = (values: Params) => void;

// Used in custom query hooks
export type MutationHook<Data, Variables, FnParams> = (
    options?: Omit<MutationHookOptions<Data, Variables>, "update">
) => [HandleMutation<FnParams>, MutationResult<Data>];
