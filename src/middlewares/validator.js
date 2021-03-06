const ValidationError = require('../Errors/Validation')

module.exports = schema => (req, res, next) => {
  const { error } = schema.validate(req, {
    abortEarly: false,
    stripUnknown: true,
  })

  if (error) {
    const validationError = new ValidationError(error)
    next(validationError)
  } else {
    next()
  }
}
