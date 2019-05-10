const Joi = require("@hapi/joi");

const {
    objectIdSchema,
    qSchema,
    sortSchema
} = require("../../global/validations.global");

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
    project: objectIdSchema().allow(["", null])
});

const issueIdSchema = Joi.object().keys({
    issueId: objectIdSchema().required()
});

const queryValidation = Joi.object().keys({
    // eslint-disable-next-line
    q: qSchema(),
    sort: sortSchema()
});

const updateValidation = Joi.object().keys({
    title: Joi.string()
        .min(5)
        .trim()
        .error(new Error("Invalid issue title")),
    description: Joi.string()
        .min(10)
        .trim()
        .error(new Error("Invalid issue description")),
    isOpen: Joi.boolean().error(new Error("Invalid action to close")),
    project: objectIdSchema()
});

module.exports = {
    issueSchema,
    issueIdSchema,
    queryValidation,
    updateValidation
};
