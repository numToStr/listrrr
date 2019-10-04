const Joi = require("@hapi/joi");

const titleSchema = errTxt => {
    return Joi.string()
        .min(5)
        .trim()
        .error(new Error(errTxt));
};

const descSchema = errTxt => {
    return Joi.string()
        .min(10)
        .trim()
        .error(new Error(errTxt));
};

const indexSchema = errTxt => {
    return Joi.number()
        .min(0)
        .error(new Error(errTxt));
};

const qSchema = () => {
    return Joi.string()
        .valid("is:open", "is:closed")
        .error(new Error("Invalid q param"));
};

const sortSchema = () => {
    return Joi.string()
        .valid("created:asc", "created:desc", "updated:desc")
        .error(new Error("Invalid sort param"));
};

const objectIdSchema = errTxt => {
    return Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .error(new Error(errTxt));
};

module.exports = {
    titleSchema,
    descSchema,
    indexSchema,
    qSchema,
    sortSchema,
    objectIdSchema
};
