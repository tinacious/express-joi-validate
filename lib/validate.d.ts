/// <reference types="hapi__joi" />
import { Handler } from 'express';
import { SchemaMap } from '@hapi/joi';
interface Options {
    params?: SchemaMap;
    body?: SchemaMap;
    query?: SchemaMap;
}
interface ExpressJoiValidate {
    (schemaOptions: Options): Handler;
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
declare const validate: ExpressJoiValidate;
export default validate;
//# sourceMappingURL=validate.d.ts.map