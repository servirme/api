const {
  assoc,
  pipe,
  prop,
  reduce,
} = require('ramda')
const BaseError = require('./BaseError')
const { validationError } = require('../../config/errorCodes')

const validationErrorsField = 'validationErrors'

const transformJoiError = pipe(
  prop('details'),
  reduce((finalObject, err) => assoc(
    err.context.key,
    { rule: err.type, context: err.context },
    finalObject
  ), {})
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

    this.body[validationErrorsField] = fields
      .reduce((errorObject, field) => {
        this.addTranslateKey(`${validationErrorsField}.${field}`)
        return assoc(
          field,
          {
            key: `validation.${errorsObject[field].rule}`,
            data: errorsObject[field].context,
          },
          errorObject
        )
      }, {})
  }
}

module.exports = ValidationError
