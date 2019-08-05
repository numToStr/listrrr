import { string } from "yup";

export const titleSchema = string()
    .min(5)
    .trim();

export const descriptionSchema = string()
    .min(10)
    .trim();

export const objectIDSchema = string().min(12);
