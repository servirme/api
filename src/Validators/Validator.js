'use strict';

const Joi = require('joi');
const BbPromise = require('bluebird');
const ValidationException = require('../Exceptions/ValidationException');

class Validator {
    constructor() {
        this._validators = {};
        this._predefined = {};
    }

    addPredefined(alias, rule) {
        this._predefined[alias] = rule;
    }

    getPredefined(alias, required = false) {
        const rule = this._predefined[alias];
        if (!rule) {
            return Joi.any();
        }

        return required ? rule.required() : rule;
    }

    addValidator(alias, validatorRules) {
        this._validators[alias] = Joi.object(validatorRules);
    }

    validate(alias, targetToValidate) {
        const schema = this._validators[alias];
        if (!schema) {
            return BbPromise.resolve(targetToValidate);
        }

        const result = Joi.validate(targetToValidate, schema, {
            abortEarly: false,
            convert: true,
            stripUnknown: true,
        });

        if (result.error) {
            const errorsObject = result.error.details
                .reduce((finalObject, err) => {
                    finalObject[err.context.key] = {
                        rule: err.type,
                        context: err.context,
                    };
                    return finalObject;
                }, {});

            throw new ValidationException(errorsObject);
        }

        return BbPromise.resolve(result.value);
    }
}

module.exports = Validator;
