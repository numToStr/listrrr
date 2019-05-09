const Joi = require("joi");

const qSchema = () => {
    return Joi.string()
        .valid(["is:open", "is:closed"])
        .error(new Error("Invalid q param"));
};

const sortSchema = () => {
    return Joi.string()
        .valid(["created:asc", "created:desc", "updated:desc"])
        .error(new Error("Invalid sort param"));
};

const objectIdSchema = () => {
    return Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .error(new Error("Invalid ID"));
};

module.exports = {
    qSchema,
    sortSchema,
    objectIdSchema
};
