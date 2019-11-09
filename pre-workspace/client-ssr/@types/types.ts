import { FormikHelpers } from "formik";

export type SubmitHandler<Values> = (
    values: Values,
    bag: FormikHelpers<Values>
) => unknown;
