const Joi = require("@hapi/joi");

const {
    objectIdSchema,
    qSchema,
    indexSchema,
    sortSchema,
    titleSchema,
    descSchema
} = require("../../shared/validations.shared");

const projectSchema = Joi.object().keys({
    title: titleSchema("Invalid project title").required(),
    description: descSchema("Invalid project description").required(),
    template: objectIdSchema("Invalid template ID").required()
});

const projectIdSchema = Joi.object().keys({
    projectId: objectIdSchema("Invalid project ID").required()
});

const projectRearrangeSchema = Joi.object().keys({
    columnId: objectIdSchema("Invalid column ID").required(),
    sourceIndex: indexSchema("Invalid source index").required(),
    destIndex: indexSchema("Invalid destination index").required()
});

const queryValidation = Joi.object().keys({
    // eslint-disable-next-line
    q: qSchema(),
    sort: sortSchema()
});

const updateValidation = Joi.object()
    .keys({
        title: titleSchema("Invalid issue title"),
        description: descSchema("Invalid issue description")
    })
    .or("title", "description");

module.exports = {
    projectSchema,
    projectIdSchema,
    projectRearrangeSchema,
    queryValidation,
    updateValidation
};
