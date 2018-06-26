const BaseError = require('../../../src/Errors/BaseError')
const LimitExceededError = require('../../../src/Errors/LimitExceeded')
const { limitExceeded } = require('../../../config/errorCodes')

const startCode = 1700
const endCode = 1799

describe('LimitExceededError', () => {
  test('should be a instance of BaseError', () => {
    const error = new LimitExceededError()

    expect(error instanceof BaseError).toBe(true)
  })

  test('should have correct code and message', () => {
    const error = new LimitExceededError()
    const body = error.getBody()

    expect(error.getHttpCode()).toBe(429)
    expect(body.message).toEqual('limit-exceeded.generic')
    expect(body.code).toEqual(startCode)
  })

  test('all error codes must be inside range', () => {
    const validateCodes = (code) => {
      expect(code).toBeGreaterThanOrEqual(startCode)
      expect(code).toBeLessThanOrEqual(endCode)
    }
    Object.values(limitExceeded).forEach(validateCodes)
  })
})
