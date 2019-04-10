const Joi = require("joi");

const { objectIdRegex } = require("../../helper/constants");

const projectSchema = Joi.object().keys({
    title: Joi.string()
        .min(5)
        .trim()
        .required()
        .error(new Error("Invalid issue title")),
    description: Joi.string()
        .min(5)
        .trim()
        .required()
        .error(new Error("Invalid issue description")),
    template: Joi.string()
        .regex(objectIdRegex)
        .error(new Error("Invalid project ID"))
});

const projectIdSchema = Joi.object().keys({
    projectId: Joi.string()
        .regex(objectIdRegex)
        .required()
        .error(new Error("Invalid issue ID"))
});

module.exports = {
    projectSchema,
    projectIdSchema
};
