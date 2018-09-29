const BaseError = require('../../../src/Errors/BaseError')
const ForbiddenError = require('../../../src/Errors/Forbidden')
const { forbidden } = require('../../../config/errorCodes')

const startCode = 1700
const endCode = 1799

describe('ForbiddenError', () => {
  test('should be a instance of BaseError', () => {
    const error = new ForbiddenError()

    expect(error instanceof BaseError).toBe(true)
  })

  test('should have correct code and message', () => {
    const error = new ForbiddenError()
    const body = error.getBody()

    expect(error.getHttpCode()).toBe(403)
    expect(body.message).toEqual('forbidden.generic')
    expect(body.code).toEqual(startCode)
  })

  test('all error codes must be inside range', () => {
    const validateCodes = (code) => {
      expect(code).toBeGreaterThanOrEqual(startCode)
      expect(code).toBeLessThanOrEqual(endCode)
    }
    Object.values(forbidden).forEach(validateCodes)
  })
})
