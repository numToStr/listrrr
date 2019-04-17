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
        .error(new Error("Invalid project ID"))
});

const projectRearrangeSchema = Joi.object().keys({
    columnId: Joi.string()
        .regex(objectIdRegex)
        .required()
        .error(new Error("Invalid project ID")),
    sourceIndex: Joi.number()
        .min(0)
        .required()
        .error(new Error("Invalid source index")),
    destIndex: Joi.number()
        .min(0)
        .required()
        .error(new Error("Invalid destination index"))
});

module.exports = {
    projectSchema,
    projectIdSchema,
    projectRearrangeSchema
};
