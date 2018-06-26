const BaseError = require('./BaseError')
const { validationError } = require('../../config/errorCodes')
const {
  pipe,
  prop,
  reduce,
} = require('ramda')

const validationErrorsField = 'validationErrors'

const transformJoiError = pipe(
  prop('details'),
  reduce((finalObject, err) => {
    finalObject[err.context.key] = {
      rule: err.type,
      context: err.context,
    }
    return finalObject
  }, {})
)

class ValidationError extends BaseError {
  constructor(errors) {
    const errorsObject = transformJoiError(errors)
    const fields = Object.keys(errorsObject)

    super(422, validationError, {
      key: 'validation-error',
      data: {
        errorsLength: fields.length,
      },
    })

    this._body[validationErrorsField] = fields
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
