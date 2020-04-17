const Joi = require('@hapi/joi');


/**
 * Route validation using Joi
 * Takes a schema with properties defined using Joi:
 *  - params
 *  - body
 *  - query
 * Validates the request properties specified in the schema
 * @param {Object} schema { params, body, query }
 */
const validate = (schema) => (
  (req, res, next) => {
    if (!schema) {
      return next();
    }

    const obj = {};

    ['params', 'body', 'query']
      .forEach((key) => {
        if (schema[key]) {
          obj[key] = req[key];
        }
      });

    const joiSchema = Joi.object(schema);
    const { error } = joiSchema.validate(obj);

    if (error) {
      const field = error.details[0].path.join('.');
      const message = error.details[0].message.replace(/"/g, "'");

      return res.status(400).json({ message, field }).end();
    }

    return next();
  }
);


module.exports = validate;
