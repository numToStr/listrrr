const Joi = require("@hapi/joi");

const {
    objectIdSchema,
    qSchema,
    sortSchema
} = require("../../global/validations.global");

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
    template: objectIdSchema()
});

const projectIdSchema = Joi.object().keys({
    projectId: objectIdSchema().required()
});

const projectRearrangeSchema = Joi.object().keys({
    columnId: objectIdSchema().required(),
    sourceIndex: Joi.number()
        .min(0)
        .required()
        .error(new Error("Invalid source index")),
    destIndex: Joi.number()
        .min(0)
        .required()
        .error(new Error("Invalid destination index"))
});

const queryValidation = Joi.object().keys({
    // eslint-disable-next-line
    q: qSchema(),
    sort: sortSchema()
});

module.exports = {
    projectSchema,
    projectIdSchema,
    projectRearrangeSchema,
    queryValidation
};
