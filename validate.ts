import { Handler } from 'express';
import { SchemaMap } from '@hapi/joi'
const Joi = require('@hapi/joi');

type SuppertedKeys = 'params' | 'body' | 'query'

interface Options {
  params?: SchemaMap
  body?: SchemaMap
  query?: SchemaMap
}

interface ExpressJoiValidate {
  (schemaOptions: Options): Handler
}

/**
 * Route validation using Joi
 * Takes a schema with properties defined using Joi:
 *  - params
 *  - body
 *  - query
 * Validates the request properties specified in the schema
 * @param {Object} schema { params, body, query }
 */
const validate: ExpressJoiValidate = (schema) => (req, res, next) => {
  if (!schema) {
    return next();
  }

  const obj: Options = {};

  ['params', 'body', 'query']
    .forEach((key) => {
      const k: SuppertedKeys = key as SuppertedKeys

      if (schema[k]) {
        obj[k] = req[k];
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

// lolz required...
// https://stackoverflow.com/questions/12696236/module-exports-in-typescript
module.exports = validate;

export default validate
