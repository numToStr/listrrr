const Joi = require("joi");

const usernameSchema = Joi.object().keys({
    username: Joi.string()
        .min(3)
        .max(10)
        .trim()
        .alphanum()
        .required()
        .error(new Error("Invalid username"))
});

const emailSchema = Joi.object().keys({
    email: Joi.string()
        .email({ minDomainAtoms: 2 })
        .trim()
        .required()
        .error(new Error("Invalid email address"))
});

module.exports = { usernameSchema, emailSchema };
