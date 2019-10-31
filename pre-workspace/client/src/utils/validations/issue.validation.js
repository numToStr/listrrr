import { object } from "yup";

import {
    titleSchema,
    descriptionSchema,
    objectIDSchema
} from "./global.validations";

export const issueCreateSchema = object().shape({
    title: titleSchema.required(),
    description: descriptionSchema.required(),
    project: objectIDSchema
});

export const commentSchema = object().shape({
    comment: descriptionSchema.required()
});
