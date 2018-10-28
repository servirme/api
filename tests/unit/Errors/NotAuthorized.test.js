const BaseError = require('../../../src/Errors/BaseError')
const NotAuthorizedError = require('../../../src/Errors/NotAuthorized')
const { unauthorized } = require('../../../config/errorCodes')

const startCode = 1500
const endCode = 1599

describe('NotAuthorizedError', () => {
  test('should be a instance of BaseError', () => {
    const error = new NotAuthorizedError()

    expect(error instanceof BaseError).toBe(true)
  })

  test('should have correct code and message', () => {
    const error = new NotAuthorizedError()
    const body = error.getBody()

    expect(error.getHttpCode()).toBe(401)
    expect(body.message).toEqual('unauthorized.generic')
    expect(body.code).toEqual(startCode)
  })

  test('all error codes must be inside range', () => {
    const validateCodes = (code) => {
      expect(code).toBeGreaterThanOrEqual(startCode)
      expect(code).toBeLessThanOrEqual(endCode)
    }
    Object.values(unauthorized).forEach(validateCodes)
  })
})
