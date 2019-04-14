const Joi = require("joi");

const { objectIdRegex } = require("../../helper/constants");

const issueSchema = Joi.object().keys({
    title: Joi.string()
        .min(5)
        .trim()
        .required()
        .error(new Error("Invalid issue title")),
    description: Joi.string()
        .min(10)
        .trim()
        .required()
        .error(new Error("Invalid issue description")),
    project: Joi.string()
        .regex(objectIdRegex)
        .allow(["", null])
        .error(new Error("Invalid project ID"))
});

const issueIdSchema = Joi.object().keys({
    issueId: Joi.string()
        .regex(objectIdRegex)
        .required()
        .error(new Error("Invalid issue ID"))
});

module.exports = {
    issueSchema,
    issueIdSchema
};
