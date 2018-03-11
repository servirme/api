const ValidationError = require('../Errors/Validation')

const { curry } = require('ramda')

module.exports.createValidator = curry((schema, object) => {
  const { error, value } = schema.validate(object, {
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

    throw new ValidationError(errorsObject)
  }

  return value
})

module.exports.getRuleRequired = (rule, required) => {
  if (required) {
    return rule.required()
  }

  return rule
}
