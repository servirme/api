const Joi = require('joi')
const BbPromise = require('bluebird')
const ValidationException = require('../Exceptions/ValidationException')

class Validator {
  constructor() {
    this._validators = {}
  }

  addValidator(alias, validatorRules) {
    this._validators[alias] = Joi.object(validatorRules)
  }

  validate(alias, targetToValidate) {
    const schema = this._validators[alias]
    if (!schema) {
      return BbPromise.resolve(targetToValidate)
    }

    const { error, validated } = schema.validate(targetToValidate, {
      abortEarly: false,
      stripUnknown: true,
    })

    if (error) {
      const errorsObject = error.details
        .reduce((finalObject, err) => {
          finalObject[err.context.key] = {
            rule: err.type,
            context: err.context,
          }
          return finalObject
        }, {})

      throw new ValidationException(errorsObject)
    }

    return BbPromise.resolve(validated)
  }
}

module.exports = Validator
