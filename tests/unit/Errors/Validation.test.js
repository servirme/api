const Joi = require('joi')

const BaseError = require('../../../src/Errors/BaseError')
const ValidationError = require('../../../src/Errors/Validation')
const { validationError } = require('../../../config/errorCodes')

const schema = Joi.object({
  name: Joi.string(),
})
const object = {
  name: 123,
}

const { error: joiValidationError } = schema.validate(object)

describe('ValidationError', () => {
  test('should be a instance of BaseError', () => {
    const error = new ValidationError(joiValidationError)

    expect(error instanceof BaseError).toBe(true)
  })

  test('should have correct code and message with Joi error', () => {
    const error = new ValidationError(joiValidationError)
    const body = error.getBody()

    expect(error.getHttpCode()).toBe(422)
    expect(body.message).toEqual({
      key: 'validation-error',
      data: { errorsLength: 1 },
    })
    expect(body.code).toEqual(validationError)

    expect(body.validationErrors).toEqual({
      name: {
        key: 'validation.string.base',
        data: {
          key: 'name',
          label: 'name',
          value: 123,
        },
      },
    })
  })
})
