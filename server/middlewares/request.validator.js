const Joi = require("@hapi/joi");

/**
 * Function for validating incoming request
 * It can validate request body, params, query
 * It takes a Joi validation schema
 * And validate against req.body
 *
 * @param {Object} validationScema Validation Schema
 * @param {String} where Telling where to look for values to validate
 * @returns {Function} Express middleware
 * @throws {Error}
 */
const validator = (validationScema, where = "body") => {
    return (req, res, next) => {
        try {
            const { error } = Joi.validate(req[where], validationScema);
            if (error) {
                throw new $Error(error.message, 400, ":ValidationError");
            }

            return next();
        } catch (error) {
            next(error);
        }
    };
};

module.exports = validator;
