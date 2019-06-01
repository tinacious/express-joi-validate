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

    return Joi.validate(obj, schema, { abortEarly: false }, (err) => {
      if (err) {
        const errors = []

        err.details.forEach(i => {
          delete i.context.label
          errors.push({ message: i.message, path: `'${i.path[1]}' at ${i.path[0]}`, context: i.context })
        })

        return res.status(400).json({ errors });
      }

      return next();
    });
  }
);


module.exports = validate;