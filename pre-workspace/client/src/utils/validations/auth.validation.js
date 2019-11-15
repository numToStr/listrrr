import * as yup from "yup";

export const loginSchema = yup.object().shape({
    username: yup
        .string()
        .min(5)
        .required(),
    password: yup
        .string()
        .min(6)
        .required()
});

export const signupSchema = loginSchema.concat(
    yup.object().shape({
        email: yup.string().required()
    })
);
