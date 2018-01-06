const Joi = require('joi')
const InternalException = require('../Exceptions/InternalException')
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
      throw new InternalException(`No validate alias defined for '${alias}'`)
    }

    const { error, value } = schema.validate(targetToValidate, {
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

    return value
  }
}

Validator.getRule = (rule, required) => {
  return required ? rule.required() : rule
}

module.exports = Validator
