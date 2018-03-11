const BaseError = require('./BaseError')
const { validationError } = require('../../config/errorCodes')

const validationErrorsField = 'validationErrors'

class ValidationError extends BaseError {
  constructor(errorsObject) {
    const errors = Object.keys(errorsObject)
    super(422, validationError, {
      key: 'validation-error',
      data: {
        errorsLength: errors.length,
      },
    })

    this._body[validationErrorsField] = errors
      .reduce((errorObject, field) => {
        this.addTranslateKey(`${validationErrorsField}.${field}`)
        errorObject[field] = {
          key: `validation.${errorsObject[field].rule}`,
          data: errorsObject[field].context,
        }

        return errorObject
      }, {})
  }
}

module.exports = ValidationError
