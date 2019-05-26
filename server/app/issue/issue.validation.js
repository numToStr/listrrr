const Joi = require("@hapi/joi");

const {
    objectIdSchema,
    qSchema,
    sortSchema,
    titleSchema,
    descSchema
} = require("../../global/validations.global");

const issueSchema = Joi.object().keys({
    title: titleSchema("Invalid issue title").required(),
    description: descSchema("Invalid issue description").required(),
    project: objectIdSchema("Invalid project ID").allow([""])
});

const issueIdSchema = Joi.object().keys({
    issueId: objectIdSchema("Invalid issue ID").required()
});

const queryValidation = Joi.object().keys({
    // eslint-disable-next-line
    q: qSchema(),
    sort: sortSchema()
});

const updateValidation = Joi.object()
    .keys({
        title: titleSchema("Invalid issue title"),
        description: descSchema("Invalid issue description"),
        isOpen: Joi.boolean().error(new Error("Invalid action to close")),
        project: objectIdSchema("Invalid project ID")
    })
    .or(["title", "description", "isOpen", "project"]);

module.exports = {
    issueSchema,
    issueIdSchema,
    queryValidation,
    updateValidation
};
