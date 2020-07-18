"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("@hapi/joi"));
/**
 * Route validation using Joi
 * Takes a schema with properties defined using Joi:
 *  - params
 *  - body
 *  - query
 * Validates the request properties specified in the schema
 * @param schema
 */
var validate = function (schema) { return function (req, res, next) {
    if (!schema) {
        return next();
    }
    var obj = {};
    ['params', 'body', 'query']
        .forEach(function (key) {
        var k = key;
        if (schema[k]) {
            obj[k] = req[k];
        }
    });
    var joiSchema = joi_1.default.object(schema);
    var error = joiSchema.validate(obj).error;
    if (error) {
        var field = error.details[0].path.join('.');
        var message = error.details[0].message.replace(/"/g, "'");
        return res.status(400).json({ message: message, field: field }).end();
    }
    return next();
}; };
// lolz required...
// https://stackoverflow.com/questions/12696236/module-exports-in-typescript
module.exports = validate;
exports.default = validate;
