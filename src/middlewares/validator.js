const ValidationError = require('../Errors/Validation')

module.exports = (schema, {
  ValidationError: ValidationErrorDep = ValidationError,
} = {}) => (req, res, next) => {
  const { error } = schema.validate(req, {
    abortEarly: false,
    stripUnknown: true,
  })

  if (error) {
    const validationError = new ValidationErrorDep(error)
    next(validationError)
  } else {
    next()
  }
}

module.exports.getRuleRequired = (rule, required) => {
  if (required) {
    return rule.required()
  }

  return rule
}
