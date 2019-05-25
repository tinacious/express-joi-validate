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

    return Joi.validate(obj, schema, (err) => {
      if (err) {
        const message = `${err.details[0].message.replace(/"/g, "'")} at ${err.details[0].path}`;
        const field = err.details[0].context.key;
        res.status(400).json({ message, field }).end();
        return;
      }

      return next();
    });
  }
);


module.exports = validate;
