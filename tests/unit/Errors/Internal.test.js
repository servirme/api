const BaseError = require('../../../src/Errors/BaseError')
const InternalError = require('../../../src/Errors/Internal')
const { internalError } = require('../../../config/errorCodes')

describe('InternalError', () => {
  test('should be a instance of BaseError', () => {
    const errorThrown = new Error('fake error')
    const error = new InternalError(errorThrown)

    expect(error instanceof BaseError).toBe(true)
  })

  test('should have correct code and message', () => {
    const errorThrown = new Error('fake error')
    const error = new InternalError(errorThrown)
    const body = error.getBody()

    expect(error.getHttpCode()).toBe(500)
    expect(body.message).toEqual('http.500')
    expect(body.code).toEqual(internalError)
  })
})
