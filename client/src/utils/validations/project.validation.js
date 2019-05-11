import { object } from "yup";

import {
    titleSchema,
    descriptionSchema,
    objectIDSchema
} from "./global.validations";

export const projectCreateSchema = object().shape({
    title: titleSchema.required(),
    description: descriptionSchema.required(),
    template: objectIDSchema.required()
});
