const BaseError = require('../../../src/Errors/BaseError')
const ConflictError = require('../../../src/Errors/Conflict')
const { conflict } = require('../../../config/errorCodes')

const startCode = 1200
const endCode = 1299

describe('ConflictError', () => {
  test('should be a instance of BaseError', () => {
    const error = new ConflictError()

    expect(error instanceof BaseError).toBe(true)
  })

  test('should have correct code and message', () => {
    const error = new ConflictError()
    const body = error.getBody()

    expect(error.getHttpCode()).toBe(409)
    expect(body.message).toEqual('conflict.generic')
    expect(body.code).toEqual(startCode)
  })

  test('all error codes must be inside range', () => {
    const validateCodes = (code) => {
      expect(code).toBeGreaterThanOrEqual(startCode)
      expect(code).toBeLessThanOrEqual(endCode)
    }
    Object.values(conflict).forEach(validateCodes)
  })
})
